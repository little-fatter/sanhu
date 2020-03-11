using FastDev.Common;
using FastDev.DevDB;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Common;
using FD.Model.Dto;
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


        public object FormData(FormDataReq data)
        {
            IService service = ServiceHelper.GetService(data.Model);

            //根据事件id或者id查询数据
            var filter = new FilterGroup();
            if (!string.IsNullOrEmpty(data.FormId))
            {
                filter.rules.Add(new FilterRule("ID", data.FormId, "equal"));
            }
            if (!string.IsNullOrEmpty(data.EventInfoId))
            {
                filter.rules.Add(new FilterRule("EventInfoId", data.EventInfoId, "equal"));
            }

            //案件特殊判断
            if (data.Model == "case_info")
            {
                filter.rules.Add(new FilterRule("PreviousformID", "", "notequal"));
            }
            //查询主表数据
            var obj = service.GetListData(filter).OrderByDescending(s => s.Keys.Contains("createTime") ? s["createTime"] : s["CreateDate"]).FirstOrDefault();  //查询主表单
            if (obj == null) return null;//throw new Exception("未取得关联数据");
            string formId = obj["ID"].ToString();  //得到id

            //构建其他需要查询的数据
            var dicData = BuildData(data, formId);
            dicData.Add("MainForm", obj);

            return dicData;
        }
        private Dictionary<string, object> BuildData(FormDataReq data, string formId)
        {
            var dic = new Dictionary<string, object>();
            if (data.FilterModels == null || data.FilterModels.Count() < 1)
            {
                dic.Add("law_party", Getlaw_partyByFormId(formId));
                dic.Add("law_staff", Getlaw_staffByFormId(formId));
                dic.Add("attachment", GetattachmentByFormId(formId));
                return dic;
            }

            if (data.FilterModels.Contains("law_party"))
            {
                dic.Add("law_party", Getlaw_partyByFormId(formId));
            }
            if (data.FilterModels.Contains("law_staff"))
            {
                dic.Add("law_staff", Getlaw_staffByFormId(formId));
            }
            if (data.FilterModels.Contains("attachment"))
            {
                dic.Add("attachment", GetattachmentByFormId(formId));
            }
            return dic;
        }
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
            return ServiceHelper.GetService("attachment").GetListData(filter);
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
                //保存任务
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

                //发送待办
                if (!string.IsNullOrEmpty(Task.AppLinks))
                    Task.AppLinks += (Task.AppLinks.Contains("?") ? "&" : "?") + "taskid=" + Task.ID;
                if (!string.IsNullOrEmpty(Task.PCLinks))
                    Task.PCLinks += (Task.PCLinks.Contains("?") ? "&" : "?") + "taskid=" + Task.ID;
                var dic = new Dictionary<string, string>();
                dic.Add("任务说明", Task.TaskContent);
                dic.Add("任务发起时间", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
                dic.Add("期望完成时间", Task.ExpectedCompletionTime.Value.ToString("yyyy-MM-dd HH:mm:ss"));

                if (Task.TaskType.ToUpper() == TaskType.Punishment.ToString().ToUpper()) {
                    string taskTypeStr = QueryDb.ExecuteScalar<string>("select title from res_dictionaryitems where itemcode=@0", Task.TaskType);  //获取任务类型中文描述
                    string caseNumber = QueryDb.ExecuteScalar<string>("select caseNumber from case_info where id=@0", Task.CaseID);
                    Task.TaskTitle = caseNumber + "-" + taskTypeStr;
                }

                Task.TodotaskID = CreateWorkrecor(Task.AssignUsers, Task.TaskTitle, Task.AppLinks, dic);   //待办id

                //记录待办id
                ServiceHelper.GetService("work_task").Update(Task);  //修改关联的

                //修改关联事件状态已分配任务
                UpdateEventState(Task.EventInfoId, EventStatus.dispose);
            }
            return true;
        }



    }
}
