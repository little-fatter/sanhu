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
    class case_InfoService : ServiceBase, IService
    {
        public case_InfoService()
        {
            OnGetAPIHandler += case_InfoService_OnGetAPIHandler;
        }

        private SHBaseService _sHBaseService;
        private Func<APIContext, object> case_InfoService_OnGetAPIHandler(string id)
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
            var data = JsonHelper.DeserializeJsonToObject<case_InfoFinishReq>(context.Data);    
            if (data.CaseInfo == null) return false;
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(data.CaseInfo, data.LawParties);
                _sHBaseService.CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);
                _sHBaseService.UpdateWorkTaskState(data.SourceTaskId, WorkTaskStatus.Close);//关闭任务
            }
            catch (Exception)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            QueryDb.CompleteTransaction();
            return true;
        }

/*

        /// <summary>
        /// 简易流程
        /// </summary>
        /// <returns></returns>
        private object EasyProcess(case_Info caseInfo,List<law_party> law_Parties)
        {
            QueryDb.BeginTransaction();
            try
            {
                CreateInfo(caseInfo, law_Parties);
                //结束当前任务
                _sHBaseService.UpdateWorkTaskState(caseInfo.TaskId,WorkTaskStatus.Close);
                //TODO 创建简易流程任务处罚决定书
                _sHBaseService.CreateSaveWorkTask(caseInfo.TaskId, TaskType.law_punishmentInfo);
                ////修改事件状态
                //if(!string.IsNullOrEmpty(caseInfo.EventInfoId))
                //_sHBaseService.UpdateEventState(caseInfo.EventInfoId,EventStatus.);            
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
        private object NormalProcess(case_Info caseInfo)
        {
            return null;
        }

    */


        /// <summary>
        /// 创建表单和当事人
        /// </summary>
        /// <param name="TaskSurvey"></param>
        /// <param name="law_Parties"></param>
        /// <returns></returns>
        private void CreateInfo(case_Info caseInfo, List<law_party> law_Parties)
        {
            var CaseInfoSource = base.Create(caseInfo) as string;//保存原始信息
            var CaseInfoTemp = caseInfo;
            CaseInfoTemp.ID = CaseInfoSource;
            CaseInfoTemp.PreviousformID = CaseInfoSource;                                    
            var CaseInfoNew = base.Create(CaseInfoTemp) as string;//可变更的信息
            var _Lawpartys = ServiceHelper.GetService("law_partyService");
            if (law_Parties != null && law_Parties.Count > 0)//创建当事人
            {
                foreach (var l in law_Parties)//原始的当事人
                {
                    l.Associatedobjecttype = "case_Info";
                    l.AssociationobjectID = CaseInfoSource;
                    //_Lawpartys.Create(l);
                    l.ID = Guid.NewGuid().ToString();
                    QueryDb.Insert(l);
                }
                foreach (var l in law_Parties)//创建新建的
                {
                    l.Associatedobjecttype = "case_Info";
                    l.AssociationobjectID = CaseInfoNew;
                    // _Lawpartys.Create(l);
                    l.ID = Guid.NewGuid().ToString();
                    QueryDb.Insert(l);
                }

            }
        }

    }
}
