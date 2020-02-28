﻿using FastDev.Common;
using FastDev.DevDB;
using FastDev.IServices;
using FastDev.Model.Entity;
using FD.Common;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    /// <summary>
    /// 三湖业务基础server
    /// </summary>
    public class SHBaseService: ServiceBase
    {
        /// <summary>
        /// 发送待办
        /// </summary>
        /// <param name="userId">钉钉用户id</param>
        /// <param name="title">待办标题</param>
        /// <param name="url">跳转地址</param>
        /// <param name="formTitle">待办表单标题</param>
        /// <param name="fromContent">待办表单内容</param>
        public void CreateWorkrecor(long userId, string title, string url, string formTitle, string fromContent)
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
           return  base.QueryDb.Execute("update event_info set evtState = @0 where objid=@1", (int)eventStatus, eventId)>0;
        }

        /// <summary>
        /// 创建任务
        /// </summary>
        /// <param name="eventId">事件id</param>
        /// <param name="caseId">案件id</param>
        /// <param name="type">任务类型</param>
        /// <param name="AssignUsersID">处理人</param>
        /// <param name="MainHandler">主办人</param>
        /// <returns></returns>
        public void CreateWorkTask(string taskid, TaskType type, string AssignUsersID, string MainHandler)
        {
            var lastTask = GetWorkTask(taskid);
            work_task workTask = new work_task();
            workTask.EventInfoId = lastTask.EventInfoId;
            workTask.CaseID = lastTask.CaseID;
            workTask.Tasktype = TaskType.Survey;
            workTask.TaskStatus = (int)WorkTaskStatus.Normal;
            workTask.TaskContent = type.GetDisplayName();
            workTask.AssignUsersID = AssignUsersID;
            workTask.MainHandler = MainHandler;
            ServiceHelper.GetService("work_task").Create(workTask);
        }

    /// <summary>
    /// 任务状态更新
    /// </summary>
    /// <param name="taskid"></param>
    /// <param name="workTaskStatus"></param>
        public void UpdateWorkTaskState(string taskid,WorkTaskStatus workTaskStatus)
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


    }
}
