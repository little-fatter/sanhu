using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FastDev.Service
{
    public class core_module : ServiceBase, IService
    {

        // Methods
        public core_module()
        {
        }

        public override List<Dictionary<string, object>> GetListData(FilterGroup filter)
        {
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            ModelsConfig modelsConfig = ServiceHelper.GetModelsConfig();
           
            using (List<string>.Enumerator enumerator = modelsConfig.models.Select(m=>m.moduleName).Distinct<string>().ToList<string>().GetEnumerator())
            {
                while (enumerator.MoveNext())
                {
                    string module = enumerator.Current;
                    if ((module != "null") && (module != null))
                    {
                        string str = modelsConfig.models.Where(a=> (a.moduleName == module) && (a.moduleTitle != null)).Select(m=> m.moduleTitle).FirstOrDefault<string>();
                        Dictionary<string, object> item = new Dictionary<string, object>();
                        item.Add("ModuleName", module);
                        item.Add("ModuleTitle", str);
                        item.Add("ID", module);
                        list.Add(item);
                    }
                }
            }
            return list;
        }

        public override object GetPageData(QueryDescriptor descriptor)
        {
            var  data= this.GetListData(descriptor.Condition);
            return new PagedData(new List<object>(), 0L) { Records = data, Total = data.Count };
        }

    }




}
