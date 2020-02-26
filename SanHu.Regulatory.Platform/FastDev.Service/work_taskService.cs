using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
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
    class work_taskService : ServiceBase, IService
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
            if (!string.IsNullOrEmpty(data.RefTable))
            {
                Type entityType = DataAccessHelper.GetEntityType(data.RefTable, "Form");
                if (entityType != null)
                {
                    var nextdata = FullJsonValue.GetObjectByType(entityType, data.FormPreparation);
                    //nextdata
                    entityType.GetProperty("TaskId").SetValue(nextdata, "MANUALLY_CREATE_TASK_ID");//高速系统是手动创建的任务
                    IService svc = ServiceHelper.GetService(data.RefTable);
                    rev = svc.WfCreate(nextdata,new string[] { data.AssignUsersID });//创建了工作流
                    //
                    var  wTask = QueryDb.FirstOrDefault<work_task>("where ID = @0", new object[1]
                    {
                        rev
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
                    wTask.WorkAddress = data.WorkAddress;
                    QueryDb.Update(wTask, rev);
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
                workTask.AssignUsersID = data.UserId;
                base.Create(workTask);

                //给指定用户发送待办


                QueryDb.CompleteTransaction();
                return true;
            }
            catch(Exception e)
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
            base.Update(workTask);
            return true;
        }
    }


}
