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
                #region 发起钉钉的审批 并将其返回的ID写入Task内

                var loginClientInfo = SysContext.GetService<WanJiang.Framework.Infrastructure.Logging.ClientInfo>();

                #endregion
                CreateInfo(data.CaseReport);
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务

                //打印预生成
                var PDFSerivce = ServiceHelper.GetService("form_printPDFService") as form_printPDFService;
                PDFSerivce.AsposeToPdf(new APIContext() { Data = @"{""formId"":""" + data.CaseReport.ID + @""",""formName"":""case_report""}" });
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
                    var caseinfo = QueryDb.FirstOrDefault<case_Info>("where CaseId=@0", caseid);
                    if (caseinfo != null)
                    {
                        caseinfo.CaseStatus = "已结案";
                        QueryDb.Update(caseinfo);
                    }
                }
            }

        }

    }
}
