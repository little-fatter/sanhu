using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using FastDev.DevDB;
using FastDev.Common;
using FastDev.DevDB.Model;
using Microsoft.CSharp;
using System.CodeDom.Compiler;
using System.Dynamic; 
using System.Data;
using System.Data.Common;
using System.Threading;

namespace FastDev.Service
{
    public class res_dictionaryService : ServiceBase, IService
    {

        public res_dictionaryService()
        {

            OnGetAPIHandler += res_dictionaryService_OnGetAPIHandler;
             
        }




        Func<APIContext, object> res_dictionaryService_OnGetAPIHandler(string id)
        {
            if (id == "items")
            {
                return items;
            }
            return null;
        }


        object items(APIContext context)
        {
            var db = this.MainDb;

            var userid = SysContext.CurrentUserID;
            var code = context.Context;

            var dicID = db.ExecuteScalar<string>("select ID from res_dictionary where DicCode = @0", code);
            if (string.IsNullOrEmpty(dicID)) return new List<object>();

            var items = db.Fetch<Model.Entity.res_dictionaryItems>("where DicID = @0 order by SeqNo desc", dicID);


            return items;
        }

    }
}