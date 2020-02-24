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
    public class core_toDoService : ServiceBase, IService
    {

        public core_toDoService()
        {

            OnGetAPIHandler += core_toDoService_OnGetAPIHandler;
             
        }
         



        Func<APIContext, object> core_toDoService_OnGetAPIHandler(string id)
        {
            if (id == "mytodo")
            {
                return mytodo;
            }
            return null;
        }


        object mytodo(APIContext context)
        {
            var db = this.MainDb;

            var userid = SysContext.WanJiangUserID;

            var todos = db.Fetch<core_toDo>("where UserID = @0 and Status = @1 order by CreateDate desc", userid, WFRecordStatus.Running);


            return todos;
        }

    }
}