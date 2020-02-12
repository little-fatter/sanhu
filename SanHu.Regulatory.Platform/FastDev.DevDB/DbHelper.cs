using FastDev.Common;
using FastDev.Common.Extensions;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace FastDev.DevDB
{
    public class DbHelper
    {
        public static PagedData GetPagedData(DbContext db, Type type, QueryDescriptor descripter)
        {
            DbContext currentDb = db;
            string text = null;
            string text2 = null;
            bool flag = false;
            bool flag2 = false;
            if (descripter.OrderBy != null && descripter.OrderBy.Any())
            {
                text = descripter.OrderBy[0].Key;
                text2 = ((descripter.OrderBy[0].Order == OrderSequence.ASC) ? "asc" : "desc");
            }
            if (descripter.PageIndex.HasValue && descripter.PageSize.HasValue)
            {
                flag2 = true;
                if (descripter.PageSize == 0L)
                {
                    descripter.PageSize = 20L;
                }
            }
            if (!StringExtensions.IsNullOrEmpty(text))
            {
                flag = true;
                text2 = ((StringExtensions.IsNullOrEmpty(text2) || StringExtensions.EqualsTo(text2, "asc")) ? "asc" : "desc");
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            if (descripter.Condition != null)
            {
                filterTranslator.Group = descripter.Condition;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            if (flag)
            {
                commandText += string.Format(" order by {0} {1}", text, text2);
            }
            if (flag2)
            {
                return currentDb.GetHelper(type).Page(descripter.PageIndex.Value, descripter.PageSize.Value, commandText, filterTranslator.Parms.ToArray());
            }
            IList list = currentDb.GetHelper(type).Fetch(commandText, filterTranslator.Parms.ToArray());
            return new PagedData(list, list.Count);
        }

        public static string GetId(DbContext db,string modelName, FilterGroup filter)
        {
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            commandText = string.Format("select ID from {0} ", modelName.ToUpper()) + commandText;
            return db.ExecuteScalar<string>(commandText, filterTranslator.Parms.ToArray());
        }


        #region 根据filter获取数据列表

        public static IList GetListData(DbContext db, Type type, FilterGroup filter, string orderBy = null)
        {
            IDbContextHelper helper = db.GetHelper(type);
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            if (!string.IsNullOrEmpty(orderBy))
            {
                commandText = commandText + " " + orderBy;
            }
            return helper.Fetch(commandText, filterTranslator.Parms.ToArray());
        }
        


        public static IList GetListData(DbContext db, Type type, string orderby, FilterGroup filter)
        {
            IDbContextHelper helper = db.GetHelper(type);
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            if (!string.IsNullOrEmpty(orderby))
            {
                commandText = commandText + " " + orderby;
            }
            return helper.Fetch(commandText, filterTranslator.Parms.ToArray());
        }
        public static IList GetListData(DbContext db, string[] fields, string model, FilterGroup filter)
        {
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            commandText = string.Format("select {0} from {1} ", string.Join(",", fields), model) + commandText;
            return db.Fetch<object>(commandText, filterTranslator.Parms.ToArray());
        }
        #endregion
        public static bool Exist(DbContext db, Type type, FilterGroup filter)
        {
            IDbContextHelper helper = db.GetHelper(type);
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : commandText);
            return helper.Exist(commandText, filterTranslator.Parms.ToArray());
        }

        public static List<T> GetFieldValues<T>(DbContext db, string field, string name, FilterGroup filter)
        {
            FilterTranslator filterTranslator = new FilterTranslator();
            if (filter != null)
            {
                filterTranslator.Group = filter;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
            return db.Fetch<T>(string.Format("select {0} from {1}", field, name), filterTranslator.Parms.ToArray());
        }
        public static string ExecuteScalar(DbContext db, string field, string name, string sql, params object[] parms)
        {
            if (!sql.StartsWith("where"))
            {
                sql = "where " + sql;
            }
            return db.ExecuteScalar<string>(string.Format("select {0} from {1} {2}", field, name, sql), parms);
        }
        
    }
}
