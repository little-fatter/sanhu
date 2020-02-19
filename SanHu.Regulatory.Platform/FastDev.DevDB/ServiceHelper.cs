using FastDev.Common;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using FastDev.DevDB.Rights;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Web;
using FastDev.Common.Extensions;
using ObEx = FastDev.Common.Extensions.ObjectExtensions;

namespace FastDev.DevDB
{
    public class ServiceHelper
    {

        private static bool EnabledCache
        {
            get
            {
                try
                {
                    return ConfigurationManager.AppSettings.AllKeys.Contains("EnabledCache") && ConfigurationManager.AppSettings["EnabledCache"].ToString() == "true";
                }
                catch
                {
                    return false;
                }
            }
        }

        public static string GetSettingValue(string key)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            return currentDb.ExecuteScalar<string>("select settingvalue from core_setting where settingkey = @0", new object[1]
            {
                key
            });
        }

        public static void Log(string title, string content)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                core_log core_log = new core_log();
                core_log.CreateDate = DateTime.Now;
                core_log.CreateUserID = SysContext.CurrentUserID;
                core_log.ID = ObEx.ToStr((object)Guid.NewGuid());
                core_log.Logtime = DateTime.Now;
                core_log.Title = title;
                core_log.Logcontent = content;
                core_log.Logtype = "user";
                core_log.Systempath = HttpContext.Current.Request.Path.ToString();
                core_log.UserID = SysContext.CurrentUserID;
                currentDb.Insert("core_log", "ID", false, (object)core_log);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public static void Log(Exception error)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                core_log core_log = new core_log();
                core_log.CreateDate = DateTime.Now;
                core_log.CreateUserID = SysContext.CurrentUserID;
                core_log.ID = ObEx.ToStr((object)Guid.NewGuid());
                core_log.Logtime = DateTime.Now;
                core_log.Title = "系统异常";
                core_log.Logcontent = error.Message;
                core_log.Logtype = "exception";
                core_log.StackTrace = error.StackTrace;
                core_log.Systempath = HttpContext.Current.Request.Path.ToString();
                core_log.UserID = SysContext.CurrentUserID;
                currentDb.Insert("core_log", "ID", false, (object)core_log);
            }
            catch (Exception)
            {
            }
        }

        public static object GetUserData(string model, string viewname, string context)
        {
            DbContext newDb = SysContext.GetCurrentDb();// SysContext.GetRunDb();
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            IService service = GetService(model);
            if (service != null)
            {
                dictionary = service.GetViewContext(viewname, context);
            }
            if (dictionary == null)
            {
                dictionary = new Dictionary<string, object>();
            }
            RightsServer rightsServer = new RightsServer(newDb);
            dictionary["rights"] = rightsServer.GetRunTime(model);
            try
            {
                dictionary["CurrentUserID"] = SysContext.CurrentUserID;
                dictionary["CurrentUserLoginName"] = newDb.ExecuteScalar<string>("select loginname from core_user where id = @0", new object[1]
                {
                    SysContext.CurrentUserID
                });
                dictionary["CurrentUserRealName"] = newDb.ExecuteScalar<string>("select realname from core_user where id = @0", new object[1]
                {
                    SysContext.CurrentUserID
                });

                dictionary["CurrentDepartmentID"] = newDb.ExecuteScalar<string>("select DepartmentID from core_user where id = @0", new object[1]
                {
                    SysContext.CurrentUserID
                });
                dictionary["CurrentCompanyID"] = newDb.ExecuteScalar<string>("select CompanyID from res_department where ID=@0", new object[1]
                {
                    dictionary["CurrentDepartmentID"]
                });
            }
            catch
            {
            }
            LoadSystemVariable(dictionary);
            return dictionary;
        }

        public static void LoadSystemVariable(Dictionary<string, object> userdata)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                List<core_variable> list = currentDb.Fetch<core_variable>("", new object[0]);
                foreach (core_variable item in list)
                {
                    if (!string.IsNullOrEmpty(item.VariableName))
                    {
                        if (!string.IsNullOrEmpty(item.VariableValue))
                        {
                            userdata[item.VariableName] = item.VariableValue;
                        }
                        else if (!string.IsNullOrEmpty(item.VariableExpression))
                        {
                            try
                            {
                                if (item.VariableExpression.Contains("@0"))
                                {
                                    string value = currentDb.ExecuteScalar<string>(item.VariableExpression, new object[1]
                                    {
                                        SysContext.CurrentUserID
                                    });
                                    userdata[item.VariableName] = value;
                                }
                                else
                                {
                                    string value = currentDb.ExecuteScalar<string>(item.VariableExpression, new object[0]);
                                    userdata[item.VariableName] = value;
                                }
                            }
                            catch (Exception)
                            {
                            }
                        }
                    }
                }
            }
            catch (Exception)
            {
            }
        }

        public static bool IsEnabledWorkflow(string model, string appId)
        {
            DbContext newDb = SysContext.GetDevDb(appId);
            return newDb.Exists<core_workflow>("where ModelName = @0 and Enabled = @1", new object[2]
            {
                model,
                1
            });
        }
        public static bool IsEnabledWorkflow(string model)
        {
            DbContext newDb = SysContext.GetRunDb();
            return newDb.Exists<core_workflow>("where ModelName = @0 and Enabled = @1", new object[2]
            {
                model,
                1
            });
        }

        public static object GetSearchDataset(string model, string key)
        {
            if (string.IsNullOrEmpty(model) || string.IsNullOrEmpty(key))
            {
                return null;
            }
            DbContext currentDb = SysContext.GetCurrentDb();
            ServiceConfig serviceConfig = GetServiceConfig(model);
            List<object> list = new List<object>();
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            dictionary["model"] = new
            {
                serviceConfig.model.name,
                serviceConfig.model.title
            };
            List<object> list2 = new List<object>();
            List<Field> list3 = serviceConfig.fields.Where(f => f.enabledSearch == "Y").ToList();
            foreach (Field item in list3)
            {
                if (string.IsNullOrEmpty(item.relationModel))
                {
                    list.Add(new
                    {
                        field = item.name,
                        text = "搜索 " + item.title + "：" + key
                    });
                    list2.Add(new
                    {
                        item.name,
                        item.title,
                        item.type
                    });
                }
                else if (item.type == "many2one")
                {
                    ServiceConfig serviceConfig2 = GetServiceConfig(item.relationModel);
                    if (serviceConfig2 != null)
                    {
                        string title = serviceConfig2.model.title;
                        string textField = serviceConfig2.model.textField;
                        if (textField != null)
                        {
                            string text = string.Format("select ID as 'Value',{0} as 'Text' from {1} where {0} like '%{2}%'", textField, item.relationModel, key);
                            List<SearchResultItem> list4 = currentDb.Query<SearchResultItem>(text, new object[0]).ToList();
                            if (list4 != null && list4.Any())
                            {
                                list.Add(new
                                {
                                    text = title,
                                    isGroupItem = true
                                });
                                foreach (SearchResultItem item2 in list4)
                                {
                                    list.Add(new
                                    {
                                        id = item2.Value,
                                        field = item.name,
                                        isRelationItem = true,
                                        text = item2.Text
                                    });
                                }
                                list2.Add(new
                                {
                                    item.name,
                                    item.title,
                                    item.type
                                });
                            }
                        }
                    }
                }
            }
            dictionary["fields"] = list2;
            return new
            {
                dataset = dictionary,
                result = list
            };
        }
        private static FastDev.DevDB.Model.Config.Model GetModelByName(string modelName)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            core_model core_model = currentDb.FirstOrDefault<core_model>("where ModelName = @0", new object[1]
            {
                modelName
            });
            if (core_model == null)
            {
                return null;
            }
            core_module core_module = null;
            if (!string.IsNullOrEmpty(core_model.ModuleID))
            {
                core_module = currentDb.FirstOrDefault<core_module>("where ID = @0", new object[1]
                {
                    core_model.ModuleID
                });
            }
            string textField = "ID";
            core_modelField core_modelField = currentDb.FirstOrDefault<core_modelField>("where IsTextField = 1 and FieldType = @0", new object[1]
            {
                "string"
            });
            if (core_modelField != null)
            {
                textField = core_modelField.FieldName;
            }
            else
            {
                core_modelField = currentDb.FirstOrDefault<core_modelField>("where FieldType = @0", new object[1]
                {
                    "string"
                });
                if (core_modelField != null)
                {
                    textField = core_modelField.FieldName;
                }
            }
            FastDev.DevDB.Model.Config.Model model = new FastDev.DevDB.Model.Config.Model();
            model.name = core_model.ModelName;
            model.title = core_model.ModelTitle;
            model.textField = textField;
            if (core_module != null)
            {
                model.moduleName = core_module.ModuleName;
                model.moduleTitle = core_module.ModuleTitle;
            }
            return model;
        }

        public static ModelsConfig GetModelsConfig()
        {
            if (SysContext.IsDev)
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                List<string> list = currentDb.Fetch<string>("select ModelName from core_model", new object[0]);
                ModelsConfig modelsConfig = new ModelsConfig();
                foreach (string item in list)
                {
                    modelsConfig.models.Add(GetModelByName(item));
                }
                return modelsConfig;
            }
            else
            {
                string modelsPath = new HttpServerUtility(HttpContext.Current).MapPath("~/Service/models.xml");
                if (EnabledCache)
                {
                    ModelsConfig modelsConfig = CacheHelper.GetCache("models.xml") as ModelsConfig;
                    if (modelsConfig != null)
                    {
                        return modelsConfig;
                    }
                }
                if (!File.Exists(modelsPath))
                {
                    return null;
                }
                string modelsContent = File.ReadAllText(modelsPath);
                ModelsConfig modelsConfig2 = XmlHelper.XmlDeserialize<ModelsConfig>(modelsContent, Encoding.UTF8);
                if (EnabledCache)
                {
                    CacheHelper.SetCache("models.xml", (object)modelsConfig2, new CacheDependency(modelsPath));
                }
                return modelsConfig2;
            }
        }

        private static FastDev.DevDB.Model.Config.Model GetModelByModelName(string mName)
        {
            ModelsConfig modelsConfig = GetModelsConfig();
            return modelsConfig.models.FirstOrDefault((FastDev.DevDB.Model.Config.Model a) => string.Compare(a.name, mName, true) == 0);
        }
        private static List<core_modelField> GetModelFieldsByModelId(DbContext dbContext, string modelId)
        {
            List<core_modelField> list = dbContext.Fetch<core_modelField>("where modelid = @0", new object[1]
            {
                modelId
            });
            List<core_modelField> list2 = new List<core_modelField>();
            using (List<core_modelField>.Enumerator enumerator = list.GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    Func<core_modelField, bool> func = null;
                    core_modelField field = enumerator.Current;
                    List<core_modelField> source = list2;
                    func = ((core_modelField a) => a.FieldName == field.FieldName);
                    if (!source.Any(func))
                    {
                        list2.Add(field);
                    }
                }
            }
            return list2;
        }
        public static ServiceConfig GetServiceConfig(string model)
        {
            if (SysContext.IsDev)
            {
                #region 如果是开发过程
                DbContext currentDb = SysContext.GetCurrentDb();
                core_model core_model = currentDb.FirstOrDefault<core_model>("where ModelName = @0", new object[1]
                {
                model
                });
                if (core_model == null)
                {
                    return null;
                }
                List<core_modelField> list = GetModelFieldsByModelId(currentDb, core_model.ID);
                core_module core_module = null;
                if (!string.IsNullOrEmpty(core_model.ModuleID))
                {
                    core_module = currentDb.FirstOrDefault<core_module>("where ID = @0", new object[1]
                    {
                    core_model.ModuleID
                    });
                }
                string textField = "ID";
                core_modelField core_modelField = list.Where(f => f.IsTextField == 1).FirstOrDefault();
                if (core_modelField != null)
                {
                    textField = core_modelField.FieldName;
                }
                else
                {
                    core_modelField = list.Where(f => f.FieldType == "string").FirstOrDefault();
                    if (core_modelField != null)
                    {
                        textField = core_modelField.FieldName;
                    }
                }
                ServiceConfig serviceConfig = new ServiceConfig();
                List<string> lstMany2One = new List<string>();
                List<string> lstMany2Many = new List<string>();
                List<string> lstOne2Many = new List<string>();
                serviceConfig.model.name = core_model.ModelName;
                serviceConfig.model.title = core_model.ModelTitle;
                serviceConfig.model.textField = textField;
                if (((int?)core_model.NotIncludeSysFields).HasValue && core_model.NotIncludeSysFields.Value == 1)
                {
                    serviceConfig.model.notIncludeSysFields = "Y";
                }
                try
                {
                    serviceConfig.model.dbName = currentDb.ExecuteScalar<string>("select DbName from core_model where ModelName = @0", new object[1]
                    {
                    model
                    });
                }
                catch
                {
                }
                if (core_module != null)
                {
                    serviceConfig.model.moduleName = core_module.ModuleName;
                    serviceConfig.model.moduleTitle = core_module.ModuleTitle;
                }
                foreach (core_modelField item in list)
                {
                    Field field = new Field();
                    field.name = item.FieldName;
                    field.title = item.FieldTitle;
                    field.type = item.FieldType;
                    field.dbName = item.DbName;
                    try
                    {
                        if (currentDb.ExecuteScalar<string>("select IsPK from core_modelField where id = @0", new object[1]
                        {
                        item.ID
                        }) == "1")
                        {
                            field.isPK = "Y";
                        }
                        else
                        {
                            field.isPK = "N";
                        }
                    }
                    catch
                    {
                    }
                    if (item.FieldLength.HasValue)
                    {
                        field.length = item.FieldLength.Value.ToStr();
                    }
                    field.relationField = item.RelationField;
                    field.relationModel = item.RelationModel;
                    serviceConfig.fields.Add(field);
                    if (item.IsFormField != 1)
                    {
                        if (item.FieldType == "many2one")
                        {
                            lstMany2One.Add(item.FieldName);
                        }
                        if (item.FieldType == "many2many")
                        {
                            lstMany2Many.Add(item.FieldName);
                        }
                        if (item.FieldType == "one2many")
                        {
                            lstOne2Many.Add(item.FieldName);
                        }
                    }
                    if (item.IsSearchField == 1)
                    {
                        field.enabledSearch = "Y";
                    }
                }
                serviceConfig.getlist.many2one = string.Join(",", lstMany2One);
                serviceConfig.getlist.many2many = string.Join(",", lstMany2Many);
                serviceConfig.getlist.one2many = string.Join(",", lstOne2Many);
                serviceConfig.getpageddata.many2one = string.Join(",", lstMany2One);
                serviceConfig.getpageddata.many2many = string.Join(",", lstMany2Many);
                serviceConfig.getpageddata.one2many = string.Join(",", lstOne2Many);
                return serviceConfig;
                #endregion
            }
            else
            {
                #region 如果是运行端
                string serviceFileName = new HttpServerUtility(HttpContext.Current).MapPath(string.Format("~/Service/{0}/service.xml", model));
                if (EnabledCache)
                {
                    ServiceConfig serviceConfig = CacheHelper.GetCache("service." + model) as ServiceConfig;
                    if (serviceConfig != null)
                    {
                        return serviceConfig;
                    }
                }
                if (!File.Exists(serviceFileName))
                {
                    ModelsConfig modelsConfig = GetModelsConfig();
                    string text2 = null;
                    if (modelsConfig != null && modelsConfig.models != null)
                    {
                        text2 = (from a in modelsConfig.models
                                 where string.Compare(a.name, model, true) == 0
                                 select a).Select(m => m.moduleName).FirstOrDefault();
                    }
                    if (string.IsNullOrEmpty(text2))
                    {
                        text2 = "others";
                    }
                    serviceFileName = new HttpServerUtility(HttpContext.Current).MapPath(string.Format("~/Service/{0}/service.xml", model));
                    if (!File.Exists(serviceFileName))
                    {
                        serviceFileName = new HttpServerUtility(HttpContext.Current).MapPath(string.Format("~/Service/{0}/{1}/service.xml", text2, model));
                    }
                    if (!File.Exists(serviceFileName))
                    {
                        return null;
                    }
                }
                string text3 = File.ReadAllText(serviceFileName);
                ServiceConfig rev = XmlHelper.XmlDeserialize<ServiceConfig>(text3, Encoding.UTF8);
                if (EnabledCache)
                {
                    CacheHelper.SetCache("service." + model, (object)rev, new CacheDependency(serviceFileName));
                }
                return rev;
                #endregion
            }

        }

        public static IService GetService(string model)
        {
            //string binPath= HttpContext.Current.Server.ma();
            string dllPath = typeof(ServiceHelper).Assembly.CodeBase;
            string binPath = dllPath.Substring(0, dllPath.LastIndexOf("/") + 1);
            string desDllPath = new Uri(binPath + "FastDev.Design.Service.dll").LocalPath;
            Assembly assembly = null;
            if (File.Exists(desDllPath))
            {
                assembly = Assembly.Load("FastDev.Design.Service");
            }
            Type type = null;
            if (assembly != null)
                type = assembly.GetType("FastDev.Design.Service." + model + "Service", false, true);
            if (type == null)
            {
                desDllPath = new Uri(binPath + "FastDev.Service.dll").LocalPath;
                if (File.Exists(desDllPath))
                {
                    assembly = Assembly.Load("FastDev.Service");
                }
                if (assembly != null)
                    type = (from a in assembly.GetTypes()
                            where string.Compare(a.Name, model + "Service", true) == 0 || string.Compare(a.Name, model, true) == 0
                            select a).FirstOrDefault();
            }
            if (type != null)
            {
                IService service = assembly.CreateInstance(type.FullName) as IService;
                service.Init(model);
                return service;
            }
            ServiceBase serviceBase = new ServiceBase();
            serviceBase.Init(model);
            return serviceBase;
        }

        public static string GetView(string model, string viewtype, string viewname)
        {
            string text = GetFilePath(model, viewtype, viewname, false);
            if (!File.Exists(text))
            {
                return null;
            }
            string text2 = "view." + text.Substring(text.IndexOf("ui\\") + 3);
            if (EnabledCache)
            {
                string text3 = CacheHelper.GetCache(text2) as string;
                if (text3 != null)
                {
                    return text3;
                }
            }
            string text4 = File.ReadAllText(text);
            if (EnabledCache)
            {
                CacheHelper.SetCache(text2, (object)text4, new CacheDependency(text));
            }
            return text4;
        }

        public static string GetView(string model, string viewtype, string viewname, string extend)
        {
            string text = GetFilePath(model, viewtype, viewname, false);
            if (!string.IsNullOrEmpty(extend))
            {
                text = text.Replace(".js", "." + extend);
            }
            if (!File.Exists(text))
            {
                return null;
            }
            string text2 = "view." + text.Substring(text.IndexOf("ui\\") + 3);
            if (EnabledCache)
            {
                string text3 = CacheHelper.GetCache(text2) as string;
                if (text3 != null)
                {
                    return text3;
                }
            }
            string text4 = File.ReadAllText(text);
            if (EnabledCache)
            {
                CacheHelper.SetCache(text2, (object)text4, new CacheDependency(text));
            }
            return text4;
        }

        public static string GetViewService(string model, string viewtype, string viewname)
        {
            string text = GetFilePath(model, viewtype, viewname, true);
            if (!File.Exists(text))
            {
                return null;
            }
            string text2 = "view." + text.Substring(text.IndexOf("ui\\") + 3);
            if (EnabledCache)
            {
                string text3 = CacheHelper.GetCache(text2) as string;
                if (text3 != null)
                {
                    return text3;
                }
            }
            string text4 = File.ReadAllText(text);
            if (EnabledCache)
            {
                CacheHelper.SetCache(text2, (object)text4, new CacheDependency(text));
            }
            return text4;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelName"></param>
        /// <param name="mtype">模块类型</param>
        /// <param name="mtype2"></param>
        /// <param name="isService"></param>
        /// <returns></returns>
		private static string GetFilePath(string modelName, string mtype, string mtype2, bool isService)
        {
            string text = mtype.ToString();
            FastDev.DevDB.Model.Config.Model model = GetModelByModelName(modelName);
            string modelType = ((model == null) ? "others" : model.moduleName);
            if (string.IsNullOrEmpty(modelType))
            {
                modelType = "others";
            }
            if (text == "main")
            {
                text = "list";
            }
            if (!string.IsNullOrEmpty(mtype2))
            {
                text = mtype2;
            }
            string text3 = new HttpServerUtility(HttpContext.Current).MapPath(string.Format("~/ui/{0}/{1}{2}.js", modelName, isService ? "service_" : "", text));
            if (File.Exists(text3))
            {
                return text3;
            }
            return new HttpServerUtility(HttpContext.Current).MapPath(string.Format("~/ui/{0}/{1}/{2}{3}.js", modelType, modelName, isService ? "service_" : "", text));
        }

        public ServiceHelper()
        {


        }




    }
}
