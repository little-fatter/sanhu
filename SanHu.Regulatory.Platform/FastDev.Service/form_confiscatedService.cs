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
    class form_confiscatedService : ServiceBase, IService
    {

        public form_confiscatedService()
        {
            OnGetAPIHandler += form_confiscatedService_OnGetAPIHandler;
        }
        private Func<APIContext, object> form_confiscatedService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            return Handle;
        }


        private SHBaseService _sHBaseService;

        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<form_confiscatedFinishReq>(context.Data);
            if (data.formConfiscated == null) return null;
            if(!string.IsNullOrEmpty(data.EventInfoId))  data.formConfiscated.EventInfoId = data.EventInfoId;
            if(!string.IsNullOrEmpty(data.SourceTaskId))  data.formConfiscated.TaskId = data.SourceTaskId;
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(data.formConfiscated,data.formConfiscatedItems);                                  
               _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);//创建下一步任务
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务
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
               // _sHBaseService.UpdateEventState(EventId, EventStatus.finish);//事件改为完成                         
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
        private void CreateInfo(form_confiscated formConfiscated,List<form_confiscated_item> formConfiscatedItems)
        {
            var formConfiscated_Info = base.Create(formConfiscated) as string;//保存原始信息
            formConfiscated.ID = formConfiscated_Info;
            if (formConfiscatedItems != null && formConfiscatedItems.Count > 0)//创建物品清单
            {
                foreach (var l in formConfiscatedItems)
                {
                    l.Associatedobjecttype = "form_confiscated";
                    l.AssociationobjectID = formConfiscated_Info;
                    l.ID = Guid.NewGuid().ToString();
                    l.CreateDate = DateTime.Now;
                    QueryDb.Insert(l);
                }
            }
        }
    }
}
