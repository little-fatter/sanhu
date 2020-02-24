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
using FastDev.Model.Entity;

namespace FastDev.Service
{
    public class core_myMenusService : ServiceBase, IService
    {

        public core_myMenusService()
        {
            OnSave += core_myMenus_OnSave;

            OnGetAPIHandler += core_myMenus_OnGetAPIHandler;
        }

        Func<APIContext, object> core_myMenus_OnGetAPIHandler(string id)
        {
            if (id == "windowsdata")
            {
                return GetWindowsData;
            }
            else if (id == "saveposition")
            {
                return SavePosition;
            }
            return null;
        }

        object GetWindowsData(APIContext context)
        {
            var db = this.MainDb;

            var apps = new List<Dictionary<string, object>>();
            var icons = new List<string>();
            var my_menus = db.Fetch<FastDev.Model.Core.Entity.core_myMenus>("where UserID = @0 Order By SortNo asc", SysContext.WanJiangUserID);
 
            foreach (var my in my_menus)
            {
                var menu = db.FirstOrDefault<core_menu>("where ID = @0", my.MenuID);

                apps.Add(new Dictionary<string, object>()
                {
                    {"appid",menu.MenuNo},
                    {"name",my.MenuName},
                    {"icon",menu.MenuIcon},
                    {"url",menu.MenuUrl}, 
                    {"asc",my.SortNo}
                });
            }

            var windows_data = new Dictionary<string, object>();
            var windows_data_app = new Dictionary<string, object>();


            foreach (var app in apps)
            {
                windows_data_app[app["appid"].ToString()] = app;
                icons.Add(app["appid"].ToString());
            }
            windows_data["app"] = windows_data_app;
            windows_data["menu"] = new List<object> { new object() };
            windows_data["sApp"] = new Dictionary<string, object>();
            windows_data["icons"] = new
            {
                Icon1 = icons
            };

            return windows_data;
        }
        object SavePosition(APIContext context)
        {
            var db = this.MainDb;

            var appids = JsonHelper.DeserializeJsonToList<string>(context.Data);

            int index = 1;
            foreach (var appid in appids)
            {
                var menuId = db.ExecuteScalar<string>("select ID from core_menu where MenuNo = @0 and ID in (select MenuID from core_myMenus where UserID = @1)", appid, SysContext.WanJiangUserID);
                if(string.IsNullOrEmpty(menuId)) continue;
                var result = db.Execute("update core_myMenus set SortNo = @0 where MenuID = @1 and UserID = @2", index++, menuId, SysContext.WanJiangUserID);
            }

            return appids;
        }
        void core_myMenus_OnSave(object entityObj, object viewdata, bool isCreate)
        {
            var view = viewdata as Model.Core.Form.core_myMenus;

            view.UserID = SysContext.WanJiangUserID;
            view.User = new List<string>() { view.UserID, view.UserID };
        }

        

    }
}