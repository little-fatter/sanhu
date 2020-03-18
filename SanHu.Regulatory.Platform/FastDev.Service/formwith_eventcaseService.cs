using FastDev.Common;
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
