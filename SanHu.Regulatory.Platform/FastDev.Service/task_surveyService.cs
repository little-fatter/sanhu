using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
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
                    return Handle;

            }
            //return Handle;
            return null;
        }

        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<task_surveyFinishReq>(context.Data);
            task_survey taskSurvey = new task_survey();
            taskSurvey = data.TaskSurvey;
            //0:不予处罚
            //1:移交其它部门
            //2:处罚程序
            switch (data.TaskSurvey.ProcessingDecisions)
            {
                case 0:
                    Finish(taskSurvey);
                    break;
                case 1:
                    ToEpart(taskSurvey);
                    break;
                case 2:
                    Finish(taskSurvey);
                    break;
            }         
            return null;


        }

        /// <summary>
        /// 勘察完结
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <returns></returns>
        public object Finish(task_survey TaskSurvey) {

            base.Create(TaskSurvey);
            //TODO 关闭事件
            //TODO 写待办
            return null;
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
        public object CreateCase()
        {
            //TODO
            //
            return null;
        }


    }


}
