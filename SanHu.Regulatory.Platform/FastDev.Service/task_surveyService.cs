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
    /// 任务-勘察
    /// </summary>
    class task_surveyService : ServiceBase, IService
    {

        public task_surveyService()
        {
            OnGetAPIHandler += Task_surveyService_OnGetAPIHandler;
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


        
        /*
        public override object WfCreate(object postdata, params string[] exeUserIds)
        {
            var nId = base.Create(postdata);
            ((Model.Form.task_survey)postdata).ID = nId.ToString();
            var wfId = AdvanceWorkflow(postdata, exeUserIds);
            if (wfId != null) return wfId;
            return nId;
        }

        private object AdvanceWorkflow(object postdata, params string[] exeUserIds)
        {
            var surveyData = (Model.Form.task_survey)postdata;
            if (!string.IsNullOrEmpty(surveyData.TaskId))
            {//如果该表单有任务id，则，检查是否完成了某任务

                workflowService.DbContext = QueryDb;
                Dictionary<string, object> wfContext = (Dictionary<string, object>)workflowService.GetContext(new DevDB.Workflow.WorkflowContext() { TaskID = surveyData.TaskId, Action = "advance", Model = "task_survey", Context = surveyData.ID });
                //wfContext[]
                if ((wfContext.ContainsKey("Success") && Convert.ToBoolean(wfContext["Success"]) || wfContext.ContainsKey("nodes")))
                {//如果工作流可以往下走
                    var nodes = ((List<object>)wfContext["nodes"]);
                    if (nodes.Count > 0)
                    {
                        var ExeNode = ((Dictionary<string, object>)(nodes[0]));
                        object nodeId = ExeNode["node"].GetType().GetProperty("id").GetValue(ExeNode["node"]);

                        //nodeId = node.id.ToString();
                        if (!string.IsNullOrEmpty(nodeId.ToString()))
                        {
                            WorkflowContext wfExe = new WorkflowContext()
                            {
                                Model = "task_survey",
                                Action = "advance",
                                Context = surveyData.ID,
                                TaskID = surveyData.TaskId,
                                Remark = "完成了事件勘察表单的填写",
                                ExecuteNodes = new List<ExecuteNode>()
                            };
                            List<string> excutors = new List<string>();//用户id一个字符串，用户名一个字符串，用户名其实没有使用
                            if (exeUserIds != null && exeUserIds.Length > 0)
                            {
                                for (int i = 0; i < exeUserIds.Length; i++)
                                {
                                    excutors.Add(exeUserIds[i]);            //使用哪个用户来执行 这里需要不同的情况的来处理
                                    excutors.Add("用户名");//第二个参数 其实没有用到
                                }
                            }
                            else
                            {//默认使用当前用户来执行任务
                                excutors.Add(SysContext.WanJiangUserID);            //使用哪个用户来执行 这里需要不同的情况的来处理
                                excutors.Add("用户名");//第二个参数 其实没有用到
                            }
                            //如果由多个用户来执行，那 Executors可以是多个人，        
                            //这里任务的下一步仍然由填表人完成，某些情况些，会由指定的人来完成，比如：？想到了再说？？？
                            wfExe.ExecuteNodes.Add(new ExecuteNode() { Executors = new List<List<string>> { excutors }, NodeId = nodeId.ToString() });
                            workflowService.Execute(wfExe);//工作流向下一步
                            if (surveyData.TaskId == "MANUALLY_CREATE_TASK_ID")
                            {//如果该任务是手动创建
                                string latestWorkTaskId = workflowService.LatestWorkTaskId;

                                QueryDb.Update<Model.Form.task_survey>("set TaskId=@0 where ID=@1", new object[] { latestWorkTaskId, surveyData.ID });
                                return latestWorkTaskId;//返回所创建的任务Id,然后 work_task那边拿到以后，更新work_task自己的相关字段
                            }
                        }
                    }

                }
            }
            return null;
        }
        public override object Create(object postdata)
        {
            return WfCreate(postdata, new string[] { SysContext.WanJiangUserID });
        }

        public override object Update(object postdata)
        {
            var rev = base.Update(postdata);
            var wfId = AdvanceWorkflow(postdata);
            return rev;
        }
        */



        private Func<APIContext, object> Task_surveyService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Handle;
            }
            return null;
        }

        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<task_surveyFinishReq>(context.Data);
            task_survey taskSurvey = new task_survey();
            List<law_party> lawParties = new List<law_party>();
            if (!string.IsNullOrEmpty(data.TaskSurvey.TaskId)) return false;
            string url = data.Url;
            taskSurvey = data.TaskSurvey;
            lawParties = data.LawParties;
            //0:不予处罚
            //1:移交其它部门
            //2:处罚程序
            switch (data.TaskSurvey.ProcessingDecisions)
            {
                case 0:
                     return Finish(taskSurvey,lawParties);
                case 1:
                    return ToEpart(taskSurvey);
                case 2:
                    return CreateCase(taskSurvey, lawParties, url);
            }
            return false;
        }


        /// <summary>
        /// 创建表单和当事人
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        public object CreateInfo(task_survey TaskSurvey, List<law_party> law_Parties)
        {
            try
            {
                QueryDb.BeginTransaction();
                var taskSurvey = base.Create(TaskSurvey) as task_survey;
                var _Lawpartys = ServiceHelper.GetService("law_partyService");
                if (law_Parties != null && law_Parties.Count > 0)//创建当事人
                {
                    foreach (var l in law_Parties)
                    {
                        l.Associatedobjecttype = "task_survey";
                        l.AssociationobjectID = taskSurvey.ID;
                        _Lawpartys.Create(l);
                    }
                }
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw new Exception();
            }
            QueryDb.CompleteTransaction();
            return true;

        }


        public object CloseTask(string taskid)
        {
            if (string.IsNullOrEmpty(taskid)) return false;
            try
            {
                QueryDb.BeginTransaction();
                //TODO关闭任务
                var taskInfo = QueryDb.FirstOrDefault<work_task>(" where id=@0", taskid);
                if (taskInfo == null) return false;
                //修改任务状态-已关闭
                taskInfo.TaskStatus = (int)WorkTaskStatus.Close;
                taskInfo.CompleteTime = DateTime.Now;
                QueryDb.Update(taskInfo);
            }
            catch (Exception ex)
            {
                QueryDb.AbortTransaction();
                throw new Exception();
            }
            QueryDb.CompleteTransaction();
            return true;
        }

        /// <summary>
        /// 勘察完结
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <returns></returns>
        public object Finish(task_survey TaskSurvey, List<law_party> law_Parties)
        {
            try {
                CreateInfo(TaskSurvey, law_Parties).ToString();
                if (!string.IsNullOrEmpty(TaskSurvey.TaskId))//关闭任务
                {

                }
                return true;
                //TODO 关闭事件
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// 转交其他部门
        /// </summary>
        /// <param name="task_Survey"></param>
        /// <returns></returns>
        public object ToEpart(task_survey task_Survey)
        {
            //TODO 事件转交
            //TODO 写待办
            return null;
        }

        /// <summary>
        /// 创建案件
        /// </summary>
        /// <returns></returns>
        public object CreateCase(task_survey TaskSurvey, List<law_party> law_Parties,string url)
        {
            try
            {
                CloseTask(TaskSurvey.TaskId);//关闭目前业务
                //创建案件任务
                var _worktask = ServiceHelper.GetService("work_taskService");
                work_task workTask = new work_task();
                //TODO分配工作人员
                workTask.AssignUsersID = "0";
                workTask.EventInfoId = TaskSurvey.EventInfoId;
                _worktask.Create(workTask);
            }
            catch (Exception ex)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            QueryDb.CompleteTransaction();
            return true;
        }


    }


}
