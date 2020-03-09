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
            QueryDb.BeginTransaction();
            try
            {
                //var queryDat = QueryDb.FirstOrDefault<object>("where formId = '@0'", data.formID);
                var s = DataAccessHelper.GetEntityType(data.formName);
                var ss = s.Assembly.CreateInstance(s.ToString());

                //var sql = PetaPoco.Sql.Builder
                //    .Append("select * from @0", data.formName);
                //.Append("LEFT JOIN Task ta ON subt.TaskId=ta.Id");

                //QueryDb.Query<subtask>

                //QueryDb.FirstOrDefault<form_allService>("where formId = '@0'", data.formID);

                htmlTPdfData(data);
                //QueryDb.
                //先查询filepath 有->直接返回；无->根据模板创建 测试的时候直接返回

                //QueryDb.Insert(new form_printPDF() { FormID =})



            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return "";
            }
            QueryDb.CompleteTransaction();
            return "";
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

            var dataRecord = QueryDb.FirstOrDefault<from_inspectiontRecord>("where formId = @0", data.formID);

            string filepath = "wwwroot/pdf/" + data.formName + ".html";
            //string html = File.ReadAllText("http://localhost:5023/template/" + data.FormName + ".html");
            string html = File.ReadAllText(filepath);

            //替换all内容
            //all.Replace("", "");
            
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
        /// 测试将html中的标签替换为类中的属性名的属性
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="html"></param>
        /// <param name="source"></param>
        /// <returns></returns>
        private string test<T>(Form_printPDFReq data,string html, T source)
        {
            //工具
            var tool = DataAccessHelper.GetEntityType(source.ToString());
            //手写
            var classType = source.GetType();
            StringBuilder tempHtml = new StringBuilder(html);
            foreach (var item in classType.GetRuntimeProperties())
            {
                var type = item.PropertyType.Name;
                var IsGenericType = item.PropertyType.IsGenericType;
                var list = item.PropertyType.GetInterface("IEnumerable", false);
                string vs = ($"属性名称：{item.Name}，类型：{type}，值：{item.GetValue(source)}");

                //替换数据
                tempHtml = tempHtml.Replace($"%{item.Name}%", $"item.GetValue(source)");

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
