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

        //public override object WfCreate(object postdata, params string[] exeUserIds)
        //{
        //    var nId = base.Create(postdata);
        //    ((Model.Form.task_patrol)postdata).ID = nId.ToString();
        //    var wfId = AdvanceWorkflow(postdata, exeUserIds);
        //    if (wfId != null) return wfId;
        //    return nId;
        //}

        //private object AdvanceWorkflow(object postdata, params string[] exeUserIds)
        //{
        //    var patrolData = (Model.Form.task_patrol)postdata;
        //    if (!string.IsNullOrEmpty(patrolData.TaskId))
        //    {//如果该表单有任务id，则，检查是否完成了某任务

        //        workflowService.DbContext = QueryDb;
        //        Dictionary<string, object> wfContext = (Dictionary<string, object>)workflowService.GetContext(new DevDB.Workflow.WorkflowContext() { TaskID = patrolData.TaskId, Action = "advance", Model = "task_patrol", Context = patrolData.ID });
        //        //wfContext[]
        //        if ((wfContext.ContainsKey("Success") && Convert.ToBoolean(wfContext["Success"]) || wfContext.ContainsKey("nodes")))
        //        {//如果工作流可以往下走
        //            var nodes = ((List<object>)wfContext["nodes"]);
        //            if (nodes.Count > 0)
        //            {
        //                var ExeNode = ((Dictionary<string, object>)(nodes[0]));
        //                object nodeId = ExeNode["node"].GetType().GetProperty("id").GetValue(ExeNode["node"]);

        //                //nodeId = node.id.ToString();
        //                if (!string.IsNullOrEmpty(nodeId.ToString()))
        //                {
        //                    WorkflowContext wfExe = new WorkflowContext()
        //                    {
        //                        Model = "task_patrol",
        //                        Action = "advance",
        //                        Context = patrolData.ID,
        //                        TaskID = patrolData.TaskId,
        //                        Remark = "完成了事件巡查表单填写",
        //                        ExecuteNodes = new List<ExecuteNode>()
        //                    };
        //                    List<string> excutors = new List<string>();//用户id一个字符串，用户名一个字符串，用户名其实没有使用
        //                    if (exeUserIds != null && exeUserIds.Length > 0)
        //                    {
        //                        for (int i = 0; i < exeUserIds.Length; i++)
        //                        {
        //                            excutors.Add(exeUserIds[i]);            //使用哪个用户来执行 这里需要不同的情况的来处理
        //                            excutors.Add("用户名");//第二个参数 其实没有用到
        //                        }
        //                    }
        //                    else
        //                    {//默认使用当前用户来执行任务
        //                        excutors.Add(SysContext.WanJiangUserID);            //使用哪个用户来执行 这里需要不同的情况的来处理
        //                        excutors.Add("用户名");//第二个参数 其实没有用到
        //                    }
        //                    //如果由多个用户来执行，那 Executors可以是多个人，        
        //                    //这里任务的下一步仍然由填表人完成，某些情况些，会由指定的人来完成，比如：？想到了再说？？？
        //                    wfExe.ExecuteNodes.Add(new ExecuteNode() { Executors = new List<List<string>> { excutors }, NodeId = nodeId.ToString() });
        //                    workflowService.Execute(wfExe);//工作流向下一步
        //                    if (patrolData.TaskId == "MANUALLY_CREATE_TASK_ID")
        //                    {//如果该任务是手动创建
        //                        string latestWorkTaskId = workflowService.LatestWorkTaskId;

        //                        QueryDb.Update<Model.Form.task_patrol>("set TaskId=@0 where ID=@1", new object[] { latestWorkTaskId, patrolData.ID });
        //                        return latestWorkTaskId;//返回所创建的任务Id,然后 work_task那边拿到以后，更新work_task自己的相关字段
        //                    }
        //                }
        //            }

        //        }
        //    }
        //    return null;
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
        //    return WfCreate(postdata, nextexecutor.ToArray());
        //}

        //public override object Update(object postdata)
        //{
        //    var rev = base.Update(postdata);
        //    var wfId = AdvanceWorkflow(postdata);
        //    return rev;
        //}
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
                //保存表单信息
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

                //修改事件信息
                UpdateEventInfo(data.EventId, patrol);

                //执法与跟踪
                if (data.TaskPatrol.Needlawenforcement != null && data.TaskPatrol.Needlawenforcement == 1)
                {
                    //需要执法,生成勘察任务
                    CreateSaveWorkTask(data.TaskId, TaskType.Survey);
                    CreateWorkrecor(AccountId, TaskType.Survey.GetDisplayName(), data.Url, "标题", "内容");
                }
                else
                {
                    //不需要执法
                    if (data.TaskPatrol.Needtracking != null && data.TaskPatrol.Needtracking == 1)
                    {
                        //需要跟踪
                        CreateSaveWorkTask(data.TaskId, TaskType.Patrol);
                        CreateWorkrecor(AccountId, TaskType.Patrol.GetDisplayName(), data.Url, "标题", "内容");
                    }
                    else
                    {
                        //不需要跟踪,关闭任务和事件
                        UpdateWorkTaskState(data.TaskId, WorkTaskStatus.Close);
                        UpdateEventState(data.EventId, EventStatus.finish);
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
        private void UpdateEventInfo(string eventId, task_patrol TaskPatrol)
        {
            var eventInfo = QueryDb.FirstOrDefault<event_info>(" where id=@0", eventId);
            eventInfo.remark = TaskPatrol.EventDescribe;
            eventInfo.reportTime = TaskPatrol.IncidentTime;
            ServiceHelper.GetService("event_info").Update(eventInfo);
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
