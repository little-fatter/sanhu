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
        /// 手动创建，必须指定 RefTable
        /// </summary>
        /// <param name="postdata"></param>
        /// <returns></returns>
        public override object Create(object postdata)
        {
            var rev= base.Create(postdata);
            //var data = (Model.Form.work_task)postdata;
            //if(!string.IsNullOrEmpty(data.RefTable))
            //{
            //    Type entityType = DataAccessHelper.GetEntityType(data.RefTable,"Form");
            //    if (entityType != null)
            //    {
            //        var nextdata = FullJsonValue.GetObjectByType(entityType, data.FormPreparation);
            //        //nextdata
            //        //entityType.GetProperty("TaskId").SetValue(nextdata, rev.ToString());
            //        IService svc = ServiceHelper.GetService(data.RefTable);
            //        svc.Create(nextdata);
            //    }
            //}
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
                workTask.ID = CreateGuid.CreateId();
                workTask.AssignUsersID = data.UserId;
                QueryDb.Save(workTask);

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
            QueryDb.Update(workTask);
            return true;
        }
    }


}
