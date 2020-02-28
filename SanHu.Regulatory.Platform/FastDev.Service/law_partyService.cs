using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using FD.Model.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    public class law_partyService : ServiceBase, IService
    {
        public law_partyService()
        {
            OnGetAPIHandler += law_partyService_OnGetAPIHandler;
        }

        private Func<APIContext, object> law_partyService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "GET":
                    return GetList;
            }
            return null;
        }


    }
}
