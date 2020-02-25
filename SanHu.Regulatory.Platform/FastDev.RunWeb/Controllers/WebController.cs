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

        public class TemplatePageInfo
        {

            public string Context
            {
                get;
                set;
            }

            public int PageIndex
            {
                get;
                set;
            }

            public int AllPageIndex
            {
                get;
                set;
            }

            public TemplatePageInfo()
            {


            }
        }

        public class SettingInfo
        {

            public string AppName
            {
                get;
                set;
            }

            public string PostCompany
            {
                get;
                set;
            }

            public string PostCharge
            {
                get;
                set;
            }

            public string PostPhone
            {
                get;
                set;
            }

            public string PostAddress
            {
                get;
                set;
            }

            public string SalesCompany
            {
                get;
                set;
            }

            public SettingInfo()
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

        private DbContext dbContext_0;

        private string string_0;

        private DbContext dbContext_1;

        private Dictionary<string, object> dictionary_0;

        private Dictionary<string, object> dictionary_1;

        private FastDev.DevDB.Model.core_printTemplate core_printTemplate_0;

        private Bitmap bitmap_0 = null;

        private string string_1;

        private int int_0;

        private int int_1;

        private string string_2;

        private ServiceConfig serviceConfig_0;

        private List<NameValue> list_0;

        private List<NameValue> list_1;

        private Dictionary<string, string> dicModuleTitles;

        private string strTemplateOut;

        private string strKanBanTemplate;


        private DbContext dbContextMain;

        private List<Dictionary<string, object>> list_2;

        private List<Dictionary<string, object>> kanbanSrcData;

        private FastDev.DevDB.Model.core_reportTemplate coreReportTemp;

        private string string_6;

        private readonly LogManager logMan;

        private Dictionary<string, string> dictionary_3;
        public HttpServerUtility Server
        {
            get
            {
                return new HttpServerUtility();
            }
        }

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
                List<Field> list = serviceConfig.fields.Where(smethod_0).ToList();
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
                dbContext_0 = SysContext.GetCurrentDb();
                DbContext dbContext = dbContext_0;
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
                properties.Select(smethod_1).ToList();
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
                dbContext_0 = SysContext.GetCurrentDb();
                DbContext dbContext = dbContext_0;
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
                                List<string> items = source.Select(smethod_2).ToList();
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
                dbContext_0 = SysContext.GetCurrentDb();
                DbContext dbContext = dbContext_0;
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
                                text = (string.IsNullOrEmpty(item3.Format) ? ObjectExtensions.ToStr(item2[field.name]) : method_25(item2[field.name], item3.Format));
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
                bool flag = list.Any(smethod_3);
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
        [HttpPost]
        public ActionResult PreviewFrame()
        {
            return View();
        }

        [NonAction]
        private List<TemplatePageInfo> method_1(string string_7)
        {
            List<TemplatePageInfo> list = new List<TemplatePageInfo>();
            if (core_printTemplate_0 != null)
            {
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                string detailFieldName = method_7();
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

        [NonAction]
        private void method_2()
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

        [VaildateUser]
        [HttpPost]
        public ActionResult GetTemplateConents(string context, string TemplateId, int? pageIndex, string isReport, string descriptorCode)
        {
            try
            {
                DbContext dbContext = dbContext_1 = SysContext.GetCurrentDb();
                if (isReport == "Y")
                {
                    int num = (!pageIndex.HasValue) ? 1 : pageIndex.Value;
                    coreReportTemp = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                    {
                        TemplateId
                    });
                    method_2();
                    string input = Base64Helper.DecodingString(descriptorCode);
                    QueryDescriptor queryDescriptor = JsonHelper.DeserializeJsonToObject<QueryDescriptor>(input);
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(coreReportTemp.ModelName);
                    IService service = ServiceHelper.GetService(coreReportTemp.ModelName);
                    int num2 = 1;
                    queryDescriptor.PageIndex = num;
                    PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
                    long total = pagedData.Total;
                    double a = (double)total * 1.0 / (double)coreReportTemp.PageSize.Value;
                    num2 = (int)Math.Ceiling(a);
                    list_2 = (pagedData.Records as List<Dictionary<string, object>>);
                    strTemplateOut = coreReportTemp.TemplateBody;
                    method_23(serviceConfig);
                    string text = string_6.ToString();
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
                    text = text.Replace("{style}", coreReportTemp.TemplateStyle);
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
                            marginBottom = coreReportTemp.MarginBottom,
                            marginTop = coreReportTemp.MarginTop,
                            marginLeft = coreReportTemp.MarginLeft,
                            marginRight = coreReportTemp.MarginRight,
                            width = coreReportTemp.Width,
                            height = coreReportTemp.Height
                        },
                        contents = array
                    });
                }
                core_printTemplate_0 = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
                {
                    TemplateId
                });
                if (core_printTemplate_0 == null)
                {
                    throw new Exception("打印模板未定义");
                }
                string_0 = core_printTemplate_0.TemplateBody;
                method_2();
                List<string> contents = method_4(context, pageIndex, false);
                return Json(new
                {
                    Success = true,
                    templateParm = new
                    {
                        marginBottom = core_printTemplate_0.MarginBottom,
                        marginTop = core_printTemplate_0.MarginTop,
                        marginLeft = core_printTemplate_0.MarginLeft,
                        marginRight = core_printTemplate_0.MarginRight,
                        width = core_printTemplate_0.Width,
                        height = core_printTemplate_0.Height
                    },
                    contents = contents
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

        [NonAction]
        private void FillUserInfo(int page, int pageCount)
        {
            var u = SysContext.GetWanJiangUser();
            DbContext currentDb = SysContext.GetCurrentDb();
            dictionary_1["page"] = ObjectExtensions.ToStr((object)page);
            dictionary_1["pagecount"] = ObjectExtensions.ToStr((object)pageCount);
            dictionary_1["loginname"] = u.AccountId;
            dictionary_1["now"] = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
        }

        [VaildateUser]
        [HttpPost]
        public ActionResult GetCommonPrint(string fullJson)
        {
            try
            {
                PrintModel p = JsonHelper.DeserializeJsonToObject<PrintModel>(fullJson);
                List<GridColumn> columns = p.columns;
                List<Dictionary<string, object>> listdata = p.listdata;
                Dictionary<string, object> totaldata = p.totaldata;
                string title = p.title;
                int? pageSize = p.pageSize;
                Dictionary<string, object> detaildata = p.detaildata;

                DbContext currentDb = SysContext.GetCurrentDb();
                dbContext_1 = currentDb;
                ServiceConfig serviceConfig = new ServiceConfig();
                serviceConfig.fields = new List<Field>();
                ServiceConfig serviceConfig_ = serviceConfig;
                if (listdata == null)
                {
                    listdata = new List<Dictionary<string, object>>();
                }
                if (listdata != null)
                {
                    coreReportTemp = new FastDev.DevDB.Model.core_reportTemplate();
                    method_2();
                    string text = "";
                    string text2 = "";
                    int num = 0;
                    string newValue = "";
                    List<string> list = new List<string>();
                    int num2 = 0;
                    List<string> list2 = new List<string>();
                    if (columns.Any(smethod_5))
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
                    coreReportTemp.TemplateBody = text3;
                    method_2();
                    int num7 = listdata.Count();
                    double a = (double)num7 * 1.0 / (double)pageSize.Value;
                    int pageCount = (int)Math.Ceiling(a);
                    string[] array = new string[pageCount];
                    if (pageCount == 0)
                    {
                        strTemplateOut = coreReportTemp.TemplateBody;
                        method_23(serviceConfig_);
                        string text4 = string_6.ToString();
                        foreach (KeyValuePair<string, object> item in dictionary_1)
                        {
                            strTemplateOut = strTemplateOut.Replace("{#" + item.Key + "}", ObjectExtensions.ToStr(item.Value));
                        }
                        text4 = text4.Replace("{style}", coreReportTemp.TemplateStyle);
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
                            FillUserInfo(j, pageCount);
                            List<Dictionary<string, object>> list6 = new List<Dictionary<string, object>>();
                            for (int i = pageSize.Value * (j - 1); i < j * pageSize.Value && i < listdata.Count(); i++)
                            {
                                list6.Add(listdata[i]);
                            }
                            list_2 = list6;
                            strTemplateOut = coreReportTemp.TemplateBody;
                            method_23(serviceConfig_);
                            string text4 = string_6.ToString();
                            foreach (KeyValuePair<string, object> item2 in dictionary_1)
                            {
                                strTemplateOut = strTemplateOut.Replace("{#" + item2.Key + "}", ObjectExtensions.ToStr(item2.Value));
                            }
                            text4 = text4.Replace("{style}", coreReportTemp.TemplateStyle);
                            text4 = (array[j - 1] = text4.Replace("{content}", strTemplateOut));
                        }
                    }
                    return Json(new
                    {
                        Success = true,
                        templateParm = new
                        {
                            marginBottom = coreReportTemp.MarginBottom,
                            marginTop = coreReportTemp.MarginTop,
                            marginLeft = coreReportTemp.MarginLeft,
                            marginRight = coreReportTemp.MarginRight,
                            width = coreReportTemp.Width,
                            height = coreReportTemp.Height
                        },
                        contents = array
                    });
                }
                coreReportTemp = new FastDev.DevDB.Model.core_reportTemplate();
                method_2();
                return Json(new
                {
                    Success = true,
                    templateParm = new
                    {
                        marginBottom = coreReportTemp.MarginBottom,
                        marginTop = coreReportTemp.MarginTop,
                        marginLeft = coreReportTemp.MarginLeft,
                        marginRight = coreReportTemp.MarginRight,
                        width = coreReportTemp.Width,
                        height = coreReportTemp.Height
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

        [NonAction]
        private List<string> method_4(string string_7, int? NHTadHyHOIGc31lUi0, bool bool_0)
        {
            IService service = ServiceHelper.GetService(core_printTemplate_0.ModelName);
            List<string> list = new List<string>();
            List<TemplatePageInfo> list2 = method_1(string_7);
            int num = (!NHTadHyHOIGc31lUi0.HasValue) ? 1 : NHTadHyHOIGc31lUi0.Value;
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
                    string detailFieldName = method_7();
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

        [HttpPost]
        [VaildateUser]
        public ActionResult GetPrintConents(string context, string model)
        {
            try
            {
                core_printTemplate_0 = (dbContext_1 = SysContext.GetCurrentDb()).FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ModelName = @0", new object[1]
                {
                    model
                });
                ServiceHelper.GetService(core_printTemplate_0.ModelName);
                if (core_printTemplate_0 == null)
                {
                    throw new Exception("打印模板未定义");
                }
                string_0 = core_printTemplate_0.TemplateBody;
                method_2();
                List<string> data = method_4(context, null, true);
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
        public HttpResponseMessage PrintPDF(string context, string templateId, string isdownload)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            try
            {
                core_printTemplate_0 = (dbContext_1 = SysContext.GetCurrentDb()).FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (core_printTemplate_0 == null)
                {
                    throw new Exception("打印模板未定义");
                }
                string_0 = core_printTemplate_0.TemplateBody;
                method_2();
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
                string a = "img";
                List<string> list = new List<string>();
                List<iTextSharp.text.Image> list2 = new List<iTextSharp.text.Image>();
                if (a == "img")
                {
                    string text = base.Request.Path.ToString().Replace("printpdf", "printjpg") + "&showhtml=Y";
                    context.Split(';');
                    List<TemplatePageInfo> list3 = method_1(context);
                    int_0 = Convert.ToInt32((double)core_printTemplate_0.Width.Value * 3.78);
                    int_1 = Convert.ToInt32((double)core_printTemplate_0.Height.Value * 3.78);
                    foreach (TemplatePageInfo item in list3)
                    {
                        string_1 = method_5(context, templateId, item.AllPageIndex);
                        Thread thread = new Thread(method_10);
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
                    list = method_4(context, null, true);
                    list.Insert(0, "<style type=\"text/css\">\r\n                     {style}\r\n             </style> ".Replace("{style}", core_printTemplate_0.TemplateStyle));
                }
                core_printTemplate_0.Width = Convert.ToDecimal((double)core_printTemplate_0.Width.Value * 2.845);
                core_printTemplate_0.Height = Convert.ToDecimal((double)core_printTemplate_0.Height.Value * 2.845);
                core_printTemplate_0.MarginLeft = Convert.ToDecimal((double)core_printTemplate_0.MarginLeft.Value * 2.845);
                core_printTemplate_0.MarginRight = Convert.ToDecimal((double)core_printTemplate_0.MarginRight.Value * 2.845);
                core_printTemplate_0.MarginTop = Convert.ToDecimal((double)core_printTemplate_0.MarginTop.Value * 2.845);
                core_printTemplate_0.MarginBottom = Convert.ToDecimal((double)core_printTemplate_0.MarginBottom.Value * 2.845);
                byte[] array = null;
                array = ((!(a == "img")) ? ConvertHtml2PDF(list.ToArray(), (!(isdownload == "Y")) ? true : false) : ConvertImages2PDF(list2, (!(isdownload == "Y")) ? true : false));
                if (isdownload == "Y")
                {
                    response.Headers.Add("Content-Disposition", "attachment;filename=" + Server.UrlEncode("freedesign_" + serviceConfig.model.title + ".pdf"));
                }
                else
                {
                    response.Headers.Add("Content-Disposition", "inline; filename=" + Server.UrlEncode("freedesign_" + serviceConfig.model.title + ".pdf"));
                }

                response.StatusCode = System.Net.HttpStatusCode.OK;
                response.Content = new ByteArrayContent(array);
                response.Content.Headers.ContentType = MediaTypeHeaderValue.Parse("application/pdf; charset=UTF-8");
                return response;
            }
            catch (Exception ex)
            {
                response.StatusCode = System.Net.HttpStatusCode.InternalServerError;
                ServiceHelper.Log(ex);
                response.Content = new StringContent(JsonHelper.SerializeObject(new AjaxResult
                {
                    Success = false,
                    message = ex.Message
                }));
                return response;
            }
        }

        [NonAction]
        private string method_5(string string_7, string string_8, int int_2)
        {
            string text = base.Request.Path.ToString();
            text = text.Substring(0, text.IndexOf("web"));
            return text + "web/printjpg?context=" + string_7 + "&templateId=" + string_8 + "&pageindex=" + int_2 + "&isjpg=N";
        }
        [HttpPost]
        public HttpResponseMessage PrintJPG(string context, string templateId, int pageindex, string isjpg)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            core_printTemplate_0 = (dbContext_1 = SysContext.GetCurrentDb()).FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
            {
                templateId
            });
            if (core_printTemplate_0 == null)
            {
                throw new Exception("打印模板未定义");
            }
            string_0 = core_printTemplate_0.TemplateBody;
            method_2();
            ServiceHelper.GetServiceConfig(core_printTemplate_0.ModelName);
            List<TemplatePageInfo> list = method_1(context);
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
                int_0 = Convert.ToInt32((double)core_printTemplate_0.Width.Value * 3.78);
                int_1 = Convert.ToInt32((double)core_printTemplate_0.Height.Value * 3.78);
                foreach (TemplatePageInfo item in list)
                {
                    string_1 = method_5(context, templateId, item.AllPageIndex);
                    Thread thread = new Thread(method_10);
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
                int_0 = Convert.ToInt32((double)core_printTemplate_0.Width.Value * 3.78);
                int_1 = Convert.ToInt32((double)core_printTemplate_0.Height.Value * 3.78);
                string_1 = method_5(context, templateId, pageindex);
                Thread thread = new Thread(method_10);
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
            List<string> list4 = method_4(context, pageindex, false);
            string text3 = System.IO.File.ReadAllText(Server.MapPath("~/Contents/template.html"));
            double num = (double)core_printTemplate_0.Width.Value * 3.78 - (double)Convert.ToInt32(core_printTemplate_0.MarginLeft) * 3.78 - (double)Convert.ToInt32(core_printTemplate_0.MarginRight) * 3.78;
            double num2 = (double)core_printTemplate_0.Height.Value * 3.78 - (double)Convert.ToInt32(core_printTemplate_0.MarginTop) * 3.78 - (double)Convert.ToInt32(core_printTemplate_0.MarginBottom) * 3.78;
            string text4 = string.Format("background:#fff;border:none;margin-left:{0}px;margin-top:{1}px;margin-right:{2}px;margin-bottom:{3}px;width:{4}px;height:{5}px;overflow:hidden;", (double)Convert.ToInt32(core_printTemplate_0.MarginLeft) * 3.78, (double)Convert.ToInt32(core_printTemplate_0.MarginTop) * 3.78, (double)Convert.ToInt32(core_printTemplate_0.MarginRight) * 3.78, (double)Convert.ToInt32(core_printTemplate_0.MarginBottom) * 3.78, num, num2);
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
                DbContext dbContext = dbContext_1 = SysContext.GetCurrentDb();
                coreReportTemp = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                {
                    templateId
                });
                if (coreReportTemp == null)
                {
                    throw new Exception("打印模板未定义");
                }
                string_0 = coreReportTemp.TemplateBody;
                method_2();
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(coreReportTemp.ModelName);
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
                    int num = dbContext.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1}", coreReportTemp.ModelName, filterTranslator.CommandText, filterTranslator.Parms), new object[0]);
                    double num2 = Math.Ceiling((double)num * 1.0 / (double)coreReportTemp.PageSize.Value);
                    int_0 = Convert.ToInt32((double)coreReportTemp.Width.Value * 3.78);
                    int_1 = Convert.ToInt32((double)coreReportTemp.Height.Value * 3.78);
                    for (int i = 0; (double)i < num2; i++)
                    {
                        string_1 = method_6(context, templateId, i + 1);
                        Thread thread = new Thread(method_10);
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
                    list = method_4(context, null, true);
                    list.Insert(0, "<style type=\"text/css\">\r\n                     {style}\r\n             </style> ".Replace("{style}", coreReportTemp.TemplateStyle));
                }
                coreReportTemp.Width = Convert.ToDecimal((double)coreReportTemp.Width.Value * 2.845);
                coreReportTemp.Height = Convert.ToDecimal((double)coreReportTemp.Height.Value * 2.845);
                coreReportTemp.MarginLeft = Convert.ToDecimal((double)coreReportTemp.MarginLeft.Value * 2.845);
                coreReportTemp.MarginRight = Convert.ToDecimal((double)coreReportTemp.MarginRight.Value * 2.845);
                coreReportTemp.MarginTop = Convert.ToDecimal((double)coreReportTemp.MarginTop.Value * 2.845);
                coreReportTemp.MarginBottom = Convert.ToDecimal((double)coreReportTemp.MarginBottom.Value * 2.845);
                coreReportTemp.MarginLeft = 10m;
                coreReportTemp.MarginTop = 10m;
                byte[] array = null;
                array = ((!(a == "img")) ? ConvertHtml2PDF(list.ToArray(), (!(isdownload == "Y")) ? true : false) : ConvertImages2PDF(list2, (!(isdownload == "Y")) ? true : false));
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
        private string method_6(string string_7, string string_8, int int_2)
        {
            string text = base.Request.Path.ToString();
            text = text.Substring(0, text.IndexOf("web"));
            return text + "web/printjpg_Report?context=" + string_7 + "&templateId=" + string_8 + "&pageindex=" + int_2 + "&isjpg=N";
        }
        [HttpPost]
        public HttpResponseMessage PrintJPG_Report(string context, string templateId, int pageindex, string isjpg, string descriptorCode)
        {
            HttpResponseMessage response = new HttpResponseMessage();
            DbContext dbContext = dbContext_1 = SysContext.GetCurrentDb();
            coreReportTemp = dbContext.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
            {
                templateId
            });
            if (coreReportTemp == null)
            {
                throw new Exception("打印模板未定义");
            }
            string_0 = coreReportTemp.TemplateBody;
            method_2();
            ServiceHelper.GetServiceConfig(coreReportTemp.ModelName);
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
            int num = dbContext.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1}", coreReportTemp.ModelName, filterTranslator.CommandText, filterTranslator.Parms), new object[0]);
            double num2 = Math.Ceiling((double)num * 1.0 / (double)coreReportTemp.PageSize.Value);
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
                int_0 = Convert.ToInt32((double)coreReportTemp.Width.Value * 3.78);
                int_1 = Convert.ToInt32((double)coreReportTemp.Height.Value * 3.78);
                for (int i = 1; (double)i <= num2; i++)
                {
                    string_1 = method_6(context, templateId, i);
                    Thread thread = new Thread(method_10);
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
                int_0 = Convert.ToInt32((double)coreReportTemp.Width.Value * 3.78);
                int_1 = Convert.ToInt32((double)coreReportTemp.Height.Value * 3.78);
                string_1 = method_6(context, templateId, pageindex);
                Thread thread = new Thread(method_10);
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
            ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(coreReportTemp.ModelName);
            IService service = ServiceHelper.GetService(coreReportTemp.ModelName);
            queryDescriptor.PageIndex = pageindex;
            queryDescriptor.PageSize = coreReportTemp.PageSize.Value;
            PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
            num = (int)pagedData.Total;
            double a = (double)num * 1.0 / (double)coreReportTemp.PageSize.Value;
            int num5 = (int)Math.Ceiling(a);
            list_2 = (pagedData.Records as List<Dictionary<string, object>>);
            strTemplateOut = coreReportTemp.TemplateBody;
            method_23(serviceConfig);
            string text3 = string_6.ToString();
            text3 = text3.Replace("{style}", coreReportTemp.TemplateStyle);
            text3 = text3.Replace("{content}", strTemplateOut);
            string text4 = System.IO.File.ReadAllText(Server.MapPath("~/Contents/template.html"));
            double num3 = (double)coreReportTemp.Width.Value * 3.78 - (double)Convert.ToInt32(coreReportTemp.MarginLeft) * 3.78 - (double)Convert.ToInt32(coreReportTemp.MarginRight) * 3.78;
            double num4 = (double)coreReportTemp.Height.Value * 3.78 - (double)Convert.ToInt32(coreReportTemp.MarginTop) * 3.78 - (double)Convert.ToInt32(coreReportTemp.MarginBottom) * 3.78;
            string text5 = string.Format("background:#fff;border:none;margin-left:{0}px;margin-top:{1}px;margin-right:{2}px;margin-bottom:{3}px;width:{4}px;height:{5}px;overflow:hidden;", (double)Convert.ToInt32(coreReportTemp.MarginLeft) * 3.78, (double)Convert.ToInt32(coreReportTemp.MarginTop) * 3.78, (double)Convert.ToInt32(coreReportTemp.MarginRight) * 3.78, (double)Convert.ToInt32(coreReportTemp.MarginBottom) * 3.78, num3, num4);
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
            dbContext_1 = SysContext.GetCurrentDb();
            core_printTemplate_0 = dbContext_1.FirstOrDefault<FastDev.DevDB.Model.core_printTemplate>("where ID = @0", new object[1]
            {
                templateId
            });
            IService service = ServiceHelper.GetService(core_printTemplate_0.ModelName);
            dictionary_0 = service.GetDetailData(context, null);
            string_0 = core_printTemplate_0.TemplateBody;
            method_8();
            method_9();
            base.ViewBag.Style = core_printTemplate_0.TemplateStyle;
            base.ViewBag.Content = string_0;
            return View("Print");
        }

        [NonAction]
        private string method_7()
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

        [NonAction]
        private void method_8()
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

        [NonAction]
        private void method_9()
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

        [NonAction]
        private void method_10()
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
        public byte[] ConvertImages2PDF(List<iTextSharp.text.Image> imgs, bool isPrint = false)
        {
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document();
            if (core_printTemplate_0 != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)core_printTemplate_0.Width.Value, (float)core_printTemplate_0.Height.Value);
                document = new Document(pageSize, (float)core_printTemplate_0.MarginLeft.Value, (float)core_printTemplate_0.MarginRight.Value, (float)core_printTemplate_0.MarginTop.Value, (float)core_printTemplate_0.MarginBottom.Value);
            }
            else if (coreReportTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)coreReportTemp.Width.Value, (float)coreReportTemp.Height.Value);
                document = new Document(pageSize, (float)coreReportTemp.MarginLeft.Value, (float)coreReportTemp.MarginRight.Value, (float)coreReportTemp.MarginTop.Value, (float)coreReportTemp.MarginBottom.Value);
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
        public byte[] ConvertHtml2PDF(string[] contents, bool isPrint = false)
        {
            MemoryStream memoryStream = new MemoryStream();
            Document document = new Document();
            if (core_printTemplate_0 != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)core_printTemplate_0.Width.Value, (float)core_printTemplate_0.Height.Value);
                document = new Document(pageSize, (float)core_printTemplate_0.MarginLeft.Value, (float)core_printTemplate_0.MarginRight.Value, (float)core_printTemplate_0.MarginTop.Value, (float)core_printTemplate_0.MarginBottom.Value);
            }
            else if (coreReportTemp != null)
            {
                iTextSharp.text.Rectangle pageSize = new iTextSharp.text.Rectangle((float)coreReportTemp.Width.Value, (float)coreReportTemp.Height.Value);
                document = new Document(pageSize, (float)coreReportTemp.MarginLeft.Value, (float)coreReportTemp.MarginRight.Value, (float)coreReportTemp.MarginTop.Value, (float)coreReportTemp.MarginBottom.Value);
            }
            PdfWriter instance = PdfWriter.GetInstance(document, memoryStream);
            document.Open();
            foreach (string string_ in contents)
            {
                method_11(instance, document, string_);
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
        private void method_11(PdfWriter pdfWriter_0, Document document_0, string string_7)
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
            DbContext currentDb = SysContext.GetCurrentDb();
            try
            {
                ReportResult reportResult = new ReportResult();
                string_2 = model;
                serviceConfig_0 = ServiceHelper.GetServiceConfig(model);
                list_0 = method_13(currentDb, arg);
                list_1 = method_14(currentDb, arg);
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
                            FilterGroup group = method_15(currentDb, arg, item2.value, item3.value);
                            FilterTranslator filterTranslator = new FilterTranslator(group);
                            filterTranslator.Translate();
                            list.Add(method_19(currentDb, arg.valueField, arg.valueFieldType, filterTranslator.CommandText, filterTranslator.Parms.ToArray()));
                        }
                        obj = list;
                    }
                    else
                    {
                        FilterGroup group = method_15(currentDb, arg, item2.value, null);
                        FilterTranslator filterTranslator = new FilterTranslator(group);
                        filterTranslator.Translate();
                        obj = method_19(currentDb, arg.valueField, arg.valueFieldType, filterTranslator.CommandText, filterTranslator.Parms.ToArray());
                    }
                    reportResult.series.Add(new
                    {
                        name = item2.name,
                        value = obj
                    });
                }
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

        [NonAction]
        private string method_12(DbContext dbContext_3, string tabName, string fieldName, string IdValue)
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

        [NonAction]
        private List<NameValue> method_13(DbContext dbContext_3, ReportArg rArg)
        {
            List<NameValue> list = new List<NameValue>();
            string text = string_2;

            if (rArg.legendFieldType == "text")
            {
                Field field = (from a in serviceConfig_0.fields
                               where a.name == rArg.legendField
                               select a).FirstOrDefault();
                if (field == null)
                {
                    throw new Exception("【" + rArg.legendField + "】字段未定义");
                }
                List<string> list2 = dbContext_3.Fetch<string>(string.Format("select distinct {0} from {1}", rArg.legendField, text), new object[0]);
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
                Field field = (from a in serviceConfig_0.fields
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
                    if (!(field.type == "many2one") || !rArg.legendIncludeDataOnly.HasValue || rArg.legendIncludeDataOnly.Value != 1 || dbContext_3.ExecuteScalar<int>(string.Format("select count(*) from {0} where {1} = @0", text, rArg.legendField + "ID"), new object[1]
                    {
                        item2
                    }) != 0)
                    {
                        string name = method_12(dbContext_3, field.relationModel, text2, item2);
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
                Field field = (from a in serviceConfig_0.fields
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
                List<RangeDateItem> list5 = method_18(dbContext_3, text, rArg.legendField, rArg.legendFieldType);
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

        [NonAction]
        private List<NameValue> method_14(DbContext dbContext_3, ReportArg reportArg_0)
        {
            List<NameValue> list = new List<NameValue>();
            if (string.IsNullOrEmpty(reportArg_0.axisField) || reportArg_0.legendType == "pie")
            {
                return list;
            }
            string text = string_2;

            if (reportArg_0.axisFieldType == "ref")
            {
                Field field = (from a in serviceConfig_0.fields
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
                        string name = method_12(dbContext_3, field.relationModel, text2, item);
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
                Field field = (from a in serviceConfig_0.fields
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
                List<RangeDateItem> list4 = method_18(dbContext_3, text, reportArg_0.axisField, reportArg_0.axisFieldType);
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

        [NonAction]
        private FilterGroup method_15(DbContext dbContext_3, ReportArg reportArg_0, object object_0, object object_1)
        {
            FilterGroup filterGroup = new FilterGroup();
            if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(reportArg_0.legendFieldType))
            {
                RangeDateValue rangeDateValue = object_0 as RangeDateValue;
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.legendField,
                    value = rangeDateValue.Min,
                    op = "greaterthanorequal"
                });
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.legendField,
                    value = rangeDateValue.Max,
                    op = "lessthanorequal"
                });
            }
            else if (reportArg_0.legendFieldType == "ref")
            {
                Field field = (from a in serviceConfig_0.fields
                               where a.name == reportArg_0.legendField
                               select a).FirstOrDefault();
                if (field.type == "many2one")
                {
                    filterGroup.rules.Add(new FilterRule
                    {
                        field = field.dbName,
                        value = object_0,
                        op = "equal"
                    });
                }
            }
            else
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.legendField,
                    value = object_0,
                    op = "equal"
                });
            }
            if (reportArg_0.dataFilter != null && (reportArg_0.dataFilter.rules.Any() || reportArg_0.dataFilter.groups.Any()))
            {
                filterGroup.groups.Add(reportArg_0.dataFilter);
            }
            if (!string.IsNullOrEmpty(reportArg_0.axisField) && reportArg_0.legendType != "pie")
            {
                FilterGroup filterGroup2 = method_16(dbContext_3, reportArg_0, object_1);
                foreach (FilterRule rule in filterGroup2.rules)
                {
                    filterGroup.rules.Add(rule);
                }
            }
            return filterGroup;
        }

        [NonAction]
        private FilterGroup method_16(DbContext dbContext_3, ReportArg reportArg_0, object object_0)
        {
            FilterGroup filterGroup = new FilterGroup();
            if (new string[4]
            {
                "year",
                "month",
                "day",
                "week"
            }.Contains(reportArg_0.axisFieldType))
            {
                RangeDateValue rangeDateValue = object_0 as RangeDateValue;
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.axisField,
                    value = rangeDateValue.Min,
                    op = "greaterthanorequal"
                });
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.axisField,
                    value = rangeDateValue.Max,
                    op = "lessthanorequal"
                });
            }
            else if (reportArg_0.axisFieldType == "ref")
            {
                Field field = (from a in serviceConfig_0.fields
                               where a.name == reportArg_0.axisField
                               select a).FirstOrDefault();
                if (field.type == "many2one")
                {
                    filterGroup.rules.Add(new FilterRule
                    {
                        field = field.dbName,
                        value = object_0,
                        op = "equal"
                    });
                }
            }
            else
            {
                filterGroup.rules.Add(new FilterRule
                {
                    field = reportArg_0.axisField,
                    value = object_0,
                    op = "equal"
                });
            }
            return filterGroup;
        }

        [NonAction]
        private RangeDateValue method_17(DbContext dbContext_3, string string_7, string string_8)
        {
            DateTime min = dbContext_3.ExecuteScalar<DateTime>(string.Format("select min({0}) from {1}", string_8, string_7), new object[0]);
            DateTime max = dbContext_3.ExecuteScalar<DateTime>(string.Format("select max({0}) from {1}", string_8, string_7), new object[0]);
            return new RangeDateValue(min, max);
        }

        [NonAction]
        private List<RangeDateItem> method_18(DbContext dbContext_3, string string_7, string string_8, string string_9)
        {
            RangeDateValue rangeDateValue = method_17(dbContext_3, string_7, string_8);
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

        [NonAction]
        private object method_19(DbContext dbContext_3, string string_7, string string_8, string string_9, params object[] args)
        {
            string arg = "count(*)";
            if (!string.IsNullOrEmpty(string_7) && string_8 != "count")
            {
                arg = string.Format("{0}({1})", string_8, string_7);
            }
            string text = string.Format("select {0} from {1} where {2}", arg, string_2, string_9 ?? "1=1");
            return dbContext_3.ExecuteScalar<double?>(text, args);
        }

        [NonAction]
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
                                method_21(dbContext_, key, key2, ObjectExtensions.ToStr(keyValuePair.Value));
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
        private void method_21(DbContext dbContext_3, string string_7, string string_8, string string_9)
        {
            dbContext_3.Insert("core_setting", "ID", false, (object)new FastDev.DevDB.Model.core_setting
            {
                ID = Guid.NewGuid().ToString(),
                CreateDate = DateTime.Now,
                CreateUserID = SysContext.WanJiangUserID,
                ModifyDate = DateTime.Now,
                ModifyUserID = SysContext.WanJiangUserID,
                SettingKey = string_7,
                SettingName = string_8,
                SettingValue = string_9
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
                DbContext currentDb = SysContext.GetCurrentDb();
                string text = "";
                dbContextMain = currentDb;
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
                if (id != "kanban")
                {
                    coreReportTemp = currentDb.FirstOrDefault<FastDev.DevDB.Model.core_reportTemplate>("where ID = @0", new object[1]
                    {
                        templateId
                    });
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(coreReportTemp.ModelName);
                    IService service = ServiceHelper.GetService(coreReportTemp.ModelName);
                    text2 = serviceConfig.model.title;
                    if (coreReportTemp == null)
                    {
                        throw new Exception("报表模板未定义");
                    }
                    if (queryDescriptor.EnabledPage)
                    {
                        PagedData pagedData = string.IsNullOrEmpty(dbViewName) ? (service.GetPageData(queryDescriptor) as PagedData) : DataAccessHelper.GetCommonPageData(currentDb, dbViewName, queryDescriptor);
                        num = pagedData.Total;
                        list_2 = (pagedData.Records as List<Dictionary<string, object>>);
                    }
                    else
                    {
                        list_2 = (string.IsNullOrEmpty(dbViewName) ? service.GetListData(filterGroup) : (DataAccessHelper.GetCommonListData(currentDb, dbViewName, filterGroup, null) as List<Dictionary<string, object>>));
                        num = list_2.Count;
                    }
                    strTemplateOut = coreReportTemp.TemplateBody;
                    method_23(serviceConfig);
                    text = string_6.ToString();
                    strTemplateOut = strTemplateOut.Replace("{#page}/{#pagecount}", "");
                    text = text.Replace("{style}", coreReportTemp.TemplateStyle);
                    text = text.Replace("{content}", strTemplateOut);
                }
                else
                {
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model);
                    IService service = ServiceHelper.GetService(model);
                    text2 = serviceConfig.model.title;
                    if (queryDescriptor.EnabledPage)
                    {
                        PagedData pagedData = service.GetPageData(queryDescriptor) as PagedData;
                        num = pagedData.Total;
                        kanbanSrcData = (pagedData.Records as List<Dictionary<string, object>>);
                    }
                    else
                    {
                        kanbanSrcData = service.GetListData(filterGroup);
                        num = kanbanSrcData.Count;
                    }
                    strKanBanTemplate = template;
                    PerpareKanban(serviceConfig);
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
                    }, true);


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

        [NonAction]
        private void PerpareKanban(ServiceConfig sConfig)
        {
            Regex regex = new Regex("{(.*?)}");
            List<Field> fields = sConfig.fields;
            MatchCollection matchCollection = regex.Matches(strKanBanTemplate);
            if (matchCollection.Count > 0 && kanbanSrcData != null && kanbanSrcData.Any())
            {
                foreach (Dictionary<string, object> item in kanbanSrcData)
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
                                    text3 = method_25(text3, text2);
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
                                    text3 = method_25(text3, text2);
                                }
                            }
                            else
                            {
                                text3 = method_25(item[field], text2);
                            }
                        }
                        text = text.Substring(0, match.Index) + text3 + text.Substring(match.Index + match.Value.Length);
                    }
                    strTemplateOut += text;
                }
            }
        }

        [NonAction]
        private void method_23(ServiceConfig serviceConfig_1)
        {
            Regex regex = new Regex("<!--START-->([\\s\\S]*?)<!--END-->");
            Regex regex2 = new Regex("{(.*?)}");
            List<Field> fields = serviceConfig_1.fields;
            MatchCollection matchCollection = regex.Matches(strTemplateOut);
            if (matchCollection.Count > 0)
            {
                string value = matchCollection[0].Value;
                StringBuilder stringBuilder = new StringBuilder();
                if (list_2 != null && list_2.Any())
                {
                    MatchCollection matchCollection2 = regex2.Matches(value);
                    int num = -1;
                    foreach (Dictionary<string, object> item in list_2)
                    {
                        try
                        {
                            num++;
                            string text = value.ToString();
                            string field;
                            for (int num2 = matchCollection2.Count - 1; num2 >= 0; num2--)
                            {
                                Match match = matchCollection2[num2];
                                string text2 = "";
                                try
                                {
                                    string value2 = match.Groups[1].Value;
                                    field = (value2.Contains(":") ? value2.Substring(0, value2.IndexOf(':')) : value2);
                                    field = (field.Contains(",") ? field.Split(',')[1] : field);
                                    string string_ = value2.Contains(":") ? value2.Substring(value2.IndexOf(':') + 1) : "";
                                    Field field2 = fields.FirstOrDefault((Field a) => a.name == field);
                                    if (field == "rownumbers")
                                    {
                                        text2 = method_25(num + 1, string_);
                                    }
                                    else if (item.ContainsKey(field))
                                    {
                                        if ((field2 != null && field2.type == "many2one") || field.ToLower() == "createuser" || field.ToLower() == "modifyuser")
                                        {
                                            List<string> list = item[field] as List<string>;
                                            text2 = list[1];
                                        }
                                        else if (field2 != null && field2.type == "many2many")
                                        {
                                            List<List<string>> list2 = item[field] as List<List<string>>;
                                            List<string> list3 = new List<string>();
                                            foreach (List<string> item2 in list2)
                                            {
                                                list3.Add(item2[1]);
                                            }
                                            text2 = string.Join(",", list3);
                                        }
                                        else
                                        {
                                            text2 = method_25(item[field], string_);
                                        }
                                    }
                                }
                                catch
                                {
                                }
                                if (string.IsNullOrEmpty(text2))
                                {
                                    text2 = "&nbsp;";
                                }
                                text = text.Substring(0, match.Index) + text2 + text.Substring(match.Index + match.Value.Length);
                            }
                            stringBuilder.Append(text);
                        }
                        catch
                        {
                        }
                    }
                }
                strTemplateOut = regex.Replace(strTemplateOut, stringBuilder.ToString());
            }
            foreach (KeyValuePair<string, object> item3 in dictionary_1)
            {
                strTemplateOut = strTemplateOut.Replace("{#" + item3.Key + "}", ObjectExtensions.ToStr(item3.Value));
            }
            MatchCollection matchCollection3 = regex2.Matches(strTemplateOut);
            if (matchCollection3.Count > 0)
            {
                for (int num2 = matchCollection3.Count - 1; num2 >= 0; num2--)
                {
                    Match match = matchCollection3[num2];
                    string text2 = "";
                    try
                    {
                        string value2 = match.Groups[1].Value;
                        string text3 = value2.Contains(":") ? value2.Substring(0, value2.IndexOf(':')) : value2;
                        text3 = (text3.Contains(",") ? text3.Split(',')[1] : text3);
                        string string_ = value2.Contains(":") ? value2.Substring(value2.IndexOf(':') + 1) : "";
                        string text4 = value2.Contains(",") ? value2.Split(',')[0] : "";
                        if (!string.IsNullOrEmpty(text4))
                        {
                            if (text4 == "count")
                            {
                                text2 = ObjectExtensions.ToStr((object)list_2.Count);
                            }
                            else if (text4 == "custom")
                            {
                                if (text3 == "TotalArrears")
                                {
                                    string key = (serviceConfig_1.model.name == "v_arrears_month") ? "CustomerID" : "SupplierID";
                                    decimal num3 = 0m;
                                    List<string> list4 = new List<string>();
                                    foreach (Dictionary<string, object> item4 in list_2)
                                    {
                                        if (!list4.Contains(item4[key].ToString()))
                                        {
                                            num3 = ObjectExtensions.ToDecimal(item4["TotalArrears"]) - ObjectExtensions.ToDecimal(item4["Arrears"]) + num3;
                                            list4.Add(item4[key].ToString());
                                        }
                                        num3 += ObjectExtensions.ToDecimal(item4["Arrears"]);
                                    }
                                    text2 = method_25(num3, string_);
                                }
                            }
                            else
                            {
                                double num4 = 0.0;
                                double num5 = 0.0;
                                double num6 = 0.0;
                                foreach (Dictionary<string, object> item5 in list_2)
                                {
                                    if (item5.ContainsKey(text3))
                                    {
                                        double num7 = DataHelper.ConvertValue<double>(item5[text3]);
                                        if (num7 > num5)
                                        {
                                            num5 = num7;
                                        }
                                        if (num7 < num6)
                                        {
                                            num6 = num7;
                                        }
                                        num4 += num7;
                                    }
                                }
                                double num8 = 0.0;
                                if (text4 == "sum")
                                {
                                    num8 = num4;
                                }
                                else if (text4 == "avg")
                                {
                                    num8 = num4 / (double)list_2.Count;
                                }
                                else if (text4 == "max")
                                {
                                    num8 = num5;
                                }
                                else if (text4 == "min")
                                {
                                    num8 = num6;
                                }
                                text2 = method_25(num8, string_);
                            }
                        }
                    }
                    catch
                    {
                    }
                    if (string.IsNullOrEmpty(text2))
                    {
                        text2 = "&nbsp;";
                    }
                    strTemplateOut = strTemplateOut.Substring(0, match.Index) + text2 + strTemplateOut.Substring(match.Index + match.Value.Length);
                }
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
            //IL_00bd: Unknown result type (might be due to invalid IL or missing references)
            //IL_00c7: Expected O, but got Unknown

            dbContext_0 = null;
            string_0 = "";
            dbContext_1 = null;
            dictionary_0 = null;
            dictionary_1 = new Dictionary<string, object>();
            core_printTemplate_0 = null;
            int_0 = 760;
            int_1 = 900;
            string_2 = null;
            serviceConfig_0 = null;
            list_0 = null;
            list_1 = null;
            dicModuleTitles = new Dictionary<string, string>();
            strTemplateOut = "";
            strKanBanTemplate = "";
            dbContextMain = null;
            list_2 = null;
            kanbanSrcData = null;
            coreReportTemp = null;
            string_6 = " \r\n             <style type=\"text/css\">\r\n                     {style}\r\n             </style> \r\n             {content}";
            logMan = new LogManager();
            dictionary_3 = new Dictionary<string, string>
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
        private string method_25(object object_0, string string_7)
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

        [NonAction]
        private string method_26(string string_7)
        {
            string arg = "";
            if (string_7 != null)
            {
                arg = ((string_7.IndexOf('D') > -1) ? (string.Format(ConfigurationManager.AppSettings["DevelopAppPath"], string_7) + "\\database.db") : ((string_7.IndexOf('R') <= -1) ? (string.Format(ConfigurationManager.AppSettings["AppPath"], string_7) + "\\database.db") : (string.Format(ConfigurationManager.AppSettings["ReleaseAppPath"], string_7) + "\\database.db")));
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
                dbContext_0 = SysContext.GetCurrentDb();
                DbContext dbContext = dbContext_0;
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
                properties.Select(smethod_6).ToList();
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
            foreach (string string_ in array)
            {
                list.Add(method_27(string_, modelsConfig));
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
        private Dictionary<string, object> method_27(string string_7, ModelsConfig mSetting)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            string text = ObjectExtensions.ToStr((object)string_7);
            if (text.EndsWith("\\"))
            {
                text = text.Substring(0, text.Length - 1);
            }
            string model = text.Substring(text.LastIndexOf("\\") + 1);
            string text2 = (from a in mSetting.models
                            where a.name == model
                            select a).Select(smethod_7).FirstOrDefault();
            dictionary["id"] = model;
            dictionary["text"] = (text2 ?? model);
            dictionary["type"] = "model";
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            string[] files = Directory.GetFiles(string_7);
            string[] array = files;
            foreach (string text3 in array)
            {
                string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(text3);
                string extension = Path.GetExtension(text3);
                if (!(extension != ".js") && !fileNameWithoutExtension.Contains("service_"))
                {
                    list.Add(method_28(text3, mSetting, model));
                }
            }
            dictionary["children"] = list;
            return dictionary;
        }

        [NonAction]
        private Dictionary<string, object> method_28(string string_7, ModelsConfig modelsConfig_0, string string_8)
        {
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            string str = (string)(dictionary["text"] = (dictionary["id"] = Path.GetFileNameWithoutExtension(string_7)));
            if (dictionary_3.ContainsKey(string_8 + "." + str))
            {
                dictionary["text"] = dictionary_3[string_8 + "." + str];
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


        [NonAction]
        private static bool smethod_0(Field field_0)
        {
            return field_0.type.Contains("2");
        }


        [NonAction]
        private static string smethod_1(PropertyInfo propertyInfo_0)
        {
            return propertyInfo_0.Name;
        }


        [NonAction]
        private static string smethod_2(SelectionItem selectionItem_0)
        {
            return selectionItem_0.text;
        }


        [NonAction]
        private static bool smethod_3(GridColumn gridColumn_0)
        {
            return gridColumn_0.columns != null && gridColumn_0.columns.Any();
        }




        [NonAction]
        private static bool smethod_5(GridColumn gridColumn_0)
        {
            return gridColumn_0.columns != null && gridColumn_0.columns.Any();
        }


        [NonAction]
        private static string smethod_6(PropertyInfo propertyInfo_0)
        {
            return propertyInfo_0.Name;
        }


        [NonAction]
        private static string smethod_7(FastDev.DevDB.Model.Config.Model model_0)
        {
            return model_0.title;
        }
    }
}
