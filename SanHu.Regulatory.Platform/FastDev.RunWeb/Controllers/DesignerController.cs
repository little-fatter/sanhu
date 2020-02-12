﻿

// DesignerController
using FastDev.Common;
using FastDev.Common.Extensions;
using FastDev.DevDB;
using FastDev.DevDB.Model;
using Microsoft.AspNetCore.Mvc;
using FastDev.RunWeb.Core;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
namespace FastDev.RunWeb.Controllers
{
    public class DesignerController : Controller
    {
        public class projectinfo
        {
            public string service
            {
                get;
                set;
            }

            public string project
            {
                get;
                set;
            }
        }

        private class updatemenu
        {
            public string title
            {
                get;
                set;
            }

            public string menuNo
            {
                get;
                set;
            }

            public string parentNo
            {
                get;
                set;
            }

            public string url
            {
                get;
                set;
            }
        }

        private class updateinfo
        {
            public List<string> model
            {
                get;
                set;
            }

            public List<string> model_remove
            {
                get;
                set;
            }

            public List<string> web
            {
                get;
                set;
            }

            public List<string> web_remove
            {
                get;
                set;
            }

            public List<string> mobileWeb
            {
                get;
                set;
            }

            public List<string> mobileWeb_remove
            {
                get;
                set;
            }

            public List<updatemenu> menu
            {
                get;
                set;
            }

            public List<string> service
            {
                get;
                set;
            }

            public List<string> service_remove
            {
                get;
                set;
            }

            public List<string> bin
            {
                get;
                set;
            }

            public List<string> bin_remove
            {
                get;
                set;
            }
        }
        public HttpServerUtility Server
        {
            get
            {
                return new HttpServerUtility();
            }
        }
        public ActionResult Index(string sid, string appid, string viewid)
        {
            projectinfo pinfo = null;
            string designUrl = ConfigurationManager.AppSettings["DesignerUrl"];
            string rev = "";
            if (designUrl.Contains("sid=") || designUrl.Contains("appid="))
            {
                rev = designUrl;
            }
            else if (!string.IsNullOrEmpty(sid) || !string.IsNullOrEmpty(appid))
            {
                pinfo = new projectinfo() { service = sid, project = appid };
                rev = string.Format(designUrl + "?sid={0}&appid={1}", pinfo.service, pinfo.project);
            }
            else
            {
                string path = Server.MapPath("~/project.config");
                if (!System.IO.File.Exists(path))
                {
                    return Content("项目文件不存在，请检查根目录下面project.config文件");
                }
                using (FileStream fs = System.IO.File.Open(path, FileMode.Open))
                {
                    pinfo = (projectinfo)new System.Xml.Serialization.XmlSerializer(typeof(projectinfo)).Deserialize(fs);
                }
                rev = string.Format(designUrl + "?sid={0}&appid={1}", pinfo.service, pinfo.project);
            }
            if (!string.IsNullOrEmpty(viewid))
            {
                rev = rev + "&viewid=" + viewid;
            }
            base.ViewBag.DesignerUrl = rev;
            return View();
        }

        public ActionResult init(string service, string project)
        {
            projectinfo pinfo = null;
            string configPath = Server.MapPath("~/project.config");
            if (!System.IO.File.Exists(configPath))
            {
                return Content("项目文件不存在，请检查根目录下面project.config文件");
            }
            using (FileStream fs = System.IO.File.Open(configPath, FileMode.Open))
            {
                pinfo = (projectinfo)new System.Xml.Serialization.XmlSerializer(typeof(projectinfo)).Deserialize(fs);
            }
            if (pinfo.project != null)
            {
                throw new Exception("项目已经存在");
            }
            if (pinfo.service != service)
            {
                throw new Exception("服务ID无效");
            }
            pinfo.project = project;
            string strPinfo = "";
            using (MemoryStream ms = new MemoryStream())
            {
                new System.Xml.Serialization.XmlSerializer(typeof(projectinfo)).Serialize(ms, pinfo);
                strPinfo = Encoding.UTF8.GetString(ms.ToArray());
            }
            FileHelper.OutputFile(configPath, strPinfo, true);
            return Json(new AjaxResult
            {
                statusCode = "1"
            });
        }

        private string GetRootPath()
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(ConfigurationManager.AppSettings["FastDevRoot"]);
            if (directoryInfo.Exists)
                return directoryInfo.FullName + "\\";
            else
                throw new Exception("请设置代码根目录FastDevRoot");
        }

        private string GetProjectPath()
        {
            string projectPath = ConfigurationManager.AppSettings["ProjectPath"];
            projectPath = projectPath.Replace("#ROOT#", GetRootPath());
            if (!projectPath.EndsWith("\\"))
            {
                projectPath += "\\";
            }
            return projectPath;
        }

        public static void Log(string content)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                core_log coreLog = new core_log
                {
                    CreateDate = DateTime.Now,
                    CreateUserID = SysContext.CurrentUserID,
                    ID = ObjectExtensions.ToStr((object)Guid.NewGuid()),
                    Logtime = DateTime.Now,
                    Title = "设计模式",
                    Logcontent = content,
                    Logtype = "designer",
                    Systempath = FastDev.Common.HttpContext.Current.Request.Path.ToString(),
                    UserID = SysContext.CurrentUserID
                };
                currentDb.Insert("core_log", "ID", false, coreLog);
            }
            catch (Exception)
            {
            }
        }

        public ActionResult test_setup(string content)
        {
            string updatePackagePath = GetUpdatePackagePath();
            DbContext currentDb = SysContext.GetCurrentDb();
            System.IO.File.WriteAllBytes(updatePackagePath, Convert.FromBase64String(content));
            return Content(updatePackagePath);
        }
        /// <summary>
        /// //设计端调用  window.parent.postMessage   action: 'setup' 
        /// </summary>
        /// <param name="content"></param>
        /// <returns></returns>
        public ActionResult setup(string content)
        {
            string updatePackagePath = GetUpdatePackagePath();
            DbContext currentDb = SysContext.GetCurrentDb();
            System.IO.File.WriteAllBytes(updatePackagePath, Convert.FromBase64String(content));
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            List<string> lstLogs = (List<string>)(dictionary["logs"] = new List<string>());
            try
            {
                if (System.IO.File.Exists(updatePackagePath))
                {
                    dictionary["exist"] = true;
                    string projectPath = GetProjectPath();
                    string zipRootPath = updatePackagePath.Substring(0, updatePackagePath.Length - ".zip".Length) + "\\";
                    ZipHelper.UnZip(updatePackagePath, zipRootPath);
                    System.IO.File.Delete(updatePackagePath);
                    string[] files = Directory.GetFiles(zipRootPath, "*", SearchOption.AllDirectories);
                    dictionary["files_count"] = files.Count();
                    dictionary["files"] = files;
                    bool flag = false;
                    string[] array = files;
                    foreach (string f in array)
                    {
                        try
                        {
                            string fileName = f.Replace(zipRootPath, "");
                            lstLogs.Add("path:" + fileName);
                            if (fileName.StartsWith("db\\"))
                            {
                                string text4 = System.IO.File.ReadAllText(f);
                                int num = 0;
                                if (fileName.EndsWith(".sqljson"))
                                {
                                    Dictionary<string, object> dictionary2 = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(text4);
                                    text4 = ObjectExtensions.ToStr(dictionary2["sql"]);
                                    List<object> list3 = JsonHelper.DeserializeJsonToObject<List<object>>(JsonHelper.SerializeObject(dictionary2["args"]));
                                    num = currentDb.Execute(text4, list3.ToArray());
                                }
                                else
                                {
                                    currentDb.Execute(text4, new object[0]);
                                }
                                try
                                {
                                    lstLogs.Add("写入SQL:" + text4 + "(" + num + ")");
                                    Log("写入SQL:" + text4 + "(" + num + ")");
                                }
                                catch (Exception ex)
                                {
                                    lstLogs.Add("写入SQL:" + text4 + "\n出错：" + ex.Message);
                                    Log("写入SQL:" + text4 + "\n出错：" + ex.Message);
                                }
                            }
                            else if (fileName == "update.json")
                            {
                                string input = System.IO.File.ReadAllText(f);
                                updateinfo updateinfo = JsonHelper.DeserializeJsonToObject<updateinfo>(input);
                                if (updateinfo.model != null && updateinfo.model.Any())
                                {
                                    AddProjectFiles("Model", zipRootPath, updateinfo.model);
                                    flag = true;
                                }
                                if (updateinfo.model_remove != null && updateinfo.model_remove.Any())
                                {
                                    RemvoeProjectFiles("Model", zipRootPath, updateinfo.model_remove);
                                    flag = true;
                                }
                                if (updateinfo.web != null && updateinfo.web.Any())
                                {
                                    AddProjectFiles("web", zipRootPath, updateinfo.web);
                                }
                                if (updateinfo.web_remove != null && updateinfo.web_remove.Any())
                                {
                                    RemvoeProjectFiles("web", zipRootPath, updateinfo.web_remove);
                                }
                                if (updateinfo.mobileWeb != null && updateinfo.mobileWeb.Any())
                                {
                                    AddProjectFiles("mobileWeb", zipRootPath, updateinfo.mobileWeb);
                                }
                                if (updateinfo.mobileWeb_remove != null && updateinfo.mobileWeb_remove.Any())
                                {
                                    RemvoeProjectFiles("mobileWeb", zipRootPath, updateinfo.mobileWeb_remove);
                                }
                                if (updateinfo.service != null && updateinfo.service.Any())
                                {
                                    AddProjectFiles("Service", zipRootPath, updateinfo.service);
                                    flag = true;
                                }
                                if (updateinfo.service_remove != null && updateinfo.service_remove.Any())
                                {
                                    RemvoeProjectFiles("Service", zipRootPath, updateinfo.service_remove);
                                    flag = true;
                                }
                                if (updateinfo.bin != null && updateinfo.bin.Any())
                                {
                                    AddBinFiles(zipRootPath, updateinfo.bin);
                                }
                                if (updateinfo.bin_remove != null && updateinfo.bin_remove.Any())
                                {
                                    RemoveBinFiles(zipRootPath, updateinfo.bin_remove);
                                }
                                if (updateinfo.menu != null && updateinfo.menu.Any())
                                {
                                    foreach (updatemenu item in updateinfo.menu)
                                    {
                                        core_menu core_menu = new core_menu();
                                        core_menu.ID = Guid.NewGuid().ToString();
                                        core_menu.CreateUserID = SysContext.CurrentUserID;
                                        core_menu.CreateDate = DateTime.Now;
                                        core_menu.MenuName = item.title;
                                        core_menu.MenuUrl = item.url;
                                        core_menu.MenuNo = item.menuNo;
                                        core_menu.MenuIcon = "/contents/icons/bubbles/02.Shop.png";
                                        if (!string.IsNullOrEmpty(item.parentNo))
                                        {
                                            string text6 = core_menu.ParentID = currentDb.ExecuteScalar<string>("select ID from core_menu where MenuNo = @0", new object[1]
                                            {
                                            item.parentNo
                                            });
                                        }
                                        currentDb.Insert("core_menu", "ID", false, (object)core_menu);
                                    }
                                }
                            }
                        }
                        catch (Exception ex2)
                        {
                            lstLogs.Add("Error2:" + ex2.Message + ",StackTrace2:" + ex2.StackTrace);
                        }
                    }
                    if (flag)
                    {
                        CompileProject(projectPath + "FastDev.Model\\FastDev.Model.csproj");
                    }
                }
                else
                {
                    dictionary["exist"] = false;
                }
            }
            catch (Exception ex)
            {
                lstLogs.Add("Error:" + ex.Message + ",StackTrace:" + ex.StackTrace);
            }
            return Json(new AjaxResult
            {
                data = dictionary,
                statusCode = "1"
            });
        }

        public ActionResult ToCompile(string id)
        {
            try
            {
                string projectPath = GetProjectPath();
                if (id == "all" || string.IsNullOrEmpty(id) || id == "model")
                {
                    CompileProject(projectPath + "FastDev.Model\\FastDev.Model.csproj");
                }
                if (id == "all" || string.IsNullOrEmpty(id) || id == "service")
                {
                    CompileProject(projectPath + "FastDev.Service\\FastDev.Service.csproj");
                }
                return Content("编译成功");
            }
            catch (Exception ex)
            {
                return Content("编译出错:" + ex.Message);
            }
        }

        private string GetUpdatePackagePath()
        {
            string appId = SysContext.AppId;
            string updatePath = Server.MapPath("~/updates/");
            if (!Directory.Exists(updatePath))
            {
                Directory.CreateDirectory(updatePath);
            }
            int num = 1;
            string fileName = updatePath + DateTime.Now.ToString("yyyy_MMdd_hhmm_") + num++;
            while (Directory.Exists(fileName))
            {
                fileName = updatePath + DateTime.Now.ToString("yyyy_MMdd_hhmm_") + num++;
            }
            return fileName + ".zip";
        }

        private void AddProjectFiles(string projectType, string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string webProject = ConfigurationManager.AppSettings["WebProjectName"];
            string projectFilename = string.Format("{0}{1}\\{1}.csproj", projectPath, webProject);
            List<string> list = new List<string>();
            foreach (string file in files)
            {
                string text = file.Replace("\\\\", "\\");
                list.Add(text);
                string srcPath = fileSourcePath + projectType + "\\" + text;
                string targetPath = string.Format("{0}{1}\\{2}\\{3}", projectPath, webProject,"wwwroot",text);
                FileHelper.Copy(srcPath, targetPath);
            }
            if (string.Compare(projectType, "web", true) != 0 && string.Compare(projectType, "mobileweb", true) != 0)
            {
                ProjectHelper.AddInclude(projectFilename, "Compile", list.ToArray());
            }
        }

        private void RemvoeProjectFiles(string projectType, string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string webProject = ConfigurationManager.AppSettings["WebProjectName"];
            string projectFilename = string.Format("{0}{1}\\{1}.csproj", projectPath, webProject);
            List<string> list = new List<string>();
            foreach (string file in files)
            {
                list.Add(file.Replace("\\\\", "\\"));
            }
            foreach (string item in list)
            {
                string text = ObjectExtensions.ToStr((object)item);
                if (text.StartsWith("web\\"))
                {
                    text = text.Replace("web\\", "");
                }
                if (text.StartsWith("mobileWeb\\"))
                {
                    text = text.Replace("mobileWeb\\", "");
                }
                if (text.StartsWith("mobileweb\\"))
                {
                    text = text.Replace("mobileweb\\", "");
                }
                if (text.StartsWith("model\\"))
                {
                    text = text.Replace("model\\", "");
                }
                string current = string.Format("{0}{1}\\{2}\\{3}", projectPath, webProject, "wwwroot", text);
                FileHelper.Delete(current);
            }
            if (string.Compare(projectType, "web", true) != 0 && string.Compare(projectType, "mobileweb", true) != 0)
            {
                ProjectHelper.RemoveInclude(projectFilename, "Compile", list.ToArray());
            }
        }

        private void AddBinFiles(string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string webProject = ConfigurationManager.AppSettings["WebProjectName"];
            string debugPath = ConfigurationManager.AppSettings["DebugPath"]; 
            foreach (string file in files)
            {
                string str = file.Replace("\\\\", "\\");
                string text = fileSourcePath + "Bin\\" + str;
                string text2 = projectPath + $"{webProject}\\{debugPath}\\" + str;
                FileHelper.Copy(text, text2);
            }
        }

        private void RemoveBinFiles(string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string webProject = ConfigurationManager.AppSettings["WebProjectName"];
            string debugPath = ConfigurationManager.AppSettings["DebugPath"];
            foreach (string file in files)
            {
                string text = projectPath + $"{webProject}\\{debugPath}\\" + file.Replace("\\\\", "\\");
                FileHelper.Delete(text);
            }
        }

        public void CompileProject(string csproj_filename)
        {
            string msBuild = ConfigurationManager.AppSettings["MSBuildPath"];
            msBuild = msBuild.Replace("#ROOT#", GetRootPath());
            Process process = new Process();
            process.StartInfo.FileName = "cmd.exe";
            process.StartInfo.UseShellExecute = false;
            process.StartInfo.RedirectStandardInput = true;
            process.StartInfo.RedirectStandardOutput = true;
            process.StartInfo.RedirectStandardError = true;
            process.StartInfo.CreateNoWindow = true;
            string cmdRev;
            try
            {
                process.Start();
                process.StandardInput.WriteLine("\"" + msBuild + "\" \"" + csproj_filename + "\"");
                process.StandardInput.WriteLine("exit");
                cmdRev = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                process.Close();
            }
            catch (Exception ex)
            {
                cmdRev = ex.Message;
            }
            Console.Write(cmdRev);
        }
        public ActionResult Error(string msg)
        {
            base.ViewBag.ErrorMessage = Server.UrlDecode(msg);
            return View();
        }

    }
}