﻿using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.Model.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FastDev.Service
{
    class event_infoService : ServiceBase, IService
    {
        public event_infoService()
        {
            OnGetAPIHandler += Event_InfoService_OnGetAPIHandler;
            OnAfterGetPagedData += Event_InfoService_OnAfterGetPagedData;
            OnAfterGetDetailData += Event_infoService_OnAfterGetDetailData;
            OnAfterSave += Event_infoService_OnAfterSave;
        }

        private void Event_infoService_OnAfterSave(object entity, object viewdata, bool isCreate)
        {
            var eventInfo = viewdata as event_info;
            if (string.IsNullOrWhiteSpace(eventInfo.OriginalID) && !isCreate) //四方德信修改了上传的事件数据的状态, 同步修改备份数据
            {
                QueryDb.Execute(string.Format("update event_info set evtState='{0}' where OriginalID='{1}'", eventInfo.evtState, eventInfo.objId));
            }
        }

        private void Event_infoService_OnAfterGetDetailData(object query, object data)
        {
            var o = data as Dictionary<string, object>;

            if (o["evtTypeDisplayName"] == null)
            { 
            
            }
               
        }

        /// <summary>
        /// 事件每次生成2条,OriginalID为空的不能用于创建任务,仅用作备份
        /// </summary>
        /// <param name="postdata"></param>
        /// <returns></returns>
        public override object Create(object postdata)
        {
            var eventInfo = postdata as event_info;
            base.QueryDb.BeginTransaction();
            try
            {
                if (!eventInfo.reportTime.HasValue)
                {
                    eventInfo.reportTime = DateTime.Now;
                }
                base.Create(eventInfo);
                eventInfo.OriginalID = eventInfo.objId;
                eventInfo.objId = Guid.NewGuid().ToString().Replace("-", "");
                base.Create(eventInfo);
                QueryDb.CompleteTransaction();
            }
            catch(Exception ex)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }
        public override object GetPageData(QueryDescriptor descriptor)
        {
            //按照上报时间倒序排列
            descriptor.OrderBy = new List<OrderByClause> { new OrderByClause { Key = "reportTime", Order = OrderSequence.DESC } };

            DbContext db = QueryDb;
            var filter = descriptor.Condition;
            if (filter == null) filter = new FilterGroup();

            FilterGroup filterNew = new FilterGroup();
            filterNew.rules = new List<FilterRule>
                {
                    new FilterRule("OriginalID", null, "isnotnull")
                };
            FilterGroup filterOut = new FilterGroup();
            filterOut.op = "and";
            filterOut.groups = new List<FilterGroup>
                {
                    filter,
                    filterNew
                };
            descriptor.Condition = filterOut;
            ServiceConfig serviceConfig = GetServiceConfig(ModelName);
            PagedData pageData = DataAccessHelper.GetPageData(QueryDb, ModelName, descriptor);

            var pageDatas = pageData.Records;
            List<IDictionary<string, object>> revData = new List<IDictionary<string, object>>();
            foreach (var d in pageDatas)
            {
                var data = JsonHelper.ToDictionary(JObject.Parse(JsonHelper.SerializeObject(d)));
                if (data["evtTypeDisplayName"]==null) data["evtTypeDisplayName"] = "综合执法";
                revData.Add(data);
            }
            pageData.Records = revData;
            return pageData;
        }


        private Func<APIContext, object> Event_InfoService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "TYPECOUNT":
                    return Handle;
                case "STATECOUNT":
                    return HandleState;
            }
            return null;
        }
        public object Handle(APIContext context)
        {
            List<object> retList = new List<object>();
                retList.Add(new { TypeName = "钉钉", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where reportType='DD_REPORT' and OriginalID is not null") });
                retList.Add(new { TypeName = "微信", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where reportType='WX_REPORT' and OriginalID is not null") });
                retList.Add(new { TypeName = "AI告警", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where reportType='AI_REPORT' and OriginalID is not null") });
                retList.Add(new { TypeName = "APP", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where reportType='APP_REPORT' and OriginalID is not null") });
                retList.Add(new { TypeName = "其他", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where reportType='OTHER' and OriginalID is not null") });
            return retList;
        }

        object HandleState(APIContext context)
        {
            List<object> retList = new List<object>();
                retList.Add(new { StateName = "待受理", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where (evtState='unAccept' or (evtState!='unAccept' and evtState!='doing' and evtState!='done')) and OriginalID is not null ") });
                retList.Add(new { StateName = "处理中", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where evtState='doing' and OriginalID is not null") });
                retList.Add(new { StateName = "已处理", Count = QueryDb.ExecuteScalar<int>("SELECT count(*) FROM event_info where evtState='done' and OriginalID is not null") });
            return retList;
        }

        private void Event_InfoService_OnAfterGetPagedData(object query, object data)
        {
            var lst = (data as PagedData).Records;

            foreach (var item in lst)
            {
                var info = item as Dictionary<string, object>;
                switch (info["evtState"])
                {
                    case "unAccept": info["evtStateName"]= "待受理"; break;
                    case "doing": info["evtStateName"] = "处理中"; break;
                    case "done": info["evtStateName"] = "已处理"; break;
                    default:
                        info["evtStateName"] = "";
                        break;
                }
            }
        }

    }
}
