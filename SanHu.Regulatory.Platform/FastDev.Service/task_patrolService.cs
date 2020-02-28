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

        public object WfCreate(string wfModel, object postdata, params string[] exeUserIds)
        {
            var nId = base.Create(postdata);
            postdata.GetType().GetProperty("ID").SetValue(postdata, nId);
            AdvanceWorkflow(wfModel, "事件巡查填表", postdata, true, exeUserIds);
            return nId;
        }

        public override object Create(object postdata)
        {
            var data = ((Model.Form.task_patrol)postdata);
            List<string> nextexecutor = new List<string>();
            if (!string.IsNullOrEmpty(data.NextHandler))//如果系统带有下一步执行人
            {
                string[] nh = data.NextHandler.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                nextexecutor.AddRange(nh);
            }
            else
            {
                nextexecutor.Add(SysContext.WanJiangUserID);
            }
            return WfCreate(WF_EventWorkflowModel, postdata, nextexecutor.ToArray());
        }
        public task_patrolService()
        {
            OnGetAPIHandler += Task_patrolService_OnGetAPIHandler;
        }
        /// <summary>
        /// 是否需要创建新任务
        /// 1、表单类型， 2、表单
        /// </summary>
        /// <returns></returns>
        private bool NeedCreateNewTask(object postdata)
        {
            return true;
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
        public object Finish(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<taskPatrolFinishReq>(context.Data);
            if (string.IsNullOrEmpty(data.CaseId) && string.IsNullOrEmpty(data.TaskId) && string.IsNullOrEmpty(data.EventId))
            {
                throw new Exception("缺少关联数据(任务或事件或案件)");
            }
            //保存当前巡查表单
            //开始事务
            QueryDb.BeginTransaction();
            try
            {
                var patrol = data.TaskPatrol;
                patrol.CaseId = data.CaseId;
                patrol.EventInfoId = data.EventId;
                Create(patrol);

                //当前任务信息
                if (!string.IsNullOrEmpty(data.TaskId))
                {
                    var workTask = UpdateWorkTask(data.TaskId);
                    data.EventId = workTask.EventInfoId;
                    data.CaseId = workTask.CaseID;
                }

                //执法与跟踪
                work_task newWorkTask = null;
                if (data.TaskPatrol.Needlawenforcement != null && data.TaskPatrol.Needlawenforcement == 1)
                {
                    //需要执法
                    //生成勘察任务
                    newWorkTask = CreateWorkTask(data.EventId, data.CaseId, TaskType.Survey);
                }
                else
                {
                    //不需要执法,需要判断是否跟踪
                    if (data.TaskPatrol.Needtracking != null && data.TaskPatrol.Needtracking == 1)
                    {
                        //需要跟踪
                        newWorkTask = CreateWorkTask(data.TaskId, TaskType.Patrol);
                        CreateWorkrecor(AccountId, newWorkTask.TaskType.ToString(), data.Url, "标题", "内容");
                    }
                }
                

                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }

        private work_task CreateWorkTask(string eventId, string caseId, TaskType type)
        {
            work_task workTask = new work_task();
            workTask.EventInfoId = eventId;
            workTask.CaseID = caseId;
            workTask.TaskType = TaskType.Survey.ToString();
            workTask.TaskStatus = (int)WorkTaskStatus.Normal;
            workTask.TaskContent = type.GetDisplayName();

            return workTask;
        }
        private work_task UpdateWorkTask(string taskId)
        {
            var taskInfo = QueryDb.FirstOrDefault<work_task>(" where id=@0", taskId);

            //修改任务状态-已关闭
            taskInfo.TaskStatus = (int)WorkTaskStatus.Close;
            taskInfo.CompleteTime = DateTime.Now;
            QueryDb.Update(taskInfo);
            return taskInfo;
        }

    }


}
