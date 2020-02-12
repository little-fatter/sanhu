using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using FastDev.DevDB;
using FastDev.Common;
using FastDev.DevDB.Model;
using Microsoft.CSharp;
using System.CodeDom.Compiler;
using System.Dynamic;
using System.Data;
using System.Data.Common;
using System.Threading;


namespace FastDev.Service
{
    public class stock_stockPile : ServiceBase, IService
    {

        public stock_stockPile()
        {
            OnGetPagedData += stock_stockPile_OnGetPagedData;
        }

        void stock_stockPile_OnGetPagedData(object data)
        {
            var db = this.MainDb;
            var queryDescriptor = data as QueryDescriptor;
            FilterGroup filter = null;
            if (queryDescriptor != null)
            {
                filter = queryDescriptor.Condition;

            }
            else
            {
                filter = data as FilterGroup;
                if (filter == null)
                {
                    return;
                }
            }

            if (filter.groups.Count > 0)
            {
                foreach (var group in filter.groups)
                {
                    for (var i = group.rules.Count - 1; i >= 0; i--)
                    {
                        var rule = group.rules[i];

                        if (rule.field == "ProductID" && rule.value != null && rule.value.ToString().StartsWith("text:"))
                        {
                            var procode = rule.value.ToString().Substring("text:".Length);

                            if (!string.IsNullOrEmpty(procode))
                            {
                                var ids = db.Fetch<string>("select ID from res_product where ProCode like '%" + ParseValue(procode) + "%'");
                                var newgroup = new FilterGroup();
                                newgroup.op = "or";
                                foreach (var id in ids)
                                {
                                    newgroup.rules.Add(new FilterRule()
                                    {
                                        field = rule.field,
                                        op = "equal",
                                        value = id
                                    });
                                }
                                filter.groups.Add(newgroup);
                            }
                            group.rules.Remove(rule);
                            return;
                        }
                    }
                }
            }
        }

       private string ParseValue(string value)
        {
            if (value == null) return value;
            value = value.ToLower().Trim();
            value = value.Replace("exec", "");
            value = value.Replace("delete", "");
            value = value.Replace("master", "");
            value = value.Replace("truncate", "");
            value = value.Replace("declare", "");
            value = value.Replace("create", "");
            value = value.Replace("update", "");
            value = value.Replace("select", ""); 
            return value;
        }
 

    }
}
