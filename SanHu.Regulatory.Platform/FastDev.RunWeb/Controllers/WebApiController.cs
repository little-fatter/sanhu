using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FD.Common.ActionValue;
using FD.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WanJiang.Framework.Web.Core;

namespace FastDev.RunWeb.Controllers
{
    [Route("[controller]/[action]")]
    public class WebApiController : BaseController
    {
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
                var presult = pageData as PagedData;
                if (presult!=null)
                {
                    return new PageQueryResult<Dictionary<string, object>>()
                    {
                        PageIndex= (int)descriptor.PageIndex,
                        PageSize=(int)descriptor.PageSize,
                        Total = (int)presult.Total,
                        Rows=(List<Dictionary<string, object>>)presult.Records
                    };
                }
                
                return null;
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return new object();
            }
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
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                IService service = ServiceHelper.GetService(model);
                Dictionary<string, object> detailData = service.GetDetailData(id, filterGroup);
                return detailData;
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return null;
            }
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
        public RestResult<object> Save(string model, string method, string fullJson, string parm)
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
                return new RestResult<object>
                {
                    Code = 200,
                    Message = obj.ToString(),
                    Data = service.ServiceData
                };
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return null;
            }
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
            try
            {
                FilterGroup filterGroup = FullJsonValue.GetObject<FilterGroup>(filter);
                IService service = ServiceHelper.GetService(model);
                ChangeFilterGroup(model, key, filterGroup);
                List<Dictionary<string, object>> listData = service.GetListData(filterGroup);
                return listData;
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return null;
            }
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
            try
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
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return null;
            }
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
    }
}