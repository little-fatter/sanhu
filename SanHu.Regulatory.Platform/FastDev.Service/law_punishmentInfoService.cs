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
    class law_punishmentInfoService : ServiceBase, IService
    {
        public law_punishmentInfoService()
        {
            OnGetAPIHandler += law_punishmentInfoService_OnGetAPIHandler;
        }

 


        private SHBaseService _sHBaseService;
        private Func<APIContext, object> law_punishmentInfoService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            //switch (id.ToUpper())
            //{
            //    case "FINISH":
                    return Handle;
            //}
            //return null;
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<law_punishmentInfoFinishReq>(context.Data);
            if (data.LawPunishmentInfo == null) throw new Exception("没有主体数据");
            QueryDb.BeginTransaction();
            data.LawPunishmentInfo.EventInfoId = data.EventInfoId;
            data.LawPunishmentInfo.TaskId = data.SourceTaskId;
            try
            {
                 CreateInfo(data.LawPunishmentInfo, data.LawParties,data.Attachments);
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务

                //打印预生成
                var PDFSerivce = ServiceHelper.GetService("form_printPDFService") as form_printPDFService;
                PDFSerivce.AsposeToPdf(new APIContext() { Data = @"{""formId"":""" + data.LawPunishmentInfo.ID + @""",""formName"":""law_punishmentInfo""}" });
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw new Exception(e.Message);
            }
            QueryDb.CompleteTransaction();
            return true;
        }

        /// <summary>
        /// 创建表单和当事人
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void  CreateInfo(law_punishmentInfo lawpunishmentInfo, List<law_party> law_Parties,List<attachment> attachments)
        {
            var lawpunishment_Info = base.Create(lawpunishmentInfo) as string;//保存原始信息
            lawpunishmentInfo.ID = lawpunishment_Info;
            var _Lawpartys = ServiceHelper.GetService("law_partyService");
            var _attachment= ServiceHelper.GetService("attachmentService");

            if (law_Parties != null && law_Parties.Count > 0)//创建当事人
            {
                foreach (var l in law_Parties)
                {
                    l.Associatedobjecttype = "law_punishmentInfo";
                    l.AssociationobjectID = lawpunishment_Info;
                    l.ID = Guid.NewGuid().ToString();
                    l.CreateDate = DateTime.Now;
                    QueryDb.Insert(l);
                    //_Lawpartys.Create(l);
                }
            }
            if (attachments != null && attachments.Count > 0)
            {
                foreach (var a in attachments)
                {
                    a.Associatedobjecttype = "law_punishmentInfo";
                    a.AssociationobjectID = lawpunishment_Info;
                    a.ID = Guid.NewGuid().ToString();
                   a.CreateDate = DateTime.Now;
                    QueryDb.Insert(a);
                   // _attachment.Create(a);           
                }
            }
            ///更新案件信息
            if (string.IsNullOrEmpty(lawpunishmentInfo.TaskId))
            {
                if (!string.IsNullOrEmpty(lawpunishmentInfo.CaseId))
                {
                    var caseinfo = QueryDb.FirstOrDefault<case_Info>("where Id=@0", lawpunishmentInfo.CaseId);
                    if (caseinfo != null)
                    {
                        caseinfo.CaseStatus = "已做出处罚决定";
                        QueryDb.Update(caseinfo);
                    }
                }
            }
            else
            {
                var tasknow = ServiceHelper.GetService("work_task").GetDetailData(lawpunishmentInfo.TaskId, null);
                if (tasknow != null)
                {
                    var caseid = (string)tasknow["CaseID"];
                    if (!string.IsNullOrEmpty(caseid))
                    {
                        var caseinfo = QueryDb.FirstOrDefault<case_Info>("where Id=@0", caseid);
                        if (caseinfo != null)
                        {
                            caseinfo.CaseStatus = "已做出处罚决定";
                            QueryDb.Update(caseinfo);
                        }
                    }
                }
            }

          //  return lawpunishment_Info;
        }
    }
}
