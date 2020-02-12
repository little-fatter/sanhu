// HomeController
using FastDev.Common;
using FastDev.Common.Helpers;
using FastDev.DevDB;
using FastDev.DevDB.Auth;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using Jurassic;
using Microsoft.AspNetCore.Mvc;
using FastDev.RunWeb.Core;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Net;
using System.Text.RegularExpressions;
using Newtonsoft.Json.Linq;

namespace FastDev.RunWeb.Controllers
{
    public class HomeController : BaseController
    {
        public static string cookie_user;

        private string strLogs;
        public HttpServerUtility Server
        {
            get
            {
                return new HttpServerUtility();
            }
        }
        private string GetAppAdminRoleId()
        {
            return ConfigurationManager.AppSettings["AppAdminRoleID"];
        }

        private void CheckValid()
        {
            try
            {
                if (!System.IO.File.Exists(Server.MapPath("~/validate.code")))
                {
                    try
                    {
                        string string_ = string.Format("http://auth.cht.com/web/getvalidatecode/?code={0}&isdesigner=N", new SoftReg().getRNum());
                        Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(WebGet(string_));
                        if (dictionary != null)
                        {
                            string text = dictionary["data"] as string;
                            if (!string.IsNullOrEmpty(text))
                            {
                                System.IO.File.WriteAllText(Server.MapPath("~/validate.code"), text);
                            }
                        }
                    }
                    catch
                    {
                    }
                }
                if (!System.IO.File.Exists(Server.MapPath("~/validate.code")))
                {
                    throw new UserException("验证失败，请检查根目录validate.code文件");
                }
                string ciphertext = System.IO.File.ReadAllText(Server.MapPath("~/validate.code"));
                if (string.IsNullOrEmpty(ciphertext))
                {
                    throw new UserException("验证失败，请检查根目录validate.code文件");
                }
                string key = "AwEAAbfyNG2IR7IHAJ2v54mCM3QFnOy+NbQ+qg8g3HE8T6RceBoQS65twfI+y7D4B1Bzf58UCsDJe4UgJU4UvNFtSgXy+9OrqBNSkiasCO2gBgAKWRnYXG6DxEerPhJYOQvY1NmRltqAVrYCEwko7bKacUOXmi5XLlDAdtDrXVGfx4dh";
                string rNum = new SoftReg().getRNum();
                var plaintext = AESHelper.DecryptString(ciphertext, key);
                if (string.IsNullOrEmpty(plaintext))
                {
                    throw new UserException("验证授权失败");
                }
                Dictionary<string, object> dicDate = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(plaintext);
                if (dicDate == null)
                {
                    throw new UserException("验证授权失败");
                }
                string a = dicDate["code"] as string;
                if (a != rNum)
                {
                    throw new UserException("验证授权失败");
                }
                long num = Convert.ToInt64(dicDate["time"]);
                DateTime t = new DateTime(2000, 1, 1, 0, 0, 0).AddSeconds((double)num);
                if (DateTime.Now > t)
                {
                    throw new UserException("验证授权失败(已过期)");
                }
            }
            catch
            {
                throw new UserException("验证授权失败");
            }
        }
        /// <summary>
        /// 获取swagger文档
        /// </summary>
        /// <returns></returns>
        public IActionResult swagger()
        {
            var config = ServiceHelper.GetModelsConfig();
            JObject jroot = new JObject();
            jroot.Add(new JProperty("openapi", "3.0.1"));
            jroot.Add(new JProperty("info", new JObject(
                new JProperty("title", "DataCenter APIs")
                , new JProperty("description", "DataCenter APIs implemented by asp.net core.")
                , new JProperty("version", "v1"))));

            JObject jschemas = new JObject();
            foreach (var m in config.models)
            {
                JObject table = new JObject();
                table.Add(new JProperty("type", "object"));
                table.Add(new JProperty("description", m.title));
                JObject properties = new JObject();
                var sc = ServiceHelper.GetServiceConfig(m.name);
                if (sc == null) continue;
                foreach (var f in sc.fields)
                {
                    JObject oneProp = new JObject();
                    switch (f.type)
                    {
                        case "datetime":
                            oneProp.Add(new JProperty("type", f.type));
                            if (f.type == "datetime")
                            {
                                oneProp.Add(new JProperty("format", "date-time"));
                            }
                            break;
                        case "integer":
                            oneProp.Add(new JProperty("type", f.type));

                            oneProp.Add(new JProperty("format", "int32"));
                            break;
                        default:
                            oneProp.Add(new JProperty("type", f.type));
                            break;
                    }
                    oneProp.Add(new JProperty("description", f.title));
                    properties.Add(new JProperty(f.name, oneProp));
                }
                table.Add(new JProperty("properties", properties));
                JProperty tabProp = new JProperty(m.name, table);
                jschemas.Add(tabProp);
            }
            JObject jComponents = new JObject(new JProperty("schemas", jschemas));
            jroot.Add(new JProperty("components", jComponents));
            return GetContentJson(jroot.ToString());
        }
        public ActionResult Validate()
        {
            return View();
        }

        private string CallFormatJson(string strParams)
        {
            try
            {
                string path = Server.MapPath("~/Scripts/Studio/formatJson.js");
                ScriptEngine scriptEngine = new ScriptEngine();
                scriptEngine.ExecuteFile(path);
                return scriptEngine.CallGlobalFunction<string>("formatJson", new object[1]
                {
                strParams
                });
            }
            catch (Exception)
            {
                return strParams;
            }
        }

        private string CallBeautify(string strParams)
        {
            try
            {
                string path = Server.MapPath("~/Scripts/Studio/beautify.js");
                ScriptEngine scriptEngine = new ScriptEngine();
                scriptEngine.ExecuteFile(path);
                return scriptEngine.CallGlobalFunction<string>("js_beautify", new object[1]
                {
                strParams
                });
            }
            catch (Exception)
            {
                return strParams;
            }
        }

        public static void ParseUrl(string url, NameValueCollection nvc)
        {
            if (url == null)
            {
                throw new ArgumentNullException("url");
            }
            if (!(url == ""))
            {
                int num = url.IndexOf('?');
                if (num != -1)
                {
                    url.Substring(0, num);
                    if (num != url.Length - 1)
                    {
                        string input = url.Substring(num + 1);
                        Regex regex = new Regex("(^|&)?(\\w+)=([^&]+)(&|$)?", RegexOptions.Compiled);
                        MatchCollection matchCollection = regex.Matches(input);
                        foreach (Match item in matchCollection)
                        {
                            nvc.Add(item.Result("$2"), item.Result("$3"));
                        }
                    }
                }
            }
        }

        [VaildateUser]
        public ActionResult UpgradePage(string model, string viewname)
        {
            try
            {
                strLogs = "";
                DbContext currentDb = SysContext.GetCurrentDb();
                core_menu core_menu = currentDb.FirstOrDefault<core_menu>("where MenuUrl like '%model=" + model + "%' and MenuUrl like '%viewname=" + viewname + "%'", new object[0]);
                if (core_menu == null)
                {
                    core_menu = currentDb.FirstOrDefault<core_menu>("where MenuUrl like '%model=" + model + "%' and MenuUrl like '%viewtype=" + viewname + "%'", new object[0]);
                }
                if (core_menu != null)
                {
                    UpdateCoreMenu(core_menu);
                }
                GenUpdateFile(model, viewname);
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        private void UpdateCoreMenu(core_menu menuData)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            if (menuData.MenuUrl != null)
            {
                string text = "http://a.com/" + menuData.MenuUrl;
                if (menuData.MenuUrl != null && menuData.MenuUrl.EndsWith(".js"))
                {
                    currentDb.Update("core_menu", "ID", new
                    {
                        ID = menuData.ID,
                        MenuUrl = menuData.MenuUrl.Replace(".js", ".w")
                    });
                }
                if (menuData.MenuUrl != null && menuData.MenuUrl.Contains(".js?"))
                {
                    currentDb.Update("core_menu", "ID", new
                    {
                        ID = menuData.ID,
                        MenuUrl = menuData.MenuUrl.Replace(".js", ".w")
                    });
                }
                if (text.Contains("model="))
                {
                    string newUrl = GetNewUrl(text);
                    if (!(newUrl == text))
                    {
                        strLogs += string.Format("\n更新菜单({0})链接为{1}", menuData.MenuName, newUrl);
                        currentDb.Update("core_menu", "ID", new
                        {
                            ID = menuData.ID,
                            MenuUrl = newUrl
                        });
                    }
                }
            }
        }

        private void GenUpdateFile(string modelName, string jsName)
        {
            string jsFilePath = "pages/" + modelName + "/" + jsName + ".js";
            string view = ServiceHelper.GetView(modelName, "", jsName);
            string viewService = ServiceHelper.GetViewService(modelName, "", jsName);
            string text2 = Server.MapPath("~/" + jsFilePath);
            string path = text2.Replace("\\" + jsName + ".js", "\\" + jsName + ".service.js");
            if (!System.IO.File.Exists(text2))
            {
                if (view.Contains("return function"))
                {
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
                    if (serviceConfig != null && serviceConfig.model != null)
                    {
                        string title = serviceConfig.model.title;
                    }
                    string newValue = "\r\n                         var exports = {\r\n                            run: view()\r\n                        }; \r\n\r\n                    ";
                    string text3 = "\r\n                        define([], function ()\r\n                        {\r\n                            #0#\r\n                            #1#\r\n                            return exports;\r\n                        }); ";
                    text3 = text3.Replace("#1#", newValue);
                    text3 = text3.Replace("#0#", view);
                    strLogs += string.Format("\n升级页面文件：{0}", jsFilePath);
                    FileHelper.OutputFile(text2, CallBeautify(text3));
                }
                else
                {
                    string typeName = "list";
                    if (jsName.Contains("main"))
                    {
                        typeName = "list";
                    }
                    if (jsName.Contains("form"))
                    {
                        typeName = "form";
                    }
                    if (jsName.Contains("report"))
                    {
                        typeName = "report";
                    }
                    if (jsName.Contains("calendar"))
                    {
                        typeName = "calendar";
                    }
                    if (jsName.Contains("kanban"))
                    {
                        typeName = "kanban";
                    }
                    if (jsName.Contains("template"))
                    {
                        typeName = "template";
                    }
                    bool flag = !string.IsNullOrEmpty(viewService) && viewService.Trim().Length > 25;
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
                    string title = modelName;
                    if (serviceConfig != null && serviceConfig.model != null)
                    {
                        title = serviceConfig.model.title;
                    }
                    string newValue = "\r\n                        var exports = {\r\n                            type : '" + typeName + "',\r\n                            options: view(),\r\n                            dataset: 'web/dataset?model=" + modelName + "&viewname=" + jsName + "' \r\n                        }; \r\n                        exports.options.model = {  \r\n                            name : '" + modelName + "',\r\n                            title : '" + title + "'\r\n                        };\r\n\r\n                    ";
                    string jsContent = "\r\n                    define([], function ()\r\n                    {\r\n                        #0#\r\n                        #1#\r\n                        #3#\r\n                        return exports;\r\n                    }); ";
                    string jsExport = " \r\n                            exports.service = " + viewService + ";\r\n                    ";
                    jsContent = jsContent.Replace("#3#", flag ? jsExport : "");
                    jsContent = jsContent.Replace("#1#", newValue);
                    jsContent = jsContent.Replace("#0#", view);
                    strLogs += string.Format("\n升级页面文件：{0}", jsFilePath);
                    FileHelper.OutputFile(text2, CallBeautify(jsContent));
                }
            }
            if (!System.IO.File.Exists(path) && !string.IsNullOrEmpty(viewService))
            {
                string text6 = "\r\n                    define([], function ()\r\n                    {\r\n                        return " + viewService + " \r\n                    }); ";
                FileHelper.OutputFile(text2, CallBeautify(text6));
            }
        }

        public ActionResult AutoUpgradeMenus()
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            List<core_menu> list = currentDb.Fetch<core_menu>("", new object[0]);
            foreach (core_menu item in list)
            {
                UpdateCoreMenu(item);
            }
            return Content(strLogs.Replace("\n", "<br />"), "text/html");
        }

        public ActionResult AutoUpgrade()
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            List<core_menu> list = currentDb.Fetch<core_menu>("", new object[0]);
            foreach (core_menu item in list)
            {
                UpdateCoreMenu(item);
            }
            string[] files = Directory.GetFiles(Server.MapPath("~/UI/"), "*", SearchOption.AllDirectories);
            string[] array = files;
            foreach (string text in array)
            {
                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(text);
                string text2 = text.Replace(Path.GetFileName(text), "");
                text2 = text2.Substring(0, text2.Length - 1);
                text2 = text2.Substring(text2.ToLower().IndexOf("\\ui\\") + 4);
                string text3 = text2.Contains("\\") ? text2.Substring(text2.LastIndexOf("\\") + 1) : text2;
                text3 = text3.Replace("\\", "");
                Server.MapPath("~/pages/" + text3 + "/");
                if (fileNameWithoutExtension.Contains("service_"))
                {
                    fileNameWithoutExtension = fileNameWithoutExtension.Replace("service_", "") + ".service.js";
                    string str = System.IO.File.ReadAllText(text);
                    str = "\r\n                    define([], function ()\r\n                    {\r\n                        return " + str + " \r\n                    }); ";
                }
                else
                {
                    GenUpdateFile(text3, fileNameWithoutExtension);
                }
            }
            ServiceHelper.Log("更新日志", strLogs);
            return Content(strLogs.Replace("\n", "<br />"), "text/html");
        }

        private bool CheckIsValid()
        {
            try
            {
                CheckValid();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [HttpPost]
        public ActionResult Authcode(string id)
        {
            try
            {
                if (CheckIsValid())
                {
                    return Json(new
                    {
                        statusCode = 2,
                        message = "已经授权成功,无需重复操作！"
                    });
                }
                string rNum = new SoftReg().getRNum();
                string string_ = string.Format("http://auth.cht.com/web/authentication/?code={0}&authorizationcode={1}", rNum, id);
                string input = WebGet(string_);
                Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(input);
                if (dictionary["statusCode"].ToString() != "1")
                {
                    throw new Exception(dictionary["message"].ToString());
                }
                string contents = dictionary["data"].ToString();
                System.IO.File.WriteAllText(Server.MapPath("~/validate.code"), contents);
                CheckValid();
                return Json(new
                {
                    statusCode = 1,
                    message = "授权成功"
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    statusCode = 2,
                    message = "授权失败：" + ex.Message
                });
            }
        }

        private string WebGet(string url)
        {
            try
            {
                HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
                using (StreamReader streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
                {
                    return streamReader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [VaildateUser]
        public ActionResult Index(string homestyle)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            core_user core_user = currentDb.FirstOrDefault<core_user>("where id = @0", new object[1]
            {
            SysContext.CurrentUserID
            });
            if (core_user == null) 
                return new RedirectResult("/home/login");
            if (core_user.HomeStyle == "swin" || homestyle == "swin")
            {
                return View("Index_StyleWin");
            }
            //return View();
            return Content(System.IO.File.ReadAllText(Server.MapPath("~/index.html")),"text/html");
        }

        [VaildateUser]
        public ActionResult getaddins()
        {
            string path = Server.MapPath("~/Scripts/application/addins/");
            string[] directories = Directory.GetDirectories(path, "*", SearchOption.TopDirectoryOnly);
            List<object> list = new List<object>();
            string[] array = directories;
            foreach (string path2 in array)
            {
                string name = new DirectoryInfo(path2).Name;
                list.Add(name);
            }
            return Json(list);
        }

        [VaildateUser]
        public ActionResult UserStatus()
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            string appName = currentDb.ExecuteScalar<string>("select SettingValue from core_setting where SettingKey = @0", new object[1]
            {
            "AppName"
            });
            core_user core_user = currentDb.FirstOrDefault<core_user>("where id = @0", new object[1]
            {
            SysContext.CurrentUserID
            });
            if (core_user == null)
            {
                return Json(new
                {
                    statusCode = "3"
                });
            }
            return Json(new
            {
                statusCode = "1",
                data = new
                {
                    homeStyle = core_user.HomeStyle,
                    realName = core_user.RealName,
                    userName = core_user.LoginName,
                    appName = appName,
                    id = core_user.ID,
                    myPic = core_user.MyPic
                }
            });
        }

        [VaildateUser]
        public ActionResult updateSys()
        {
            try
            {
                UpdateHelper.Update();
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        public ActionResult LoginOut()
        {
            ServiceHelper.Log("【登出】", "");
            SysContext.ClearUserStatus();
            return Redirect("/home/login");
        }

        public ActionResult Login()
        {
            return Content(System.IO.File.ReadAllText(Server.MapPath("~/Login.html")),"text/html");
        }

        public ActionResult Login2()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                if (SysContext.EnabledMD5Password)
                {
                    password = HashHelper.GetMd5(password);
                }
                bool flag = false;
                flag = currentDb.Exists<core_user>("Loginname = @0 and LoginPassword = @1", new object[2]
                {
                username,
                password
                });
                Regex regex = new Regex("^\\s*([A-Za-z0-9_-]+(\\.\\w+)*@(\\w+\\.)+\\w{2,5})\\s*$");
                if (regex.IsMatch(username))
                {
                    if (flag = currentDb.Exists<core_user>("Email = @0 and LoginPassword = @1", new object[2]
                    {
                    username,
                    password
                    }))
                    {
                        username = currentDb.ExecuteScalar<string>("select Loginname from core_user where Email = @0 and LoginPassword = @1", new object[2]
                        {
                        username,
                        password
                        });
                    }
                }
                else
                {
                    flag = currentDb.Exists<core_user>("Loginname = @0 and LoginPassword = @1", new object[2]
                    {
                    username,
                    password
                    });
                }
                if (flag)
                {
                    currentDb.ExecuteScalar<string>("select ID from core_user where Loginname = @0 and LoginPassword = @1", new object[2]
                    {
                    username,
                    password
                    });
                    HttpCookie httpCookie = new HttpCookie(cookie_user);
                    httpCookie.Path = "/";
                    httpCookie.Value = SSOHelper.CreateContextValue(username, password);
                    httpCookie.Expires = DateTime.Now.AddHours(2.0);
                    CookieHelper.SetCookie(httpCookie);
                }
                return Json(new
                {
                    statusCode = "1",
                    data = flag
                });
            }
            catch (Exception ex)
            {
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        public ActionResult Welcome()
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            return View();
        }

        public HomeController()
        {

            strLogs = "";

        }

        static HomeController()
        {

            cookie_user = SSOHelper.cookie_user;
        }
    }
}