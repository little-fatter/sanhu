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

namespace FastDev.Service
{
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
            return PrintTPdf;
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

                var jsonData = FormData(new FormDataReq() { FormId = data.formID, Model = data.formName, FilterModels = new string[] { "law_staff", "law_party" } });
                //寻找模板获取html字符串
                string filepath = $"wwwroot/pdf/{data.formName}.html";
                string html = File.ReadAllText(filepath);
                string newHtml = html;
                var jsonStr = JsonHelper.SerializeObject(jsonData);
                //var Jdic = JsonHelper.DeserializeJsonToObject<Dictionary<string,object>>(jsonStr);
                var item = JsonHelper.DeserializeJsonToObject<JObject>(jsonStr);
                //案件信息
                if (QueryDb.Exists<case_Info>("where ID in (select CaseId from form_inquestrecord where ID = '@0')", data.formID))
                {
                    var caseInfo = QueryDb.FirstOrDefault<case_Info>("where ID in (select CaseId from form_inquestrecord where ID = '@0')", data.formID);
                    newHtml = ReplaceHtml(newHtml, caseInfo);
                }

                //执行人
                if (item["law_party"].ToString() != "[]")
                {
                    var lparty = item["law_party"].ToObject<List<law_party>>();
                    for (int i = 0; i < lparty.Count; i++)
                    {
                        newHtml = ReplaceHtml(newHtml, lparty[i], i + 1);
                    }
                }
                //当事人
                if (item["law_staff"].ToString() != "[]")
                {
                    var lstaff = item["law_staff"].ToObject<List<law_staff>>();
                    for (int i = 0; i < lstaff.Count; i++)
                    {
                        newHtml = ReplaceHtml(newHtml, lstaff[i], i + 1);
                    }
                }
                //主表信息
                if (item["MainForm"].ToString() != "[]")
                {
                    var obj = item["MainForm"].ToObject(DataAccessHelper.GetEntityType(data.formName.ToString()));
                    var caseInfo = QueryDb.FirstOrDefault<case_Info>("where ID = @0", item["MainForm"]["CaseId"].ToString());
                    if (caseInfo != null)
                        newHtml = ReplaceHtml(newHtml, caseInfo);
                    var type = item["MainForm"]["InspectionType"].ToObject<List<string>>();
                    newHtml = newHtml.Replace("%Type%", type.Count > 1 ? type[1] : "");
                    //ReplaceHtml<JToken>(data, html, item["MainForm"]);
                    newHtml = ReplaceHtml(newHtml, obj);
                }
                //将剩下的替换成 
                Regex.Replace(newHtml, "%[a-zA-Z0-9]+%", "");
                //执行人和执行列表 还有MainForm
                //替换数据

                //并且生成PDF返回路径
                var pdfByte = _converter.HmtlToPDF(html);

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
                return "null";
            }
            QueryDb.CompleteTransaction();
            return FilePath;
        }
        private void htmlTPdfData(Form_printPDFReq para)
        {
            switch (para.formName)
            {
                //勘验（检查）笔录
                case "from_inspectiontRecord":
                    var data = QueryDb.FirstOrDefault<from_inspectiontRecord>("where formId = @0", para.formID);
                    TransModel2Template(para);
                    //TransModel2Pdf(para);
                    break;
                case "2":
                    QueryDb.FirstOrDefault<from_inspectiontRecord>("where formId = '@0'", para.formName);
                    break;
                case "3":
                    break;
                case "4":
                    break;
                default:
                    break;
            }
        }

        private string TransModel2Pdf(Form_printPDFReq data)
        {
            //var dir = newFilePath.Substring(0, newFilePath.LastIndexOf("/") + 1);
            string filepath = "wwwroot/pdf/" + data.formName + ".doc";
            if (File.Exists("wwwroot/pdf/Aspose.pdf"))
            {
                File.Delete("wwwroot/pdf/Aspose.pdf");
            }
            Aspose.Words.Document doc = new Aspose.Words.Document(filepath);
            doc.Save("wwwroot/pdf/Aspose.pdf", SaveFormat.Pdf);
            return "";
        }

        private string TransModel2Template(Form_printPDFReq data)
        {
            //获取html地址
            //Directory.GetCurrentDirectory();
            //string str = (Request.HttpContext.Connection.LocalIpAddress.MapToIPv4().ToString() + ":" + Request.HttpContext.Connection.LocalPort;

            //var dataRecord = QueryDb.FirstOrDefault<from_inspectiontRecord>("where formId = @0", data.formID);

            string filepath = "wwwroot/pdf/" + data.formName + ".html";
            string html = File.ReadAllText(filepath);

            //替换html内容


            var pdfByte = _converter.HmtlToPDF(html);
            //byte[] info = new UTF8Encoding(true).GetBytes(pdfByte);
            string filepath2 = "wwwroot/";
            if (File.Exists("wwwroot/pdf/XXX.pdf"))
            {
                File.Delete("wwwroot/pdf/XXX.pdf");
            }
            //FileStream fs = new FileStream(file, FileMode.OpenOrCreate);

            //Stream stream = new MemoryStream(bytes);

            FileStream pFileStream = null;
            pFileStream = new FileStream("wwwroot/pdf/XXX2.pdf", FileMode.Create);
            pFileStream.Write(pdfByte, 0, pdfByte.Length);
            pFileStream.Close();
            File.WriteAllBytes("wwwroot/pdf/XXX.pdf", pdfByte);

            //FileStream fileStream = new FileStream("wwwroot/XXX.pdf", FileMode.Create);
            //fileStream.Write(pdfByte, 0, pdfByte.Length);
            //获取指定类的所有的类名 并将data中该类中中数据获取

            return "";
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
                    tempHtml = tempHtml.Replace(replaceHtml, $"item.GetValue(source)");

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
    }
}
