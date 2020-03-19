using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model;
using FastDev.DevDB.Model.Config;
using FD.Common.ActionValue;
using FD.Common.Helpers;
using FD.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WanJiang.Framework.Web.Core;

namespace FastDev.RunWeb.Controllers
{
    //[Authorize]
    public class WebApiController : BaseController
    {
        private core_printTemplate core_printTemplate_0;

        /// <summary>
        /// 分页数据
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <param name="fullJson"></param>
        /// <param name="treeCondition"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpPost]
        public object PagedData(string id, string model, string fullJson, Dictionary<string, object> treeCondition, string key)
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
            var presult = pageData as PagedData;
            if (presult != null)
            {
                return new PageQueryResult<Dictionary<string, object>>()
                {
                    PageIndex = (int)descriptor.PageIndex,
                    PageSize = (int)descriptor.PageSize,
                    Total = (int)presult.Total,
                    Rows = presult.Records
                };
            }

            return null;
        }
        /// <summary>
        /// 明细
        /// </summary>
        /// <param name="model"></param>
        /// <param name="id"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpPost]
        public object DetailData(string model, string id, string filter)
        {
            FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
            IService service = ServiceHelper.GetService(model);
            Dictionary<string, object> detailData = service.GetDetailData(id, filterGroup);
            return detailData;
        }
        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="model"></param>
        /// <param name="method"></param>
        /// <param name="fullJson"></param>
        /// <param name="parm"></param>
        /// <returns></returns>
        [HttpPost]
        public object Save(string model, string method, string fullJson, string parm)
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
            return obj;
        }

        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="model"></param>
        /// <param name="method"></param>
        /// <param name="fullJson"></param>
        /// <param name="parm"></param>
        /// <returns></returns>
        [HttpPost]
        public object EventSave(string model, string method, string fullJson, string parm)
        {

            Type entityType = DataAccessHelper.GetEntityType(model, "Form");

            Type type = typeof(PostDataDescriptor<>).MakeGenericType(entityType);
            var setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                DateFormatString = "yyyyMMddHHmmss"
            };
            var postdata=JsonConvert.DeserializeObject(fullJson, type, setting);

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
            return obj;
        }
        /// <summary>
        /// 获取列表数据
        /// </summary>
        /// <param name="model"></param>
        /// <param name="filter"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        [HttpPost]
        public object ListData(string model, string filter, string key)
        {
            FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
            IService service = ServiceHelper.GetService(model);
            ChangeFilterGroup(model, key, filterGroup);
            List<Dictionary<string, object>> listData = service.GetListData(filterGroup);
            return listData;
        }

        /// <summary>
        /// 特殊api接口
        /// </summary>
        /// <param name="id"></param>
        /// <param name="model"></param>
        /// <param name="data"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        [HttpPost]
        public object Api(string id, string model, string data, string context)
        {
            IService service = ServiceHelper.GetService(model);
            if (service == null)
            {
                return null;
            }
            Func<APIContext, object> aPIHandler;
            try
            {
                aPIHandler = service.GetAPIHandler(id);
                if (aPIHandler == null)
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
            return aPIHandler(new APIContext
            {
                Context = context,
                Data = data
            });
        }

        #region 私有方法

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
            else if (modelName == "core_modelfield")
            {//如果是查字段列表
                if (string.IsNullOrEmpty(filters.op))
                {
                    filters.op = "and";
                }
                FilterGroup filterGroup = new FilterGroup();
                filterGroup.rules.Add(new FilterRule("ModelID", modelName));
                filters.groups.Add(filterGroup);
            }
        }
        #endregion
        [HttpGet]
        public object GetUserInfo()
        {
            return base.GetUserInfo();
        }
    }
}