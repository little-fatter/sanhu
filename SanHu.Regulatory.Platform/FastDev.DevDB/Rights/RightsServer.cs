using FastDev.Common;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Runtime.CompilerServices;
using ObEx = FastDev.Common.Extensions.ObjectExtensions;

namespace FastDev.DevDB.Rights
{
    public class RightsServer
    {
        private DbContext dbContext_0;

        private Dictionary<string, string> dictionary_0;



        private string GetAppAdminRoleID()
        {
            return ConfigurationManager.AppSettings["AppAdminRoleID"];
        }

        private string method_1(string modelName)
        {
            if (string.IsNullOrEmpty(modelName))
            {
                return "";
            }
            if (dictionary_0.ContainsKey(modelName))
            {
                return dictionary_0[modelName];
            }
            dictionary_0[modelName] = dbContext_0.ExecuteScalar<string>("select ModuleTitle from Core_Module where ID = @0", new object[1]
            {
                modelName
            });
            return dictionary_0[modelName];
        }

        public RightsServer(DbContext db)
        {

            dbContext_0 = null;
            dictionary_0 = new Dictionary<string, string>();

            dbContext_0 = db;
        }

        public void LoadSystemVariable()
        {
            try
            {
                List<core_variable> list = dbContext_0.Fetch<core_variable>("", new object[0]);
                foreach (core_variable item in list)
                {
                    if (!string.IsNullOrEmpty(item.VariableName))
                    {
                        if (!string.IsNullOrEmpty(item.VariableValue))
                        {
                            SysContext.SetVariableValue(item.VariableName, item.VariableValue);
                        }
                        else if (!string.IsNullOrEmpty(item.VariableExpression))
                        {
                            try
                            {
                                string value = dbContext_0.ExecuteScalar<string>(item.VariableExpression, new object[1]
                                {
                                    SysContext.WanJiangUserID
                                });
                                SysContext.SetVariableValue(item.VariableName, value);
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

        public FilterGroup AppendDataFilter(string modelName, FilterGroup filter)
        {
            List<FilterGroup> dataFilters = GetDataFilters(modelName);
            if (!dataFilters.Any())
            {
                return filter;
            }
            if (dataFilters.Count == 1)
            {
                FilterGroup filterGroup = new FilterGroup();
                filterGroup.op = "and";
                filterGroup.groups = new List<FilterGroup>
                {
                    filter,
                    dataFilters[0]
                };
                return filterGroup;
            }
            FilterGroup filterGroup2 = new FilterGroup();
            filterGroup2.op = "or";
            filterGroup2.groups = dataFilters;
            FilterGroup item = filterGroup2;
            FilterGroup filterGroup3 = new FilterGroup();
            filterGroup3.op = "and";
            filterGroup3.groups = new List<FilterGroup>
            {
                filter,
                item
            };
            return filterGroup3;
        }

        public bool CurrentUserIsAdmin()
        {
            DbContext dbContext = dbContext_0;
            string currentUserID = SysContext.WanJiangUserID;
            List<string> list = WanJiangAuth.GetRoleUsers(currentUserID);
            return list.Contains(GetAppAdminRoleID());
        }

        public List<string> GetMenuIds()
        {
            new List<FilterGroup>();
            DbContext dbContext = dbContext_0;

            string currentUserID = SysContext.FastDevUserID;
            List<string> list = WanJiangAuth.GetRoleUsers(currentUserID);
            if (list.Contains(GetAppAdminRoleID()))
            {
                return dbContext.Fetch<string>("select ID from Core_Menu", new object[0]);
            }
            List<string> list2 = new List<string>();
            foreach (string item2 in list)
            {
                core_right core_rights = dbContext.FirstOrDefault<core_right>("where MasterType = @0 and MasterID = @1", new object[2]
                {
                    "role",
                    item2
                });
                if (core_rights != null && !string.IsNullOrEmpty(core_rights.RightsValue))
                {
                    RightsSaveModel rightsSaveModel = JsonHelper.DeserializeJsonToObject<RightsSaveModel>(core_rights.RightsValue);
                    if (rightsSaveModel != null && rightsSaveModel.menuRights != null)
                    {
                        string[] array = rightsSaveModel.menuRights.Split(';');
                        string[] array2 = array;
                        foreach (string item in array2)
                        {
                            if (!list2.Contains(item))
                            {
                                list2.Add(item);
                            }
                        }
                    }
                }
            }
            return list2;
        }

        public List<FilterGroup> GetDataFilters(string modelName)
        {
            List<FilterGroup> list = new List<FilterGroup>();
            DbContext dbContext = dbContext_0;

            string currentUserID = SysContext.WanJiangUserID;
            List<string> lstRoles = WanJiangAuth.GetRoleUsers(currentUserID);
            //string.Join(",", lstRoles.Select(l=> "'" + l + "'").ToArray());
            foreach (string item in lstRoles)
            {
                core_right core_rights = dbContext.FirstOrDefault<core_right>("where MasterType = @0 and MasterID = @1", new object[2]
                {
                    "role",
                    item
                });
                if (core_rights != null && !string.IsNullOrEmpty(core_rights.RightsValue))
                {
                    RightsSaveModel rightsSaveModel = JsonHelper.DeserializeJsonToObject<RightsSaveModel>(core_rights.RightsValue);
                    if (rightsSaveModel != null)
                    {
                        RightsDataSaveModel rightsDataSaveModel = (from a in rightsSaveModel.dataRights
                                                                   where a.modelName == modelName
                                                                   select a).FirstOrDefault();
                        if (rightsDataSaveModel != null)
                        {
                            core_dataRightsRule core_dataRightsRule = null;
                            core_dataRightsRule = dbContext.FirstOrDefault<core_dataRightsRule>("where RuleEnabled = 1 and ID = @0", new object[1]
                            {
                                rightsDataSaveModel.rightsValue
                            });
                            if (core_dataRightsRule != null && !string.IsNullOrEmpty(core_dataRightsRule.RuleContent))
                            {
                                FilterGroup filterGroup = JsonHelper.DeserializeJsonToObject<FilterGroup>(core_dataRightsRule.RuleContent);
                                if (filterGroup != null)
                                {
                                    list.Add(filterGroup);
                                }
                            }
                        }
                    }
                }
            }
            MappingFilterAndModelField(list, modelName);
            return list;
        }

        private void MappingFilterAndModelField(List<FilterGroup> fGroups, string model)
        {
            if (fGroups.Any())
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model);
                foreach (FilterGroup item in fGroups)
                {
                    MappingFields(item, serviceConfig.fields);
                }
            }
        }

        private void MappingFields(FilterGroup filterGroup_0, List<Field> fields)
        {
            int num = 0;
            while (filterGroup_0.groups != null && num < filterGroup_0.groups.Count)
            {
                FilterGroup filterGroup_ = filterGroup_0.groups[num];
                MappingFields(filterGroup_, fields);
                num++;
            }
            num = 0;
            while (filterGroup_0.rules != null && num < filterGroup_0.rules.Count)
            {
                FilterRule rule = filterGroup_0.rules[num];
                Field field = fields.FirstOrDefault((Field a) => a.name == rule.field && a.type == FieldTypes.Many2one);
                if (field != null)
                {
                    rule.field = field.dbName;
                    object[] array = rule.value as object[];
                    if (array != null && array.Any())
                    {
                        array = (array[0] as object[]);
                        if (array != null && array.Any())
                        {
                            rule.value = array[0].ToString();
                        }
                    }
                }
                num++;
            }
        }

        public List<string> GetDisabledFields(string modelId)
        {
            RunTimeModel runTime = GetRunTime(modelId, 3);
            return runTime.field["disableFields"] as List<string>;
        }

        public bool CheckFun(string modelName, string funName)
        {
            RunTimeModel runTime = GetRunTime(modelName, 2);
            return runTime.fun.ContainsKey(funName) && ObEx.ToInt(runTime.fun[funName]) == 1;
        }

        public RunTimeModel GetRunTime(string modelName, int getType = 1)
        {
            RunTimeModel runTimeModel = new RunTimeModel();
            DbContext dbContext = dbContext_0;
            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            string currentUserID = SysContext.WanJiangUserID;
            List<string> list = WanJiangAuth.GetRoleUsers(currentUserID);
            List<string> list2 = new List<string>();
            List<string> list3 = new List<string>();
            List<string> list4 = new List<string>();
            core_funRightsRule core_funRightsRule = null;
            List<RightsDataSaveModel> fnRights = new List<RightsDataSaveModel>();
            foreach (string item in list)
            {
                core_right core_rights = dbContext.FirstOrDefault<core_right>("where MasterType = @0 and MasterID = @1", new object[2]
                {
                    "role",
                    item
                });
                if (core_rights != null && !string.IsNullOrEmpty(core_rights.RightsValue))
                {
                    RightsSaveModel rightsSaveModel = JsonHelper.DeserializeJsonToObject<RightsSaveModel>(core_rights.RightsValue);
                    if (rightsSaveModel != null)
                    {
                        RightsDataSaveModel rightsDataSaveModel = (from a in rightsSaveModel.funRights
                                                                   where string.Compare(a.modelName, modelName, true) == 0
                                                                   select a).FirstOrDefault();
                        RightsDataSaveModel rightsDataSaveModel2 = (from a in rightsSaveModel.fieldRights
                                                                    where string.Compare(a.modelName, modelName, true) == 0
                                                                    select a).FirstOrDefault();
                        if (rightsDataSaveModel != null)
                        {
                            fnRights.Add(rightsDataSaveModel);
                        }
                        if (getType != 2 && rightsDataSaveModel2 != null && !string.IsNullOrEmpty(rightsDataSaveModel2.rightsValue))
                        {
                            core_fieldRightsRule core_fieldRightsRule = null;
                            core_fieldRightsRule = dbContext.FirstOrDefault<core_fieldRightsRule>("where RuleEnabled = 1 and ID = @0", new object[1]
                            {
                                rightsDataSaveModel2.rightsValue
                            });
                            if (core_fieldRightsRule != null && !string.IsNullOrEmpty(core_fieldRightsRule.RuleContent))
                            {
                                List<FieldRuleItem> list5 = JsonHelper.DeserializeJsonToList<FieldRuleItem>(core_fieldRightsRule.RuleContent);
                                foreach (FieldRuleItem item2 in list5)
                                {
                                    if (item2.disable == 1)
                                    {
                                        list2.Add(item2.field);
                                    }
                                    else if (item2.enable == 1)
                                    {
                                        list3.Add(item2.field);
                                    }
                                    else
                                    {
                                        list4.Add(item2.field);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (getType != 3 && core_funRightsRule == null)
            {
                core_funRightsRule = dbContext.FirstOrDefault<core_funRightsRule>("where RuleEnabled = 1 and ModelName = @0", new object[1]
                {
                    modelName
                });
            }
            List<SelectionItem> extendsRight = null;
            ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
            if (core_funRightsRule != null)
            {
                string[] array = new string[7]
                {
                    "enabledVisit",
                    "enabledAdd",
                    "enabledDel",
                    "enabledEdit",
                    "enabledImport",
                    "enabledExport",
                    "enabledPrint"
                };
                string[] array2 = array;
                for (int i = 0; i < array2.Length; i++)
                {
                    Func<RightsDataSaveModel, bool> func = null;
                    string btn = array2[i];
                    List<RightsDataSaveModel> source = fnRights;
                    func = ((RightsDataSaveModel a) => a.rightsValue != null && a.rightsValue.Contains(btn));
                    if (source.Any(func))
                    {
                        dictionary[btn] = 1;
                    }
                }
                if (serviceConfig == null)
                {
                    using (List<string>.Enumerator enumerator = array.Where(r => r != "enabledVisit").ToList().GetEnumerator())
                    {
                        while (enumerator.MoveNext())
                        {
                            Func<RightsDataSaveModel, bool> func2 = null;
                            string btn2 = enumerator.Current;
                            List<RightsDataSaveModel> source2 = fnRights;
                            func2 = ((RightsDataSaveModel a) => a.rightsValue != null && a.rightsValue.Contains(btn2));
                            if (source2.Any(func2))
                            {
                                dictionary[btn2] = 0;
                            }
                        }
                    }
                }
                if (!string.IsNullOrEmpty(core_funRightsRule.EnabledButtons))
                {
                    extendsRight = JsonHelper.DeserializeJsonToList<SelectionItem>(core_funRightsRule.EnabledButtons);
                    if (extendsRight != null)
                    {
                        extendsRight = extendsRight.Where(ex=>
                        {
                          return fnRights.Any(fn => fn.rightsValue.Contains(ex.id));
                        }).ToList();
                    }
                    dictionary["extends"] = extendsRight;
                }
            }
            else
            {
                string[] array = new string[4]
                {
                    "enabledVisit",
                    "enabledAdd",
                    "enabledDel",
                    "enabledEdit"
                };
                string[] array2 = array;
                foreach (string text in array2)
                {
                    if (serviceConfig == null && text != "enabledVisit")
                    {
                        dictionary[text] = 0;
                    }
                    else
                    {
                        dictionary[text] = 1;
                    }
                }
            }
            if (string.Compare(modelName, "core_role") == 0 && CurrentUserIsAdmin())
            {
                if (extendsRight != null)
                {
                    if (!extendsRight.Any(r => r.id == "rights"))
                    {
                        extendsRight.Add(new SelectionItem
                        {
                            id = "rights",
                            text = "权限管理"
                        });
                        dictionary["extends"] = extendsRight;
                    }
                }
                else
                {
                    extendsRight = new List<SelectionItem>();
                    extendsRight.Add(new SelectionItem
                    {
                        id = "rights",
                        text = "权限管理"
                    });
                    dictionary["extends"] = extendsRight;
                }
            }
            runTimeModel.fun = dictionary;
            List<string> list7 = new List<string>();
            foreach (string item3 in list2)
            {
                list7.Add(item3);
            }
            foreach (string item4 in list4)
            {
                if (!list3.Contains(item4))
                {
                    list7.Add(item4);
                }
            }
            runTimeModel.field = new Dictionary<string, object>
            {
                {
                    "disableFields",
                    list7
                }
            };
            return runTimeModel;
        }

        public RightsModel Get(RightsMasterType masterType, string masterId)
        {
            DbContext dbContext = dbContext_0;

            if (masterType != RightsMasterType.Role)
            {
            }
            RightsModel rightsModel = new RightsModel();
            List<core_funRightsRule> list = dbContext.Fetch<core_funRightsRule>("where RuleEnabled = 1", new object[0]);
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            dictionary.Add("enabledVisit", "访问");
            dictionary.Add("enabledAdd", "新增");
            dictionary.Add("enabledEdit", "编辑");
            dictionary.Add("enabledDel", "删除");
            dictionary.Add("enabledImport", "导入");
            dictionary.Add("enabledExport", "导出");
            dictionary.Add("enabledPrint", "打印");
            Dictionary<string, string> dictionary2 = dictionary;
            List<string> list2 = new List<string>();
            foreach (core_funRightsRule item in list)
            {
                string modelName = item.ModelName;
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
                if (!rightsModel.funRights.Any((RightsDataModel a) => a.modelName == modelName))
                {
                    List<object> list3 = new List<object>();
                    if (item.EnabledVisit == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledVisit",
                            text = dictionary2["enabledVisit"]
                        });
                        list2.Add("enabledVisit");
                    }
                    if (item.EnabledAdd == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledAdd",
                            text = dictionary2["enabledAdd"]
                        });
                        list2.Add("enabledAdd");
                    }
                    if (item.EnabledEdit == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledEdit",
                            text = dictionary2["enabledEdit"]
                        });
                        list2.Add("enabledEdit");
                    }
                    if (item.EnabledDel == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledDel",
                            text = dictionary2["enabledDel"]
                        });
                        list2.Add("enabledDel");
                    }
                    if (item.EnabledImport == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledImport",
                            text = dictionary2["enabledImport"]
                        });
                        list2.Add("enabledImport");
                    }
                    if (item.EnabledExport == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledExport",
                            text = dictionary2["enabledExport"]
                        });
                        list2.Add("enabledExport");
                    }
                    if (item.EnabledPrint == 1)
                    {
                        list3.Add(new
                        {
                            id = "enabledPrint",
                            text = dictionary2["enabledPrint"]
                        });
                        list2.Add("enabledPrint");
                    }
                    if (!string.IsNullOrEmpty(item.EnabledButtons))
                    {
                        List<SelectionItem> list4 = JsonHelper.DeserializeJsonToList<SelectionItem>(item.EnabledButtons);
                        if (list4 != null)
                        {
                            list3.AddRange(list4);
                        }
                    }
                    if (serviceConfig == null)
                    {
                        rightsModel.funRights.Add(new RightsDataModel
                        {
                            modelName = item.ModelName,
                            modelTitle = item.ModelName,
                            rules = list3,
                            rightsValue = string.Join(";", list2)
                        });
                    }
                    else
                    {
                        rightsModel.funRights.Add(new RightsDataModel
                        {
                            modelName = serviceConfig.model.name,
                            modelTitle = serviceConfig.model.title,
                            moduleName = serviceConfig.model.moduleName,
                            moduleTitle = serviceConfig.model.moduleTitle,
                            rules = list3,
                            rightsValue = string.Join(";", list2)
                        });
                    }
                }
            }
            List<core_dataRightsRule> source = dbContext.Fetch<core_dataRightsRule>("where RuleEnabled = 1", new object[0]);
            List<string> list5 = source.Select(r => r.ModelName).Distinct().ToList();
            foreach (string item2 in list5)
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(item2);
                if (serviceConfig != null)
                {
                    List<core_dataRightsRule> list6 = (from a in source
                                                       where a.ModelName == item2
                                                       select a).ToList();
                    List<object> list3 = new List<object>();
                    foreach (core_dataRightsRule item3 in list6)
                    {
                        if (item3 != null)
                        {
                            list3.Add(new
                            {
                                id = item3.ID,
                                text = item3.Title
                            });
                        }
                    }
                    rightsModel.dataRights.Add(new RightsDataModel
                    {
                        modelName = serviceConfig.model.name,
                        modelTitle = serviceConfig.model.title,
                        moduleName = serviceConfig.model.moduleName,
                        moduleTitle = serviceConfig.model.moduleTitle,
                        rules = list3
                    });
                }
            }
            List<core_fieldRightsRule> lstRule = dbContext.Fetch<core_fieldRightsRule>("where RuleEnabled = 1", new object[0]);
            List<string> list7 = lstRule.Select(r => r.ModelName).Distinct().ToList();
            foreach (string item4 in list7)
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(item4);
                if (serviceConfig != null)
                {
                    List<core_fieldRightsRule> list8 = (from a in lstRule
                                                        where a.ModelName == item4
                                                        select a).ToList();
                    List<object> list3 = new List<object>();
                    foreach (core_fieldRightsRule item5 in list8)
                    {
                        if (item5 != null)
                        {
                            list3.Add(new
                            {
                                id = item5.ID,
                                text = item5.Title
                            });
                        }
                    }
                    rightsModel.fieldRights.Add(new RightsDataModel
                    {
                        modelName = serviceConfig.model.name,
                        modelTitle = serviceConfig.model.title,
                        moduleName = serviceConfig.model.moduleName,
                        moduleTitle = serviceConfig.model.moduleTitle,
                        rules = list3
                    });
                }
            }
            core_right core_rights = dbContext.FirstOrDefault<core_right>("where MasterType = @0 and MasterID = @1", new object[2]
            {
                "role",
                masterId
            });
            if (core_rights != null && !string.IsNullOrEmpty(core_rights.RightsValue))
            {
                RightsSaveModel rightsSaveModel = JsonHelper.DeserializeJsonToObject<RightsSaveModel>(core_rights.RightsValue);
                if (rightsSaveModel != null)
                {
                    rightsModel.menuRights = rightsSaveModel.menuRights;
                    using (List<RightsDataSaveModel>.Enumerator enumerator5 = rightsSaveModel.funRights.GetEnumerator())
                    {
                        while (enumerator5.MoveNext())
                        {
                            Func<RightsDataModel, bool> func = null;
                            RightsDataSaveModel value = enumerator5.Current;
                            List<RightsDataModel> funRights = rightsModel.funRights;
                            func = ((RightsDataModel a) => a.modelName == value.modelName);
                            RightsDataModel rightsDataModel = funRights.FirstOrDefault(func);
                            if (rightsDataModel != null)
                            {
                                rightsDataModel.rightsValue = value.rightsValue;
                            }
                        }
                    }
                    using (List<RightsDataSaveModel>.Enumerator enumerator5 = rightsSaveModel.dataRights.GetEnumerator())
                    {
                        while (enumerator5.MoveNext())
                        {
                            Func<RightsDataModel, bool> func2 = null;
                            RightsDataSaveModel value2 = enumerator5.Current;
                            List<RightsDataModel> dataRights = rightsModel.dataRights;
                            func2 = ((RightsDataModel a) => a.modelName == value2.modelName);
                            RightsDataModel rightsDataModel2 = dataRights.FirstOrDefault(func2);
                            if (rightsDataModel2 != null)
                            {
                                rightsDataModel2.rightsValue = value2.rightsValue;
                            }
                        }
                    }
                    using (List<RightsDataSaveModel>.Enumerator enumerator5 = rightsSaveModel.fieldRights.GetEnumerator())
                    {
                        while (enumerator5.MoveNext())
                        {
                            Func<RightsDataModel, bool> func3 = null;
                            RightsDataSaveModel value3 = enumerator5.Current;
                            List<RightsDataModel> fieldRights = rightsModel.fieldRights;
                            func3 = ((RightsDataModel a) => a.modelName == value3.modelName);
                            RightsDataModel rightsDataModel = fieldRights.FirstOrDefault(func3);
                            if (rightsDataModel != null)
                            {
                                rightsDataModel.rightsValue = value3.rightsValue;
                            }
                        }
                    }
                }
            }
            return rightsModel;
        }

        public string Save(RightsMasterType masterType, string masterId, RightsSaveModel value)
        {
            DbContext dbContext = dbContext_0;

            string text = (masterType == RightsMasterType.User) ? "user" : "role";
            core_right core_rights = dbContext.FirstOrDefault<core_right>("where masterType = @0 and masterId = @1", new object[2]
            {
                text,
                masterId
            });
            bool flag = core_rights == null;
            if (core_rights == null)
            {
                core_rights = new core_right();
                core_rights.ID = Guid.NewGuid().ToString();
                core_rights.CreateDate = DateTime.Now;
                core_rights.CreateUserID = SysContext.WanJiangUserID;
                core_rights.MasterType = text;
                core_rights.MasterID = masterId;
            }
            core_rights.ModifyDate = DateTime.Now;
            core_rights.ModifyUserID = SysContext.WanJiangUserID;
            core_rights.RightsValue = JsonHelper.SerializeObject(value);
            if (flag)
            {
                dbContext.Insert(core_rights);
            }
            else
            {
                dbContext.Update(core_rights);
            }
            return core_rights.ID;
        }






    }
}
