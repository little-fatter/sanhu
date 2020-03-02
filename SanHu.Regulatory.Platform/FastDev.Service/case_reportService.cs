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
    class case_reportService : ServiceBase, IService
    {
        public case_reportService()
        {
            OnGetAPIHandler += case_reportService_OnGetAPIHandler;
        }

        private SHBaseService _sHBaseService;
        private Func<APIContext, object> case_reportService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
                    return Handle;
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<case_reportFinishReq>(context.Data);    
            if (data.CaseReport == null) throw new Exception("没有主体数据");
            data.CaseReport.TaskId = data.SourceTaskId;
            data.CaseReport.EventInfoId = data.EventInfoId;
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(data.CaseReport);
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
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
        private void CreateInfo(case_report caserport)
        {
            var CaseInfoSource = base.Create(caserport) as string;
            ///更新案件信息

            var tasknow = ServiceHelper.GetService("work_task").GetDetailData(caserport.TaskId, null);
            if (tasknow != null)
            {
                var caseid = (string)tasknow["CaseID"];
                if (string.IsNullOrEmpty(caseid))
                {
                    var caseinfo = ServiceHelper.GetService("case_Info").GetDetailData(caseid, null);
                    caseinfo["CaseStatus"] = "已结案";
                    ServiceHelper.GetService("case_Info").Update(caseinfo);
                }
            }

        }

    }
}
