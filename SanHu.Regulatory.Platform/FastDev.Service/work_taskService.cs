﻿using FastDev.Common;
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
using WanJiang.Framework.Infrastructure.Logging;

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
            OnAfterGetDetailData += Work_taskService_OnAfterGetDetailData;
            OnAfterGetPagedData += Work_taskService_OnAfterGetPagedData;
        }

        private void Work_taskService_OnAfterGetPagedData(object query, object data)
        {
            var lst = (data as PagedData).Records;
            var db = this.QueryDb;
            for (int i = 0; i < lst.Count; i++)
            {
                var item = (Dictionary<string, object>)lst[i];
                string evType = "";
                if (item["EventInfoId"] != null && !string.IsNullOrEmpty(item["EventInfoId"].ToString()))
                {
                    evType = db.ExecuteScalar<string>("select evtTypeIds from event_info where objId=@0", new object[] { item["EventInfoId"] });
                }
                item.Add("EventTypeName", evType);
            }
        }

        private void Work_taskService_OnAfterGetDetailData(object query, object data)
        {
            var o = data as Dictionary<string, object>;
            string taskType = o["TaskType"].ToString();
            var db = this.QueryDb;
            var items = db.FirstOrDefault<Model.Entity.res_dictionaryItems>("where DicID in (select ID from res_dictionary where DicCode = @0) and ItemCode=@1", "TaskType", taskType);
            if (items != null)
            {
                o["TaskTypeInfo"] = new List<string>() { items.ItemCode, items.Title };
            }
        }


        ///// <summary>
        ///// work_task一般是自动创建
        ///// 手动创建的话，需要创建其他工作流的表单,这里专门处理一下手动创建work_task的情况
        ///// 手动创建，必须指定 RefTable,
        ///// 
        ///// 且，不在这里直接讲数据写如数据库，而是通过触发工作流，由工作流创建work_task,再讲相关字段更新到work_task
        ///// </summary>
        ///// <param name="postdata"></param>
        ///// <returns></returns>
        //public override object Create(object postdata)
        //{
        //    object rev = null;
        //    var data = (Model.Form.work_task)postdata;
        //    if (data.RefTable == WF_EventWorkflowModel || data.RefTable == WF_LawCaseWorkflowModel)
        //    {
        //        //如果是reftable 要求创建事件工作流，或者案件工作流
        //        Type entityType = DataAccessHelper.GetEntityType(data.RefTable, "Form");
        //        if (entityType != null)
        //        {
        //            var nextdata = FullJsonValue.GetObjectByType(entityType, data.FormPreparation);
        //            if (nextdata == null) { nextdata = new Model.Form.event_info_wf(); }
        //            entityType.GetProperty("objId").SetValue(nextdata, data.EventInfoId);//告诉系统是手动创建的任务
        //            IService svc = ServiceHelper.GetService(WF_EventWorkflowModel);
        //            rev = svc.Create(nextdata);//创建事件工作流
        //            nextdata.GetType().GetProperty("ID").SetValue(nextdata, rev);//将id写入
        //            var taskId = AdvanceWorkflow(WF_EventWorkflowModel, "手动创建任务", nextdata, false, data.AssignUsers.ToArray());
        //            //
        //            var wTask = QueryDb.FirstOrDefault<work_task>("where WorkflowtaskID = @0", new object[1]
        //            {
        //                taskId
        //            });
        //            //从工作流里面查询出
        //            //然后更新一些关键字段
        //            wTask.CompleteTime = data.CompleteTime;
        //            wTask.EventInfoId = data.EventInfoId;
        //            wTask.ExpectedCompletionTime = data.ExpectedCompletionTime;
        //            wTask.TaskContent = data.TaskContent;
        //            List<DevDB.Model.core_autoCode> source = new List<DevDB.Model.core_autoCode>();
        //            source = QueryDb.Fetch<DevDB.Model.core_autoCode>("where ModelName = @0", new object[1]
        //            {
        //                "work_task"
        //            });
        //            var rule = source.FirstOrDefault(a => a.FieldName == "Tasknumber");
        //            if (rule != null)
        //            {
        //                data.newAutoCode = new DevDB.AutoCode.AutoCodeService(QueryDb, rule).GetNewAutoCode();
        //                wTask.Tasknumber = newAutoCode;
        //            }
        //            wTask.MainHandler = data.MainHandler;
        //            wTask.CoOrganizer = data.CoOrganizer;
        //            wTask.AssignUsersID = data.AssignUsersID;
        //            wTask.WorkAddress = data.WorkAddress;
        //            QueryDb.Update(wTask, wTask.ID);
        //        }
        //    }
        //    return rev;
        //}
        private Func<APIContext, object> Work_taskService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "HANDOVER":
                    return HandOver;
                case "REJECT":
                    return Reject;
                case "FORMDATA":
                    return FormData;
                case "CREATE":
                    return CreateTask;
                case "GETPROCESS":
                    return GetProcess;
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
            var data = JsonHelper.DeserializeJsonToObject<FormReqBase>(context.Data);
            QueryDb.BeginTransaction();
            try
            {
                UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.HandOver);
                CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }

            return true;
        }

        /// <summary>
        /// 拒绝
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private object Reject(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<TaskRejectReq>(context.Data);
            QueryDb.BeginTransaction();
            try
            {
                var taskInfo = GetWorkTask(data.SourceTaskId);
                taskInfo.TaskStatus = (int)WorkTaskStatus.HandOver;
                taskInfo.RejectReason = data.Reason;
                QueryDb.Update(taskInfo);

                UpdateEventState(data.EventInfoId, EventStatus.untreated);
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }


        private object FormData(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<FormDataReq>(context.Data);
            var _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            return _sHBaseService.FormData(data);
        }
        /// <summary>
        /// 创建任务
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        private object CreateTask(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<work_task>(context.Data);
            QueryDb.BeginTransaction();
            try
            {
                CreatTasksAndCreatWorkrecor(new work_task[] { data }, "");
                if(!string.IsNullOrEmpty(data.WorkAddress))
                UpdateEventStateHandler(data.EventInfoId, EventStatus.doning, data.WorkAddress + " " + data.MainHandler);
                else UpdateEventState(data.EventInfoId, EventStatus.doning);
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
            }
            return true;
        }

        public override object GetPageData(QueryDescriptor descriptor)
        {
            var data = base.GetPageData(descriptor);
            return data;
        }

        private object GetProcess(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<GetProcessReq>(context.Data);
            var ddService = SysContext.GetService<IDingDingServices>();
            return ddService.GetProcess(data.OriUserId, data.OriDeptId, data.taskUserId, data.OpeUserId, data.pageIndex, data.pageSize).Result;
        }

    }


}
