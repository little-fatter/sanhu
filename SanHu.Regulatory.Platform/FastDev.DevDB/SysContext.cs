using FastDev.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using WanJiang.Framework.Web.Core.Http;
using MyHttpContext = FastDev.Common.HttpContext;

namespace FastDev.DevDB
{
    public sealed class SysContext
    {
        public const string cookie_user = "user_token";

        private static Dictionary<string, DbContext> dicContexts;

        private static Dictionary<string, string> dicValues;

        private static Assembly designModelAssembly;


        public static string AppId
        {
            get
            {
                var request = MyHttpContext.Current.Request;
                StringValues appid = "";
                request.Query.TryGetValue("appid", out appid);
                return appid.ToString(); ;
            }
        }
        /// <summary>
        /// 是否处于开发模式
        /// </summary>
        public static bool IsDev
        {
            get
            {
                //先简单地用是否有appid来判断当前的模式
                return !string.IsNullOrEmpty(AppId);
            }
        }

        public static bool IsUserLogined
        {
            get
            {
                return !string.IsNullOrEmpty(WanJiangUserID);
            }
        }

        public static bool EnabledMD5Password
        {
            get
            {
                try
                {
                    return ConfigurationManager.AppSettings["EnabledMD5Password"] == "true";
                }
                catch
                {
                    return false;
                }
            }
        }

        public static string FastDevUserID
        {
            get
            {
                try
                {
                    string appId = AppId;

                    object obj = MyHttpContext.Current.Session.GetString("app_" + appId);
                    if (obj == null)
                    {
                        if (!IsDev)
                        {//运行端
                            DbContext newDb = GetRunDb();
                            SSOContext context = SSOHelper.GetContext(MyHttpContext.Current.Request, newDb);
                            string uid = newDb.ExecuteScalar<string>("select id from core_user where LoginName = @0", new object[1]
                            {
                                context.username
                            });
                            MyHttpContext.Current.Session.SetString("app_" + appId, uid);
                            return uid;
                        }
                    }
                    return obj as string;
                }
                catch
                {
                    return null;
                }
            }
        }
        public static string WanJiangUserID
        {
            get
            {
                return MyHttpContext.Current.GetUserId();
            }
        }

        public static WanJiang.Framework.Infrastructure.Logging.ClientInfo GetWanJiangUser()
        {
            return MyHttpContext.Current.GetClientInfo();
        }

        public static string GetVariableValue(string key)
        {
            if (!dicValues.ContainsKey(key))
            {
                return null;
            }
            return dicValues[key];
        }

        public static void SetVariableValue(string key, string value)
        {
            dicValues[key] = value;
        }

        public static string GetConfigPath()
        {
            string path = "";
            if (AppId != null)
            {
                if (AppId.IndexOf('D') > -1)
                {
                    path = ConfigurationManager.AppSettings["DevelopAppPath"];
                }
                else
                {
                    if ((AppId.IndexOf('R') <= -1))
                    {
                        path = ConfigurationManager.AppSettings["AppPath"];
                    }
                    else
                    {
                        path = ConfigurationManager.AppSettings["ReleaseAppPath"];
                    }
                }
                if (!path.EndsWith("\\"))
                {
                    path += "\\";
                }
                return path.Replace("#ROOT#", GetWebRoot());
            }
            else
            {
                return GetWebRoot();
            }
        }
        /// <summary>
        /// 获取注入的服务
        /// </summary>
        public static T GetService<T>()
        {
            using (var scope = MyHttpContext.ServiceProvider.CreateScope())
            {
                return scope.ServiceProvider.GetService<T>();
            }
        }
    private static string GetWebRoot()
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(new HttpServerUtility(MyHttpContext.Current).MapPath("~/"));
            return directoryInfo.Parent.FullName + "\\";
        }
        #region 获取DBContext
        /// <summary>
        /// 根据简写获取providerName
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private static string GetProviderName(string name)
        {
            string rev = "";
            if (name.Contains("sqlite"))
            {
                rev = "System.Data.SQLite";
            }
            else if (name.Contains("sqlserver"))
            {
                rev = "System.Data.SqlClient";
            }
            else if (name.Contains("mysql"))
            {
                rev = "MySql.Data.MySqlClient";
            }
            return rev;
        }
        public static DbContext CreateDbContext(string connStr, string providerName)
        {
            string dbKey = string.Format("{0}-{1}", connStr, providerName);
            DbContext rev;
            if (dicContexts.TryGetValue(dbKey, out rev))
            {
                return rev;
            }
            //根据数据库连接名称，查询数据，获取连接字符串，生成链接
            rev = new DbContext(connStr, providerName);
            dicContexts[dbKey] = rev;
            return rev;
        }
        /// <summary>
        /// 根据模型的配置，获取数据库对象
        /// </summary>
        /// <param name="dbName"></param>
        /// <returns></returns>
        public static DbContext GetOtherDB(string dbName)
        {
            DbContext rev;
            string dbKey = string.Format("other_" + dbName);
            if (dicContexts.TryGetValue(dbName, out rev))
            {
                return rev;
            }
            //根据数据库连接名称，查询数据，获取连接字符串，生成链接
            try
            {
                if (ConfigurationManager.ConnectionStrings[dbName] != null)
                {
                    ConnectionStringSettings connectionStringSettings = ConfigurationManager.ConnectionStrings[dbName];
                    rev = CreateDbContext(connectionStringSettings.ConnectionString, connectionStringSettings.ProviderName);
                }
                if (rev == null)
                {
                    Model.core_dblink core_dblinks = GetCurrentDb().FirstOrDefault<Model.core_dblink>("where DbName = @0", new object[1]
                    {
                        dbName
                    });
                    if (core_dblinks != null)
                    {
                        string proivder = GetProviderName(core_dblinks.DbType);
                        rev = CreateDbContext(core_dblinks.DbLink, proivder);
                    }
                }
                dicContexts[dbKey] = rev;
            }
            catch (Exception)
            {
            }
            return rev;
        }

        public static DbContext GetCurrentDb()
        {
            return IsDev ? GetDevDb(SysContext.AppId) : GetRunDb();
        }

        public static string GetAppDbPath(string appid)
        {
            string configPath = GetConfigPath();
            configPath = ((!configPath.Contains("{0}")) ? (configPath + appid + "\\") : string.Format(configPath, appid));
            return configPath + "database.db";
        }

        public static DbContext GetRunDb()
        {
            DbContext runDB = null;
            string dbType = ConfigurationManager.AppSettings["ProviderName"].ToLower();
            string connStr = ConfigurationManager.AppSettings["Database"];
            string runDBKey = string.Format("run_db_{0}", dbType);
            if (dicContexts.TryGetValue(runDBKey, out runDB))
            {
                return runDB;
            }
            string proivder = GetProviderName(dbType);

            runDB = CreateDbContext(connStr, proivder);

            dicContexts[runDBKey] = runDB;
            return runDB;

        }
        public static DbContext GetDevDb(string appid)
        {
            string devDBKey = string.Format("dev_db_{0}", appid);
            DbContext rev;
            if (dicContexts.TryGetValue(devDBKey, out rev))
            {
                return rev;
            }
            else
            {
                string appDbPath = GetAppDbPath(appid);
                string connection = string.Format("data source={0}", appDbPath);
                var devDB = CreateDbContext(connection, "System.Data.SQLite");
                dicContexts[devDBKey] = devDB;
                return devDB;
            }
        }

        public static DbContext GetUpdateDb()
        {

            string text = GetAppsPath();
            if (!text.EndsWith("\\"))
            {
                text += "\\";
            }
            text += "update_db.db";
            DbContext rev;
            if (dicContexts.TryGetValue(text, out rev))
            {
                return rev;
            }
            else
            {
                string connection = string.Format("data source={0}", text);
                rev = CreateDbContext(connection, "System.Data.SQLite");
                dicContexts[text] = rev;
                return rev;
            }
        }
        #endregion

        public static string GetAppsPath()
        {
            string configPath = GetConfigPath();
            configPath = ((!configPath.Contains("{0}")) ? (configPath + AppId + "\\") : string.Format(configPath, AppId));
            DirectoryInfo directoryInfo = new DirectoryInfo(configPath);
            return directoryInfo.Parent.FullName;
        }



        public static Assembly GetModelAssembly()
        {
            if (IsDev)
            {

                if (designModelAssembly == null)
                {
                    string dllPath = GetCurrentAppPath() + "FastDev.Model.dll";
                    string dllBakPath = dllPath + ".bak";
                    if (File.Exists(dllPath))
                    {
                        try
                        {
                            byte[] buffs = File.ReadAllBytes(dllPath);
                            designModelAssembly = Assembly.Load(buffs);
                            File.WriteAllBytes(dllBakPath, buffs);
                            return designModelAssembly;
                        }
                        catch
                        {//因为某些原因会导致dll生成失败，这时候，需要启动备份文件，去检查备份文件是否可读
                        }
                    }
                    if (File.Exists(dllPath))
                    {//如果不存在，就加载备份文件
                        byte[] buffs = File.ReadAllBytes(dllPath);
                        designModelAssembly = Assembly.Load(buffs);
                    }
                }
            }
            else
            {   //非开发模式，直接加载目录下的model
                designModelAssembly = Assembly.Load("FastDev.Model");
            }
            return designModelAssembly;
        }
        public static void ResetModelAssembly()
        {
            designModelAssembly = null;
        }

        public static string GetCurrentAppPath()
        {
            string appId = AppId;
            string configPath = GetConfigPath();
            if (configPath.Contains("{0}"))
            {
                return string.Format(configPath, appId);
            }
            return configPath + appId + "\\";
        }

        public static void ClearUserStatus()
        {
            string appId = AppId;
            MyHttpContext.Current.Session.Remove("app_" + appId);
            string cookieValue = "";
            if (MyHttpContext.Current.Request.Cookies.TryGetValue(cookie_user, out cookieValue))
            {
                if (cookieValue != null)
                {
                    MyHttpContext.Current.Response.Cookies.Append(cookie_user, cookieValue);
                }
            }
        }

        public SysContext()
        {


        }

        static SysContext()
        {

            dicContexts = new Dictionary<string, DbContext>();
            dicValues = new Dictionary<string, string>();
            designModelAssembly = null;
        }
    }
}
