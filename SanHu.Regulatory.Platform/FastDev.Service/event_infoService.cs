using FastDev.Common;
using FastDev.DevDB;
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
            OnGetAPIHandler += Event_info_OnGetAPIHandler;
        }

        public override object Create(object postdata)
        {
            base.MainDb.BeginTransaction();
            var model = postdata as event_info;
            var eventState = new eventStateInfo();
            eventState.EventInfoId = model.objId;
            eventState.State = "1";
            var result = base.Create(postdata);
            base.MainDb.CompleteTransaction();
            return result;
        }
        private Func<APIContext, object> Event_info_OnGetAPIHandler(string id)
        {
            throw new NotImplementedException();
        }
    }


}
