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
            if (data.LawPunishmentInfo == null) throw new Exception();
            QueryDb.BeginTransaction();
            data.LawPunishmentInfo.EventInfoId = data.EventInfoId;
            data.LawPunishmentInfo.TaskId = data.SourceTaskId;
            try
            {
                CreateInfo(data.LawPunishmentInfo, data.LawParties,data.Attachments);
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
        /// 创建表单和当事人
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(law_punishmentInfo lawpunishmentInfo, List<law_party> law_Parties,List<attachment> attachments)
        {
            var lawpunishment_Info = base.Create(lawpunishmentInfo) as string;//保存原始信息
            var _Lawpartys = ServiceHelper.GetService("law_partyService");
            var _attachment= ServiceHelper.GetService("attachmentService");

            if (law_Parties != null && law_Parties.Count > 0)//创建当事人
            {
                foreach (var l in law_Parties)
                {
                    l.Associatedobjecttype = "law_punishmentInfo";
                    l.AssociationobjectID = lawpunishment_Info;
                    l.ID = Guid.NewGuid().ToString();
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
                    QueryDb.Insert(a);
                   // _attachment.Create(a);           
                }
            }
        }
    }
}
