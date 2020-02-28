using FastDev.Common;
using FastDev.Common.Extensions;
using FastDev.DevDB;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FastDev.RunWeb.Code
{
    public class PrintData
    {
        public PrintData() { }
        public PrintData(string tempid)
        {
            string_0 = tempid;
        }
        public PrintData(core_printTemplate core_printTemplate_0)
        {
            this.core_printTemplate_0 = core_printTemplate_0;
        }
        public PrintData(core_reportTemplate coreReportTemp)
        {
            this.coreReportTemp = coreReportTemp;
        }
        public core_printTemplate core_printTemplate_0 { get; set; }
        public core_reportTemplate coreReportTemp{ get; set; }

        public Dictionary<string, object> dictionary_0 { get; set; }

        public Dictionary<string, object> dictionary_1 { get; set; }

        public string string_0 { get; set; }
        public HttpServerUtility Server
        {
            get
            {
                return new HttpServerUtility();
            }
        }
        /// <summary>
        /// 模板设置默认值 method_2
        /// </summary>
        public void SetDefaultTemplateData()
        {
            if (core_printTemplate_0 != null)
            {
                if (!core_printTemplate_0.MarginLeft.HasValue)
                {
                    core_printTemplate_0.MarginLeft = 10m;
                }
                if (!core_printTemplate_0.MarginRight.HasValue)
                {
                    core_printTemplate_0.MarginRight = 10m;
                }
                if (!core_printTemplate_0.MarginTop.HasValue)
                {
                    core_printTemplate_0.MarginTop = 10m;
                }
                if (!core_printTemplate_0.MarginBottom.HasValue)
                {
                    core_printTemplate_0.MarginBottom = 10m;
                }
                if (!core_printTemplate_0.Width.HasValue)
                {
                    core_printTemplate_0.Width = 210m;
                }
                if (!core_printTemplate_0.Height.HasValue)
                {
                    core_printTemplate_0.Height = 297m;
                }
                if (!core_printTemplate_0.PageSize.HasValue)
                {
                    core_printTemplate_0.PageSize = 20;
                }
            }
            if (coreReportTemp != null)
            {
                if (!coreReportTemp.MarginLeft.HasValue)
                {
                    coreReportTemp.MarginLeft = 10m;
                }
                if (!coreReportTemp.MarginRight.HasValue)
                {
                    coreReportTemp.MarginRight = 10m;
                }
                if (!coreReportTemp.MarginTop.HasValue)
                {
                    coreReportTemp.MarginTop = 10m;
                }
                if (!coreReportTemp.MarginBottom.HasValue)
                {
                    coreReportTemp.MarginBottom = 10m;
                }
                if (!coreReportTemp.Width.HasValue)
                {
                    coreReportTemp.Width = 210m;
                }
                if (!coreReportTemp.Height.HasValue)
                {
                    coreReportTemp.Height = 297m;
                }
                if (!coreReportTemp.PageSize.HasValue)
                {
                    coreReportTemp.PageSize = 20;
                }
            }
        }
        public List<TemplatePageInfo> method_1(string string_7)
        {
            List<TemplatePageInfo> list = new List<TemplatePageInfo>();
            if (core_printTemplate_0 != null)
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                string detailFieldName = GetReportDetialHtml();
                int num = 1;
                if (string.IsNullOrEmpty(detailFieldName))
                {
                    string[] array = string_7.Split(';');
                    foreach (string context in array)
                    {
                        int num2 = 1;
                        List<TemplatePageInfo> list2 = list;
                        TemplatePageInfo templatePageInfo = new TemplatePageInfo
                        {
                            Context = context
                        };
                        TemplatePageInfo templatePageInfo2 = templatePageInfo;
                        num2 = 2;
                        templatePageInfo2.PageIndex = 1;
                        templatePageInfo.AllPageIndex = num++;
                        list2.Add(templatePageInfo);
                    }
                }
                else
                {
                    DbContext currentDb = SysContext.GetCurrentDb();
                    Field field = (from a in serviceConfig.fields
                                   where a.name == detailFieldName
                                   select a).FirstOrDefault();
                    if (field != null)
                    {
                        ServiceHelper.GetService(field.relationModel);
                        string[] array = string_7.Split(';');
                        foreach (string context in array)
                        {
                            int num2 = 1;
                            int num4 = currentDb.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1} = @0", field.relationModel, field.relationField), new object[1]
                            {
                                context
                            });
                            double a2 = (double)num4 * 1.0 / (double)core_printTemplate_0.PageSize.Value;
                            int num5 = (int)Math.Ceiling(a2);
                            if (num5 == 0)
                            {
                                list.Add(new TemplatePageInfo
                                {
                                    Context = context,
                                    PageIndex = num2++,
                                    AllPageIndex = num++
                                });
                            }
                            else
                            {
                                for (int j = 1; j <= num5; j++)
                                {
                                    list.Add(new TemplatePageInfo
                                    {
                                        Context = context,
                                        PageIndex = num2++,
                                        AllPageIndex = num++
                                    });
                                }
                            }
                        }
                    }
                }
            }
            return list;
        }
        public List<string> method_4(string string_7, int? currentPage, bool bool_0)
        {
            IService service = ServiceHelper.GetService(core_printTemplate_0.ModelName);
            List<string> list = new List<string>();
            List<TemplatePageInfo> list2 = method_1(string_7);
            int num = (!currentPage.HasValue) ? 1 : currentPage.Value;
            dictionary_1["page"] = ObjectExtensions.ToStr((object)num);
            dictionary_1["pagecount"] = ObjectExtensions.ToStr((object)list2.Count);
            for (int i = 1; i <= list2.Count; i++)
            {
                if (i != num && !bool_0)
                {
                    list.Add(null);
                }
                else
                {
                    TemplatePageInfo templatePageInfo = list2[i - 1];
                    string context = templatePageInfo.Context;
                    string_0 = core_printTemplate_0.TemplateBody;
                    string detailFieldName = GetReportDetialHtml();
                    if (!string.IsNullOrEmpty(detailFieldName))
                    {
                        dictionary_0 = service.GetDetailData(context, null, false);
                        ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                        Field field = (from a in serviceConfig.fields
                                       where a.name == detailFieldName
                                       select a).FirstOrDefault();
                        if (field != null)
                        {
                            IService service2 = ServiceHelper.GetService(field.relationModel);
                            PagedData pagedData = service2.GetPageData(new QueryDescriptor
                            {
                                SortName = "CreateDate",
                                SortOrder = "asc",
                                PageIndex = templatePageInfo.PageIndex,
                                PageSize = core_printTemplate_0.PageSize.Value,
                                Condition = new FilterGroup
                                {
                                    op = "and",
                                    rules = new List<FilterRule>
                                    {
                                        new FilterRule(field.relationField, context, "equal")
                                    }
                                }
                            }) as PagedData;
                            dictionary_0[detailFieldName] = pagedData.Records;
                            method_8();
                            method_9();
                            string text = string_0.ToString();
                            text = text.Replace("{#page}", ObjectExtensions.ToStr((object)i));
                            text = text.Replace("{#pagecount}", ObjectExtensions.ToStr((object)list2.Count));
                            list.Add(text);
                            continue;
                        }
                    }
                    dictionary_0 = service.GetDetailData(context, null);
                    method_8();
                    method_9();
                    string text2 = string_0.ToString();
                    text2 = text2.Replace("{#page}", ObjectExtensions.ToStr((object)i));
                    text2 = text2.Replace("{#pagecount}", ObjectExtensions.ToStr((object)list2.Count));
                    list.Add(text2);
                }
            }
            return list;
        }

        public void method_8()
        {
            try
            {
                Regex regex = new Regex("<!--START-->([\\s\\S]*?)<!--END-->");
                Regex regex2 = new Regex("{(.*?)}");
                List<Dictionary<string, object>> list = null;
                MatchCollection matchCollection = regex.Matches(string_0);
                if (matchCollection.Count > 0)
                {
                    List<string> list2 = new List<string>();
                    for (int i = 0; i < matchCollection.Count; i++)
                    {
                        list2.Add(matchCollection[i].Value);
                    }
                    StringBuilder stringBuilder = new StringBuilder();
                    foreach (string item in list2)
                    {
                        Regex regex3 = new Regex("data-field=\"(.*?)\"");
                        MatchCollection matchCollection2 = regex3.Matches(item);
                        if (matchCollection2.Count == 0)
                        {
                            return;
                        }
                        string fieldName = matchCollection2[0].Groups[1].Value;
                        ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                        Field field2 = serviceConfig.fields.FirstOrDefault((Field a) => a.name == fieldName);
                        if (field2 == null)
                        {
                            return;
                        }
                        ServiceConfig serviceConfig2 = ServiceHelper.GetServiceConfig(field2.relationModel);
                        List<Field> fields = serviceConfig2.fields;
                        List<Dictionary<string, object>> list3 = null;
                        if (dictionary_0.ContainsKey(fieldName))
                        {
                            list3 = (dictionary_0[fieldName] as List<Dictionary<string, object>>);
                        }
                        if (list3 != null && list3.Any())
                        {
                            if (list == null)
                            {
                                list = list3;
                            }
                            MatchCollection matchCollection3 = regex2.Matches(item);
                            int num = -1;
                            foreach (Dictionary<string, object> item2 in list3)
                            {
                                num++;
                                string text = item.ToString();
                                for (int i = matchCollection3.Count - 1; i >= 0; i--)
                                {
                                    Match match = matchCollection3[i];
                                    string value = match.Groups[1].Value;
                                    string field = value.Contains(":") ? value.Substring(0, value.IndexOf(':')) : value;
                                    field = (field.Contains(",") ? field.Split(',')[1] : field);
                                    string string_ = value.Contains(":") ? value.Substring(value.IndexOf(':') + 1) : "";
                                    Field field3 = fields.FirstOrDefault((Field a) => a.name == field);
                                    string text2 = "";
                                    if (field == "rownumbers")
                                    {
                                        text2 = method_25(num + 1, string_);
                                    }
                                    else if (item2.ContainsKey(field))
                                    {
                                        if ((field3 != null && field3.type == "many2one") || field.ToLower() == "createuser" || field.ToLower() == "modifyuser")
                                        {
                                            List<string> list4 = item2[field] as List<string>;
                                            text2 = list4[1];
                                        }
                                        else if (field3 != null && field3.type == "many2many")
                                        {
                                            List<List<string>> list5 = item2[field] as List<List<string>>;
                                            List<string> list6 = new List<string>();
                                            foreach (List<string> item3 in list5)
                                            {
                                                list6.Add(item3[1]);
                                            }
                                            text2 = string.Join(",", list6);
                                        }
                                        else
                                        {
                                            text2 = method_25(item2[field], string_);
                                        }
                                    }
                                    if (string.IsNullOrEmpty(text2))
                                    {
                                        text2 = "&nbsp;";
                                    }
                                    text = text.Substring(0, match.Index) + text2 + text.Substring(match.Index + match.Value.Length);
                                }
                                stringBuilder.Append(text);
                            }
                        }
                    }
                    string_0 = regex.Replace(string_0, stringBuilder.ToString());
                }
                MatchCollection matchCollection4 = regex2.Matches(string_0);
                if (matchCollection4.Count > 0)
                {
                    for (int i = matchCollection4.Count - 1; i >= 0; i--)
                    {
                        Match match = matchCollection4[i];
                        string value = match.Groups[1].Value;
                        string text3 = value.Contains(":") ? value.Substring(0, value.IndexOf(':')) : value;
                        text3 = (text3.Contains(",") ? text3.Split(',')[1] : text3);
                        string string_ = value.Contains(":") ? value.Substring(value.IndexOf(':') + 1) : "";
                        string text4 = value.Contains(",") ? value.Split(',')[0] : "";
                        string text2 = "";
                        if (!string.IsNullOrEmpty(text4))
                        {
                            if (string.Compare(text4, "s", true) == 0)
                            {
                                text2 = ServiceHelper.GetSettingValue(text3);
                                if (!string.IsNullOrEmpty(string_))
                                {
                                    text2 = method_25(text2, string_);
                                }
                            }
                            else if (text4 == "count")
                            {
                                text2 = ObjectExtensions.ToStr((object)list.Count);
                            }
                            else
                            {
                                double num2 = 0.0;
                                double num3 = 0.0;
                                double num4 = 0.0;
                                foreach (Dictionary<string, object> item4 in list)
                                {
                                    if (item4.ContainsKey(text3))
                                    {
                                        double num5 = DataHelper.ConvertValue<double>(item4[text3]);
                                        if (num5 > num3)
                                        {
                                            num3 = num5;
                                        }
                                        if (num5 < num4)
                                        {
                                            num4 = num5;
                                        }
                                        num2 += num5;
                                    }
                                }
                                double num6 = 0.0;
                                if (text4 == "sum")
                                {
                                    num6 = num2;
                                }
                                else if (text4 == "avg")
                                {
                                    num6 = num2 / (double)list.Count;
                                }
                                else if (text4 == "max")
                                {
                                    num6 = num3;
                                }
                                else if (text4 == "min")
                                {
                                    num6 = num4;
                                }
                                text2 = method_25(num6, string_);
                            }
                            if (string.IsNullOrEmpty(text2))
                            {
                                text2 = "&nbsp;";
                            }
                            string_0 = string_0.Substring(0, match.Index) + text2 + string_0.Substring(match.Index + match.Value.Length);
                        }
                    }
                }
            }
            catch
            {
            }
        }
        public void method_9()
        {
            try
            {
                Regex regex = new Regex("{(.*?)}");
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                List<Field> fields = serviceConfig.fields;
                MatchCollection matchCollection = regex.Matches(string_0);
                if (matchCollection.Count > 0)
                {
                    string field;
                    for (int num = matchCollection.Count - 1; num >= 0; num--)
                    {
                        string text = "";
                        Match match = matchCollection[num];
                        try
                        {
                            string value = match.Groups[1].Value;
                            field = (value.Contains(":") ? value.Substring(0, value.IndexOf(':')) : value);
                            field = (field.Contains(",") ? field.Split(',')[1] : field);
                            string text2 = value.Contains(":") ? value.Substring(value.IndexOf(':') + 1) : "";
                            string strA = value.Contains(",") ? value.Split(',')[0] : "";
                            Field field2 = fields.FirstOrDefault((Field a) => a.name == field);
                            if (string.Compare(strA, "s", true) == 0)
                            {
                                text = ServiceHelper.GetSettingValue(field);
                                if (!string.IsNullOrEmpty(text2))
                                {
                                    text = method_25(text, text2);
                                }
                            }
                            if (field.StartsWith("#") && dictionary_1.ContainsKey(field.Substring(1)))
                            {
                                text = dictionary_1[field.Substring(1)].ToString();
                            }
                            else if (dictionary_0.ContainsKey(field))
                            {
                                if ((field2 != null && field2.type == "many2one") || field.ToLower() == "createuser" || field.ToLower() == "modifyuser")
                                {
                                    List<string> list = dictionary_0[field] as List<string>;
                                    text = list[1];
                                }
                                else if (field2 != null && field2.type == "many2many")
                                {
                                    List<List<string>> list2 = dictionary_0[field] as List<List<string>>;
                                    List<string> list3 = new List<string>();
                                    foreach (List<string> item in list2)
                                    {
                                        list3.Add(item[1]);
                                    }
                                    text = string.Join(",", list3);
                                }
                                else
                                {
                                    text = method_25(dictionary_0[field], text2);
                                }
                            }
                        }
                        catch
                        {
                        }
                        if (string.IsNullOrEmpty(text))
                        {
                            text = "&nbsp;";
                        }
                        string_0 = string_0.Substring(0, match.Index) + text + string_0.Substring(match.Index + match.Value.Length);
                    }
                }
            }
            catch
            {
            }
        }

        public string method_25(object object_0, string string_7)
        {
            string text = "";
            string text2 = "";
            if (!string.IsNullOrEmpty(string_7))
            {
                if (object_0 != null && object_0.GetType() == typeof(string) && object_0.ToString().StartsWith("/Date(") && object_0.ToString().EndsWith(")/"))
                {
                    string s = object_0.ToString().Substring(6, object_0.ToString().Length - 8);
                    object_0 = new DateTime(1970, 1, 1).AddMilliseconds((double)long.Parse(s)).ToLocalTime();
                }
                if (string.Compare(string_7, "visual", true) == 0)
                {
                    text = (string.IsNullOrEmpty(ObjectExtensions.ToStr(object_0)) ? "display:none;" : "");
                }
                else if (string.Compare(string_7, "yn", true) == 0)
                {
                    text = ((ObjectExtensions.ToInt(object_0) == 1) ? "是" : "否");
                }
                else if (string.Compare(string_7, "bar", true) == 0)
                {
                    text = Server.UrlEncode(object_0.ToString());
                }
                else if (string.Compare(string_7, "qr", true) == 0)
                {
                    text = Server.UrlEncode(object_0.ToString());
                }
                else if (string.Compare(string_7, "img", true) == 0)
                {
                    if (object_0 == null)
                    {
                        return "";
                    }
                    string text3 = ObjectExtensions.ToStr(object_0);
                    if (!text3.StartsWith("/"))
                    {
                        text3 = "/" + text3;
                    }
                    text = "<img src='" + text3 + "' />";
                }
                else if (string.Compare(string_7, "rmb", true) == 0)
                {
                    text = RMB.Convert(DataHelper.ConvertValue<double>(object_0));
                }
                else if (string_7.Length == 2 && string_7[0] == 'C' && !string.IsNullOrEmpty(text2))
                {
                    string_7 = "N" + string_7[1];
                    text = text2 + string.Format("{0:" + string_7 + "}", object_0);
                }
                else
                {
                    text = string.Format("{0:" + string_7 + "}", object_0);
                }
            }
            else
            {
                text = ObjectExtensions.ToStr(object_0);
            }
            return text;
        }
        public string GetReportDetialHtml()
        {
            try
            {
                Regex regex = new Regex("<table class=\"ne-report-detail\"([\\s\\S]*?)</table>");
                new Regex("<tr.{1,20}class=\"row\"([\\s\\S]*?)>([\\s\\S]*?)</tr>");
                Regex regex2 = new Regex("data-field=\"(.*?)\"");
                new Regex("{(.*?)}");
                MatchCollection matchCollection = regex.Matches(string_0);
                if (matchCollection.Count == 0)
                {
                    return null;
                }
                MatchCollection matchCollection2 = regex2.Matches(matchCollection[0].Value);
                if (matchCollection2.Count == 0)
                {
                    return null;
                }
                return matchCollection2[0].Groups[1].Value;
            }
            catch
            {
                return null;
            }
        }

        public void FillUserInfo(int page, int pageCount)
        {
            var u = SysContext.GetWanJiangUser();
            DbContext currentDb = SysContext.GetCurrentDb();
            dictionary_1["page"] = ObjectExtensions.ToStr((object)page);
            dictionary_1["pagecount"] = ObjectExtensions.ToStr((object)pageCount);
            dictionary_1["loginname"] = u.AccountId;
            dictionary_1["now"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
        }
    }
}
