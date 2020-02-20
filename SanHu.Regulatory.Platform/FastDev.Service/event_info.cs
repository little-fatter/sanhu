using FastDev.Common;
using FastDev.DevDB;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FastDev.Service
{
    class event_info : ServiceBase, IService
    {

        public event_info()
        {
            OnGetAPIHandler += Event_info_OnGetAPIHandler;
            OnSave += Event_info_OnSave;
        }

        private void Event_info_OnSave(object entity, object viewdata, bool isCreate)
        {
            var e = entity as FastDev.Model.Entity.event_info;
            var model = this.QueryDb.FirstOrDefault<FastDev.Model.Entity.event_info>("where objId=@objId", e.objId);
            if (model == null)
                SaveList(e);
            else
                Update(e);
        }


        private Func<APIContext, object> Event_info_OnGetAPIHandler(string id)
        {
            throw new NotImplementedException();
        }
    }


}
