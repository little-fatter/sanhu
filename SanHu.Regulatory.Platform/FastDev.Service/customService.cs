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
using FastDev.DevDB.Rights;

namespace FastDev.Service
{
    public class customService : ServiceBase, IService
    {

        public customService()
        { 
        }

        public override object GetPageData(QueryDescriptor descriptor)
        {
            var db = this.MainDb;

            descriptor.Condition = new RightsServer(db).AppendDataFilter(this.ModelName, descriptor.Condition);
            var whereTranslator = new FilterTranslator();
            if (descriptor.Condition != null)
            {
                whereTranslator.Group = descriptor.Condition;
            }
            whereTranslator.Translate();

            string sql = whereTranslator.CommandText;

            var parms = whereTranslator.Parms;
            var list = new List<Dictionary<string, object>>();

            list.Add(new Dictionary<string, object>()
            {
                {"Contactname","测试"}
            });
             
            sql = string.IsNullOrEmpty(sql) ? "" : " where " + sql;
            sql = "select * from core_user " + sql;

            var data = db.Page<System.Dynamic.ExpandoObject>(descriptor.PageIndex.Value, descriptor.PageSize.Value, sql, parms);

            return new PagedData(list, list.Count());
        }
 

    }
}