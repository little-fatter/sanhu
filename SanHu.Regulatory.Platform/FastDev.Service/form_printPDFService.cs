using FastDev.Common;
using FastDev.DevDB;
using FD.Model.Dto;
using System;
using FastDev.Model.Entity;
using System.IO;
using FD.Common.Helpers;
using Aspose.Words;

namespace FastDev.Service
{
    /// <summary>
    /// 表单打印服务（后期应该会没用）
    /// </summary>
    public class form_printPDFService : SHBaseService, IService
    {
        public form_printPDFService()
        {
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

                var sql = PetaPoco.Sql.Builder
                    .Append("select * from @0", data.formName);
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
            var pdfByte = PDFHelper.HmtlToPDF(html);
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

        private void test(Form_printPDFReq data)
        {
            var classType = DataAccessHelper.GetEntityType(data.formName);
        }
    }
}
