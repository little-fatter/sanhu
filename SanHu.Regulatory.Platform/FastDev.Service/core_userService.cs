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
using FastDev.DevDB.Auth;
using FastDev.Common.Helpers;

namespace FastDev.Service
{
    public class core_userService : ServiceBase, IService
    {

        public core_userService()
        {  
            this.OnSave += core_userService_OnSave;

            OnBeforeSave += core_userService_OnBeforeSave;

            OnAfterGetDetailData += core_userService_OnAfterGetDetailData;
        }

        void core_userService_OnAfterGetDetailData(object query, object data)
        {
            var o = data as Dictionary<string, object>;
            o["LoginName2"] = o["LoginName"];
        }

        void core_userService_OnBeforeSave(object entity, object viewdata, bool isCreate)
        {

            var db = this.MainDb;
            var o = entity as Model.Core.Entity.core_user;

            //if (SysContext.EnabledMD5Password)
            //{
            //    var password1 = o.LoginPassword;
            //    if (password1.Length == 32) return;
            //    password1 = SysContext.GetMd5(password1);
            //    db.Update("core_user", "ID", new
            //    {
            //        ID = o.ID,
            //        LoginPassword = password1
            //    });
            //}

            if (isCreate && string.IsNullOrEmpty(o.LoginPassword))
            {
                var password1 = "1";
                if (SysContext.EnabledMD5Password)
                {
                    password1 = HashHelper.GetMd5(password1);
                }
                db.Update("core_user", "ID", new
                {
                    ID = o.ID,
                    LoginPassword = password1
                });
            }
        }

        void core_userService_OnSave(object entity, object viewdata, bool isCreate)
        {
            var db = this.MainDb;
            var o = viewdata as Model.Core.Form.core_user;
            if (db.Exists<FastDev.Model.Core.Entity.core_user>("where loginname = @0 and id <> @1", o.LoginName, o.ID))
            {
                throw new Exception("用户名不能重复，请检查！");
            }
           
        }
         

    }
}