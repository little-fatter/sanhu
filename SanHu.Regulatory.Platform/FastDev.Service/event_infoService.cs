using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.Model.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
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
                base.Create(postdata);
                eventInfo.objId = Guid.NewGuid().ToString().Replace("-", "");
                eventInfo.OriginalID = eventInfo.objId;
                eventInfo.evtState = ((int)FD.Model.Enum.EventStatus.untreated).ToString();
                base.Create(eventInfo);
                QueryDb.CompleteTransaction();
            }
            catch(Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }
        public override object GetPageData(QueryDescriptor descriptor)
        {
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
            return pageData;
        }

    }
}
