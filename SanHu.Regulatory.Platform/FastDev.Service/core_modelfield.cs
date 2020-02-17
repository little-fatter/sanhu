using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FastDev.Service
{
    public class core_modelfield : ServiceBase, IService
    {
        // Methods
        public core_modelfield()
        {
        }

        public override List<Dictionary<string, object>> GetListData(FilterGroup filter)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            string model = null;
            if (filter.groups.Any() && filter.groups[0].rules.Any())
            {
                model = filter.groups[0].rules[0].value.ToString();
            }
            if (model != null)
            {
                foreach (DevDB.Model.Config.Field field in ServiceHelper.GetServiceConfig(model).fields)
                {
                    Dictionary<string, object> item = new Dictionary<string, object>();
                    item.Add("FieldName", field.name);
                    item.Add("FieldTitle", field.title);
                    item.Add("ID", field.name);
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
