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
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Handle;
            }
            return null;
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<law_punishmentInfoFinishReq>(context.Data);
            law_punishmentInfo lawpunishmentInfo = new law_punishmentInfo();
            List<law_party> lawParties = new List<law_party>();
            if (!string.IsNullOrEmpty(data.LawPunishmentInfo.TaskId)) return false;
            string url = data.Url;
            lawpunishmentInfo = data.LawPunishmentInfo;
            lawParties = data.LawParties;
            return false;
        }
        /// <summary>
        /// 简易流程
        /// </summary>
        /// <returns></returns>
        private object EasyProcess(law_punishmentInfo lawpunishmentInfo, List<law_party> law_Parties)
        {
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(lawpunishmentInfo, law_Parties);
                //结束当前任务
                _sHBaseService.UpdateWorkTaskState(lawpunishmentInfo.TaskId,WorkTaskStatus.Close);
                //TODO 创建简易流程任务处罚决定书
                _sHBaseService.CreateSaveWorkTask(lawpunishmentInfo.TaskId, TaskType.law_punishmentInfo);
                ////修改事件状态
                //if(!string.IsNullOrEmpty(lawpunishmentInfo.EventInfoId))
                //_sHBaseService.UpdateEventState(lawpunishmentInfo.EventInfoId,EventStatus.);            
            }
            catch (Exception)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            QueryDb.CompleteTransaction();
            return true;
        }

        //一般程序
        private object NormalProcess(law_punishmentInfo lawpunishmentInfo)
        {
            return null;
        }

        /// <summary>
        /// 创建表单和当事人
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(law_punishmentInfo lawpunishmentInfo, List<law_party> law_Parties)
        {
            var lawpunishmentInfoSource = base.Create(lawpunishmentInfo) as law_punishmentInfo;//保存原始信息
            var lawpunishmentInfoTemp = lawpunishmentInfoSource;
            lawpunishmentInfoTemp.PreviousformID = lawpunishmentInfoSource.ID;
            var lawpunishmentInfoNew = base.Create(lawpunishmentInfoTemp) as law_punishmentInfo;//可变更的信息
            var _Lawpartys = ServiceHelper.GetService("law_partyService");
            if (law_Parties != null && law_Parties.Count > 0)//创建当事人
            {
                foreach (var l in law_Parties)//原始的当事人
                {
                    l.Associatedobjecttype = "law_punishmentInfo";
                    l.AssociationobjectID = lawpunishmentInfo.ID;
                    _Lawpartys.Create(l);
                }
                foreach (var l in law_Parties)//创建新建的
                {
                    l.Associatedobjecttype = "law_punishmentInfo";
                    l.AssociationobjectID = lawpunishmentInfoNew.ID;
                    _Lawpartys.Create(l);
                }

            }
        }
    }
}
