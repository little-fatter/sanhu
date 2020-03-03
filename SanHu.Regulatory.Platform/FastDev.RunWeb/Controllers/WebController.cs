using FastDev.Common;
using FastDev.Common.Extensions;
using FastDev.Common.Helpers;
using FastDev.DevDB;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using FastDev.DevDB.Rights;
using FastDev.DevDB.Workflow;
using FastDev.Model.Entity;
using FD.Common.ActionValue;
using FD.Common.Helpers;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using FastDev.RunWeb.Code;

namespace FastDev.RunWeb.Controllers
{
    public class WebController : BaseController
    {
        #region Commom Class

        public class GridColumn
        {
            public List<GridColumn> columns
            {
                get;
                set;
            }

            public string width
            {
                get;
                set;
            }

            public string display
            {
                get;
                set;
            }

            public string name
            {
                get;
                set;
            }

            public string align
            {
                get;
                set;
            }

            public string totalType
            {
                get;
                set;
            }

            public GridColumn()
            {


            }
        }

        public class GridXlsColumn
        {
            public string name
            {
                get;
                set;
            }

            public int index
            {
                get;
                set;
            }

            public GridXlsColumn()
            {


            }
        }



        public class res_dictionaryItems
        {

            public string ID
            {
                get;
                set;
            }

            public string Title
            {
                get;
                set;
            }

            public string ItemCode
            {
                get;
                set;
            }

            public decimal? SortNo
            {
                get;
                set;
            }

            public string Remark
            {
                get;
                set;
            }

            public res_dictionaryItems()
            {


            }
        }

        public class PayInfo
        {

            public string id
            {
                get;
                set;
            }

            public string name
            {
                get;
                set;
            }

            public PayInfo()
            {


            }
        }


        public class PrintModel
        {
            public List<GridColumn> columns { get; set; }
            public List<Dictionary<string, object>> listdata { get; set; }
            public Dictionary<string, object> totaldata { get; set; }
            public string title { get; set; }
            public int? pageSize { get; set; }
            public Dictionary<string, object> detaildata { get; set; }
        }

        #endregion

        public HttpServerUtility Server
        {
            get
            {
                return new HttpServerUtility(HttpContext);
            }
        }


        private Bitmap bitmap_0 = null;

        private string jpgUrl;

        private int printWidth;

        private int printHeight;



        private Dictionary<string, string> dicModuleTitles;


        private string styleTemplate;

        private readonly LogManager logMan;

        private Dictionary<string, string> dicBigTree;


        public object MimeTypes
        {
            get; [NonAction]
            private set;
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult Api(string id, string model, string data, string context)
        {
            try
            {
                IService service = ServiceHelper.GetService(model);
                if (service == null)
                {
                    return View("Page404");
                }
                Func<APIContext, object> aPIHandler;
                try
                {
                    aPIHandler = service.GetAPIHandler(id);
                    if (aPIHandler == null)
                    {
                        return View("Page404");
                    }
                }
                catch (Exception)
                {
                    return View("Page404");
                }
                object data2 = aPIHandler(new APIContext
                {
                    Context = context,
                    Data = data
                });
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    data = data2
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }
        [HttpPost]
        public ActionResult code39preview(string id)
        {
            List<string> list = new List<string>();
            string[] array = id.Split(',');
            list.Add("<div style='margin:40px'>");
            string[] array2 = array;
            foreach (string str in array2)
            {
                list.Add(string.Format("<img src=\"{0}\" /><p></p>", "/web/code39/" + str));
            }
            list.Add("</div>");
            return Content(string.Join("", list));
        }
        [HttpPost]
        public ActionResult code39(string id)
        {
            Bitmap bitmap = Code39.GetBitmap(id);
            byte[] fileContents = ImageHelper.BitmapToBytes(bitmap, ImageFormat.Png);
            return File(fileContents, "image/png");
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult dataset(string model, string viewname)
        {
            try
            {
                string use = "";
                string use2 = "";
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model);
                object userData = ServiceHelper.GetUserData(model, viewname, null);
                bool enabled = ServiceHelper.IsEnabledWorkflow(model);
                DbContext newDb = SysContext.GetRunDb();
                var data = new
                {
                    user = userData,
                    use1 = use,
                    use2 = use2,
                    actions = newDb.Fetch<core_formula_out>("where model = @0 and viewname = @1 and (type like 'A%' or type like 'B%')", new object[2]
                    {
                        model,
                        viewname
                    }),
                    model = new
                    {
                        serviceConfig.PKName,
                        serviceConfig.model.name,
                        serviceConfig.model.title
                    },
                    workflow = new
                    {
                        enabled
                    }
                };
                return Json(new
                {
                    statusCode = "1",
                    data = data
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult PageData(string model, string viewtype, string viewname, string context)
        {
            try
            {
                object userData = ServiceHelper.GetUserData(model, viewname, context);
                string view = ServiceHelper.GetView(model, viewtype, viewname);
                string viewService = ServiceHelper.GetViewService(model, viewtype, viewname);
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model);
                bool enabled = ServiceHelper.IsEnabledWorkflow(model);
                object obj = null;
                if (serviceConfig != null)
                {
                    serviceConfig.model.PKName = serviceConfig.PKName;
                    obj = serviceConfig.model;
                }
                else
                {
                    obj = new
                    {
                        name = model
                    };
                }
                var data = new
                {
                    user = userData,
                    viewService = viewService,
                    view = view,
                    workflow = new
                    {
                        enabled
                    },
                    model = obj
                };
                return Json(new
                {
                    statusCode = "1",
                    data = data
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult searchDataset(string model, string key)
        {
            try
            {

                return Json(new
                {
                    statusCode = "1",
                    key = key,
                    data = ServiceHelper.GetSearchDataset(model, key)
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ModelConfig(string id, string modelName)
        {
            try
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(id ?? modelName);
                return Json(new
                {
                    statusCode = "1",
                    data = serviceConfig
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ModelDataset(string modelName)
        {
            try
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
                List<Field> list = serviceConfig.fields.Where(f => f.type.Contains("2")).ToList();
                List<object> list2 = new List<object>();
                foreach (Field item in list)
                {
                    if (!string.IsNullOrEmpty(item.relationModel))
                    {
                        ServiceConfig serviceConfig2 = ServiceHelper.GetServiceConfig(item.relationModel);
                        list2.Add(new
                        {
                            serviceConfig2.model.name,
                            serviceConfig2.model.title,
                            serviceConfig2.model.textField,
                            serviceConfig2.fields
                        });
                    }
                }
                return Json(new
                {
                    statusCode = "1",
                    data = new
                    {
                        model = serviceConfig.model,
                        fields = serviceConfig.fields,
                        refModels = list2
                    }
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ImportExcel(string templateId, IFormFile file)
        {
            try
            {
                DbContext dbContext = SysContext.GetCurrentDb();
                FastDev.DevDB.Model.core_importTemplate core_importTemplate = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_importTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (core_importTemplate == null)
                {
                    throw new Exception("导入模板未定义");
                }
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_importTemplate.ModelName);
                if (serviceConfig == null)
                {
                    throw new Exception("导入模板未定义(model)");
                }
                new RightsServer(dbContext).LoadSystemVariable();
                Type entityType = DataAccessHelper.GetEntityType(serviceConfig.model.name);
                dbContext.GetHelper(entityType);
                PropertyInfo[] properties = entityType.GetProperties();
                properties.Select(p => p.Name).ToList();
                DataHelper.CreateSetProperties(properties);
                Func<object, object[]> func = DataHelper.CreateGetProperties(properties);
                List<FastDev.DevDB.Model.core_importTemplateDetail> list = dbContext.Fetch<FastDev.DevDB.Model.core_importTemplateDetail>("where TemplateID = @0", new object[1]
                {
                    templateId
                });
                List<Field> fields = serviceConfig.fields;
                List<string> list2 = new List<string>();
                var stream = new MemoryStream();
                file.CopyTo(stream);
                HSSFWorkbook hSSFWorkbook = new HSSFWorkbook(stream);
                ISheet sheetAt = hSSFWorkbook.GetSheetAt(0);
                IRow row = sheetAt.GetRow(0);
                short lastCellNum = row.LastCellNum;
                int lastRowNum = sheetAt.LastRowNum;
                int num = 0;
                object entity;
                for (int i = 1; i <= lastRowNum; i++)
                {
                    try
                    {
                        IRow row2 = sheetAt.GetRow(i);
                        entity = Activator.CreateInstance(entityType);
                        func(entity);
                        Action<string, object> action = delegate (string name, object value)
                        {
                            DataHelper.SetPropertyValue(entityType, entity, name, value);
                        };
                        foreach (FastDev.DevDB.Model.core_importTemplateDetail item in list)
                        {
                            try
                            {
                                object obj;
                                Field field;
                                if (!string.IsNullOrEmpty(item.FieldName))
                                {
                                    if (!string.IsNullOrEmpty(item.Variable))
                                    {
                                        string variable = item.Variable;
                                        string arg = ObjectExtensions.ToStr((object)variable);
                                        if (variable == "{CurrentUserID}")
                                        {
                                            arg = SysContext.WanJiangUserID;
                                        }
                                        else if (new Regex("^{\\w+}$", RegexOptions.IgnoreCase).IsMatch(variable))
                                        {
                                            string key = ObjectExtensions.ToStr((object)variable).Substring(1, ObjectExtensions.ToStr((object)variable).Length - 2);
                                            arg = SysContext.GetVariableValue(key);
                                        }
                                        action(item.FieldName, arg);
                                    }
                                    else if (!string.IsNullOrEmpty(item.XlsColumn))
                                    {
                                        int cellnum = ExcelRender.ToColumnIndex(item.XlsColumn);
                                        ICell cell = row2.GetCell(cellnum);
                                        obj = ExcelRender.GetCellValue(cell);
                                        field = fields.FirstOrDefault((Field a) => a.name == item.FieldName);
                                        string type = field.type;
                                        if (!(type == FieldTypes.One2many) && !(type == FieldTypes.Many2many))
                                        {
                                            if (!(type == FieldTypes.Many2one))
                                            {
                                                if (type == FieldTypes.Integer)
                                                {
                                                    obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(int?), obj) : DataHelper.ConvertValue(typeof(int), obj));
                                                }
                                                else if (type == FieldTypes.Float)
                                                {
                                                    try
                                                    {
                                                        obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(decimal?), obj) : DataHelper.ConvertValue(typeof(decimal), obj));
                                                    }
                                                    catch (Exception)
                                                    {
                                                        obj = (decimal)obj;
                                                    }
                                                }
                                                else if (type == FieldTypes.Datetime)
                                                {
                                                    try
                                                    {
                                                        obj = cell.DateCellValue;
                                                        if (obj == null)
                                                        {
                                                            throw new Exception("try");
                                                        }
                                                    }
                                                    catch (Exception)
                                                    {
                                                        try
                                                        {
                                                            obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(DateTime?), obj) : DataHelper.ConvertValue(typeof(DateTime), obj));
                                                        }
                                                        catch (Exception)
                                                        {
                                                        }
                                                    }
                                                }
                                                else if (type == FieldTypes.Boolean)
                                                {
                                                    try
                                                    {
                                                        obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(byte?), obj) : DataHelper.ConvertValue(typeof(byte), obj));
                                                    }
                                                    catch (Exception)
                                                    {
                                                        obj = (byte)((ObjectExtensions.ToStr(obj) == "是" || ObjectExtensions.ToStr(obj).IndexOf("y", StringComparison.CurrentCultureIgnoreCase) == 0) ? 1 : 0);
                                                    }
                                                }
                                                else
                                                {
                                                    obj = obj.ToString();
                                                }
                                                goto IL_059c;
                                            }
                                            try
                                            {
                                                if (obj != null)
                                                {
                                                    string text = ObjectExtensions.ToStr(obj).Trim();
                                                    if (!string.IsNullOrEmpty(text))
                                                    {
                                                        string modeTextField = DataAccessHelper.GetModeTextField(field.relationModel);
                                                        obj = dbContext.ExecuteScalar<string>(string.Format("select ID from {0} where {1} = @0", field.relationModel, modeTextField), new object[1]
                                                        {
                                                            text
                                                        });
                                                    }
                                                }
                                            }
                                            catch
                                            {
                                            }
                                            if (obj != null && !string.IsNullOrEmpty(ObjectExtensions.ToStr(obj)))
                                            {
                                                goto IL_059c;
                                            }
                                        }
                                    }
                                }
                                goto end_IL_01ed;
                            IL_059c:
                                if (field.isRequired == "Y" && string.IsNullOrEmpty(ObjectExtensions.ToStr(obj)))
                                {
                                    throw new Exception(string.Format("{0}是必填的", field.type));
                                }
                                action(field.dbName, obj);
                            end_IL_01ed:;
                            }
                            catch (Exception)
                            {
                            }
                        }
                        action("ID", Guid.NewGuid().ToString());
                        action("CreateDate", DateTime.Now);
                        action("CreateUserID", SysContext.WanJiangUserID);
                        action("ModifyDate", DateTime.Now);
                        action("ModifyUserID", SysContext.WanJiangUserID);
                        dbContext.Insert(entity);
                        num++;
                    }
                    catch (Exception ex)
                    {
                        list2.Add("第" + (i + 1) + "行 插入发送错误： " + ex.Message);
                    }
                }
                return Json(new AjaxResult
                {
                    Success = true,
                    data = new
                    {
                        success = num,
                        errors = list2
                    }
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ImportTemplate(string templateId)
        {
            try
            {
                DbContext dbContext = SysContext.GetCurrentDb();
                FastDev.DevDB.Model.core_importTemplate core_importTemplate = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_importTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (core_importTemplate == null)
                {
                    throw new Exception("导入模板未定义");
                }
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_importTemplate.ModelName);
                if (serviceConfig == null)
                {
                    throw new Exception("导入模板未定义(model)");
                }
                try
                {
                    string text = dbContext.ExecuteScalar<string>("select TemplateFile from core_importTemplate where ID = @0", new object[1]
                    {
                        templateId
                    });
                    if (!string.IsNullOrEmpty(text))
                    {
                        string text2 = Server.MapPath("~/" + text);
                        if (System.IO.File.Exists(text2))
                        {
                            return File(text2, "application/vnd.ms-excel", Server.HtmlEncode(serviceConfig.model.title) + ".xls");
                        }
                    }
                }
                catch
                {
                }
                List<FastDev.DevDB.Model.core_importTemplateDetail> list = dbContext.Fetch<FastDev.DevDB.Model.core_importTemplateDetail>("where TemplateID = @0", new object[1]
                {
                    templateId
                });
                List<Field> fields = serviceConfig.fields;
                HSSFWorkbook hSSFWorkbook = new HSSFWorkbook();
                string sheetname = "Sheet";
                ISheet sheet = hSSFWorkbook.CreateSheet(sheetname);
                hSSFWorkbook.CreateDataFormat();
                IRow row = sheet.CreateRow(0);
                row.Height = 380;
                ICellStyle headerCellStyle = ExcelRender.GetHeaderCellStyle(hSSFWorkbook);
                ExcelRender.GetCellStyle(hSSFWorkbook);
                ExcelRender.GetExampleHeaderCellStyle(hSSFWorkbook);

                int num = 0;
                foreach (FastDev.DevDB.Model.core_importTemplateDetail item in list)
                {
                    num++;
                    if (!string.IsNullOrEmpty(item.FieldName) && !string.IsNullOrEmpty(item.XlsColumn))
                    {
                        int num2 = ExcelRender.ToColumnIndex(item.XlsColumn);
                        ICell cell = row.CreateCell(num2);
                        cell.SetCellValue(item.Title);
                        cell.CellStyle = headerCellStyle;
                        if (!string.IsNullOrEmpty(item.Width))
                        {
                            sheet.SetColumnWidth(num2, ObjectExtensions.ToInt((object)item.Width) * 36);
                        }
                        Field field = fields.FirstOrDefault((Field a) => a.name == item.FieldName);
                        if (field != null)
                        {
                            if (field.type == FieldTypes.Many2many || field.type == FieldTypes.Many2one)
                            {
                                string sheetName = "C" + num + "Sheet";
                                string listFormula = "C" + num + "Range";
                                string modeTextField = DataAccessHelper.GetModeTextField(field.relationModel);
                                string str = string.Format("select {0} from {1}", modeTextField, field.relationModel);
                                string value = "";
                                if (!string.IsNullOrEmpty(item.RefFilter))
                                {
                                    value = item.RefFilter;
                                }
                                else if (!string.IsNullOrEmpty(field.sourceFilter))
                                {
                                    value = field.sourceFilter;
                                }
                                FilterTranslator filterTranslator = new FilterTranslator();
                                if (!string.IsNullOrEmpty(value))
                                {
                                    value = FilterHelper.PrevFilter(value);
                                    filterTranslator.Group = JsonHelper.DeserializeJsonToObject<FilterGroup>(value);
                                }
                                filterTranslator.Translate();
                                str = str + " where " + (string.IsNullOrEmpty(filterTranslator.CommandText) ? "1=1" : filterTranslator.CommandText);
                                List<string> items = dbContext.Fetch<string>(str, filterTranslator.Parms.ToArray());
                                try
                                {
                                    ExcelRender.AddListFormula(hSSFWorkbook, sheet, sheetName, listFormula, num2, 1, items);
                                    ExcelRender.AddValidationData(sheet, listFormula, num2, 1);
                                }
                                catch
                                {
                                }
                            }
                            else if (!string.IsNullOrEmpty(field.fieldSelection))
                            {
                                IList<SelectionItem> source = JsonHelper.DeserializeJsonToObject<IList<SelectionItem>>(field.fieldSelection);
                                List<string> items = source.Select(s => s.text).ToList();
                                string sheetName = field.relationModel.Replace("_", "") + field.name + "Sheet";
                                string listFormula = field.relationModel.Replace("_", "") + field.name + "Range";
                                try
                                {
                                    ExcelRender.AddListFormula(hSSFWorkbook, sheet, sheetName, listFormula, num2, 1, items);
                                    ExcelRender.AddValidationData(sheet, listFormula, num2, 1);
                                }
                                catch
                                {
                                }
                            }
                        }
                    }
                }
                MemoryStream memoryStream = new MemoryStream();
                hSSFWorkbook.Write(memoryStream);
                memoryStream.Flush();
                memoryStream.Position = 0L;
                return File(memoryStream, "application/vnd.ms-excel", Server.HtmlEncode(serviceConfig.model.title) + ".xls");
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }
        /// <summary>
        /// 导出模板到Excel
        /// </summary>
        /// <param name="templateId"></param>
        /// <param name="filterCode"></param>
        /// <returns></returns>
        [VaildateUser]
        [HttpPost]
        public ActionResult ExportExcel(string templateId, string filterCode)
        {
            try
            {
                DbContext dbContext = SysContext.GetCurrentDb();
                FastDev.DevDB.Model.core_exportTemplate core_exportTemplate = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_exportTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (core_exportTemplate == null)
                {
                    throw new Exception("导出模板未定义");
                }
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_exportTemplate.ModelName);
                if (serviceConfig == null)
                {
                    throw new Exception("导入模板未定义(model)");
                }
                List<FastDev.DevDB.Model.core_exportTemplateDetail> list = dbContext.Fetch<FastDev.DevDB.Model.core_exportTemplateDetail>("where TemplateID = @0", new object[1]
                {
                    templateId
                });
                List<Field> fields = serviceConfig.fields;
                HSSFWorkbook hSSFWorkbook = new HSSFWorkbook();
                ISheet sheet = hSSFWorkbook.CreateSheet("Sheet");
                hSSFWorkbook.CreateDataFormat();
                IRow row = sheet.CreateRow(0);
                row.Height = 380;
                ICellStyle headerCellStyle = ExcelRender.GetHeaderCellStyle(hSSFWorkbook);
                ICellStyle cellStyle = ExcelRender.GetCellStyle(hSSFWorkbook);
                ExcelRender.GetExampleHeaderCellStyle(hSSFWorkbook);
                foreach (FastDev.DevDB.Model.core_exportTemplateDetail item in list)
                {
                    if (!string.IsNullOrEmpty(item.XlsColumn) && !string.IsNullOrEmpty(item.FieldName))
                    {
                        int num = ExcelRender.ToColumnIndex(item.XlsColumn);
                        ICell cell = row.CreateCell(num);
                        cell.SetCellValue(item.Title);
                        cell.CellStyle = headerCellStyle;
                        if (!string.IsNullOrEmpty(item.Width))
                        {
                            sheet.SetColumnWidth(num, ObjectExtensions.ToInt((object)item.Width) * 36);
                        }
                    }
                }
                int num2 = 1;
                FilterGroup filter = null;
                if (!string.IsNullOrEmpty(filterCode))
                {
                    string input = Base64Helper.DecodingString(filterCode);
                    filter = JsonHelper.DeserializeJsonToObject<FilterGroup>(input);
                }
                IService service = ServiceHelper.GetService(serviceConfig.model.name);
                List<Dictionary<string, object>> listData = service.GetListData(filter);
                foreach (Dictionary<string, object> item2 in listData)
                {
                    IRow row2 = sheet.CreateRow(num2);
                    row2.Height = 380;
                    num2++;
                    foreach (FastDev.DevDB.Model.core_exportTemplateDetail item3 in list)
                    {
                        if (!string.IsNullOrEmpty(item3.XlsColumn) && !string.IsNullOrEmpty(item3.FieldName))
                        {
                            int num = ExcelRender.ToColumnIndex(item3.XlsColumn);
                            Field field = fields.FirstOrDefault((Field a) => a.name == item3.FieldName);
                            ICell cell2 = row2.CreateCell(num);
                            string text = "";
                            if (field != null && field.type == "many2one")
                            {
                                List<string> list2 = item2[field.name] as List<string>;
                                text = list2[1];
                            }
                            else if (field == null || !(field.type == "many2many"))
                            {
                                text = (string.IsNullOrEmpty(item3.Format) ? ObjectExtensions.ToStr(item2[field.name]) : new PrintData().DoWithSystemMark(item2[field.name], item3.Format));
                            }
                            else
                            {
                                List<List<string>> list3 = item2[field.name] as List<List<string>>;
                                List<string> list4 = new List<string>();
                                foreach (List<string> item4 in list3)
                                {
                                    list4.Add(item4[1]);
                                }
                                text = string.Join(",", list4);
                            }
                            cell2.SetCellValue(text);
                            cell2.CellStyle = cellStyle;
                        }
                    }
                }
                MemoryStream memoryStream = new MemoryStream();
                hSSFWorkbook.Write(memoryStream);
                memoryStream.Flush();
                memoryStream.Position = 0L;
                return File(memoryStream, "application/vnd.ms-excel", Server.HtmlEncode(serviceConfig.model.title) + ".xls");
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }
        /// <summary>
        /// Grid数据导出到Excel
        /// </summary>
        /// <param name="columnsJSON"></param>
        /// <param name="listdataJSON"></param>
        /// <param name="totaldataJSON"></param>
        /// <param name="headerJSON"></param>
        /// <param name="title"></param>
        /// <param name="totalCellLeft"></param>
        /// <returns></returns>
        [VaildateUser]
        [HttpPost]
        public ActionResult ExportGrid(string columnsJSON, string listdataJSON, string totaldataJSON, string headerJSON, string title, int? totalCellLeft)
        {
            try
            {

                List<GridColumn> list = JsonHelper.DeserializeJsonToList<GridColumn>(columnsJSON);
                List<Dictionary<string, object>> list2 = JsonHelper.DeserializeJsonToObject<List<Dictionary<string, object>>>(listdataJSON);
                Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(totaldataJSON);
                if (string.IsNullOrEmpty(headerJSON))
                {
                    headerJSON = "";
                }
                List<Dictionary<string, object>> list3 = JsonHelper.DeserializeJsonToObject<List<Dictionary<string, object>>>(headerJSON);
                HSSFWorkbook hSSFWorkbook = new HSSFWorkbook();
                ISheet sheet = hSSFWorkbook.CreateSheet("Sheet");
                hSSFWorkbook.CreateDataFormat();
                ICellStyle headerCellStyle = ExcelRender.GetHeaderCellStyle(hSSFWorkbook);
                ICellStyle cellStyle = ExcelRender.GetCellStyle(hSSFWorkbook);
                ExcelRender.GetExampleHeaderCellStyle(hSSFWorkbook);
                bool flag = list.Any(l => l.columns != null && l.columns.Any());
                List<GridXlsColumn> list4 = new List<GridXlsColumn>();
                if (flag)
                {
                    IRow row = sheet.CreateRow(0);
                    IRow row2 = sheet.CreateRow(1);
                    row.Height = 380;
                    row2.Height = 380;
                    int num = 0;
                    foreach (GridColumn item in list)
                    {
                        ICell cell = row.CreateCell(num);
                        cell.SetCellValue(item.display);
                        cell.CellStyle = headerCellStyle;
                        if (!string.IsNullOrEmpty(item.width) && item.width != "auto")
                        {
                            sheet.SetColumnWidth(num, Convert.ToInt32(item.width) * 36);
                        }
                        if (item.columns != null && item.columns.Any())
                        {
                            sheet.AddMergedRegion(new CellRangeAddress(0, 0, num, num + item.columns.Count - 1));
                            num++;
                            if (item.columns.Count > 0)
                            {
                                for (int i = 0; i < item.columns.Count - 1; i++)
                                {
                                    row.CreateCell(num).CellStyle = headerCellStyle;
                                    num++;
                                }
                            }
                        }
                        else
                        {
                            list4.Add(new GridXlsColumn
                            {
                                name = item.name,
                                index = num
                            });
                            sheet.AddMergedRegion(new CellRangeAddress(0, 1, num, num));
                            num++;
                        }
                    }
                    num = 0;
                    foreach (GridColumn item2 in list)
                    {
                        if (item2.columns != null && item2.columns.Any())
                        {
                            foreach (GridColumn column in item2.columns)
                            {
                                ICell cell = row2.CreateCell(num);
                                cell.SetCellValue(column.display);
                                cell.CellStyle = headerCellStyle;
                                if (!string.IsNullOrEmpty(column.width) && column.width != "auto")
                                {
                                    sheet.SetColumnWidth(num, Convert.ToInt32(column.width) * 36);
                                }
                                list4.Add(new GridXlsColumn
                                {
                                    name = column.name,
                                    index = num
                                });
                                num++;
                            }
                        }
                        else
                        {
                            ICell cell = row2.CreateCell(num);
                            cell.CellStyle = headerCellStyle;
                            num++;
                        }
                    }
                }
                else
                {
                    IRow row = sheet.CreateRow(0);
                    row.Height = 380;
                    int num = 0;
                    foreach (GridColumn item3 in list)
                    {
                        ICell cell = row.CreateCell(num);
                        cell.SetCellValue(item3.display);
                        cell.CellStyle = headerCellStyle;
                        list4.Add(new GridXlsColumn
                        {
                            name = item3.name,
                            index = num
                        });
                        num++;
                    }
                }
                int num2 = (!flag) ? 1 : 2;
                foreach (Dictionary<string, object> item4 in list2)
                {
                    IRow row3 = sheet.CreateRow(num2);
                    row3.Height = 380;
                    num2++;
                    foreach (GridXlsColumn item5 in list4)
                    {
                        int num = item5.index;
                        ICell cell2 = row3.CreateCell(num);
                        string text = item4.ContainsKey(item5.name) ? ObjectExtensions.ToStr(item4[item5.name]) : "";
                        if (!string.IsNullOrEmpty(text))
                        {
                            text = text.Replace("<br />", "\n");
                        }
                        cell2.SetCellValue(text);
                        cell2.CellStyle = cellStyle;
                    }
                }
                if (dictionary != null && dictionary.Keys.Count > 0)
                {
                    IRow row3 = sheet.CreateRow(num2);
                    row3.Height = 380;
                    int num3 = 0;
                    foreach (GridXlsColumn item6 in list4)
                    {
                        if (!dictionary.ContainsKey(item6.name))
                        {
                            num3++;
                        }
                    }
                    if (num3 > 0)
                    {
                        ICell cell2 = row3.CreateCell(0);
                        cell2.SetCellValue("合计：");
                        cell2.CellStyle = cellStyle;
                        cell2.CellStyle.Alignment = NPOI.SS.UserModel.HorizontalAlignment.Right;
                        if (totalCellLeft.HasValue)
                        {
                            sheet.AddMergedRegion(new CellRangeAddress(num2, num2, 0, totalCellLeft.Value - 1));
                        }
                        else if (num3 > 1)
                        {
                            sheet.AddMergedRegion(new CellRangeAddress(num2, num2, 0, num3));
                        }
                    }
                    foreach (GridXlsColumn item7 in list4)
                    {
                        if (dictionary.ContainsKey(item7.name))
                        {
                            int num = item7.index;
                            ICell cell2 = row3.CreateCell(num);
                            string text = ObjectExtensions.ToStr(dictionary[item7.name]);
                            cell2.SetCellValue(text);
                            cell2.CellStyle = cellStyle;
                        }
                        else if (item7.index != 0 || num3 == 0)
                        {
                            ICell cell2 = row3.CreateCell(item7.index);
                            cell2.CellStyle = cellStyle;
                        }
                    }
                }
                if (list3 != null && list3.Any())
                {
                    foreach (Dictionary<string, object> item8 in list3)
                    {
                        try
                        {
                            int firstRow = ObjectExtensions.ToInt(item8["firstRow"]);
                            int lastRow = ObjectExtensions.ToInt(item8["lastRow"]);
                            int firstCol = ObjectExtensions.ToInt(item8["firstCol"]);
                            int lastCol = ObjectExtensions.ToInt(item8["lastCol"]);
                            sheet.AddMergedRegion(new CellRangeAddress(firstRow, lastRow, firstCol, lastCol));
                        }
                        catch
                        {
                        }
                    }
                }
                MemoryStream memoryStream = new MemoryStream();
                hSSFWorkbook.Write(memoryStream);
                memoryStream.Flush();
                memoryStream.Position = 0L;
                return File(memoryStream, "application/vnd.ms-excel", Server.HtmlEncode(title) + ".xls");
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }
        [HttpPost]
        [NonAction]
        private void ChangeFilterGroup(string modelName, string key, FilterGroup filters)
        {
            if (!string.IsNullOrEmpty(modelName) && !string.IsNullOrEmpty(key))
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
                List<Field> list = serviceConfig.fields.Where(f => f.enabledSearch == "Y" && f.type == "string").ToList();
                if (list.Any())
                {
                    if (string.IsNullOrEmpty(filters.op))
                    {
                        filters.op = "and";
                    }
                    FilterGroup filterGroup = new FilterGroup();
                    filterGroup.op = "or";
                    foreach (Field item in list)
                    {
                        filterGroup.rules.Add(new FilterRule
                        {
                            field = item.name,
                            op = "like",
                            value = key
                        });
                    }
                    filters.groups.Add(filterGroup);
                }
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult PagedData(string id, string model, string fullJson, Dictionary<string, object> treeCondition, string key)
        {
            try
            {
                QueryDescriptor descriptor = FullJsonValue.GetObject<QueryDescriptor>(fullJson);
                IService service = ServiceHelper.GetService(model);
                if (treeCondition != null && treeCondition.Keys.Count > 0)
                {
                    FilterGroup treeCondition2 = service.GetTreeCondition(treeCondition);
                    if (treeCondition2 != null)
                    {
                        descriptor.Condition.groups.Add(treeCondition2);
                    }
                }
                ChangeFilterGroup(model, key, descriptor.Condition);
                object pageData = service.GetPageData(descriptor);
                return Json(pageData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult CPD(string id, string model, string fullJson)
        {
            return CommonPagedData(id, model, fullJson);
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult CommonPagedData(string id, string model, string fullJson)
        {
            try
            {
                QueryDescriptor descriptor = FullJsonValue.GetObject<QueryDescriptor>(fullJson);
                if (model.StartsWith("core_"))
                {
                    return Json(null);
                }
                DbContext currentDb = SysContext.GetCurrentDb();
                if (!string.IsNullOrEmpty(id))
                {
                    model = id;
                }
                PagedData commonPageData = DataAccessHelper.GetCommonPageData(currentDb, model, descriptor);
                return Json(commonPageData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult CommonListData(string id, string model, string filter, string orderby)
        {
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                if (model.StartsWith("core_"))
                {
                    return Json(null);
                }
                DbContext currentDb = SysContext.GetCurrentDb();
                if (!string.IsNullOrEmpty(id))
                {
                    model = id;
                }
                IList commonListData = DataAccessHelper.GetCommonListData(currentDb, model, filterGroup, orderby);
                return Json(commonListData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ListData(string model, string filter, string key)
        {
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                IService service = ServiceHelper.GetService(model);
                ChangeFilterGroup(model, key, filterGroup);
                List<Dictionary<string, object>> listData = service.GetListData(filterGroup);
                return Json(listData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult TreeData(string model, string fullJson, string loadDataRights = "Y")
        {
            try
            {
                FilterTree fTree = FullJsonValue.GetObject<FilterTree>(fullJson);
                if (string.IsNullOrEmpty(model))
                {
                    model = fTree.sourceModel;
                }
                IService service = ServiceHelper.GetService(model);
                if (loadDataRights == "N")
                {
                    service.EnabledRights = false;
                }
                object treeData = service.GetTreeData(fTree);
                return Json(treeData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult NameData(string id, string model, string filter, string key)
        {
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                IService service = ServiceHelper.GetService(model);
                ChangeFilterGroup(model, key, filterGroup);
                object nameData = service.GetNameData(filterGroup);
                return Json(nameData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult IdData(string id, string model, string key, string filter, string orderBy)
        {
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                DbContext currentDb = SysContext.GetCurrentDb();
                ServiceHelper.GetService(model);
                ChangeFilterGroup(model, key, filterGroup);
                FilterTranslator filterTranslator = new FilterTranslator();
                filterTranslator.Group = filterGroup;
                filterTranslator.Translate();
                string commandText = filterTranslator.CommandText;
                commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
                if (!string.IsNullOrEmpty(orderBy))
                {
                    commandText += string.Format(" order by {0}", orderBy);
                }
                List<string> data = currentDb.Fetch<string>("select id from " + model + " " + commandText, new object[0]);
                return Json(data);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult DetailData(string model, string id, string filter)
        {
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                IService service = ServiceHelper.GetService(model);
                Dictionary<string, object> detailData = service.GetDetailData(id, filterGroup);
                return Json(new AjaxResult
                {
                    data = detailData,
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }
        [HttpPost]
        public ActionResult PrintCheck()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Preview(string Context, string TemplateId, string isreport, string descriptorCode)
        {
            base.ViewBag.Context = Context;
            base.ViewBag.TemplateId = TemplateId;
            base.ViewBag.IsReport = isreport;
            base.ViewBag.descriptorCode = descriptorCode;
            return View();
        }
        [HttpGet]
        public ActionResult PreviewFrame()
        {
            return View();
        }


        [VaildateUser]
        [HttpPost]
        public ActionResult GetTemplateConents(string context, string templateId, int? pageindex, string isReport, string descriptorCode)
        {
            try
            {
                string strTemplateOut = string.Empty;
                DbContext dbContext = SysContext.GetCurrentDb();
                if (isReport == "Y")
                {
                    PrintData printReport = new PrintData();
                    int num = (!pageindex.HasValue) ? 1 : pageindex.Value;
                    printReport.coreReportTemp = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                    {
                        templateId
                    });
                    printReport.SetDefaultTemplateData();
                    string input = Base64Helper.DecodingString(descriptorCode);
                    QueryDescriptor queryDescriptor = JsonHelper.DeserializeJsonToObject<QueryDescriptor>(input);
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(printReport.coreReportTemp.ModelName);
                    IService service = ServiceHelper.GetService(printReport.coreReportTemp.ModelName);
                    int num2 = 1;
                    queryDescriptor.PageIndex = num;
                    PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
                    long total = pagedData.Total;
                    double a = (double)total * 1.0 / (double)printReport.coreReportTemp.PageSize.Value;
                    num2 = (int)Math.Ceiling(a);
                    List<Dictionary<string, object>> dicPrintRecord = (pagedData.Records as List<Dictionary<string, object>>);
                    strTemplateOut = printReport.coreReportTemp.TemplateBody;
                    strTemplateOut= printReport.FillPrintDataWithServiceConfig(serviceConfig, printReport, dicPrintRecord, strTemplateOut);
                    string text = styleTemplate.ToString();
                    if (queryDescriptor.EnabledPage)
                    {
                        strTemplateOut = strTemplateOut.Replace("{#page}", ObjectExtensions.ToStr((object)queryDescriptor.PageIndex));
                        strTemplateOut = strTemplateOut.Replace("{#pagecount}", ObjectExtensions.ToStr((object)num2));
                    }
                    else
                    {
                        strTemplateOut = strTemplateOut.Replace("{#page}", "1");
                        strTemplateOut = strTemplateOut.Replace("{#pagecount}", ObjectExtensions.ToStr((object)num2));
                    }
                    text = text.Replace("{style}", printReport.coreReportTemp.TemplateStyle);
                    text = text.Replace("{content}", strTemplateOut);
                    string[] array;
                    if (!queryDescriptor.EnabledPage)
                    {
                        array = new string[1]
                        {
                            text
                        };
                    }
                    else
                    {
                        array = new string[num2];
                        array[queryDescriptor.PageIndex.Value - 1L] = text;
                    }
                    return Json(new
                    {
                        Success = true,
                        templateParm = new
                        {
                            marginBottom = printReport.coreReportTemp.MarginBottom,
                            marginTop = printReport.coreReportTemp.MarginTop,
                            marginLeft = printReport.coreReportTemp.MarginLeft,
                            marginRight = printReport.coreReportTemp.MarginRight,
                            width = printReport.coreReportTemp.Width,
                            height = printReport.coreReportTemp.Height
                        },
                        contents = array
                    });
                }
                var printData = new PrintData(dbContext.FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
                {
                    templateId
                }));
                if (printData.printTemp == null)
                {
                    throw new Exception("打印模板未定义");
                }
                printData.formatContent = printData.printTemp.TemplateBody;
                printData.SetDefaultTemplateData();
                List<string> contents = printData.GetTemplatePage(context, pageindex, false);
                return Json(new
                {
                    Success = true,
                    templateParm = new
                    {
                        marginBottom = printData.printTemp.MarginBottom,
                        marginTop = printData.printTemp.MarginTop,
                        marginLeft = printData.printTemp.MarginLeft,
                        marginRight = printData.printTemp.MarginRight,
                        width = printData.printTemp.Width,
                        height = printData.printTemp.Height
                    },
                    contents
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult GetCommonPrint(string fullJson)
        {
            try
            {
                string strTemplateOut = string.Empty;
                PrintModel p = JsonHelper.DeserializeJsonToObject<PrintModel>(fullJson);
                List<GridColumn> columns = p.columns;
                List<Dictionary<string, object>> listdata = p.listdata;
                Dictionary<string, object> totaldata = p.totaldata;
                string title = p.title;
                int? pageSize = p.pageSize;
                Dictionary<string, object> detaildata = p.detaildata;

                DbContext currentDb = SysContext.GetCurrentDb();
                ServiceConfig serviceConfig = new ServiceConfig();
                serviceConfig.fields = new List<Field>();
                ServiceConfig serviceConfig_ = serviceConfig;
                if (listdata == null)
                {
                    listdata = new List<Dictionary<string, object>>();
                }
                PrintData printData = new PrintData();
                if (listdata != null)
                {
                    printData.coreReportTemp = new FastDev.DevDB.Model.core_reportTemplate();
                    printData.SetDefaultTemplateData();
                    string text = "";
                    string text2 = "";
                    int num = 0;
                    string newValue = "";
                    List<string> list = new List<string>();
                    int num2 = 0;
                    List<string> list2 = new List<string>();
                    if (columns.Any(c => c.columns != null && c.columns.Any()))
                    {
                        List<string> list3 = new List<string>();
                        List<string> list4 = new List<string>();
                        for (int i = 0; i < columns.Count; i++)
                        {
                            GridColumn gridColumn = columns[i];
                            if (gridColumn.columns != null && gridColumn.columns.Any())
                            {
                                list3.Add(string.Format("<td class='{3}' align='center' width='{1}' rowspan='1' colspan='{2}'>\r\n                <span style='font-size: 14px;'><strong>{0}</strong></span>\r\n            </td>", gridColumn.display, gridColumn.width ?? "100", gridColumn.columns.Count, (num++ == 0) ? "firstcell" : ""));
                                foreach (GridColumn column in gridColumn.columns)
                                {
                                    list4.Add(string.Format("<td class='{2}' align='center' width='{1}'>\r\n                <span style='font-size: 14px;'><strong>{0}</strong></span>\r\n            </td>", column.display, column.width ?? "100", (num++ == 0) ? "firstcell" : ""));
                                    list2.Add(string.Format("<td class='{3}' align='{2}' width='{1}' valign='middle'>\r\n                {0}\r\n            </td>", "{" + column.name + "}", column.width ?? "100", column.align, (num == 1) ? "firstcell" : ""));
                                    if (!string.IsNullOrEmpty(column.totalType))
                                    {
                                        if (!list.Any())
                                        {
                                            list.Add(string.Format("<td class='firstcell' align='right' rowspan='1' colspan='{0}'>\r\n                <strong>合计：</strong> \r\n            </td>", num2));
                                        }
                                        list.Add(string.Format("<td align='{1}'>{0}</td>", ObjectExtensions.ToStr(totaldata[column.name]), column.align));
                                    }
                                    else
                                    {
                                        if (list.Any())
                                        {
                                            list.Add("<td>&nbsp</td>");
                                        }
                                        num2++;
                                    }
                                }
                            }
                            else
                            {
                                list3.Add(string.Format("<td class='{2}' align='center' width='{1}' rowspan='2' colspan='1'>\r\n                <span style='font-size: 14px;'><strong>{0}</strong></span>\r\n            </td>", gridColumn.display, gridColumn.width ?? "100", (num++ == 0) ? "firstcell" : ""));
                                list2.Add(string.Format("<td class='{3}' align='{2}' width='{1}' valign='middle'>\r\n                {0}\r\n            </td>", "{" + gridColumn.name + "}", gridColumn.width ?? "100", gridColumn.align, (num == 1) ? "firstcell" : ""));
                                if (!string.IsNullOrEmpty(gridColumn.totalType))
                                {
                                    if (!list.Any())
                                    {
                                        list.Add(string.Format("<td class='firstcell' align='right' rowspan='1' colspan='{0}'>\r\n                <strong>合计：</strong> \r\n            </td>", num2));
                                    }
                                    list.Add(string.Format("<td align='{1}'>{0}</td>", ObjectExtensions.ToStr(totaldata[gridColumn.name]), gridColumn.align));
                                }
                                else
                                {
                                    if (list.Any())
                                    {
                                        list.Add("<td>&nbsp</td>");
                                    }
                                    num2++;
                                }
                            }
                        }
                        text = "<tr class='header firstRow'>" + string.Join(" ", list3.ToArray()) + "</tr>";
                        text = text + "<tr>" + string.Join(" ", list4.ToArray()) + "</tr>";
                    }
                    else
                    {
                        List<string> list5 = new List<string>();
                        foreach (GridColumn column2 in columns)
                        {
                            list5.Add(string.Format("<td class='{2}' align='center' width='{1}'>\r\n                <span style='font-size: 14px;'><strong>{0}</strong></span>\r\n            </td>", column2.display, column2.width ?? "100", (num++ == 0) ? "firstcell" : ""));
                            list2.Add(string.Format("<td class='{3}' align='{2}' width='{1}' valign='middle'>\r\n                {0}\r\n            </td>", "{" + column2.name + "}", column2.width ?? "100", column2.align, (num == 1) ? "firstcell" : ""));
                            if (!string.IsNullOrEmpty(column2.totalType))
                            {
                                if (!list.Any())
                                {
                                    list.Add(string.Format("<td class='firstcell' align='right' rowspan='1' colspan='{0}'>\r\n                <strong>合计：</strong> \r\n            </td>", num2));
                                }
                                list.Add(string.Format("<td align='{1}'>{0}</td>", ObjectExtensions.ToStr(totaldata[column2.name]), column2.align));
                            }
                            else if (list.Any())
                            {
                                list.Add(string.Format("<td align='right'>&nbsp</td>"));
                            }
                            else
                            {
                                if (list.Any())
                                {
                                    list.Add("<td>&nbsp</td>");
                                }
                                num2++;
                            }
                        }
                        text = "<tr class='header firstRow'>" + string.Join(" ", list5.ToArray()) + "</tr>";
                    }
                    text2 = "<tr class='row'>" + string.Join(" ", list2.ToArray()) + "</tr>";
                    if (list.Any())
                    {
                        newValue = "<tr class='total'>" + string.Join(" ", list.ToArray()) + "</tr>";
                    }
                    string text3 = "<p>\r\n<div style='position: absolute;color: rgb(171, 168, 168);bottom:10px;right:10px;'>\r\n    {#page}/{#pagecount}\r\n</div>\r\n<h2 style='text-align: center;'>\r\n#TITLE#\r\n</h2>\r\n<p style='line-height: 0.4em;'>\r\n    <br/>\r\n</p>\r\n<table class='ne-report-detail' cellpadding='3' cellspacing='0' border='0' data-sort='sortDisabled'>\r\n    <tbody>\r\n#HEADER#\r\n        <!--START-->\r\n#ROW#\r\n        <!--END-->\r\n#TOTAL#\r\n    </tbody>\r\n</table>";
                    text3 = text3.Replace("#TITLE#", title);
                    text3 = text3.Replace("#HEADER#", text);
                    text3 = text3.Replace("#ROW#", text2);
                    text3 = text3.Replace("#TOTAL#", newValue);
                    printData.coreReportTemp.TemplateBody = text3;
                    printData.SetDefaultTemplateData();
                    int num7 = listdata.Count();
                    double a = (double)num7 * 1.0 / (double)pageSize.Value;
                    int pageCount = (int)Math.Ceiling(a);
                    string[] array = new string[pageCount];
                    if (pageCount == 0)
                    {
                        strTemplateOut = printData.coreReportTemp.TemplateBody;
                        strTemplateOut= printData.FillPrintDataWithServiceConfig(serviceConfig_, printData, new List<Dictionary<string, object>>(), strTemplateOut);
                        string text4 = styleTemplate.ToString();
                        foreach (KeyValuePair<string, object> item in printData.dicPageInfo)
                        {
                            strTemplateOut = strTemplateOut.Replace("{#" + item.Key + "}", ObjectExtensions.ToStr(item.Value));
                        }
                        text4 = text4.Replace("{style}", printData.coreReportTemp.TemplateStyle);
                        text4 = text4.Replace("{content}", strTemplateOut);
                        array = new string[1]
                        {
                            text4
                        };
                    }
                    else
                    {
                        for (int j = 1; j <= pageCount; j++)
                        {
                            printData.FillUserInfo(j, pageCount);
                            List<Dictionary<string, object>> dicPrintRecord = new List<Dictionary<string, object>>();
                            for (int i = pageSize.Value * (j - 1); i < j * pageSize.Value && i < listdata.Count(); i++)
                            {
                                dicPrintRecord.Add(listdata[i]);
                            }
                            strTemplateOut = printData.coreReportTemp.TemplateBody;
                            strTemplateOut= printData.FillPrintDataWithServiceConfig(serviceConfig_, printData, dicPrintRecord, strTemplateOut);
                            string text4 = styleTemplate.ToString();
                            foreach (KeyValuePair<string, object> item2 in printData.dicPageInfo)
                            {
                                strTemplateOut = strTemplateOut.Replace("{#" + item2.Key + "}", ObjectExtensions.ToStr(item2.Value));
                            }
                            text4 = text4.Replace("{style}", printData.coreReportTemp.TemplateStyle);
                            text4 = (array[j - 1] = text4.Replace("{content}", strTemplateOut));
                        }
                    }
                    return Json(new
                    {
                        Success = true,
                        templateParm = new
                        {
                            marginBottom = printData.coreReportTemp.MarginBottom,
                            marginTop = printData.coreReportTemp.MarginTop,
                            marginLeft = printData.coreReportTemp.MarginLeft,
                            marginRight = printData.coreReportTemp.MarginRight,
                            width = printData.coreReportTemp.Width,
                            height = printData.coreReportTemp.Height
                        },
                        contents = array
                    });
                }
                printData.coreReportTemp = new FastDev.DevDB.Model.core_reportTemplate();
                printData.SetDefaultTemplateData();
                return Json(new
                {
                    Success = true,
                    templateParm = new
                    {
                        marginBottom = printData.coreReportTemp.MarginBottom,
                        marginTop = printData.coreReportTemp.MarginTop,
                        marginLeft = printData.coreReportTemp.MarginLeft,
                        marginRight = printData.coreReportTemp.MarginRight,
                        width = printData.coreReportTemp.Width,
                        height = printData.coreReportTemp.Height
                    },
                    contents = new object[0]
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }


        [HttpPost]
        [VaildateUser]
        public ActionResult GetPrintConents(string context, string model)
        {
            try
            {
                DbContext dbContext = SysContext.GetCurrentDb();
                PrintData printData = new PrintData(dbContext.FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ModelName = @0", new object[1]
                {
                    model
                }));
                ServiceHelper.GetService(printData.printTemp.ModelName);
                if (printData.printTemp == null)
                {
                    throw new Exception("打印模板未定义");
                }
                printData.formatContent = printData.printTemp.TemplateBody;
                printData.SetDefaultTemplateData();
                List<string> data = printData.GetTemplatePage(context, null, true);
                return Json(new AjaxResult
                {
                    Success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult PrintPDF(string context, string templateId, string isdownload)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                PrintData printData = new PrintData(SysContext.GetCurrentDb().FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
                {
                    templateId
                }));
                if (printData.printTemp == null)
                {
                    throw new Exception("打印模板未定义");
                }
                printData.formatContent = printData.printTemp.TemplateBody;
                printData.SetDefaultTemplateData();
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(printData.printTemp.ModelName);


                var list = printData.GetTemplatePage(context, null, true);
                list[0] = list[0].Insert(0, "<style type=\"text/css\">\r\n                     {style}\r\n             </style> ".Replace("{style}", printData.printTemp.TemplateStyle));

                byte[] array = PDFHelper.HmtlToPDF(list[0], (double)printData.printTemp.MarginLeft.Value, (double)printData.printTemp.MarginTop.Value,
                    (double)printData.printTemp.MarginRight.Value, (double)printData.printTemp.MarginBottom.Value);


                return File(array, "application/pdf;", serviceConfig.model.title + ".pdf");
            }
            catch (Exception ex)
            {
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }

        [NonAction]
        private string PrintJpgUrl(string contextId, string templateId, int pageIndex)
        {
            string text = base.Request.Path.ToString();
            text = text.Substring(0, text.IndexOf("web"));
            return text + "web/printjpg?context=" + contextId + "&templateId=" + templateId + "&pageindex=" + pageIndex + "&isjpg=N";
        }
        [HttpPost]
        public HttpResponseMessage PrintJPG(string context, string templateId, int pageindex, string isjpg)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            PrintData printData = new PrintData((SysContext.GetCurrentDb()).FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
            {
                templateId
            }));
            if (printData.printTemp == null)
            {
                throw new Exception("打印模板未定义");
            }
            printData.formatContent = printData.printTemp.TemplateBody;
            printData.SetDefaultTemplateData();
            ServiceHelper.GetServiceConfig(printData.printTemp.ModelName);
            List<TemplatePageInfo> list = printData.GetTemplatePages(context);
            bool flag = pageindex <= 0 && list.Count > 1;
            bool flag2 = pageindex <= 0 || isjpg == "Y";
            if (flag)
            {
                List<ZipFileInfo> list2 = new List<ZipFileInfo>();
                string path = Server.MapPath("~/ouputs/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                printWidth = Convert.ToInt32((double)printData.printTemp.Width.Value * 3.78);
                printHeight = Convert.ToInt32((double)printData.printTemp.Height.Value * 3.78);
                foreach (TemplatePageInfo item in list)
                {
                    jpgUrl = PrintJpgUrl(context, templateId, item.AllPageIndex);
                    Thread thread = new Thread(GetJpegByWebBrowser);
                    thread.SetApartmentState(ApartmentState.STA);
                    thread.Start();
                    while (thread.IsAlive)
                    {
                        Thread.Sleep(100);
                    }
                    string text = Server.MapPath("~/ouputs/" + DateTime.Now.ToString("yyyyMMddHHmmss") + new Random().Next(0, 999) + ".jpg");
                    bitmap_0.Save(text);
                    List<ZipFileInfo> list3 = list2;
                    ZipFileInfo val = new ZipFileInfo();
                    val.FileName = text;
                    val.Name = "第" + item.AllPageIndex + "页.jpg";
                    list3.Add(val);
                }
                string text2 = Server.MapPath("~/ouputs/" + DateTime.Now.ToString("yyyyMMddHHmmss") + new Random().Next(0, 999) + ".zip");
                ZipHelper.Zip((IList<ZipFileInfo>)list2, text2);
                foreach (ZipFileInfo item2 in list2)
                {
                    try
                    {
                        System.IO.File.Delete(item2.FileName);
                    }
                    catch (Exception)
                    {
                    }
                }
                response.StatusCode = System.Net.HttpStatusCode.OK;
                response.Content = new ByteArrayContent(System.IO.File.ReadAllBytes(text2));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-zip-compressed");
                response.Headers.Add("Content-Disposition", "attachment;filename=" + Server.UrlEncode("图片.zip"));
                return response;
            }
            if (flag2)
            {
                printWidth = Convert.ToInt32((double)printData.printTemp.Width.Value * 3.78);
                printHeight = Convert.ToInt32((double)printData.printTemp.Height.Value * 3.78);
                jpgUrl = PrintJpgUrl(context, templateId, pageindex);
                Thread thread = new Thread(GetJpegByWebBrowser);
                thread.SetApartmentState(ApartmentState.STA);
                thread.Start();
                while (thread.IsAlive)
                {
                    Thread.Sleep(100);
                }
                byte[] array = Bitmap2Bytes(bitmap_0);

                response.StatusCode = System.Net.HttpStatusCode.OK;
                response.Content = new ByteArrayContent(array);
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("image/gif");
                response.Headers.Add("Content-Disposition", "attachment;filename=" + Server.UrlEncode("预览.jpg"));
                return response;
            }
            List<string> list4 = printData.GetTemplatePage(context, pageindex, false);
            string text3 = System.IO.File.ReadAllText(Server.MapPath("~/Contents/template.html"));
            double num = (double)printData.printTemp.Width.Value * 3.78 - (double)Convert.ToInt32(printData.printTemp.MarginLeft) * 3.78 - (double)Convert.ToInt32(printData.printTemp.MarginRight) * 3.78;
            double num2 = (double)printData.printTemp.Height.Value * 3.78 - (double)Convert.ToInt32(printData.printTemp.MarginTop) * 3.78 - (double)Convert.ToInt32(printData.printTemp.MarginBottom) * 3.78;
            string text4 = string.Format("background:#fff;border:none;margin-left:{0}px;margin-top:{1}px;margin-right:{2}px;margin-bottom:{3}px;width:{4}px;height:{5}px;overflow:hidden;", (double)Convert.ToInt32(printData.printTemp.MarginLeft) * 3.78, (double)Convert.ToInt32(printData.printTemp.MarginTop) * 3.78, (double)Convert.ToInt32(printData.printTemp.MarginRight) * 3.78, (double)Convert.ToInt32(printData.printTemp.MarginBottom) * 3.78, num, num2);
            string newValue = "<div style='" + text4 + "'>" + list4[Convert.ToInt32(pageindex) - 1] + "</div>";
            string content = text3.Replace("#html#", newValue);
            response.StatusCode = System.Net.HttpStatusCode.OK;
            response.Content = new StringContent(content);
            response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("text/html");
            return response;
        }

        [VaildateUser]
        [HttpPost]
        public HttpResponseMessage PrintPDF_Report(string context, string templateId, string isdownload, string descriptorCode)
        {
            try
            {
                DbContext dbContext = SysContext.GetCurrentDb();
                PrintData printData = new PrintData(dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                {
                    templateId
                }));
                if (printData.coreReportTemp == null)
                {
                    throw new Exception("打印模板未定义");
                }
                printData.formatContent = printData.coreReportTemp.TemplateBody;
                printData.SetDefaultTemplateData();
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(printData.coreReportTemp.ModelName);
                string a = "img";
                List<string> list = new List<string>();
                List<iTextSharp.text.Image> list2 = new List<iTextSharp.text.Image>();
                if (a == "img")
                {
                    QueryDescriptor queryDescriptor = new QueryDescriptor();
                    try
                    {
                        string input = Base64Helper.DecodingString(descriptorCode);
                        queryDescriptor = JsonHelper.DeserializeJsonToObject<QueryDescriptor>(input);
                    }
                    catch
                    {
                    }
                    FilterTranslator filterTranslator = new FilterTranslator();
                    filterTranslator.Group = queryDescriptor.Condition;
                    filterTranslator.Translate();
                    int num = dbContext.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1}", printData.coreReportTemp.ModelName, filterTranslator.CommandText, filterTranslator.Parms), new object[0]);
                    double num2 = Math.Ceiling((double)num * 1.0 / (double)printData.coreReportTemp.PageSize.Value);
                    printWidth = Convert.ToInt32((double)printData.coreReportTemp.Width.Value * 3.78);
                    printHeight = Convert.ToInt32((double)printData.coreReportTemp.Height.Value * 3.78);
                    for (int i = 0; (double)i < num2; i++)
                    {
                        jpgUrl = GetReportJpgPath(context, templateId, i + 1);
                        Thread thread = new Thread(GetJpegByWebBrowser);
                        thread.SetApartmentState(ApartmentState.STA);
                        thread.Start();
                        while (thread.IsAlive)
                        {
                            Thread.Sleep(100);
                        }
                        iTextSharp.text.Image instance = iTextSharp.text.Image.GetInstance(bitmap_0, ImageFormat.Bmp);
                        instance.ScalePercent(75f);
                        list2.Add(instance);
                    }
                }
                else
                {
                    list = printData.GetTemplatePage(context, null, true);
                    list.Insert(0, "<style type=\"text/css\">\r\n                     {style}\r\n             </style> ".Replace("{style}", printData.coreReportTemp.TemplateStyle));
                }
                printData.coreReportTemp.Width = Convert.ToDecimal((double)printData.coreReportTemp.Width.Value * 2.845);
                printData.coreReportTemp.Height = Convert.ToDecimal((double)printData.coreReportTemp.Height.Value * 2.845);
                printData.coreReportTemp.MarginLeft = Convert.ToDecimal((double)printData.coreReportTemp.MarginLeft.Value * 2.845);
                printData.coreReportTemp.MarginRight = Convert.ToDecimal((double)printData.coreReportTemp.MarginRight.Value * 2.845);
                printData.coreReportTemp.MarginTop = Convert.ToDecimal((double)printData.coreReportTemp.MarginTop.Value * 2.845);
                printData.coreReportTemp.MarginBottom = Convert.ToDecimal((double)printData.coreReportTemp.MarginBottom.Value * 2.845);
                printData.coreReportTemp.MarginLeft = 10m;
                printData.coreReportTemp.MarginTop = 10m;
                byte[] array = null;
                array = ((!(a == "img")) ? ConvertHtml2PDF(list.ToArray(), printData, (!(isdownload == "Y")) ? true : false) : ConvertImages2PDF(list2, printData, (!(isdownload == "Y")) ? true : false));
                HttpResponseMessage response = new HttpResponseMessage();
                response.StatusCode = System.Net.HttpStatusCode.OK;
                response.Content = new ByteArrayContent(array);
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/pdf; charset=UTF-8");


                if (isdownload == "Y")
                {
                    response.Headers.Add("Content-Disposition", "attachment;filename=" + Server.UrlEncode("freedesign_" + serviceConfig.model.title + ".pdf"));
                }
                else
                {
                    response.Headers.Add("Content-Disposition", "inline; filename=" + Server.UrlEncode("freedesign_" + serviceConfig.model.title + ".pdf"));
                }
                return response;

            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                HttpResponseMessage response = new HttpResponseMessage();
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                response.Content = new StringContent(JsonHelper.SerializeObject(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                }));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                return response;
            }
        }

        [NonAction]
        private string GetReportJpgPath(string dataId, string tempId, int pageIndex)
        {
            string text = base.Request.Path.ToString();
            text = text.Substring(0, text.IndexOf("web"));
            return text + "web/printjpg_Report?context=" + dataId + "&templateId=" + tempId + "&pageindex=" + pageIndex + "&isjpg=N";
        }
        [HttpPost]
        public HttpResponseMessage PrintJPG_Report(string context, string templateId, int pageindex, string isjpg, string descriptorCode)
        {
            string strTemplateOut = string.Empty;
            HttpResponseMessage response = new HttpResponseMessage();
            DbContext dbContext = SysContext.GetCurrentDb();
            PrintData printData = new PrintData(dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
            {
                templateId
            }));
            if (printData.coreReportTemp == null)
            {
                throw new Exception("打印模板未定义");
            }
            printData.formatContent = printData.coreReportTemp.TemplateBody;
            printData.SetDefaultTemplateData();
            ServiceHelper.GetServiceConfig(printData.coreReportTemp.ModelName);
            QueryDescriptor queryDescriptor = new QueryDescriptor();
            try
            {
                string input = Base64Helper.DecodingString(descriptorCode);
                queryDescriptor = JsonHelper.DeserializeJsonToObject<QueryDescriptor>(input);
            }
            catch
            {
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            filterTranslator.Group = queryDescriptor.Condition;
            filterTranslator.Translate();
            int num = dbContext.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1}", printData.coreReportTemp.ModelName, filterTranslator.CommandText, filterTranslator.Parms), new object[0]);
            double num2 = Math.Ceiling((double)num * 1.0 / (double)printData.coreReportTemp.PageSize.Value);
            bool flag = pageindex <= 0 && num2 > 1.0;
            bool flag2 = pageindex <= 0 || isjpg == "Y";
            if (flag)
            {
                List<ZipFileInfo> list = new List<ZipFileInfo>();
                string path = Server.MapPath("~/ouputs/");
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                printWidth = Convert.ToInt32((double)printData.coreReportTemp.Width.Value * 3.78);
                printHeight = Convert.ToInt32((double)printData.coreReportTemp.Height.Value * 3.78);
                for (int i = 1; (double)i <= num2; i++)
                {
                    jpgUrl = GetReportJpgPath(context, templateId, i);
                    Thread thread = new Thread(GetJpegByWebBrowser);
                    thread.SetApartmentState(ApartmentState.STA);
                    thread.Start();
                    while (thread.IsAlive)
                    {
                        Thread.Sleep(100);
                    }
                    string text = Server.MapPath("~/ouputs/" + DateTime.Now.ToString("yyyyMMddHHmmss") + new Random().Next(0, 999) + ".jpg");
                    bitmap_0.Save(text);
                    List<ZipFileInfo> list2 = list;
                    ZipFileInfo val = new ZipFileInfo();
                    val.FileName = text;
                    val.Name = "第" + i + "页.jpg";
                    list2.Add(val);
                }
                string text2 = Server.MapPath("~/ouputs/" + DateTime.Now.ToString("yyyyMMddHHmmss") + new Random().Next(0, 999) + ".zip");
                ZipHelper.Zip((IList<ZipFileInfo>)list, text2);
                foreach (ZipFileInfo item in list)
                {
                    try
                    {
                        System.IO.File.Delete(item.FileName);
                    }
                    catch (Exception)
                    {
                    }
                }
                response.Headers.Add("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode("图片.zip"));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/x-zip-compressed");
                response.Content = new ByteArrayContent(System.IO.File.ReadAllBytes(text2));
                return response;
            }
            if (flag2)
            {
                printWidth = Convert.ToInt32((double)printData.coreReportTemp.Width.Value * 3.78);
                printHeight = Convert.ToInt32((double)printData.coreReportTemp.Height.Value * 3.78);
                jpgUrl = GetReportJpgPath(context, templateId, pageindex);
                Thread thread = new Thread(GetJpegByWebBrowser);
                thread.SetApartmentState(ApartmentState.STA);
                thread.Start();
                while (thread.IsAlive)
                {
                    Thread.Sleep(100);
                }
                byte[] array = Bitmap2Bytes(bitmap_0);
                response.Headers.Add("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode("预览.jpg"));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("image/gif");
                response.Content = new ByteArrayContent(array);
                return response;
            }
            ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(printData.coreReportTemp.ModelName);
            IService service = ServiceHelper.GetService(printData.coreReportTemp.ModelName);
            queryDescriptor.PageIndex = pageindex;
            queryDescriptor.PageSize = printData.coreReportTemp.PageSize.Value;
            PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
            num = (int)pagedData.Total;
            double a = (double)num * 1.0 / (double)printData.coreReportTemp.PageSize.Value;
            int num5 = (int)Math.Ceiling(a);
            var dicPrintRecord = (pagedData.Records as List<Dictionary<string, object>>);
            strTemplateOut = printData.coreReportTemp.TemplateBody;
            strTemplateOut= printData.FillPrintDataWithServiceConfig(serviceConfig, printData, dicPrintRecord,strTemplateOut);
            string text3 = styleTemplate.ToString();
            text3 = text3.Replace("{style}", printData.coreReportTemp.TemplateStyle);
            text3 = text3.Replace("{content}", strTemplateOut);
            string text4 = System.IO.File.ReadAllText(Server.MapPath("~/Contents/template.html"));
            double num3 = (double)printData.coreReportTemp.Width.Value * 3.78 - (double)Convert.ToInt32(printData.coreReportTemp.MarginLeft) * 3.78 - (double)Convert.ToInt32(printData.coreReportTemp.MarginRight) * 3.78;
            double num4 = (double)printData.coreReportTemp.Height.Value * 3.78 - (double)Convert.ToInt32(printData.coreReportTemp.MarginTop) * 3.78 - (double)Convert.ToInt32(printData.coreReportTemp.MarginBottom) * 3.78;
            string text5 = string.Format("background:#fff;border:none;margin-left:{0}px;margin-top:{1}px;margin-right:{2}px;margin-bottom:{3}px;width:{4}px;height:{5}px;overflow:hidden;", (double)Convert.ToInt32(printData.coreReportTemp.MarginLeft) * 3.78, (double)Convert.ToInt32(printData.coreReportTemp.MarginTop) * 3.78, (double)Convert.ToInt32(printData.coreReportTemp.MarginRight) * 3.78, (double)Convert.ToInt32(printData.coreReportTemp.MarginBottom) * 3.78, num3, num4);
            string newValue = "<div style='" + text5 + "'>" + text3 + "</div>";
            string content = text4.Replace("#html#", newValue);
            response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("text/html");
            response.Content = new StringContent(content);
            return response;
        }
        [NonAction]
        public byte[] Bitmap2Bytes(Bitmap bm)
        {
            MemoryStream memoryStream = new MemoryStream();
            bm.Save(memoryStream, ImageFormat.Bmp);
            byte[] buffer = memoryStream.GetBuffer();
            memoryStream.Close();
            return buffer;
        }

        [HttpPost]
        [VaildateUser]
        public ActionResult PrintPreview(string context, string templateId)
        {
            var dbContext = SysContext.GetCurrentDb();
            PrintData printData = new PrintData(dbContext.FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
            {
                templateId
            }));
            IService service = ServiceHelper.GetService(printData.printTemp.ModelName);
            printData.ModelDetailData = service.GetDetailData(context, null);
            printData.formatContent = printData.printTemp.TemplateBody;
            printData.DoWithJsonXmlContent();
            printData.DoWithJsonContent();
            base.ViewBag.Style = printData.printTemp.TemplateStyle;
            base.ViewBag.Content = printData.formatContent;
            return View("Print");
        }


        [NonAction]
        private void GetJpegByWebBrowser()
        {
            //using (WebBrowser webBrowser = new WebBrowser())
            //{
            //    webBrowser.Width = int_0;
            //    webBrowser.Height = int_1;
            //    webBrowser.ScrollBarsEnabled = false;
            //    webBrowser.Navigate(string_1);
            //    while (webBrowser.ReadyState != WebBrowserReadyState.Complete)
            //    {
            //        Application.DoEvents();
            //    }
            //    bitmap_0 = new Bitmap(int_0, int_1);
            //    webBrowser.DrawToBitmap(bitmap_0, new System.Drawing.Rectangle(0, 0, int_0, int_1));
            //    webBrowser.Dispose();
            //}
        }

        [HttpPost]
        public byte[] ConvertImages2PDF(List<iTextSharp.text.Image> imgs, PrintData printData, bool isPrint = false)
        {
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document();
            if (printData.printTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)printData.printTemp.Width.Value, (float)printData.printTemp.Height.Value);
                document = new Document(pageSize, (float)printData.printTemp.MarginLeft.Value, (float)printData.printTemp.MarginRight.Value, (float)printData.printTemp.MarginTop.Value, (float)printData.printTemp.MarginBottom.Value);
            }
            else if (printData.coreReportTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)printData.coreReportTemp.Width.Value, (float)printData.coreReportTemp.Height.Value);
                document = new Document(pageSize, (float)printData.coreReportTemp.MarginLeft.Value, (float)printData.coreReportTemp.MarginRight.Value, (float)printData.coreReportTemp.MarginTop.Value, (float)printData.coreReportTemp.MarginBottom.Value);
            }
            PdfWriter instance = PdfWriter.GetInstance(document, memoryStream);
            instance.CloseStream = false;
            document.Open();
            foreach (iTextSharp.text.Image img in imgs)
            {
                document.Add(img);
            }
            if (isPrint)
            {
                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.Append("this.print();");
                instance.AddJavaScript(stringBuilder.ToString());
            }
            document.Close();
            memoryStream.Close();
            return memoryStream.ToArray();
        }
        [HttpPost]
        public byte[] ConvertHtml2PDF(string[] contents, PrintData printData, bool isPrint = false)
        {
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document();
            if (printData.printTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)printData.printTemp.Width.Value, (float)printData.printTemp.Height.Value);
                document = new Document(pageSize, (float)printData.printTemp.MarginLeft.Value, (float)printData.printTemp.MarginRight.Value, (float)printData.printTemp.MarginTop.Value, (float)printData.printTemp.MarginBottom.Value);
            }
            else if (printData.coreReportTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)printData.coreReportTemp.Width.Value, (float)printData.coreReportTemp.Height.Value);
                document = new Document(pageSize, (float)printData.coreReportTemp.MarginLeft.Value, (float)printData.coreReportTemp.MarginRight.Value, (float)printData.coreReportTemp.MarginTop.Value, (float)printData.coreReportTemp.MarginBottom.Value);
            }
            PdfWriter instance = PdfWriter.GetInstance(document, memoryStream);
            document.Open();
            foreach (string string_ in contents)
            {
                WriteStyle2Pdf(instance, document, string_);
                //PdfDiv pdfDiv = new PdfDiv();
                //pdfDiv.Height = 30f;
                //document.Add(pdfDiv);
            }
            PdfDestination dest = new PdfDestination(0, 0f, document.PageSize.Height, 1f);
            PdfAction openAction = PdfAction.GotoLocalPage(1, dest, instance);
            instance.SetOpenAction(openAction);
            if (isPrint)
            {
                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.Append("this.print();");
                instance.AddJavaScript(stringBuilder.ToString());
            }
            document.Close();
            memoryStream.Close();
            return memoryStream.ToArray();
        }

        [NonAction]
        private void WriteStyle2Pdf(PdfWriter pdfWriter_0, Document document_0, string string_7)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(string_7);
            using (MemoryStream memoryStream = new MemoryStream(bytes))
            {
                FileStream inCssFile = new FileStream(Server.MapPath("~/contents/application/print.css"), FileMode.Open);
                //XMLWorkerHelper.GetInstance().ParseXHtml(pdfWriter_0, document_0, memoryStream, inCssFile, Encoding.UTF8, new UnicodeFontFactory());
                memoryStream.Close();
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ReportData(string model, ReportArg arg)
        {
            try
            {
                var reportResult = new ReportPrintData().GetReportResult(model, arg);
                return Json(new AjaxResult
                {
                    data = reportResult,
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

       
        [VaildateUser]
        [HttpPost]
        public ActionResult Rights(string id, string roleId, string userId, string loginName, string fullJson)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                RightsServer rightsServer = new RightsServer(currentDb);
                object data = null;
                if (!string.IsNullOrEmpty(loginName))
                {
                    userId = SysContext.WanJiangUserID;
                }
                if (id == "get")
                {
                    if (!string.IsNullOrEmpty(roleId))
                    {
                        data = rightsServer.Get(RightsMasterType.Role, roleId);
                    }
                    else if (!string.IsNullOrEmpty(userId))
                    {
                        data = rightsServer.Get(RightsMasterType.User, userId);
                    }
                }
                else if (id == "save")
                {

                    var jsonContext = JObject.Parse(fullJson);
                    RightsSaveModel value = jsonContext.SelectToken("value").ToObject<RightsSaveModel>();
                    if (!string.IsNullOrEmpty(roleId))
                    {
                        data = rightsServer.Save(RightsMasterType.Role, roleId, value);
                    }
                    else if (!string.IsNullOrEmpty(userId))
                    {
                        data = rightsServer.Save(RightsMasterType.User, userId, value);
                    }
                }
                return Json(new AjaxResult
                {
                    Success = true,
                    data = data
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult getDataAssign(FastDev.DevDB.Model.core_dataAssign data)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            try
            {
                FastDev.DevDB.Model.core_dataAssign core_dataAssign = currentDb.FirstOrDefault<FastDev.DevDB.Model.core_dataAssign>("where MasterName = @0 and MasterID = @1 and ModelName = @2", new object[3]
                {
                    data.MasterName,
                    data.MasterID,
                    data.ModelName
                });
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    data = ((core_dataAssign == null) ? "" : core_dataAssign.ValueContent)
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult delDataAssign(FastDev.DevDB.Model.core_dataAssign data)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            try
            {
                currentDb.Delete<FastDev.DevDB.Model.core_dataAssign>("where MasterName = @0 and MasterID = @1 and ModelName = @2", new object[3]
                {
                    data.MasterName,
                    data.MasterID,
                    data.ModelName
                });
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult saveDataAssign(FastDev.DevDB.Model.core_dataAssign data)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            try
            {
                FastDev.DevDB.Model.core_dataAssign core_dataAssign = currentDb.FirstOrDefault<FastDev.DevDB.Model.core_dataAssign>("where MasterName = @0 and MasterID = @1 and ModelName = @2", new object[3]
                {
                    data.MasterName,
                    data.MasterID,
                    data.ModelName
                });
                if (string.IsNullOrEmpty(data.ValueContent))
                {
                    return delDataAssign(data);
                }
                if (core_dataAssign != null)
                {
                    core_dataAssign.ValueContent = data.ValueContent;
                    core_dataAssign.ModifyDate = DateTime.Now;
                    core_dataAssign.ModifyUserID = SysContext.WanJiangUserID;
                    currentDb.Update("core_dataAssign", "ID", (object)core_dataAssign);
                }
                else
                {
                    data.ID = ObjectExtensions.ToStr((object)Guid.NewGuid());
                    data.CreateDate = DateTime.Now;
                    data.CreateUserID = SysContext.WanJiangUserID;
                    currentDb.Insert("core_dataAssign", "ID", false, (object)data);
                }
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult Save(string model, string method, string fullJson, string parm)
        {
            //IL_004f: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                Type entityType = DataAccessHelper.GetEntityType(model, "Form");
                var postdata = FullJsonValue.GetObject(entityType, fullJson);
                if (postdata == null)
                {
                    throw new Exception("提交数据处理失败");
                }
                if ((model.ToLower() == "core_user" || model.ToLower() == "core_role") && IsWebLocked())
                {
                    throw new UserException("没有操作权限");
                }
                IService service = ServiceHelper.GetService(model);
                if (parm != null)
                {
                    service.ServiceParm = parm;
                }
                bool flag = method == "create";
                object obj = null;
                object propertyValue = DataHelper.GetPropertyValue(postdata.GetType(), postdata, "data");
                obj = ((!flag) ? service.Update(propertyValue) : service.Create(propertyValue));
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    id = obj.ToString(),
                    data = service.ServiceData
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult SaveList(string model, string fullJson, string parm)
        {
            //IL_004f: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                Type entityType = DataAccessHelper.GetEntityType(model, "Form");
                var postdata = FullJsonValue.GetListObject(entityType, fullJson);
                if (postdata == null)
                {
                    throw new Exception("提交数据处理失败");
                }
                if ((model.ToLower() == "core_user" || model.ToLower() == "core_role") && IsWebLocked())
                {
                    throw new UserException("没有操作权限");
                }
                IService service = ServiceHelper.GetService(model);
                if (parm != null)
                {
                    service.ServiceParm = parm;
                }
                object obj = null;
                object propertyValue = DataHelper.GetPropertyValue(postdata.GetType(), postdata, "data");
                obj = service.SaveList(propertyValue);
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    id = obj.ToString(),
                    data = service.ServiceData
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult Delete(string model, string[] arg)
        {
            //IL_0011: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                if (IsWebLocked())
                {
                    throw new UserException("没有操作权限");
                }
                IService service = ServiceHelper.GetService(model);
                service.Delete(arg);
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    data = service.ServiceData
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [HttpPost]
        [VaildateUser]
        public ActionResult Setting()
        {
            return View();
        }

        [HttpPost]
        [VaildateUser]
        public ActionResult SaveSetting(Dictionary<string, object> data)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            List<FastDev.DevDB.Model.core_setting> list = currentDb.Fetch<FastDev.DevDB.Model.core_setting>("", new object[0]);
            currentDb.BeginTransaction();
            try
            {
                using (Dictionary<string, object>.Enumerator enumerator = data.GetEnumerator())
                {
                    while (enumerator.MoveNext())
                    {
                        Func<FastDev.DevDB.Model.core_setting, bool> func = null;
                        KeyValuePair<string, object> item = enumerator.Current;
                        List<FastDev.DevDB.Model.core_setting> source = list;
                        func = delegate (FastDev.DevDB.Model.core_setting a)
                        {
                            string settingKey = a.SettingKey;
                            KeyValuePair<string, object> keyValuePair2 = item;
                            return string.Compare(settingKey, keyValuePair2.Key, true) == 0;
                        };
                        FastDev.DevDB.Model.core_setting core_setting = source.FirstOrDefault(func);
                        if (core_setting != null)
                        {
                            DbContext dbContext = currentDb;
                            string iD = core_setting.ID;
                            KeyValuePair<string, object> keyValuePair = item;
                            dbContext.Update("core_setting", "ID", (object)new
                            {
                                ID = iD,
                                SettingValue = keyValuePair.Value
                            });
                        }
                        else
                        {
                            KeyValuePair<string, object> keyValuePair = item;
                            if (!keyValuePair.Key.EndsWith("_textfield"))
                            {
                                DbContext dbContext_ = currentDb;
                                keyValuePair = item;
                                string key = keyValuePair.Key;
                                keyValuePair = item;
                                string key2 = keyValuePair.Key;
                                keyValuePair = item;
                                AddCoreSetting(dbContext_, key, key2, ObjectExtensions.ToStr(keyValuePair.Value));
                            }
                        }
                    }
                }
                currentDb.CompleteTransaction();
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                currentDb.AbortTransaction();
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [NonAction]
        private void AddCoreSetting(DbContext db, string strKey, string strName, string strValue)
        {
            db.Insert("core_setting", "ID", false, (object)new FastDev.DevDB.Model.core_setting
            {
                ID = Guid.NewGuid().ToString(),
                CreateDate = DateTime.Now,
                CreateUserID = SysContext.WanJiangUserID,
                ModifyDate = DateTime.Now,
                ModifyUserID = SysContext.WanJiangUserID,
                SettingKey = strKey,
                SettingName = strName,
                SettingValue = strValue
            });
        }

        [HttpPost]
        [VaildateUser]
        public ActionResult GetSetting()
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            List<FastDev.DevDB.Model.core_setting> list = currentDb.Fetch<FastDev.DevDB.Model.core_setting>("", new object[0]);
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            foreach (FastDev.DevDB.Model.core_setting item in list)
            {
                dictionary[item.SettingKey] = item.SettingValue;
            }
            return Json(new
            {
                statusCode = "1",
                data = dictionary
            });
        }

        [VaildateUser]
        [HttpPost]
        public HttpResponseMessage Template(string id, string templateId, string dbViewName, string template, string model, string filterCode, string filter, string descriptor)
        {
            FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
            QueryDescriptor queryDescriptor = FullJsonValue.GetObject<QueryDescriptor>(descriptor);
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                string strTemplateOut = string.Empty;
                DbContext currentDb = SysContext.GetCurrentDb();
                string text = "";
                if (!string.IsNullOrEmpty(filterCode))
                {
                    string input = Base64Helper.DecodingString(filterCode);
                    if (queryDescriptor.EnabledPage)
                    {
                        queryDescriptor.Condition = JsonHelper.DeserializeJsonToObject<FilterGroup>(input);
                    }
                    else
                    {
                        filterGroup = JsonHelper.DeserializeJsonToObject<FilterGroup>(input);
                    }
                }
                string text2 = null;
                long num = 0L;
                PrintData printData = new PrintData();
                if (id != "kanban")
                {
                    printData.coreReportTemp = currentDb.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                    {
                        templateId
                    });
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(printData.coreReportTemp.ModelName);
                    IService service = ServiceHelper.GetService(printData.coreReportTemp.ModelName);
                    text2 = serviceConfig.model.title;
                    if (printData.coreReportTemp == null)
                    {
                        throw new Exception("报表模板未定义");
                    }
                    List<Dictionary<string, object>> dicPrintRecord;
                    if (queryDescriptor.EnabledPage)
                    {
                        PagedData pagedData = string.IsNullOrEmpty(dbViewName) ? (service.GetPageData(queryDescriptor) as PagedData) : DataAccessHelper.GetCommonPageData(currentDb, dbViewName, queryDescriptor);
                        num = pagedData.Total;
                        dicPrintRecord = (pagedData.Records as List<Dictionary<string, object>>);
                    }
                    else
                    {
                        dicPrintRecord = (string.IsNullOrEmpty(dbViewName) ? service.GetListData(filterGroup) : (DataAccessHelper.GetCommonListData(currentDb, dbViewName, filterGroup, null) as List<Dictionary<string, object>>));
                        num = dicPrintRecord.Count;
                    }
                    strTemplateOut = printData.coreReportTemp.TemplateBody;
                    strTemplateOut= printData.FillPrintDataWithServiceConfig(serviceConfig, printData, dicPrintRecord, strTemplateOut);
                    text = styleTemplate.ToString();
                    strTemplateOut = strTemplateOut.Replace("{#page}/{#pagecount}", "");
                    text = text.Replace("{style}", printData.coreReportTemp.TemplateStyle);
                    text = text.Replace("{content}", strTemplateOut);
                }
                else
                {
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model);
                    IService service = ServiceHelper.GetService(model);
                    text2 = serviceConfig.model.title;
                    List<Dictionary<string, object>> dicKanbanRecord;
                    if (queryDescriptor.EnabledPage)
                    {
                        PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
                        num = pagedData.Total;
                        dicKanbanRecord = (pagedData.Records as List<Dictionary<string, object>>);
                    }
                    else
                    {
                        dicKanbanRecord = service.GetListData(filterGroup);
                        num = dicKanbanRecord.Count;
                    }
                    strTemplateOut = ReportPrintData.PerpareKanban(serviceConfig, printData, dicKanbanRecord, template, strTemplateOut);
                    text = strTemplateOut;
                }
                response.StatusCode = System.Net.HttpStatusCode.OK;

                if (id == "report")
                {
                    response.Content = new StringContent(JsonHelper.SerializeObject(new
                    {
                        Success = true,
                        total = num,
                        data = text
                    }));

                    response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    return response;
                }
                if (id == "kanban")
                {
                    response.Content = new StringContent(JsonHelper.SerializeObject(new
                    {
                        Success = true,
                        total = num,
                        data = text
                    }));
                    response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                    return response;
                }

                if (id == "print")
                {
                    byte[] buffer = ConvertHtml2PDF(new string[1]
                    {
                        text
                    }, printData, true);


                    response.StatusCode = System.Net.HttpStatusCode.OK;
                    response.Content = new ByteArrayContent(buffer);
                    response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/pdf; charset=UTF-8");
                    response.Headers.Add("Content-Disposition", "attachment;filename=" + Server.UrlEncode("freedesign_" + text2 + ".pdf"));
                    return response;
                }
                return response;
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                response.Content = new StringContent(JsonHelper.SerializeObject(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                }));
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
                return response;
            }
        }
   [VaildateUser]
        [HttpPost]
        public ActionResult user_menus(string appId)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                RightsServer rightsServer = new RightsServer(currentDb);
                List<string> menuIds = rightsServer.GetMenuIds();
                FilterGroup filterGroup = new FilterGroup();
                filterGroup.op = "or";
                FilterGroup filterGroup2 = filterGroup;
                foreach (string item in menuIds)
                {
                    filterGroup2.rules.Add(new FilterRule
                    {
                        field = "ID",
                        op = "equal",
                        value = item
                    });
                }
                FilterGroup filterGroup3 = new FilterGroup();
                filterGroup3.op = "or";
                FilterGroup filterGroup4 = filterGroup3;
                filterGroup4.rules.Add(new FilterRule
                {
                    field = "IsVisible",
                    op = "notequal",
                    value = 0
                });
                filterGroup4.rules.Add(new FilterRule
                {
                    field = "IsVisible",
                    op = "isnull"
                });
                FilterGroup filterGroup5 = new FilterGroup();
                filterGroup5.op = "and";
                FilterGroup filterGroup6 = filterGroup5;
                filterGroup6.groups.Add(filterGroup2);
                filterGroup6.groups.Add(filterGroup4);
                if (!menuIds.Any())
                {
                    return Json(new object[0]);
                }
                IList listData = DataAccessHelper.GetListData(currentDb, "core_menu", filterGroup6, "order by seqno asc");
                return Json(listData);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult user_homestyles()
        {
            List<object> list = new List<object>();
            list.Add(new
            {
                id = "s1",
                text = "传统样式"
            });
            list.Add(new
            {
                id = "s2",
                text = "简约样式"
            });
            if (System.IO.File.Exists(Server.MapPath("~/Views/Home/Index_StyleWin.cshtml")) && System.IO.File.Exists(Server.MapPath("~/Contents/windows/app.js")))
            {
                list.Add(new
                {
                    id = "swin",
                    text = "windows桌面"
                });
            }
            return Json(list);
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult user_getcurrent(string appId)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                string currentUserID = SysContext.WanJiangUserID;
                return Json(new
                {
                    id = currentUserID
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult user_resetpassword(string[] args)
        {
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                if (args != null)
                {
                    foreach (string iD in args)
                    {
                        string text = "1";
                        if (SysContext.EnabledMD5Password)
                        {
                            text = HashHelper.GetMd5(text);
                        }
                        currentDb.Update("core_user", "ID", (object)new
                        {
                            ID = iD,
                            LoginPassword = text
                        });
                    }
                }
                return Json(new
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult user_changepassword(string oldpassword, string password1, string password2)
        {
            //IL_0017: Unknown result type (might be due to invalid IL or missing references)
            //IL_0040: Unknown result type (might be due to invalid IL or missing references)
            //IL_0057: Unknown result type (might be due to invalid IL or missing references)
            //IL_009b: Unknown result type (might be due to invalid IL or missing references)
            //IL_00b2: Unknown result type (might be due to invalid IL or missing references)
            try
            {
                DbContext currentDb = SysContext.GetCurrentDb();
                if (IsWebLocked())
                {
                    throw new UserException("没有操作权限");
                }
                if (string.IsNullOrEmpty(oldpassword) || string.IsNullOrEmpty(password1) || string.IsNullOrEmpty(password2))
                {
                    throw new UserException("密码不能为空");
                }
                if (password1 != password2)
                {
                    throw new UserException("两次密码输入不一致");
                }
                string currentUserID = SysContext.WanJiangUserID;
                string a = currentDb.ExecuteScalar<string>("select LoginPassword from core_user where ID = @0", new object[1]
                {
                    currentUserID
                });
                if (SysContext.EnabledMD5Password)
                {
                    if (a != HashHelper.GetMd5(oldpassword))
                    {
                        throw new UserException("旧密码输入不正确，请重新输入");
                    }
                }
                else if (a != oldpassword)
                {
                    throw new UserException("旧密码输入不正确，请重新输入");
                }
                if (SysContext.EnabledMD5Password)
                {
                    password1 = HashHelper.GetMd5(password1);
                }
                currentDb.Update("core_user", "ID", (object)new
                {
                    ID = currentUserID,
                    LoginPassword = password1
                });
                return Json(new
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        public WebController()
        {

            printWidth = 760;
            printHeight = 900;
            dicModuleTitles = new Dictionary<string, string>();
            styleTemplate = " \r\n             <style type=\"text/css\">\r\n                     {style}\r\n             </style> \r\n             {content}";
            logMan = new LogManager();
            dicBigTree = new Dictionary<string, string>
            {
                {
                    "ligerui.tree_bigdata",
                    "树-大数据库加载"
                }
            };

        }

        [NonAction]
        private bool IsWebLocked()
        {
            try
            {
                return ConfigurationManager.AppSettings["WebLocked"] == "true";
            }
            catch
            {
                return false;
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult Home(string dbid)
        {
            return Content("dbid:" + dbid);
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult GetTemlate(string path)
        {
            try
            {
                return Content(System.IO.File.ReadAllText(Server.MapPath("~/tmpl/" + path + ".html")), "text/html");
            }
            catch
            {
                return Content("");
            }
        }

        [VaildateUser]
        [HttpGet]
        public ActionResult Main(string model, string viewtype, string viewname)
        {
            return Redirect("/main.html?page=" + GetNewUrl(ObjectExtensions.ToStr((object)base.Request.QueryString.ToString())));
        }

        [VaildateUser]
        [HttpPost]
        [HttpGet]
        public ActionResult M(string model, string viewtype, string viewname)
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            if (viewtype == "main")
            {
                viewtype = "list";
            }
            RightsServer rightsServer = new RightsServer(currentDb);
            RunTimeModel runTime = rightsServer.GetRunTime(model, 2);
            if (!runTime.fun.ContainsKey("enabledVisit") || ObjectExtensions.ToInt(runTime.fun["enabledVisit"]) != 1)
            {
                return Content("没有权限访问！");
            }
            if (string.Compare(viewtype, "custom", true) == 0)
            {
                string view = ServiceHelper.GetView(model, viewtype, viewname);
                base.ViewBag.ViewScript = view;
                base.ViewBag.ViewStyle = ServiceHelper.GetView(model, viewtype, viewname, "css");
                base.ViewBag.ViewContent = ServiceHelper.GetView(model, viewtype, viewname, "htm");
                return View("Main_Custom");
            }
            return View("Main");
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult saveTempVariable(string data)
        {
            string text = "TempVariable";
            HttpContext.Session.Set(text, Encoding.UTF8.GetBytes(data));
            return Json(new
            {
                id = text
            });
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult getTempVariable()
        {
            string name = "TempVariable";
            byte[] bdata;
            string data = string.Empty;
            if (HttpContext.Session.TryGetValue(name, out bdata))
            {
                data = Encoding.UTF8.GetString(bdata);
            }
            return Json(new
            {
                data
            });
        }


        [NonAction]
        private string GetDevDBPath(string appId)
        {
            string arg = "";
            if (appId != null)
            {
                arg = ((appId.IndexOf('D') > -1) ? (string.Format(ConfigurationManager.AppSettings["DevelopAppPath"], appId) + "\\database.db") : ((appId.IndexOf('R') <= -1) ? (string.Format(ConfigurationManager.AppSettings["AppPath"], appId) + "\\database.db") : (string.Format(ConfigurationManager.AppSettings["ReleaseAppPath"], appId) + "\\database.db")));
            }
            return string.Format("data source={0}", arg);
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult Workflow(string id, string fullJson)
        {
            var jsonContext = JObject.Parse(fullJson);
            WorkflowContext wfContext = jsonContext.SelectToken("context").ToObject<WorkflowContext>();
            //WorkflowContext wfContext = jsonContext..GetObject<WorkflowContext>(fullJson);
            //IL_005b: Unknown result type (might be due to invalid IL or missing references)
            DbContext currentDb = SysContext.GetCurrentDb();
            ServiceConfig userServiceConfig = ServiceHelper.GetServiceConfig("user");
            IWorkflowService workflowService = new SanHuWorkflowService(SysContext.GetOtherDB(userServiceConfig.model.dbName));
            workflowService.DbContext = currentDb;
            try
            {
                if (id == "execute")
                {
                    currentDb.BeginTransaction();
                    workflowService.Execute(wfContext);
                    currentDb.CompleteTransaction();
                }
                if (id == "context")
                {
                    if (string.IsNullOrEmpty(wfContext.Context))
                    {
                        throw new UserException("业务单据必须指定");
                    }
                    object bcontext = workflowService.GetContext(wfContext);
                    var wfData = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(JsonHelper.SerializeObject(bcontext));
                    return Json(new AjaxResult
                    {
                        data = wfData,
                        statusCode = "1"
                    });
                }
                if (id == "log")
                {
                    object logContext = workflowService.GetLog(wfContext);
                    var wfData = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(JsonHelper.SerializeObject(logContext));
                    return Json(new AjaxResult
                    {
                        statusCode = "1",
                        data = wfData
                    });
                }
                return Json(new AjaxResult
                {
                    statusCode = "1"
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                if (id == "execute")
                {
                    currentDb.AbortTransaction();
                }
                return Json(new AjaxResult
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult ImportOrderDetail(string templateId, string orderId, IFormFile file)
        {
            try
            {
                file = (file ?? base.Request.Form.Files[0]);
                DbContext dbContext = SysContext.GetCurrentDb(); 
                FastDev.DevDB.Model.core_importTemplate core_importTemplate = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_importTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (core_importTemplate == null)
                {
                    throw new Exception("导入模板未定义");
                }
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_importTemplate.ModelName);
                if (serviceConfig == null)
                {
                    throw new Exception("导入模板未定义(model)");
                }
                Type entityType = DataAccessHelper.GetEntityType(serviceConfig.model.name);
                dbContext.GetHelper(entityType);
                PropertyInfo[] properties = entityType.GetProperties();
                properties.Select(p => p.Name).ToList();
                DataHelper.CreateSetProperties(properties);
                Func<object, object[]> func = DataHelper.CreateGetProperties(properties);
                List<FastDev.DevDB.Model.core_importTemplateDetail> list = dbContext.Fetch<FastDev.DevDB.Model.core_importTemplateDetail>("where TemplateID = @0", new object[1]
                {
                    templateId
                });
                List<Field> fields = serviceConfig.fields;
                List<string> list2 = new List<string>();
                HSSFWorkbook hSSFWorkbook = new HSSFWorkbook(file.OpenReadStream());
                ISheet sheetAt = hSSFWorkbook.GetSheetAt(0);
                IRow row = sheetAt.GetRow(0);
                short lastCellNum = row.LastCellNum;
                int lastRowNum = sheetAt.LastRowNum;
                int num = 0;
                object entity;
                for (int i = 1; i <= lastRowNum; i++)
                {
                    try
                    {
                        IRow row2 = sheetAt.GetRow(i);
                        entity = Activator.CreateInstance(entityType);
                        func(entity);
                        Action<string, object> action = delegate (string name, object value)
                        {
                            DataHelper.SetPropertyValue(entityType, entity, name, value);
                        };
                        foreach (FastDev.DevDB.Model.core_importTemplateDetail item in list)
                        {
                            if (!string.IsNullOrEmpty(item.XlsColumn) && !string.IsNullOrEmpty(item.FieldName))
                            {
                                int cellnum = ExcelRender.ToColumnIndex(item.XlsColumn);
                                ICell cell = row2.GetCell(cellnum);
                                object obj = ExcelRender.GetCellValue(cell);
                                Field field = fields.FirstOrDefault((Field a) => a.name == item.FieldName);
                                string type = field.type;
                                if (!(type == FieldTypes.One2many) && !(type == FieldTypes.Many2many))
                                {
                                    if (type == FieldTypes.Many2one)
                                    {
                                        string text = ObjectExtensions.ToStr(obj);
                                        if (!string.IsNullOrEmpty(text))
                                        {
                                            string modeTextField = DataAccessHelper.GetModeTextField(field.relationModel);
                                            obj = dbContext.ExecuteScalar<string>(string.Format("select ID from {0} where {1} = @0", field.relationModel, modeTextField), new object[1]
                                            {
                                                text
                                            });
                                        }
                                    }
                                    else if (type == FieldTypes.Integer)
                                    {
                                        obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(int?), obj) : DataHelper.ConvertValue(typeof(int), obj));
                                    }
                                    else if (type == FieldTypes.Float)
                                    {
                                        try
                                        {
                                            obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(decimal?), obj) : DataHelper.ConvertValue(typeof(decimal), obj));
                                        }
                                        catch (Exception)
                                        {
                                            obj = (decimal)obj;
                                        }
                                    }
                                    else if (type == FieldTypes.Datetime)
                                    {
                                        try
                                        {
                                            obj = cell.DateCellValue;
                                            if (obj == null)
                                            {
                                                throw new Exception("try");
                                            }
                                        }
                                        catch (Exception)
                                        {
                                            try
                                            {
                                                obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(DateTime?), obj) : DataHelper.ConvertValue(typeof(DateTime), obj));
                                            }
                                            catch (Exception)
                                            {
                                            }
                                        }
                                    }
                                    else if (type == FieldTypes.Boolean)
                                    {
                                        try
                                        {
                                            obj = ((!(field.isRequired == "Y")) ? DataHelper.ConvertValue(typeof(byte?), obj) : DataHelper.ConvertValue(typeof(byte), obj));
                                        }
                                        catch (Exception)
                                        {
                                            obj = (byte)((ObjectExtensions.ToStr(obj) == "是" || ObjectExtensions.ToStr(obj).IndexOf("y", StringComparison.CurrentCultureIgnoreCase) == 0) ? 1 : 0);
                                        }
                                    }
                                    else
                                    {
                                        obj = obj.ToString();
                                    }
                                    if (field.isRequired == "Y" && string.IsNullOrEmpty(ObjectExtensions.ToStr(obj)))
                                    {
                                        throw new Exception(string.Format("{0}是必填的", field.type));
                                    }
                                    action(field.dbName, obj);
                                }
                            }
                        }
                        action("OrderID", orderId);
                        action("ID", Guid.NewGuid().ToString());
                        action("CreateDate", DateTime.Now);
                        action("CreateUserID", SysContext.WanJiangUserID);
                        action("ModifyDate", DateTime.Now);
                        action("ModifyUserID", SysContext.WanJiangUserID);
                        dbContext.Insert(entity);
                        num++;
                    }
                    catch (Exception ex)
                    {
                        list2.Add("第" + (i + 1) + "行 插入发送错误： " + ex.Message);
                    }
                }
                return Json(new AjaxResult
                {
                    Success = true,
                    data = new
                    {
                        success = num,
                        errors = list2
                    }
                });
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new
                {
                    statusCode = "3",
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult DicTree(string id, string model, FilterTree filterTree)
        {
            try
            {
                string currentUserID = SysContext.WanJiangUserID;
                DbContext currentDb = SysContext.GetCurrentDb();
                string text = currentDb.ExecuteScalar<string>("select ID from res_dictionary where DicCode = @0", new object[1]
                {
                    id
                });
                if (string.IsNullOrEmpty(text))
                {
                    return Json(new List<object>());
                }
                List<res_dictionaryItems> list = currentDb.Fetch<res_dictionaryItems>("where DicID = @0 order by SortNo desc", new object[1]
                {
                    text
                });
                List<Dictionary<string, object>> list2 = new List<Dictionary<string, object>>();
                foreach (res_dictionaryItems item in list)
                {
                    Dictionary<string, object> dictionary = new Dictionary<string, object>();
                    list2.Add(dictionary);
                    dictionary["id"] = item.ID;
                    dictionary["text"] = item.Title;
                    dictionary["code"] = item.ItemCode;
                }
                object data = string.IsNullOrEmpty(filterTree.rootText) ? ((object)list2) : ((object)new object[1]
                {
                    new
                    {
                        text = filterTree.rootText,
                        rootNode = true,
                        children = list2
                    }
                });
                return Json(data);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult DicItems(string id)
        {
            try
            {
                string currentUserID = SysContext.WanJiangUserID;
                DbContext currentDb = SysContext.GetCurrentDb();
                string text = currentDb.ExecuteScalar<string>("select ID from res_dictionary where DicCode = @0", new object[1]
                {
                    id
                });
                if (string.IsNullOrEmpty(text))
                {
                    return Json(new List<object>());
                }
                List<res_dictionaryItems> data = currentDb.Fetch<res_dictionaryItems>("where DicID = @0 order by SortNo desc", new object[1]
                {
                    text
                });
                return Json(data);
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult DicGridItems(string id)
        {
            try
            {
                string currentUserID = SysContext.WanJiangUserID;
                DbContext currentDb = SysContext.GetCurrentDb();
                string text = currentDb.ExecuteScalar<string>("select ID from res_dictionary where DicCode = @0", new object[1]
                {
                    id
                });
                if (string.IsNullOrEmpty(text))
                {
                    return Json(new List<object>());
                }
                List<res_dictionaryItems> list = currentDb.Fetch<res_dictionaryItems>("where DicID = @0 order by SortNo desc", new object[1]
                {
                    text
                });
                return Json(new PagedData(list, list.Count));
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult UI_List()
        {
            ModelsConfig modelsConfig = ServiceHelper.GetModelsConfig();
            string[] directories = Directory.GetDirectories(Server.MapPath("~/UI/"), "*", SearchOption.TopDirectoryOnly);
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            string[] array = directories;
            foreach (string dir in array)
            {
                list.Add(GetFontJs(dir, modelsConfig));
            }
            return Json(list);
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult UI_Save(string module, string model, string viewname, string content, string isService)
        {
            try
            {
                string text = "";
                text = ((!(isService == "Y")) ? Server.MapPath(string.Format("~/UI/{0}/{1}/{2}.js", module, model, viewname)) : Server.MapPath(string.Format("~/UI/{0}/{1}/service_{2}.js", module, model, viewname)));
                if (System.IO.File.Exists(text))
                {
                    System.IO.File.WriteAllText(text, content);
                    return Json(new AjaxResult
                    {
                        statusCode = "1"
                    });
                }
                return Json(new AjaxResult
                {
                    statusCode = "2",
                    message = "文件路径有误，保存失败"
                });
            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult UI_Get(string module, string model, string viewname)
        {
            try
            {
                string text = "";
                string view = "";
                string service = "";
                text = Server.MapPath(string.Format("~/UI/{0}/{1}/{2}.js", module, model, viewname));
                if (System.IO.File.Exists(text))
                {
                    view = System.IO.File.ReadAllText(text);
                }
                text = Server.MapPath(string.Format("~/UI/{0}/{1}/service_{2}.js", module, model, viewname));
                if (System.IO.File.Exists(text))
                {
                    service = System.IO.File.ReadAllText(text);
                }
                return Json(new AjaxResult
                {
                    statusCode = "1",
                    data = new
                    {
                        view,
                        service
                    }
                });
            }
            catch (Exception ex)
            {
                return Json(new AjaxResult
                {
                    statusCode = ((ex is UserException) ? "2" : "3"),
                    message = ex.Message
                });
            }
        }

        [NonAction]
        private Dictionary<string, object> GetFontJs(string modelDir, ModelsConfig mSetting)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            string text = ObjectExtensions.ToStr((object)modelDir);
            if (text.EndsWith("\\"))
            {
                text = text.Substring(0, text.Length - 1);
            }
            string model = text.Substring(text.LastIndexOf("\\") + 1);
            string text2 = (from a in mSetting.models
                            where a.name == model
                            select a).Select(m => m.title).FirstOrDefault();
            dictionary["id"] = model;
            dictionary["text"] = (text2 ?? model);
            dictionary["type"] = "model";
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            string[] files = Directory.GetFiles(modelDir);
            string[] array = files;
            foreach (string f in array)
            {
                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(f);
                string extension = Path.GetExtension(f);
                if (!(extension != ".js") && !fileNameWithoutExtension.Contains("service_"))
                {
                    list.Add(GetViewInfo(f, mSetting, model));
                }
            }
            dictionary["children"] = list;
            return dictionary;
        }

        [NonAction]
        private Dictionary<string, object> GetViewInfo(string viewName, ModelsConfig modelsConfig_0, string string_8)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            string str = (string)(dictionary["text"] = (dictionary["id"] = Path.GetFileNameWithoutExtension(viewName)));
            if (dicBigTree.ContainsKey(string_8 + "." + str))
            {
                dictionary["text"] = dicBigTree[string_8 + "." + str];
            }
            dictionary["type"] = "view";
            dictionary["model"] = string_8;
            return dictionary;
        }
        [HttpPost]
        public ActionResult Pay(PayInfo data)
        {
            return new EmptyResult();
        }









    }
}
