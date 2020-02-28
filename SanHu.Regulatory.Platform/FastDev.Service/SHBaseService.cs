using FastDev.Common;
using FastDev.DevDB;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Common;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace FastDev.Service
{

    /// <summary>
    /// 三湖业务基础server
    /// </summary>
    public class SHBaseService : ServiceBase
    {
        protected const string AccountId = "165906044420484870";
        protected const string AccountName = "余盛全";

        /// <summary>
        /// 发送待办
        /// </summary>
        /// <param name="userId">钉钉用户id</param>
        /// <param name="title">待办标题</param>
        /// <param name="url">跳转地址</param>
        /// <param name="formTitle">待办表单标题</param>
        /// <param name="fromContent">待办表单内容</param>
        public void CreateWorkrecor(string userId, string title, string url, string formTitle, string fromContent)
        {
            var ddService = HttpContext.ServiceProvider.GetService(typeof(IDingDingServices)) as IDingDingServices;
            ddService.CreateWorkrecor(userId, title, url, formTitle, fromContent);
        }

        /// <summary>
        /// 修改事件状态
        /// </summary>
        /// <param name="eventId"></param>
        /// <param name="eventStatus"></param>
        /// <returns></returns>
        public bool UpdateEventState(string eventId, EventStatus eventStatus)
        {
            return base.QueryDb.Execute("update event_info set evtState = @0 where objid=@1", (int)eventStatus, eventId) > 0;
        }

        /// <summary>
        /// 创建任务
        /// </summary>
        /// <param name="taskid">源任务id</param>
        /// <param name="type">任务类型</param>
        /// <param name="AssignUsersID">处理人</param>
        /// <param name="MainHandler">主办人</param>
        /// <returns></returns>
        public work_task CreateWorkTask(string taskid, TaskType type, string AssignUsersID = AccountId, string MainHandler = AccountName)
        {
            var lastTask = GetWorkTask(taskid);
            work_task workTask = new work_task();
            workTask.EventInfoId = lastTask.EventInfoId;
            workTask.CaseID = lastTask.CaseID;
            workTask.TaskType = TaskType.Survey.ToString();
            workTask.TaskStatus = (int)WorkTaskStatus.Normal;
            workTask.TaskContent = type.GetDisplayName();
            workTask.AssignUsersID = AssignUsersID;
            workTask.MainHandler = MainHandler;
            return workTask;
        }

        /// <summary>
        /// 创建并保存任务
        /// </summary>
        /// <param name="taskid">源任务id</param>
        /// <param name="type">任务类型</param>
        /// <param name="AssignUsersID">处理人</param>
        /// <param name="MainHandler">主办人</param>
        /// <returns></returns>
        public void CreateSaveWorkTask(string taskid, TaskType type, string AssignUsersID = AccountId, string MainHandler = AccountName)
        {
            ServiceHelper.GetService("work_task").Create(CreateWorkTask(taskid, type, AssignUsersID, MainHandler));
        }

        /// <summary>
        /// 任务状态更新
        /// </summary>
        /// <param name="taskid"></param>
        /// <param name="workTaskStatus"></param>
        public void UpdateWorkTaskState(string taskid, WorkTaskStatus workTaskStatus)
        {
            var taskInfo = GetWorkTask(taskid);
            taskInfo.TaskStatus = (int)workTaskStatus;
            taskInfo.CompleteTime = DateTime.Now;
            QueryDb.Update(taskInfo);
        }


        private work_task GetWorkTask(string taskid)
        {
            return QueryDb.FirstOrDefault<work_task>(" where id=@0", taskid);
        }



        public List<object> GetLastInfo(string EventInfoid,string type)
        {
            List<object> objs = new List<object>();
            string formid = null;
            string formtype = null;
            switch (type)
            {
                case "case_Info":
                    objs.Add(GetSurvey(EventInfoid, "task_survey"));
                    var b = objs[0] as task_survey;
                    if (b == null) break;
                    formid = b.ID;
                    formtype = "task_survey";
                    break;
                case "task_survey":
                    objs.Add(GetSurvey(EventInfoid, "task_patrol"));
                    var p = objs[0] as task_patrol;
                    if (p == null) break;
                    formid = p.ID;
                    formtype = "task_patrol";
                    break;
            }
            objs.Add(GetParties(formid, formtype));
            return objs;
        }

        private object GetParties(string formid,string formType)
        {
            List<law_party> lawParties = new List<law_party>();
            DataTable dt = new DataTable();
            QueryDb.Fill(dt, "where Associatedobjecttype=@0 and AssociationobjectID=@1", formType, formid);
            if (dt.Rows.Count > 0)
            {
                foreach (var d in dt.Rows)
                {
                    var dr = d as DataRow;
                    law_party lawParty = new law_party();
                    lawParty.address = (string)dr["address"];
                    lawParty.Contactnumber = (string)dr["Contactnumber"];
                    lawParty.IDcard = (string)dr["IDcard"];
                    lawParty.Name = (string)dr["Name"];
                    lawParty.Nameoflegalperson = (string)dr["Nameoflegalperson"];
                    lawParty.Nationality = (string)dr["Nationality"];
                    lawParty.Occupation = (string)dr["Occupation"];
                    lawParty.TypesofpartiesID = (string)dr["TypesofpartiesID"];
                    lawParty.Gender = (string)dr["Gender"];
                    lawParties.Add(lawParty);
                }
                return lawParties;
            }
            return null;   
        }


        private object GetSurvey(string EventInfoid,string type)
        {
            var task = QueryDb.FirstOrDefault<work_task>("where EventInfoId=@0 and Tasktype=@1",EventInfoid,type);
            var form = QueryDb.FirstOrDefault<task_survey>(" where TaskId=@0 order by CreateDate desc",task.ID);
            return form;
        }

        private object GetPatrol(string EventInfoid, string type)
        {
            var task = QueryDb.FirstOrDefault<work_task>("where EventInfoId=@0 and Tasktype=@1", EventInfoid, type);
            var form = QueryDb.FirstOrDefault<task_patrol>(" where TaskId=@0 order by CreateDate desc", task.ID);
            return form;
        }


    }
}
