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

namespace FastDev.Service
{
    /// <summary>
    /// 任务-巡查
    /// </summary>
    class task_patrolService : ServiceBase, IService
    {

        public task_patrolService()
        {
            OnGetAPIHandler += Task_patrolService_OnGetAPIHandler;
        }

        private Func<APIContext, object> Task_patrolService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Finish;

            }
            return null;
        }
        public object Finish(APIContext context) {

            var data = JsonHelper.DeserializeJsonToObject<taskPatrolFinishReq>(context.Data);

            //当前任务信息
            var taskInfo = QueryDb.FirstOrDefault<work_task>(" where id=@0", data.TaskId);

            if (data.TaskPatrol.Needlawenforcement != null && data.TaskPatrol.Needlawenforcement == 1)
            {
                //需要执法
                //生成勘察任务
                task_survey survey = new task_survey();
                survey.ID = CreateGuid.CreateId();
                survey.CreateDate = DateTime.Now;
                work_task workTask = new work_task();
                workTask.ID = survey.ID = CreateGuid.CreateId();
                workTask.EventInfoId = taskInfo.EventInfoId;
                
            }
            else
            {
                //不需要执法,需要判断是否跟踪
                if (data.TaskPatrol.Needtracking != null && data.TaskPatrol.Needtracking == 1)
                {
                    //需要跟踪
                    //生成巡查任务,并关联当前任务

                }
            }

            return null;
        }





    }


}
