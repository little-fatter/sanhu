using FastDev.Common;
using FastDev.DevDB;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Common;
using FD.Model.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using WanJiang.Framework.Infrastructure.Logging;

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
        public string CreateWorkrecor(string userId, string title, string url, Dictionary<string, string> formInfo)
        {
            var ddService = SysContext.GetService<IDingDingServices>();
            return ddService.CreateWorkrecor(userId, title, url, formInfo);
        }

        /// <summary>
        /// 撤回待办
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="recordId"></param>
        public void WorkrecordUpdate(string userId, string recordId)
        {
            var ddService = SysContext.GetService<IDingDingServices>();
            ddService.WorkrecordUpdate(userId, recordId);
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
        /// 保存任务
        /// </summary>
        /// <param name="workTask"></param>
        public string SaveWorkTask(work_task workTask)
        {
            return ServiceHelper.GetService("work_task").Create(workTask).ToString();
        }

        /// <summary>
        /// 任务状态更新
        /// </summary>
        /// <param name="taskid"></param>
        /// <param name="workTaskStatus"></param>
        public void UpdateWorkTaskState(string taskid, WorkTaskStatus workTaskStatus)
        {
            var taskInfo = GetWorkTask(taskid);
            if (taskInfo == null) return;
            taskInfo.TaskStatus = (int)workTaskStatus;
            taskInfo.CompleteTime = DateTime.Now;

            if (workTaskStatus == WorkTaskStatus.Normal)
            {
                WorkrecordUpdate(taskInfo.AssignUsers, taskInfo.TodotaskID);
            }

            QueryDb.Update(taskInfo);
        }

        protected work_task GetWorkTask(string taskid)
        {
            return QueryDb.FirstOrDefault<work_task>(" where id=@0", taskid);
        }

        public object FormData(string Taskid)
        {
            if (string.IsNullOrEmpty(Taskid)) return null;
            var task = GetWorkTask(Taskid);
            IService service = null;
            var type = (TaskType)Enum.Parse(typeof(TaskType), task.TaskType);
            switch (type)
            {
                case TaskType.EventCheck:
                    service = ServiceHelper.GetService("task_patrol");
                    break;
                case TaskType.OnSpot:
                    service = ServiceHelper.GetService("task_survey");
                    break;
                case TaskType.CaseInfo:
                    service = ServiceHelper.GetService("case_info");
                    break;
                case TaskType.Punishment:  //处罚决定书
                    service = ServiceHelper.GetService("law_punishmentInfo");
                    break;
                    //case TaskType.questionRecord:  //询问笔录
                    //    service = ServiceHelper.GetService("form_inquiryrecord");
                    //    break;
                    //case TaskType.inquestRecord:  //勘验笔录
                    //    service = ServiceHelper.GetService("form_inquestrecord");
                    //    break;
            }
            var filter = new FilterGroup();
            filter.rules.Add(new FilterRule("TaskId", Taskid, "equal"));
            if (type == TaskType.CaseInfo)
            {
                filter.rules.Add(new FilterRule("PreviousformID", "", "notequal"));
            }
            var obj = service.GetListData(filter).FirstOrDefault();  //查询主表单
            if (obj == null) throw new Exception("未取得关联数据");
            string formId = obj["ID"].ToString();  //得到id
            return new
            {
                MainForm = obj,
                Party = Getlaw_partyByFormId(formId),  //当事人
                LawStaff = Getlaw_staffByFormId(formId),  //执法人员
                Attachment = GetattachmentByFormId(formId),  //附件
            };
        }
        ///
        private object Getlaw_partyByFormId(string formId)
        {
            var filter = new FilterGroup();
            filter.rules.Add(new FilterRule("AssociationobjectID", formId, "equal"));
            return ServiceHelper.GetService("law_party").GetListData(filter);
        }
        private object Getlaw_staffByFormId(string formId)
        {
            var filter = new FilterGroup();
            filter.rules.Add(new FilterRule("AssociatedobjectID", formId, "equal"));
            return ServiceHelper.GetService("law_staff").GetListData(filter);
        }
        private object GetattachmentByFormId(string formId)
        {
            var filter = new FilterGroup();
            filter.rules.Add(new FilterRule("AssociationobjectID", formId, "equal"));
            return ServiceHelper.GetService("attachment").GetListData(new FilterGroup());
        }

        private object GetParties(string formid, string formType)
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
                    lawParty.Typesofparties = (string)dr["TypesofpartiesID"];
                    lawParty.Gender = (string)dr["Gender"];
                    lawParties.Add(lawParty);
                }
                return lawParties;
            }
            return null;
        }


        private object GetSurvey(string taskid)
        {
            var form = QueryDb.FirstOrDefault<task_survey>(" where TaskId=@0 order PreviousformID!=null by CreateDate desc", taskid);
            return form;
        }

        private object GetPatrol(string taskid)
        {
            var form = QueryDb.FirstOrDefault<task_patrol>(" where TaskId=@0 and  order by CreateDate desc", taskid);
            return form;
        }

        /// <summary>
        /// 创建后续任务
        /// </summary>
        /// <param name="NextTasks"></param>
        /// <param name="sourcetaskid"></param>
        public object CreatTasksAndCreatWorkrecor(work_task[] NextTasks, string sourcetaskid)
        {
            if (NextTasks == null) return null;
            if (NextTasks.Length < 1) return null;
            foreach (var Task in NextTasks)
            {
                Task.LaskTaskId = sourcetaskid;  //上一个任务id
                Task.InitiationTime = DateTime.Now;  //状态
                Task.TaskStatus = (int)WorkTaskStatus.Normal;  //状态
                Task.ExpectedCompletionTime = DateTime.Now.AddDays(1);  //期望完成时间
                var loginClientInfo = SysContext.GetService<ClientInfo>();
                if (loginClientInfo != null)
                {
                    Task.CreateUserID = loginClientInfo.UserId ?? null;  //任务创建人
                }
                string id = SaveWorkTask(Task);
                Task.ID = id;

                Task.LocalLinks = Task.RemoteLinks;
                Task.RemoteLinks = Task.RemoteLinks + (Task.RemoteLinks.Contains("?") ? "&" : "?") + "taskid=" + Task.ID;
                string taskTypeStr = QueryDb.ExecuteScalar<string>("select title from res_dictionaryitems where itemcode=@0", Task.TaskType);  //获取任务类型中文描述
                var dic = new Dictionary<string, string>();
                dic.Add("事件类型", taskTypeStr);
                dic.Add("上报时间", Task.InitiationTime.Value.ToString("yyyy-MM-dd HH:mm:ss"));
                dic.Add("期望完成时间", Task.ExpectedCompletionTime.Value.ToString("yyyy-MM-dd HH:mm:ss"));
                Task.TodotaskID = CreateWorkrecor(Task.AssignUsers, taskTypeStr, Task.RemoteLinks, dic);   //待办id

                ServiceHelper.GetService("work_task").Update(Task);
            }
            return true;
        }



    }
}
