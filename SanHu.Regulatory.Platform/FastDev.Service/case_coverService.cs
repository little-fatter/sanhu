using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using FD.Model.Dto;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    class case_coverService : ServiceBase, IService
    {
        public case_coverService()
        {
            OnGetAPIHandler += case_coverService_OnGetAPIHandler;
        }

        private SHBaseService _sHBaseService;
        private Func<APIContext, object> case_coverService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
                    return Handle;
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<case_coverFinishReq>(context.Data);    
            if (data.CaseCover == null) throw new Exception();
            data.CaseCover.TaskId = data.SourceTaskId;
            data.CaseCover.EventInfoId = data.EventInfoId;
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(data.CaseCover);
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
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
        /// 创建表单
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(case_cover caserport)
        {
            var CaseInfoSource = base.Create(caserport) as string;
        }

    }
}
