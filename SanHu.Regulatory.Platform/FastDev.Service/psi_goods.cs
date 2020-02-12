using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    public class psi_goods : ServiceBase, IService
    {
        /// <summary>
        /// 获取一页数据
        /// </summary>
        /// <param name="descriptor"></param>
        /// <returns></returns>
        public override object GetPageData(QueryDescriptor descriptor)
        {
            //descriptor.Condition.groups
            if (descriptor.Condition != null && descriptor.Condition.groups != null && descriptor.Condition.groups.Count > 0)
            {
                IList<FilterGroup> fg = descriptor.Condition.groups;
                foreach(var g in fg)
                {
                    FilterRule CategoryRule = null;
                    foreach(var r in g.rules)
                    {
                        if (r.field.ToLower() == "categoryid")
                        {
                            CategoryRule = r;
                            break;
                        }
                    }
                    if (CategoryRule != null)
                    {
                        CategoryRule.type = "sql";
                        CategoryRule.field = "CategoryId in (select Id from psi_category where CONCAT('|',`Path`,'|') like '%|" + CategoryRule.value+"|%')";
                        //CategoryRule.value=CategoryRule.value;//value值不变
                    }
                }
            }
            return base.GetPageData(descriptor);
        }
    }
}
