using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FastDev.Service
{
    /// <summary>
    /// 运行 读取core_model
    /// </summary>
    public class core_model : ServiceBase, IService
    {

        // Methods
        public core_model()
        {
        }
        /// <summary>
        /// 获取model 改为直接从列表中读出，不再直接从数据库读取
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        public override List<Dictionary<string, object>> GetListData(FilterGroup filter)
        {

            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            ModelsConfig modelsConfig = ServiceHelper.GetModelsConfig();
            string str = null;
            if (filter.groups.Any() && filter.groups[0].rules.Any())
            {
                str = filter.groups[0].rules[0].value.ToString();
            }
            foreach (DevDB.Model.Config.Model model in modelsConfig.models)
            {
                if ((str == null) || (model.moduleName == str))
                {
                    Dictionary<string, object> item = new Dictionary<string, object>();
                    item.Add("ModelName", model.name);
                    item.Add("ModelTitle", model.title);
                    item.Add("ID", model.name);
                    list.Add(item);
                }
            }
            return list;
        }

        public override object GetPageData(QueryDescriptor descriptor)
        {
            var data = this.GetListData(descriptor.Condition);
            return new PagedData(data, data.Count);
        }
    }
}
