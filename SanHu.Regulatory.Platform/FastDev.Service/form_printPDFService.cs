using FastDev.Common;
using FastDev.DevDB;
using FD.Model.Dto;
using System;
using FastDev.Model.Entity;
using System.IO;
using FD.Common.Helpers;
using Aspose.Words;
using System.Reflection;
using System.Collections.Generic;
using System.Text;
using DinkToPdf.Contracts;
using Newtonsoft.Json.Linq;
using System.Text.RegularExpressions;
using Aspose.Words.Replacing;
using FastDev.DevDB.Model.Config;

namespace FastDev.Service
{
#nullable enable
    /// <summary>
    /// 表单打印服务（后期应该会没用）
    /// </summary>
    public class form_printPDFService : SHBaseService, IService
    {
        private IConverter _converter;
        public form_printPDFService()
        {
            _converter = SysContext.GetService<IConverter>();
            OnGetAPIHandler += form_printPDFService_OnGetAPIHandler;
        }

        private Func<APIContext, object> form_printPDFService_OnGetAPIHandler(string id)
        {
            //return PrintTPdf;
            return AsposeToPdf;
        }

        /// <summary>
        /// 返回绝对路径
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public object PrintTPdf(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<Form_printPDFReq>(context.Data);
            string FilePath = "";
            QueryDb.BeginTransaction();
            try
            {
                //检查表中是否已经生成
                if (QueryDb.Exists<form_printPDF>("where FormId = @0", data.formID))
                    return QueryDb.FirstOrDefault<form_printPDF>("where FormId = @0", data.formID).FilePath;

                //根据模板名的相关数据更改模板目标 只能swith固定死

                //获取替换数据 无数据抛异常

                var jsonData = FormData(new FormDataReq() { FormId = data.formID, Model = data.formType, FilterModels = new string[] { "law_staff", "law_party" } });
                //寻找模板获取html字符串
                string filepath = $"wwwroot/pdf/{data.formType}.html";
                string newHtml = File.ReadAllText(filepath);
                //string newHtml = html;
                var jsonStr = JsonHelper.SerializeObject(jsonData);
                var item = JsonHelper.DeserializeJsonToObject<JObject>(jsonStr);

                //执行人
                if (item["law_party"]?.ToString() != "[]")
                {
                    var lparty = item["law_party"]?.ToObject<List<law_party>>();
                    for (int i = 0; i < lparty?.Count; i++)
                    {
                        newHtml = ReplaceHtml(newHtml, lparty[i], i + 1);
                    }
                }
                //当事人
                if (item["law_staff"]?.ToString() != "[]")
                {
                    var lstaff = item["law_staff"]?.ToObject<List<law_staff>>();
                    for (int i = 0; i < lstaff?.Count; i++)
                    {
                        newHtml = ReplaceHtml(newHtml, lstaff[i], i + 1);
                    }
                }
                //主表信息
                if (item["MainForm"]?.ToString() != "[]")
                {
                    var obj = item["MainForm"]?.ToObject(DataAccessHelper.GetEntityType(data.formType.ToString()));
                    //案件信息
                    var caseInfo = QueryDb.FirstOrDefault<case_Info>("where ID = @0", item["MainForm"]["CaseId"]?.ToString());
                    if (caseInfo != null)
                        newHtml = ReplaceHtml(newHtml, caseInfo);
                    var typeList = item["MainForm"]?["InspectionType"];
                    if (typeList != null)
                    {
                        var type = typeList.ToObject<List<string>>();
                        newHtml = newHtml.Replace("%Type%", type?.Count > 1 ? type[1] : "");
                    }
                    //ReplaceHtml<JToken>(data, html, item["MainForm"]);
                    newHtml = ReplaceHtml(newHtml, obj);
                }
                //将剩下的替换成 
                Regex.Replace(newHtml, "%[a-zA-Z0-9]+%", "");
                //执行人和执行列表 还有MainForm
                //替换数据

                //并且生成PDF返回路径
                var pdfByte = _converter.HmtlToPDF(newHtml);

                //FileStream fs = new FileStream(file, FileMode.OpenOrCreate);
                FilePath = $"/pdf/{Guid.NewGuid()}.pdf";

                if (File.Exists($"wwwroot/{FilePath}"))
                    File.Delete($"wwwroot/{FilePath}");

                File.WriteAllBytes($"wwwroot/{FilePath}", pdfByte);
                //插数
                //QueryDb.Insert(new form_printPDF() { ID = Guid.NewGuid().ToString(), FormID = data.formID, FilePath = FilePath, CreateDate = DateTime.Now });

            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();

                return e.StackTrace;
            }
            QueryDb.CompleteTransaction();
            return FilePath;
        }

        public object AsposeToPdf(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<Form_printPDFReq>(context.Data);
            string templatePath = $"wwwroot/template/{data.formType}.doc";
            string FilePath = "";
            QueryDb.BeginTransaction();
            try
            {
                //检查表中是否已经生成
                if (QueryDb.Exists<form_printPDF>("where FormId = @0", data.formID))
                    return QueryDb.FirstOrDefault<form_printPDF>("where FormId = @0", data.formID).FilePath;

                //根据模板名的相关数据更改模板目标
                var pDic = new Dictionary<string, string>();

                var jsonData = FormData(new FormDataReq()
                {
                    FormId = data.formID,
                    Model = data.formType,
                    FilterModels = new string[] { "law_staff", "law_party" }
                });
                if (jsonData == null)
                    return "该FormId无数据";
                var partyDetail = new List<string>();
                List<string> staff = new List<string>();
                //寻找模板获取html字符串
                foreach (var ss in jsonData as Dictionary<string, object>)
                {
                    switch (ss.Key)
                    {
                        case "law_party"://当事人
                            var lparty = ss.Value as List<Dictionary<string, object>>;
                            for (int i = 0; i < lparty?.Count; i++)
                            {
                                foreach (var j in lparty[i])
                                {
                                    if (j.Value is string && !pDic.ContainsKey(j.Key + (i + 1)))
                                        pDic.Add(j.Key + (i + 1), j.Value.ToString());
                                    else
                                    {

                                    }
                                }
                                //当事人名字使用,增加到一个字段内
                                if (lparty[i].ContainsKey("Name"))
                                    staff.Add(lparty[i]["Name"].ToString());
                                partyDetail.Add(GetDetailMsg(JsonHelper.DeserializeJsonToObject<law_party>(JsonHelper.SerializeObject(lparty[i]))));
                            }
                            break;
                        case "law_staff": //执法人
                            var lstaff = ss.Value as List<Dictionary<string, object>>;
                            for (int i = 0; i < lstaff?.Count; i++)
                            {
                                foreach (var j in lstaff[i])
                                {
                                    if (j.Value is string && !pDic.ContainsKey(j.Key + (i + 1)))
                                        pDic.Add(j.Key + (i + 1), j.Value.ToString());
                                    else
                                    {
                                        //if ()
                                    }
                                }

                            }
                            break;
                        case "MainForm"://主表信息
                            var main = ss.Value as Dictionary<string, object>;
                            foreach (var j in main)
                            {
                                if (j.Value is string && !pDic.ContainsKey(j.Key))
                                    pDic.Add(j.Key, j.Value.ToString());
                                else if (j.Value is DateTime && !pDic.ContainsKey(j.Key))
                                    pDic.Add(j.Key, DateTime.Parse(j.Value.ToString()).ToLongDateString().ToString());
                                else
                                {
                                    if (j.Key == "InspectionType" && (j.Value is IList<string>))
                                    {
                                        var type = j.Value as List<string>;
                                        if (!pDic.ContainsKey("Type") && type != null)
                                            pDic.Add("Type", type[type.Count - 1]);
                                    }
                                    else if (j.Key == "Objectofinquiry" && (j.Value is IList<string>))
                                    {
                                        var type = j.Value as List<string>;
                                        if (!pDic.ContainsKey("Type") && type != null)
                                            pDic.Add("Type", type[type.Count - 1]);
                                    }
                                }
                            }
                            //没收物品暂时临时处理
                            if (data.formType == "form_confiscated" && main.ContainsKey("ID") && main["ID"] != null)
                                GetConfiscatedItem(main["ID"].ToString(), pDic);

                            if (main.ContainsKey("CaseId") && main["CaseId"] != null)
                            {
                                var caseInfo = QueryDb.FirstOrDefault<case_Info>("where ID = @0", main["CaseId"].ToString());
                                if (caseInfo == null)
                                    break;
                                var dicCaseInfo = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(JsonHelper.SerializeObject(caseInfo));
                                if (caseInfo == null) break;
                                foreach (var j in dicCaseInfo)
                                {
                                    if (j.Value is string && !pDic.ContainsKey(j.Key))
                                        pDic.Add(j.Key, j.Value.ToString());
                                    else
                                    {

                                    }
                                }
                            }

                            break;
                        default: break;
                    }

                }
                //单独处理当事人
                if (!pDic.ContainsKey("FullStaff"))
                    pDic.Add("FullStaff", string.Join(",", staff));
                pDic.Add("PartyDetail", string.Join(",", partyDetail));
                //处罚决定书
                if (data.formType == "law_punishmentInfo")
                {
                    //主办人
                    ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");
                    var OTDB = SysContext.GetOtherDB(userServiceConfig.model.dbName);

                    //查询数据是否为真
                    var punishmentInfo = QueryDb.FirstOrDefault<law_punishmentInfo>("where Id = @0", data.formID);
                    if (punishmentInfo.Isfine)
                        pDic.Add("DecisionContent", "给予50元的处罚");
                    else if (punishmentInfo.IsConfiscationgoods)
                        pDic.Add("DecisionContent", "给予没收物品处罚");
                    //判断类型


                    ///CoOrganizer 协办人 1239796367061291008 CreateUserID 主办人的ID
                    //执法人1编号
                    var JobNum1 = OTDB.FirstOrDefault<string>("select Jobnumber from user where Name=@0", pDic.GetValueOrDefault("CreateUserID"));
                    //执法人2编号
                    var JobNum2 = OTDB.FirstOrDefault<string>("select Jobnumber from user where Name=@0", pDic.GetValueOrDefault("CoOrganizer"));
                    pDic.Add("JobNum1", JobNum1 ?? "");
                    pDic.Add("JobNum2", JobNum2 ?? "");

                }
                if (data.formType == "form_inquiryrecord")
                {
                    var inquiryrecordInfo = QueryDb.FirstOrDefault<form_inquiryrecord>("where Id = @0", data.formID);

                    var ObjType = QueryDb.FirstOrDefault<law_party>("where AssociationobjectID = @0", data.formID);
                    if (ObjType != null)
                        switch (ObjType.InquiryType)
                        {
                            case "当事人":
                                templatePath = $"wwwroot/template/{data.formType}_litigant.doc";
                                break;
                            case "证人"://witness
                                templatePath = $"wwwroot/template/{data.formType}_witness.doc";
                                break;
                            case "第三人":
                                templatePath = $"wwwroot/template/{data.formType}_third.doc";
                                break;
                            default:
                                break;
                        }
                }

                //字典存入完毕 开启并替换
                FilePath = ReplaceAspose(templatePath, pDic);

                //执行人

                //主表信

                //File.WriteAllBytes($"wwwroot/{FilePath}", pdfByte);
                //插数
                if (!SysContext.IsDev)
                {
                    QueryDb.Insert(new form_printPDF()
                    {
                        ID = Guid.NewGuid().ToString(),
                        FormID = data.formID,
                        formtypes = data.formType,
                        FilePath = FilePath,
                        CreateDate = DateTime.Now
                    });
                }

            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
            }
            QueryDb.CompleteTransaction();
            return FilePath;
        }

        private void GetConfiscatedItem(string confiscatedId, Dictionary<String, string> pDic)
        {
            var itemList = QueryDb.Fetch<form_confiscated_item>("where AssociationobjectID = @0", confiscatedId);
            var jsonData = JsonHelper.SerializeObject(itemList);
            var dicData = JsonHelper.DeserializeJsonToObject<List<Dictionary<string, object>>>(jsonData);
            for (int i = 0; i < dicData.Count; i++)
            {
                foreach (var item in dicData[i])
                {
                    if (item.Value is string && !pDic.ContainsKey(item.Key + (i + 1)))
                        pDic.Add(item.Key + (i + 1), item.Value.ToString());
                }
            }

        }

        //替换Aspose标签内容
        private string ReplaceAspose(string filePath, Dictionary<string, string> pDic)
        {
            Aspose.Words.Document doc = new Aspose.Words.Document(filePath);
            Aspose.Words.DocumentBuilder builder = new Aspose.Words.DocumentBuilder(doc);
            var replaceOPT = new FindReplaceOptions();
            replaceOPT.MatchCase = false;

            foreach (var kv in pDic)
            {
                doc.Range.Replace($"@{kv.Key}", kv.Value, replaceOPT);
            }
            //替换剩下不需要的
            if (!SysContext.IsDev)
            {
                doc.Range.Replace(new Regex("@[0-9a-zA-Z]+"), "", replaceOPT);
            }

            string newFilePath = $"pdf/{Guid.NewGuid()}.pdf";
            doc.Save($"wwwroot/{newFilePath}", SaveFormat.Pdf);
            return newFilePath;
        }

        /// <summary>
        /// 替换HTML相应类中的属性及值
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="html"></param>
        /// <param name="source"></param>
        /// <param name="markList"></param>
        /// <returns></returns>
        private string ReplaceHtml<T>(string html, T source, int markList = 0)
        {
            //工具
            //var tool = DataAccessHelper.GetEntityType(source.ToString());
            //手写
            string mark = markList == 0 ? "" : markList.ToString();
            var classType = source.GetType();
            StringBuilder tempHtml = new StringBuilder(html);
            foreach (var item in classType.GetRuntimeProperties())
            {
                var type = item.PropertyType.Name;
                var IsGenericType = item.PropertyType.IsGenericType;
                var list = item.PropertyType.GetInterface("IEnumerable", false);
                string vs = ($"属性名称：{item.Name}，类型：{type}，值：{item.GetValue(source)}");
                string replaceHtml = $"%{item.Name}{mark}%";
                //替换数据
                if (html.Contains(replaceHtml) && item.GetValue(source) != null)
                    tempHtml = tempHtml.Replace(replaceHtml, $"{item.GetValue(source)}");

                //若有IEnumerable等List的话
                //if (IsGenericType && list != null)
                //{
                //    var listVal = item.GetValue(source) as IEnumerable<object>;
                //    if (listVal == null) continue;
                //    foreach (var aa in listVal)
                //    {
                //        var dtype = aa.GetType();
                //        foreach (var bb in dtype.GetProperties())
                //        {
                //            var dtlName = bb.Name.ToLower();
                //            var dtlType = bb.PropertyType.Name;
                //            var oldValue = bb.GetValue(aa);
                //            if (dtlType == typeof(decimal).Name)
                //            {
                //                int dit = 4;
                //                if (dtlName.Contains("price") || dtlName.Contains("amount"))
                //                    dit = 2;
                //                bb.SetValue(aa, Math.Round(Convert.ToDecimal(oldValue), dit, MidpointRounding.AwayFromZero));
                //            }
                //            Console.WriteLine($"子级属性名称：{dtlName}，类型：{dtlType}，值：{oldValue}");
                //        }
                //    }
                //}

            }
            return tempHtml.ToString();


        }

        /// <summary>
        /// 获取个人和单位信息的详情
        /// </summary>
        /// <param name="party"></param>
        /// <returns></returns>
        private string GetDetailMsg(law_party party) => party switch
        {
            //单位
            { Typesofparties: "单位" } => $@"单位名称{party.Name},法人名称{party.Nameoflegalperson},性别{party.Gender},民族{party.Nationality}
                                           ,出生月份{GetYearMonth(party.IDcard)},身份证号{party.IDcard},
                                           单位地址{party.address},工作单位{party.WorkUnit},联系方式{party.Contactnumber}",
            //其他的都视作个人
            _ => $@"姓名{party.Name},性别{party.Gender},民族{party.Nationality}
                                           ,出生月份{GetYearMonth(party.IDcard)},身份证号{party.IDcard},
                                           住址{party.address},工作单位{party.WorkUnit},联系方式{party.Contactnumber}",
        };

        private string GetYearMonth(string idCardNum)
        {
            if (idCardNum.Length != 15 && idCardNum.Length != 18)//15位或18位其它不合法
                return "";

            if (idCardNum.Length == 18)//处理18位的身份证号码
            {
                return idCardNum.Substring(6, 4) + "-" + idCardNum.Substring(10, 2) + "-" + idCardNum.Substring(12, 2);
            }
            if (idCardNum.Length == 15)
            {
                return "19" + idCardNum.Substring(6, 2) + "-" + idCardNum.Substring(8, 2) + "-" + idCardNum.Substring(10, 2);
            }

            return "";
        }
    }
#nullable restore
}
