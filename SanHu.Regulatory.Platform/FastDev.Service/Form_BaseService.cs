using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using FD.Model.Dto;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;


namespace FastDev.Service
{
    class Form_BaseService : ServiceBase, IService
    {
        public Form_BaseService()
        {
            OnGetAPIHandler += Form_BaseService_OnGetAPIHandler;
        }

        private Func<APIContext, object> Form_BaseService_OnGetAPIHandler(string id)
        {
            switch (id)
            {
                case "handOver":
                    return HandOver;
                    break;
            }
            return null;
        }
        private object HandOver(APIContext aPIContext)
        {
        
            return null;
        }

        public override object Create(object postdata)
        {
            var data = postdata as FormSaveDto;
            var formDat = ConvertToFormData(data);
            QueryDb.BeginTransaction();
            QueryDb.Insert(data.FormBase);
            QueryDb.Insert(formDat);
            QueryDb.CompleteTransaction();
            return base.Create(postdata);
        }

        public Object ConvertToFormData(FormSaveDto d)
        {
            switch (d.Type)
            {
                case FormType.PatrolRecord:
                    return BuidlPatrolRecord(d);
            }
            return null;
        }

        private form_patrolRecord BuidlPatrolRecord(FormSaveDto d)
        {
            var data = d.Obj as form_patrolRecord;
            data.ID = Guid.NewGuid().ToString().Replace("-", string.Empty);
            return data;
        }
    }


}
