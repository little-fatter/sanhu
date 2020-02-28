using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Common;
using FD.Common.ActionValue;
using FD.Model.Dto;
using FD.Model.Enum;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FastDev.Service
{
    /// <summary>
    /// 任务
    /// </summary>
    class work_taskService : SHBaseService, IService
    {

        public work_taskService()
        {
            OnGetAPIHandler += Work_taskService_OnGetAPIHandler;
        }
        /// <summary>
        /// work_task一般是自动创建
        /// 手动创建的话，需要创建其他工作流的表单,这里专门处理一下手动创建work_task的情况
        /// 手动创建，必须指定 RefTable,
        /// 
        /// 且，不在这里直接讲数据写如数据库，而是通过触发工作流，由工作流创建work_task,再讲相关字段更新到work_task
        /// </summary>
        /// <param name="postdata"></param>
        /// <returns></returns>
        public override object Create(object postdata)
        {
            object rev = null;
            var data = (Model.Form.work_task)postdata;
            if (data.RefTable == WF_EventWorkflowModel || data.RefTable == WF_LawCaseWorkflowModel)
            {
                //如果是reftable 要求创建事件工作流，或者案件工作流
                Type entityType = DataAccessHelper.GetEntityType(data.RefTable, "Form");
                if (entityType != null)
                {
                    var nextdata = FullJsonValue.GetObjectByType(entityType, data.FormPreparation);
                    if (nextdata == null) { nextdata = new Model.Form.event_info_wf(); }
                    entityType.GetProperty("objId").SetValue(nextdata, data.EventInfoId);//告诉系统是手动创建的任务
                    IService svc = ServiceHelper.GetService(WF_EventWorkflowModel);
                    rev = svc.Create(nextdata);//创建事件工作流
                    nextdata.GetType().GetProperty("ID").SetValue(nextdata, rev);//将id写入
                    var taskId = AdvanceWorkflow(WF_EventWorkflowModel, "手动创建任务", nextdata, false, data.AssignUsers.ToArray());
                    //
                    var wTask = QueryDb.FirstOrDefault<work_task>("where WorkflowtaskID = @0", new object[1]
                    {
                        taskId
                    });
                    //从工作流里面查询出
                    //然后更新一些关键字段
                    wTask.CompleteTime = data.CompleteTime;
                    wTask.EventInfoId = data.EventInfoId;
                    wTask.ExpectedCompletionTime = data.ExpectedCompletionTime;
                    wTask.TaskContent = data.TaskContent;
                    List<DevDB.Model.core_autoCode> source = new List<DevDB.Model.core_autoCode>();
                    source = QueryDb.Fetch<DevDB.Model.core_autoCode>("where ModelName = @0", new object[1]
                    {
                        "work_task"
                    });
                    var rule = source.FirstOrDefault(a => a.FieldName == "Tasknumber");
                    if (rule != null)
                    {
                        string newAutoCode = new DevDB.AutoCode.AutoCodeService(QueryDb, rule).GetNewAutoCode();
                        wTask.Tasknumber = newAutoCode;
                    }
                    wTask.MainHandler = data.MainHandler;
                    wTask.CoOrganizer = data.CoOrganizer;
                    wTask.AssignUsersID = data.AssignUsersID;
                    wTask.WorkAddress = data.WorkAddress;
                    QueryDb.Update(wTask, wTask.ID);
                }
            }
            return rev;
        }
        private Func<APIContext, object> Work_taskService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "HANDOVER":
                    return HandOver;
                case "REJECT":
                    return Reject;
                case "CASE":
                    return NextStepCase;
            }
            return null;
        }

        /// <summary>
        /// 任务转移
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private object HandOver(APIContext context)
        {
            QueryDb.BeginTransaction();
            try
            {
                var data = JsonHelper.DeserializeJsonToObject<TaskHandOverReq>(context.Data);

                //关闭当前任务
                var workTask = QueryDb.FirstOrDefault<work_task>("where id=@id", data.TaskId);
                workTask.TaskStatus = (int)WorkTaskStatus.Close;
                QueryDb.Update(workTask);

                //复制任务给指定用户
                workTask.TaskStatus = (int)WorkTaskStatus.Normal;
                workTask.AssignUsersID = data.UserId.ToString();
                base.Create(workTask);

                //给指定用户发送待办
                CreateWorkrecor(data.UserId, workTask.TaskType.ToString(), data.Url, "标题", "内容");

                QueryDb.CompleteTransaction();
                return true;
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
            }

            return false;
        }

        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private object Reject(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<TaskPatrolRejectRequest>(context.Data);
            var workTask = QueryDb.FirstOrDefault<work_task>("where id=@id", data.TaskId);
            workTask.RejectReason = data.Reason;
            workTask.TaskStatus = (int)WorkTaskStatus.Reject;
            QueryDb.BeginTransaction();
            try
            {
                base.Update(workTask);  //修改任务状态
                base.UpdateEventState(workTask.EventInfoId, EventStatus.untreated);  //修改事件状态
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }

        private object NextStepCase(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<TaskNextStepReq>(context.Data);
            var  _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            try
            {
                return _sHBaseService.GetLastInfo(data.EvnetInfoId,"case_Info");
            }
            catch (Exception e)
            {
                return null;
            }
        }



    }


}
