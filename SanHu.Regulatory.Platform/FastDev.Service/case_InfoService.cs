using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.Model.Entity;
using FD.Model.Dto;
using FD.Model.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    class case_InfoService : ServiceBase, IService
    {
        public case_InfoService()
        {
            OnGetAPIHandler += case_InfoService_OnGetAPIHandler;
            OnAfterGetPagedData += Case_InfoService_OnAfterGetPagedData;
            OnAfterGetDetailData += Case_InfoService_GetDetail;
            OnAfterGetListData += Case_InfoService_OnAfterListData;
        }

        public override object GetPageData(QueryDescriptor descriptor)
        {
            //处理查询条件,排序 
            FilterTranslator filterTranslator = new FilterTranslator();
            if (descriptor.Condition != null)
            {
                filterTranslator.Group = descriptor.Condition;
            }
            filterTranslator.Translate();
            string whereTxt = filterTranslator.CommandText;

            //处理 新增定义当事人名称(party),当事人号码(partyPhone)


            string text = "";
            string text2 = "";
            if (descriptor.OrderBy != null && descriptor.OrderBy.Any())
            {
                text = descriptor.OrderBy[0].Key;
                if (string.IsNullOrEmpty(text))
                    text = "CreateDate";
                text2 = ((descriptor.OrderBy[0].Order == OrderSequence.ASC) ? "asc" : "desc");
            }
            whereTxt += string.Format(" order by {0} {1}", text, text2);

            StringBuilder sqlBuild = new StringBuilder();
            sqlBuild.AppendLine("select a.* from case_info a");

            return base.GetPageData(descriptor);
        }

        private void Case_InfoService_GetDetail(object query, object data)
        {
            //var caseinfo = data as Dictionary<string, object>;
            //var userid = caseinfo["CreateUser"] as List<string>;
            //if (userid != null)
            //{
            //    ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");
            //    var user = SysContext.GetOtherDB(userServiceConfig.model.dbName).First<user>($"select * from user where Id={userid[0] }");
            //    caseinfo.Add("Jobnumber",user.Jobnumber);
            //}
        }


        private void Case_InfoService_OnAfterGetPagedData(object query, object data)
        {
            var lst = (data as PagedData).Records;

            var db = this.QueryDb;
            IService svc = ServiceHelper.GetService("law_party");


            ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");

            for (int i = 0; i < lst.Count; i++)
            {
                var item = lst[i] as Dictionary<string, object>;
                
                FilterGroup filterGroup = new FilterGroup();
                filterGroup.rules = new List<FilterRule>();
         
                filterGroup.rules.Add(new FilterRule
                {
                    field = "Associatedobjecttype",
                    value = "case_info",
                    op = "equal"
                });
                filterGroup.op = "and";
                filterGroup.rules.Add(new FilterRule
                {
                    field = "CaseId",
                    value = item["ID"].ToString(),
                    op = "equal"
                });
                if (item["CreateUserID"] != null)
                {
                    string userid = item["CreateUserID"].ToString();
                    var user = SysContext.GetOtherDB(userServiceConfig.model.dbName).First<user>($"select * from user where Id={userid}");
                    item.Add("CreatUser", user.Name);
                    item.Add("Jobnumber", user.Jobnumber);
                }
                var partys = svc.GetListData(filterGroup) ;

                item.Add("LawPartys", partys);

            }
        }
        private void Case_InfoService_OnAfterListData(object query, object data)
        {
            var lst = (data as PagedData).Records;

            var db = this.QueryDb;
            IService svc = ServiceHelper.GetService("law_party");


            ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");

            for (int i = 0; i < lst.Count; i++)
            {
                var item = lst[i] as Dictionary<string, object>;

                FilterGroup filterGroup = new FilterGroup();
                filterGroup.rules = new List<FilterRule>();

                filterGroup.rules.Add(new FilterRule
                {
                    field = "Associatedobjecttype",
                    value = "case_info",
                    op = "equal"
                });
                filterGroup.op = "and";
                filterGroup.rules.Add(new FilterRule
                {
                    field = "CaseId",
                    value = item["ID"].ToString(),
                    op = "equal"
                });
                if (item["CreateUserID"] != null)
                {
                    string userid = item["CreateUserID"].ToString();
                    var user = SysContext.GetOtherDB(userServiceConfig.model.dbName).First<user>($"select * from user where Id={userid}");
                    item.Add("CreatUser", user.Name);
                    item.Add("Jobnumber", user.Jobnumber);
                }
                var partys = svc.GetListData(filterGroup);

                item.Add("LawPartys", partys);

            }
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
            if (data.CaseInfo == null) throw new Exception("没有主体数据");
            data.CaseInfo.TaskId = data.SourceTaskId;
            data.CaseInfo.EventInfoId = data.EventInfoId;
            QueryDb.BeginTransaction();
            try
            {
                string caseid= CreateInfo(data.CaseInfo, data.LawParties);
                if (data.NextTasks!=null||data.NextTasks.Length > 0)
                {
                    foreach (var t in data.NextTasks)
                    {
                        t.CaseID = caseid;
                    }
                }
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
        private string CreateInfo(case_Info caseInfo, List<law_party> law_Parties)
        {
            caseInfo.CaseStatus = "已建档";
            var CaseInfoSource = base.Create(caseInfo) as string;//保存原始信息
            var CaseInfoTemp = caseInfo;
            CaseInfoTemp.PreviousformID = CaseInfoSource;
            var CaseInfoNew = base.Create(CaseInfoTemp) as string;//可变更的信息
            if (law_Parties != null && law_Parties.Count > 0)//创建当事人
            {
                foreach (var l in law_Parties)//原始的当事人
                {
                    l.Associatedobjecttype = "case_Info";
                    l.AssociationobjectID = CaseInfoSource;
                    l.ID = Guid.NewGuid().ToString();
                    QueryDb.Insert(l);
                }
                foreach (var l in law_Parties)//创建新建的
                {
                    l.Associatedobjecttype = "case_Info";
                    l.AssociationobjectID = CaseInfoNew;
                    l.ID = Guid.NewGuid().ToString();
                    QueryDb.Insert(l);
                }

            }   
            //将Caseid更新到本次任务上
            var tasknow = QueryDb.FirstOrDefault<work_task>("where Id=@0", caseInfo.TaskId);
            if (tasknow != null)
            {
                tasknow.CaseID= CaseInfoNew;
                QueryDb.Update(tasknow);
            }
            return CaseInfoNew;

        }


     
    }
}
