using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FastDev.RunWeb.Code
{
    /// <summary>
    /// 关于报表
    /// </summary>
    public class ReportPrintData
    {

        private string reportModelName;

        private ServiceConfig reportModelConfig;


        private Dictionary<string, string> dicModuleTitles;

        /// <summary>
        /// 获取报表相关参数
        /// </summary>
        /// <param name="model"></param>
        /// <param name="arg"></param>
        /// <returns></returns>
        public ReportResult GetReportResult(string model, ReportArg arg)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            ReportResult reportResult = new ReportResult();
            reportModelName = model;
            reportModelConfig = ServiceHelper.GetServiceConfig(model);

            List<NameValue> list_0 = GetLegendNameValues(currentDb, arg);
            List<NameValue> list_1 = GetAxisNameValues(currentDb, arg);
            foreach (NameValue item in list_1)
            {
                reportResult.axis.Add(item.name);
            }
            foreach (NameValue item2 in list_0)
            {
                reportResult.legend.Add(item2.name);
                object obj = null;
                if (!string.IsNullOrEmpty(arg.axisField) && arg.legendType != "pie")
                {
                    List<object> list = new List<object>();
                    foreach (NameValue item3 in list_1)
                    {
                        FilterGroup group = GetDateTimeLegendFilter(currentDb, arg, item2.value, item3.value);
                        FilterTranslator filterTranslator = new FilterTranslator(group);
                        filterTranslator.Translate();
                        list.Add(GetCountValue(currentDb, arg.valueField, arg.valueFieldType, filterTranslator.CommandText, filterTranslator.Parms.ToArray()));
                    }
                    obj = list;
                }
                else
                {
                    FilterGroup group = GetDateTimeLegendFilter(currentDb, arg, item2.value, null);
                    FilterTranslator filterTranslator = new FilterTranslator(group);
                    filterTranslator.Translate();
                    obj = GetCountValue(currentDb, arg.valueField, arg.valueFieldType, filterTranslator.CommandText, filterTranslator.Parms.ToArray());
                }
                reportResult.series.Add(new
                {
                    name = item2.name,
                    value = obj
                });
            }
            return reportResult;

        }


        private List<NameValue> GetLegendNameValues(DbContext dbContext_3, ReportArg rArg)
        {
            List<NameValue> list = new List<NameValue>();
            string mName = reportModelName;

            if (rArg.legendFieldType == "text")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == rArg.legendField
                               select a).FirstOrDefault();
                if (field == null)
                {
                    throw new Exception("【" + rArg.legendField + "】字段未定义");
                }
                List<string> list2 = dbContext_3.Fetch<string>(string.Format("select distinct {0} from {1}", rArg.legendField, mName), new object[0]);
                foreach (string item in list2)
                {
                    list.Add(new NameValue
                    {
                        name = item,
                        value = item
                    });
                }
            }
            else if (rArg.legendFieldType == "ref")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == rArg.legendField
                               select a).FirstOrDefault();
                if (string.IsNullOrEmpty(field.relationModel))
                {
                    throw new Exception("【" + field.title + "】不是关联类型字段");
                }
                string text2 = rArg.legendFieldRefTextField;
                if (string.IsNullOrEmpty(text2))
                {
                    text2 = DataAccessHelper.GetModeTextField(field.relationModel);
                }
                List<string> list3 = dbContext_3.Fetch<string>(string.Format("select ID from {0}", field.relationModel), new object[0]);
                foreach (string item2 in list3)
                {
                    if (!(field.type == "many2one") || !rArg.legendIncludeDataOnly.HasValue || rArg.legendIncludeDataOnly.Value != 1 || dbContext_3.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1} = @0", mName, rArg.legendField + "ID"), new object[1]
                    {
                        item2
                    }) != 0)
                    {
                        string name = GetDBValue(dbContext_3, field.relationModel, text2, item2);
                        list.Add(new NameValue
                        {
                            name = name,
                            value = item2
                        });
                    }
                }
            }
            else if (rArg.legendFieldType == "selection")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == rArg.legendField
                               select a).FirstOrDefault();
                if (string.IsNullOrEmpty(field.fieldSelection))
                {
                    return list;
                }
                List<SelectionItem> list4 = JsonHelper.DeserializeJsonToList<SelectionItem>(field.fieldSelection);
                if (list4 == null || !list4.Any())
                {
                    return list;
                }
                new List<object>();
                foreach (SelectionItem item3 in list4)
                {
                    list.Add(new NameValue
                    {
                        name = item3.text,
                        value = item3.id
                    });
                }
            }
            else if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(rArg.legendFieldType))
            {
                List<RangeDateItem> list5 = GetRangeDates(dbContext_3, mName, rArg.legendField, rArg.legendFieldType);
                new List<object>();
                foreach (RangeDateItem item4 in list5)
                {
                    list.Add(new NameValue
                    {
                        name = item4.name,
                        value = item4.value
                    });
                }
            }
            return list;
        }


        private List<NameValue> GetAxisNameValues(DbContext dbContext_3, ReportArg reportArg_0)
        {
            List<NameValue> list = new List<NameValue>();
            if (string.IsNullOrEmpty(reportArg_0.axisField) || reportArg_0.legendType == "pie")
            {
                return list;
            }
            string text = reportModelName;

            if (reportArg_0.axisFieldType == "ref")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == reportArg_0.axisField
                               select a).FirstOrDefault();
                string text2 = reportArg_0.axisFieldRefTextField;
                if (string.IsNullOrEmpty(text2))
                {
                    text2 = DataAccessHelper.GetModeTextField(field.relationModel);
                }
                List<string> list2 = dbContext_3.Fetch<string>(string.Format("select ID from {0}", field.relationModel), new object[0]);
                foreach (string item in list2)
                {
                    if (!(field.type == "many2one") || !reportArg_0.axisIncludeDataOnly.HasValue || reportArg_0.axisIncludeDataOnly.Value != 1 || dbContext_3.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1} = @0", text, reportArg_0.axisField + "ID"), new object[1]
                    {
                        item
                    }) != 0)
                    {
                        string name = GetDBValue(dbContext_3, field.relationModel, text2, item);
                        list.Add(new NameValue
                        {
                            name = name,
                            value = item
                        });
                    }
                }
            }
            else if (reportArg_0.axisFieldType == "selection")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == reportArg_0.axisField
                               select a).FirstOrDefault();
                if (string.IsNullOrEmpty(field.fieldSelection))
                {
                    return list;
                }
                List<SelectionItem> list3 = JsonHelper.DeserializeJsonToList<SelectionItem>(field.fieldSelection);
                if (list3 == null || !list3.Any())
                {
                    return list;
                }
                new List<object>();
                foreach (SelectionItem item2 in list3)
                {
                    list.Add(new NameValue
                    {
                        name = item2.text,
                        value = item2.id
                    });
                }
            }
            else if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(reportArg_0.axisFieldType))
            {
                List<RangeDateItem> list4 = GetRangeDates(dbContext_3, text, reportArg_0.axisField, reportArg_0.axisFieldType);
                new List<object>();
                foreach (RangeDateItem item3 in list4)
                {
                    list.Add(new NameValue
                    {
                        name = item3.name,
                        value = item3.value
                    });
                }
            }
            return list;
        }


        private FilterGroup GetDateTimeLegendFilter(DbContext db, ReportArg arg, object xValue, object yValue)
        {
            FilterGroup filterGroup = new FilterGroup();
            if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(arg.legendFieldType))
            {
                RangeDateValue rangeDateValue = xValue as RangeDateValue;
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.legendField,
                    value = rangeDateValue.Min,
                    op = "greaterthanorequal"
                });
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.legendField,
                    value = rangeDateValue.Max,
                    op = "lessthanorequal"
                });
            }
            else if (arg.legendFieldType == "ref")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == arg.legendField
                               select a).FirstOrDefault();
                if (field.type == "many2one")
                {
                    filterGroup.rules.Add(new FilterRule
                    {
                        field = field.dbName,
                        value = xValue,
                        op = "equal"
                    });
                }
            }
            else
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.legendField,
                    value = xValue,
                    op = "equal"
                });
            }
            if (arg.dataFilter != null && (arg.dataFilter.rules.Any() || arg.dataFilter.groups.Any()))
            {
                filterGroup.groups.Add(arg.dataFilter);
            }
            if (!string.IsNullOrEmpty(arg.axisField) && arg.legendType != "pie")
            {
                FilterGroup filterGroup2 = GetDateTimeAxisFilter(db, arg, yValue);
                foreach (FilterRule rule in filterGroup2.rules)
                {
                    filterGroup.rules.Add(rule);
                }
            }
            return filterGroup;
        }


        private FilterGroup GetDateTimeAxisFilter(DbContext db, ReportArg arg, object dbValue)
        {
            FilterGroup filterGroup = new FilterGroup();
            if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(arg.axisFieldType))
            {
                RangeDateValue rangeDateValue = dbValue as RangeDateValue;
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.axisField,
                    value = rangeDateValue.Min,
                    op = "greaterthanorequal"
                });
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.axisField,
                    value = rangeDateValue.Max,
                    op = "lessthanorequal"
                });
            }
            else if (arg.axisFieldType == "ref")
            {
                Field field = (from a in reportModelConfig.fields
                               where a.name == arg.axisField
                               select a).FirstOrDefault();
                if (field.type == "many2one")
                {
                    filterGroup.rules.Add(new FilterRule
                    {
                        field = field.dbName,
                        value = dbValue,
                        op = "equal"
                    });
                }
            }
            else
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = arg.axisField,
                    value = dbValue,
                    op = "equal"
                });
            }
            return filterGroup;
        }


        private RangeDateValue GetRangeDateValue(DbContext dbContext_3, string string_7, string string_8)
        {
            DateTime min = dbContext_3.ExecuteScalar<DateTime>(string.Format("select min({0}) from {1}", string_8, string_7), new object[0]);
            DateTime max = dbContext_3.ExecuteScalar<DateTime>(string.Format("select max({0}) from {1}", string_8, string_7), new object[0]);
            return new RangeDateValue(min, max);
        }


        private List<RangeDateItem> GetRangeDates(DbContext dbContext_3, string string_7, string string_8, string string_9)
        {
            RangeDateValue rangeDateValue = GetRangeDateValue(dbContext_3, string_7, string_8);
            DateTime t = rangeDateValue.Min;
            DateTime t2 = rangeDateValue.Max;
            List<RangeDateItem> list = new List<RangeDateItem>();
            if (string_9 == "year")
            {
                t = new DateTime(t.Year, 1, 1, 0, 0, 0);
                t2 = new DateTime(t2.Year, 1, 1, 0, 0, 0).AddYears(1).AddSeconds(-1.0);
                DateTime dateTime = new DateTime(t.Year, 1, 1, 0, 0, 0);
                while (dateTime >= t && dateTime <= t2)
                {
                    list.Add(new RangeDateItem
                    {
                        name = dateTime.ToString("yyyy"),
                        value = new RangeDateValue(dateTime, dateTime.AddYears(1).AddSeconds(-1.0))
                    });
                    dateTime = dateTime.AddYears(1);
                }
            }
            if (string_9 == "month")
            {
                t = new DateTime(t.Year, t.Month, 1, 0, 0, 0);
                t2 = new DateTime(t2.Year, t2.Month, 1, 0, 0, 0).AddMonths(1).AddSeconds(-1.0);
                DateTime dateTime = new DateTime(t.Year, t.Month, 1, 0, 0, 0);
                while (dateTime >= t && dateTime <= t2)
                {
                    list.Add(new RangeDateItem
                    {
                        name = dateTime.ToString("yyyy-MM"),
                        value = new RangeDateValue(dateTime, dateTime.AddMonths(1).AddSeconds(-1.0))
                    });
                    dateTime = dateTime.AddMonths(1);
                }
            }
            if (string_9 == "day")
            {
                t = new DateTime(t.Year, t.Month, t.Day, 0, 0, 0);
                t2 = new DateTime(t2.Year, t2.Month, t2.Day, 0, 0, 0).AddDays(1.0).AddSeconds(-1.0);
                DateTime dateTime = new DateTime(t.Year, t.Month, t.Day, 0, 0, 0);
                while (dateTime >= t && dateTime <= t2)
                {
                    list.Add(new RangeDateItem
                    {
                        name = dateTime.ToString("yyyy-MM-dd"),
                        value = new RangeDateValue(dateTime, dateTime.AddDays(1.0).AddSeconds(-1.0))
                    });
                    dateTime = dateTime.AddDays(1.0);
                }
            }
            if (string_9 == "week")
            {
                t = new DateTime(t.Year, t.Month, t.Day, 0, 0, 0).AddDays((double)(-1 * (int)t.DayOfWeek));
                t2 = new DateTime(t2.Year, t2.Month, t2.Day, 0, 0, 0).AddDays((double)(6 - t2.DayOfWeek));
                DateTime dateTime = new DateTime(t.Year, t.Month, t.Day, 0, 0, 0);
                while (dateTime >= t && dateTime <= t2)
                {
                    list.Add(new RangeDateItem
                    {
                        name = dateTime.ToString("yyyy-MM-dd") + "至" + dateTime.AddDays(7.0).AddSeconds(-1.0).ToString("yyyy-MM-dd"),
                        value = new RangeDateValue(dateTime, dateTime.AddDays(7.0).AddSeconds(-1.0))
                    });
                    dateTime = dateTime.AddDays(7.0);
                }
            }
            return list;
        }


        private object GetCountValue(DbContext dbContext_3, string string_7, string string_8, string string_9, params object[] args)
        {
            string arg = "count(*)";
            if (!string.IsNullOrEmpty(string_7) && string_8 != "count")
            {
                arg = string.Format("{0}({1})", string_8, string_7);
            }
            string text = string.Format("select {0} from {1} where {2}", arg, reportModelName, string_9 ?? "1=1");
            return dbContext_3.ExecuteScalar<double?>(text, args);
        }


        private string GetModuleTitle(DbContext db, string moduleId)
        {
            if (dicModuleTitles.ContainsKey(moduleId))
            {
                return dicModuleTitles[moduleId];
            }
            dicModuleTitles[moduleId] = db.ExecuteScalar<string>("select ModuleTitle from Core_Module where ID = @0", new object[1]
            {
                moduleId
            });
            return dicModuleTitles[moduleId];
        }



        private string GetDBValue(DbContext dbContext_3, string tabName, string fieldName, string IdValue)
        {
            Field field = null;
            ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(tabName);
            if (serviceConfig != null)
            {
                field = (from a in serviceConfig.fields
                         where a.name == fieldName
                         select a).FirstOrDefault();
            }
            if (field != null && field.type.Contains("2"))
            {
                if (!(field.type == "many2one"))
                {
                    throw new Exception("不支持字段[" + field.name + "]的类型" + field.type);
                }
                string text = dbContext_3.ExecuteScalar<string>(string.Format("select {0} from {1} where ID = @0", field.dbName, tabName), new object[1]
                {
                    IdValue
                });
                return dbContext_3.ExecuteScalar<string>(string.Format("select {0} from {1} where ID = @0", serviceConfig.model.textField, serviceConfig.model.name), new object[1]
                {
                    text
                });
            }
            return dbContext_3.ExecuteScalar<string>(string.Format("select {0} from {1} where ID = @0", fieldName, tabName), new object[1]
            {
                IdValue
            });
        }




        public static string PerpareKanban(ServiceConfig sConfig, PrintData printData, List<Dictionary<string, object>> dicKanbanRecord,string strKanBanTemplate, string strTemplateOut)
        {
            Regex regex = new Regex("{(.*?)}");
            List<Field> fields = sConfig.fields;
            MatchCollection matchCollection = regex.Matches(strKanBanTemplate);
            if (matchCollection.Count > 0 && dicKanbanRecord != null && dicKanbanRecord.Any())
            {
                foreach (Dictionary<string, object> item in dicKanbanRecord)
                {
                    string text = strKanBanTemplate.ToString();
                    for (int num = matchCollection.Count - 1; num >= 0; num--)
                    {
                        Match match = matchCollection[num];
                        string value = match.Groups[1].Value;
                        string field = value.Contains(":") ? value.Substring(0, value.IndexOf(':')) : value;
                        field = (field.Contains(",") ? field.Split(',')[1] : field);
                        string text2 = value.Contains(":") ? value.Substring(value.IndexOf(':') + 1) : "";
                        Field field2 = fields.FirstOrDefault((Field a) => a.name == field);
                        string text3 = "";
                        if (item.ContainsKey(field))
                        {
                            if ((field2 != null && field2.type == "many2one") || field.ToLower() == "createuser" || field.ToLower() == "modifyuser")
                            {
                                List<string> list = item[field] as List<string>;
                                text3 = list[1];
                                if (!string.IsNullOrEmpty(text2))
                                {
                                    text3 = printData.DoWithSystemMark(text3, text2);
                                }
                            }
                            else if (field2 != null && field2.type == "many2many")
                            {
                                List<List<string>> list2 = item[field] as List<List<string>>;
                                List<string> list3 = new List<string>();
                                foreach (List<string> item2 in list2)
                                {
                                    list3.Add(item2[1]);
                                }
                                text3 = string.Join(",", list3);
                                if (!string.IsNullOrEmpty(text2))
                                {
                                    text3 = printData.DoWithSystemMark(text3, text2);
                                }
                            }
                            else
                            {
                                text3 = printData.DoWithSystemMark(item[field], text2);
                            }
                        }
                        text = text.Substring(0, match.Index) + text3 + text.Substring(match.Index + match.Value.Length);
                    }
                    strTemplateOut += text;
                }
            }
            return strTemplateOut;
        }
    }
}
