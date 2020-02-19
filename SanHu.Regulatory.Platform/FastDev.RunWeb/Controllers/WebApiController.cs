using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FD.Common.ActionValue;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastDev.RunWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebApiController : DevDB.ControllerBase
    {
        [HttpGet]
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

                return pageData;
            }
            catch (Exception ex)
            {
                ServiceHelper.Log(ex);
                return new object();
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