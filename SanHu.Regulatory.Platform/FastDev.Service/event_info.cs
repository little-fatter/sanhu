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
        }

      

        private Func<APIContext, object> Event_info_OnGetAPIHandler(string id)
        {
            throw new NotImplementedException();
        }
    }


}
