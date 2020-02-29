using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.DevDB.Workflow;
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
    class task_patrolService : SHBaseService, IService
    {

       
        public task_patrolService()
        {
            OnGetAPIHandler += Task_patrolService_OnGetAPIHandler;
        }

        /// <summary>
        /// 是否需要创建新任务
        /// 1、表单类型， 2、表单
        /// </summary>
        /// <returns></returns>
        //private bool NeedCreateNewTask(object postdata)
        //{
        //    return true;
        //}
        //public object WfCreate(string wfModel, object postdata, params string[] exeUserIds)
        //{
        //    var nId = base.Create(postdata);
        //    postdata.GetType().GetProperty("ID").SetValue(postdata, nId);
        //    AdvanceWorkflow(wfModel, "事件巡查填表", postdata, true, exeUserIds);
        //    return nId;
        //}
        //public override object Create(object postdata)
        //{
        //    var data = ((Model.Form.task_patrol)postdata);
        //    List<string> nextexecutor = new List<string>();
        //    if (!string.IsNullOrEmpty(data.NextHandler))//如果系统带有下一步执行人
        //    {
        //        string[] nh = data.NextHandler.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        //        nextexecutor.AddRange(nh);
        //    }
        //    else
        //    {
        //        nextexecutor.Add(SysContext.WanJiangUserID);
        //    }
        //    return WfCreate(WF_EventWorkflowModel, postdata, nextexecutor.ToArray());
        //}

        private Func<APIContext, object> Task_patrolService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Finish;
            }
            return null;
        }
        private object Finish(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<taskPatrolFinishReq>(context.Data);
            //var data = new taskPatrolFinishReq();

            //var task_patrolData = new task_patrol();
            //task_patrolData.Result = "测试巡查结果";
            //task_patrolData.Needtracking = 0;
            //task_patrolData.Needlawenforcement = 1;
            //data.TaskPatrol = task_patrolData;

            //var taskData = new work_task();
            //taskData.TaskType = "勘察";
            //taskData.TaskContent = "任务内容描述";
            //taskData.EventInfoId = "1";
            //taskData.ExpectedCompletionTime = DateTime.Now.AddDays(1);
            //taskData.MainHandler = "主办人测试";
            //data.SourceTaskId = "2fcb8609-d233-4e77-a12b-a87d61ef9a50";
            //data.NextTasks = new work_task[] { taskData };

            //var a = JsonConvert.SerializeObject(data);

            //保存当前巡查表单
            //开始事务
            QueryDb.BeginTransaction();
            try
            {
                data.TaskPatrol.TaskId = data.SourceTaskId;
                //保存表单信息
                Create(data.TaskPatrol);
                //处理事件,任务状态
                if (data.TaskPatrol.Needlawenforcement == 0 && data.TaskPatrol.Needtracking == 0)
                {
                    UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);
                    UpdateEventState(data.EventInfoId, EventStatus.finish);
                }
                //创建下一个任务
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
    }
}
