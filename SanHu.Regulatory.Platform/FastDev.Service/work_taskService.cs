using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using FD.Common;
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
            OnGetAPIHandler += Work_taskService_OnGetAPIHandler; ;
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
                var workTask = QueryDb.FirstOrDefault<work_task>("id=@id", new { id = data.TaskId });
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
            var workTask = QueryDb.FirstOrDefault<work_task>("id=@id", new { id = data.TaskId });
            workTask.RejectReason = data.Reason;
            workTask.TaskStatus = (int)WorkTaskStatus.Reject;
            QueryDb.Update(workTask);
            return true;
        }
    }


}
