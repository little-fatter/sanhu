﻿using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.Model.Entity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    public class formwith_eventcaseService : ServiceBase, IService
    {
        public formwith_eventcaseService()
        {
            OnAfterGetPagedData += Formwith_eventcaseService_OnAfterGetPagedData;
            OnGetAPIHandler += Formwith_eventcaseService_OnGetAPIHandler;
        }

        private void Formwith_eventcaseService_OnAfterGetPagedData(object query, object data)
        {
            var filtercase = query as FilterGroup;
            string eventinfoid = null;
            if (filtercase != null)
            {
                if (filtercase.groups.Count > 0)
                {
                    foreach (var f in filtercase.groups)
                    {
                        if (f.groups.Count > 0)
                        {
                            foreach (var f0 in f.groups)
                            {
                                if (f0.rules != null)
                                {
                                    if (f0.rules[0].field == "CaseId")
                                    {
                                        var caseinfo = QueryDb.FirstOrDefault<formwith_eventcase>("where FormID=@0", f0.rules[0].value);
                                        eventinfoid = caseinfo.EventInfoId;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var lst = (data as PagedData).Records;
       

            ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");

            for (int i = 0; i < lst.Count; i++)
            {
                var item = lst[i] as Dictionary<string, object>;

                string userid = item["CreateUserID"] == null ? string.Empty : item["CreateUserID"].ToString();

                if (!string.IsNullOrWhiteSpace(userid))
                {
                    var user = SysContext.GetOtherDB(userServiceConfig.model.dbName).First<user>($"select * from user where Id={userid}");
                    item["handler"] = user.Name;
                }

                var formType = item["FormType"].ToString().ToLower();
                if (formType == "form_confiscated")   // 没收清单表查询出对应的当事人姓名
                {
                    var formlawpary = QueryDb.FirstOrDefault<string>("SELECT lawpartyid FROM  form_confiscated where ID=@0", item["FormID"].ToString());
                    if (formlawpary != null)
                    {
                        var lawpartyName = QueryDb.FirstOrDefault<string>("SELECT Name FROM  law_party where ID=@0", formlawpary);
                       item["FormName"] = "[" + lawpartyName + "]" + item["FormName"];
                    }
                }

                if (formType == "law_punishmentinfo")  //当场处罚决定书 新增处罚决定书文号
                {
                    item.Add("PunishmentTitle", QueryDb.FirstOrDefault<string>("SELECT PunishmentTitle FROM law_punishmentinfo where ID=@0", item["FormID"].ToString()));                    
                }

                if (formType == "law_punishmentinfo" || formType == "form_inquiryrecord" || formType == "case_report") //处罚当场决定书、勘察、结案、没收、询问表单新增详情的pdf文件地址
                {
                    item.Add("PdfFilePath", QueryDb.FirstOrDefault<string>("SELECT FilePath FROM form_printpdf where FormID=@0", item["FormID"].ToString()));
                }
                if (formType == "form_inquiryrecord")
                {
                    var lawpartyName = QueryDb.FirstOrDefault<string>("SELECT InquiryType FROM law_party where AssociationobjectID=@0", item["FormID"].ToString());
                    item["FormName"] = "[" + lawpartyName + "]" + item["FormName"];
                }
                if (formType == "case_info")
                {
                    eventinfoid = (string)item["EventInfoId"];
                }
            }
            if (!string.IsNullOrEmpty(eventinfoid))
            {
                var patrol = QueryDb.Query<formwith_eventcase>("where EventInfoId=@0 and FormType='task_patrol'", eventinfoid);
                if (patrol != null)
                {
                    lst.Add(patrol as Dictionary<string, object>);
                }
                var survey = QueryDb.Query<formwith_eventcase>("where EventInfoId=@0 and FormType='task_survey'", eventinfoid);
                if (survey != null)
                {
                    lst.Add(survey as Dictionary<string,object>);
                }
                
            }
        }

        private Func<APIContext, object> Formwith_eventcaseService_OnGetAPIHandler(string id)
        {          
                switch (id.ToUpper())
                {
                    case "FORMBYEVENT":
                        return FORMBYEVENT;
                }
                return null;
        }


        private object FORMBYEVENT(APIContext context)
        { 
        string id= JsonHelper.DeserializeJsonToObject<string>(context.Data);
            if (string.IsNullOrEmpty(id)) return null;
            var list= QueryDb.Query<formwith_eventcase>("SELECT * FROM formwith_eventcase where EventInfoId=@0 Order by CreatTime desc", id);
            //TODO 
            
            return list;


        }
    }
}
