using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.DevDB.Workflow;
using FastDev.Model.Entity;
using FD.Common;
using FD.Model.Dto;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    class form_confiscated_itemService : ServiceBase, IService
    {

        public form_confiscated_itemService()
        {
            OnGetAPIHandler += form_confiscated_itemService_OnGetAPIHandler;
        }
        private Func<APIContext, object> form_confiscated_itemService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            return Handle;
        }


        private SHBaseService _sHBaseService;

        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<form_confiscated_itemFinishReq>(context.Data);
            if (data.formConfiscatedItems == null) return null;
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(data.formConfiscatedItems, data.SourceTaskId, data.EventInfoId);
               
                        EndEvent(data.SourceTaskId, data.EventInfoId);
                    
                        _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
         
            }
            catch (Exception)
            {
                QueryDb.AbortTransaction();
                throw new Exception();
            }
            QueryDb.CompleteTransaction();
            return true;
        }

        /// <summary>
        /// 结束事件和任务
        /// </summary>
        /// <param name="TaskId"></param>
        /// <param name="EventId"></param>
        /// <returns></returns>
        public object EndEvent(string TaskId, string EventId)
        {
            try
            {
                QueryDb.BeginTransaction();
                _sHBaseService.UpdateWorkTaskState(TaskId, WorkTaskStatus.Close);//关闭任务
                _sHBaseService.UpdateEventState(EventId, EventStatus.finish);//事件改为完成                         
            }
            catch (Exception)
            {
                QueryDb.AbortTransaction();
                throw new Exception();
            }
            QueryDb.CompleteTransaction();
            return true;
        }


        /// <summary>
        /// 创建表单
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(List<form_confiscated_item> lists,string taskid,string eventid)
        {
            if (lists.Count < 1) return;

            foreach (var l in lists)
            {
                form_confiscated_item item = new form_confiscated_item();
                item = l;
                item.EventInfoId = eventid;
                item.TaskId = taskid;
                base.Create(item);
            }
            return;
        }
    }
}
