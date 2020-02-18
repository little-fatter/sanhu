

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
    [Route("[controller]/[action]")]
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
        [HttpGet]
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
        [HttpPost]
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
        [NonAction]
        private string GetRootPath()
        {
            DirectoryInfo directoryInfo = new DirectoryInfo(ConfigurationManager.AppSettings["FastDevRoot"]);
            if (directoryInfo.Exists)
                return directoryInfo.FullName + "\\";
            else
            {
                try
                {
                    return new DirectoryInfo(AppDomain.CurrentDomain.BaseDirectory).Parent.Parent.Parent.Parent.FullName + "\\";
                }
                catch
                {
                    throw new Exception("请设置代码根目录FastDevRoot");
                }
            }
        }
        [NonAction]
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
        [NonAction]
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
        [HttpGet]
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
        [HttpPost]
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
                    bool modelBuild = false;
                    bool serviceBuild = false;
                    string[] array = files;
                    foreach (string f in array)
                    {
                        try
                        {
                            string fileName = f.Replace(zipRootPath, "");
                            lstLogs.Add("path:" + fileName);
                            if (fileName.StartsWith("db\\"))
                            {
                                string sqlContent = System.IO.File.ReadAllText(f);
                                int num = 0;
                                if (fileName.EndsWith(".sqljson"))
                                {
                                    Dictionary<string, object> sqlJson = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(sqlContent);
                                    sqlContent = ObjectExtensions.ToStr(sqlJson["sql"]);
                                    List<object> list3 = JsonHelper.DeserializeJsonToObject<List<object>>(JsonHelper.SerializeObject(sqlJson["args"]));
                                    num = currentDb.Execute(sqlContent, list3.ToArray());
                                }
                                else
                                {
                                    currentDb.Execute(sqlContent, new object[0]);
                                }
                                try
                                {
                                    lstLogs.Add("写入SQL:" + sqlContent + "(" + num + ")");
                                    Log("写入SQL:" + sqlContent + "(" + num + ")");
                                }
                                catch (Exception ex)
                                {
                                    lstLogs.Add("写入SQL:" + sqlContent + "\n出错：" + ex.Message);
                                    Log("写入SQL:" + sqlContent + "\n出错：" + ex.Message);
                                }
                            }
                            else if (fileName == "update.json")
                            {
                                string input = System.IO.File.ReadAllText(f);
                                updateinfo updateinfo = JsonHelper.DeserializeJsonToObject<updateinfo>(input);
                                if (updateinfo.model != null && updateinfo.model.Any())
                                {
                                    AddCSFiles("Model", zipRootPath, updateinfo.model);
                                    modelBuild = true;
                                }
                                if (updateinfo.model_remove != null && updateinfo.model_remove.Any())
                                {
                                    RemvoeCSFiles("Model", zipRootPath, updateinfo.model_remove);
                                    modelBuild = true;
                                }
                                if (updateinfo.web != null && updateinfo.web.Any())
                                {
                                    AddStaticFiles("web", zipRootPath, updateinfo.web);
                                }
                                if (updateinfo.web_remove != null && updateinfo.web_remove.Any())
                                {
                                    RemvoeStaticFiles("web", zipRootPath, updateinfo.web_remove);
                                }
                                if (updateinfo.mobileWeb != null && updateinfo.mobileWeb.Any())
                                {
                                    AddStaticFiles("mobileWeb", zipRootPath, updateinfo.mobileWeb);
                                }
                                if (updateinfo.mobileWeb_remove != null && updateinfo.mobileWeb_remove.Any())
                                {
                                    RemvoeStaticFiles("mobileWeb", zipRootPath, updateinfo.mobileWeb_remove);
                                }
                                if (updateinfo.service != null && updateinfo.service.Any())
                                {
                                    AddCSFiles("Service", zipRootPath, updateinfo.service);
                                    serviceBuild = true;
                                }
                                if (updateinfo.service_remove != null && updateinfo.service_remove.Any())
                                {
                                    RemvoeCSFiles("Service", zipRootPath, updateinfo.service_remove);
                                    serviceBuild = true;
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
                    if (modelBuild)
                    {
                        string projectName = ConfigurationManager.AppSettings["ModelProjectName"];
                        CompileProject($"{projectPath}{projectName}\\{projectName}.csproj");
                    }
                    if (serviceBuild)
                    {
                        string projectName = ConfigurationManager.AppSettings["ServiceProjectName"];
                        CompileProject($"{projectPath}{projectName}\\{projectName}.csproj");
                    }
                    if (modelBuild || serviceBuild)
                    {
                        string projectName = ConfigurationManager.AppSettings["WebProjectName"];
                        CompileProject($"{projectPath}{projectName}\\{projectName}.csproj");
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
        [HttpGet]
        public ActionResult ToCompile(string id)
        {
            try
            {
                string projectPath = GetProjectPath();
                string serviceProjectName = ConfigurationManager.AppSettings["ServiceProjectName"];
                string modelProjectName = ConfigurationManager.AppSettings["ModelProjectName"];
                if (id == "all" || string.IsNullOrEmpty(id) || id == "model")
                {
                    CompileProject(projectPath + modelProjectName + "\\"+ modelProjectName + ".csproj");
                }
                if (id == "all" || string.IsNullOrEmpty(id) || id == "service")
                {
                    CompileProject(projectPath + serviceProjectName + "\\" + serviceProjectName + ".csproj");
                }
                return Content("编译成功");
            }
            catch (Exception ex)
            {
                return Content("编译出错:" + ex.Message);
            }
        }
        [NonAction]
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

        /// <summary>
        /// 添加CS文件
        /// </summary>
        /// <param name="projectType">Model,Service</param>
        /// <param name="fileSourcePath"></param>
        /// <param name="files"></param>
        [NonAction]
        private void AddCSFiles(string projectType, string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string projectName = ConfigurationManager.AppSettings["ServiceProjectName"];
            if (projectType == "Model")
                projectName = ConfigurationManager.AppSettings["ModelProjectName"];

            string projectFilename = string.Format("{0}{1}\\{1}.csproj", projectPath, projectName);
            List<string> list = new List<string>();
            foreach (string file in files)
            {
                string text = file.Replace("\\\\", "\\");
                list.Add(text);
                string srcPath = fileSourcePath + projectType + "\\" + text;
                string targetPath = string.Format("{0}{1}\\{2}", projectPath, projectName, text);
                FileHelper.Copy(srcPath, targetPath);
            }
        }
        [NonAction]
        private void RemvoeCSFiles(string projectType, string fileSourcePath, List<string> files)
        {
            string projectPath = GetProjectPath();
            string projectName = ConfigurationManager.AppSettings["ServiceProjectName"];
            if (projectType == "Model")
                projectName = ConfigurationManager.AppSettings["ModelProjectName"];
            string projectFilename = string.Format("{0}{1}\\{1}.csproj", projectPath, projectName);
            List<string> list = new List<string>();
            foreach (string file in files)
            {
                list.Add(file.Replace("\\\\", "\\"));
            }
            foreach (string item in list)
            {
                string fPath = ObjectExtensions.ToStr((object)item);
                if (fPath.StartsWith("service\\"))
                {
                    fPath = fPath.Replace("service\\", "");
                }
                if (fPath.StartsWith("model\\"))
                {
                    fPath = fPath.Replace("model\\", "");
                }
                string current = string.Format("{0}{1}\\{2}", projectPath, projectName, fPath);
                FileHelper.Delete(current);
            }
            //现在的vs 已经不直接从xml读文件了，所以这个没有用处了
            //ProjectHelper.AddInclude(projectFilename, "Compile", list.ToArray());
           
        }
        /// <summary>
        /// 添加网页静态文件
        /// </summary>
        /// <param name="projectType"></param>
        /// <param name="fileSourcePath"></param>
        /// <param name="files"></param>
        [NonAction]
        private void AddStaticFiles(string projectType, string fileSourcePath, List<string> files)
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
                string targetPath = string.Format("{0}{1}\\{2}\\{3}", projectPath, webProject, "wwwroot", text);
                FileHelper.Copy(srcPath, targetPath);
            }
        }
        /// <summary>
        /// 删除网页静态文件
        /// </summary>
        /// <param name="projectType">web,mobileweb</param>
        /// <param name="fileSourcePath"></param>
        /// <param name="files"></param>
        [NonAction]
        private void RemvoeStaticFiles(string projectType, string fileSourcePath, List<string> files)
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
                string current = string.Format("{0}{1}\\{2}\\{3}", projectPath, webProject, "wwwroot", text);
                FileHelper.Delete(current);
            }
        }
        [NonAction]
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
        [NonAction]
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
        [HttpGet]
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
        [HttpGet]
        public ActionResult Error(string msg)
        {
            base.ViewBag.ErrorMessage = Server.UrlDecode(msg);
            return View();
        }

    }
}