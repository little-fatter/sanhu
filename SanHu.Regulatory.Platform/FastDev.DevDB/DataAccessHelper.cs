using FastDev.Common;
using FastDev.Common.Extensions;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using ObEx = FastDev.Common.Extensions.ObjectExtensions;
namespace FastDev.DevDB
{
    public class DataAccessHelper
    {

        private static Assembly assModelCore;

        private static Dictionary<string, string> dictionary_0;

        private static Dictionary<string, string> dictionary_1;

        /// <summary>
        /// FastDev Model 动态生成
        /// </summary>
        /// <returns></returns>
        private static Assembly GetModelAssembly()
        {
            return SysContext.GetModelAssembly();

        }

        private static Assembly GetCoreAssembly()
        {
            try
            {
                if (assModelCore == null)
                {
                    assModelCore = Assembly.Load("FastDev.Model.Core");
                }
                return assModelCore;
            }
            catch
            {
                return null;
            }
        }

        public static Type GetEntityType(string model, string entityMode = "Entity")
        {
            DbContext currentDb = SysContext.GetCurrentDb();
            Assembly assembly = GetModelAssembly();
            Type type = assembly.GetType("FastDev.Model." + entityMode + "." + model);
            if (type == null)
            {
                type = (from a in assembly.GetTypes()
                        where a.Name.ToLower() == model.ToLower() && a.FullName.ToLower().Contains(entityMode + ".")
                        select a).FirstOrDefault();
            }
            if (type == null)
            {
                Assembly assemblyCore = GetCoreAssembly();
                if (assemblyCore != null)
                {
                    type = assemblyCore.GetType("FastDev.Model.Core." + entityMode + "." + model);
                    if (type == null)
                    {
                        type = (from a in assemblyCore.GetTypes()
                                where a.Name.ToLower() == model.ToLower() && a.FullName.ToLower().Contains(entityMode + ".")
                                select a).FirstOrDefault();
                    }
                }
            }
            return type;
        }

        public static PagedData GetPageData(DbContext db, string model, QueryDescriptor descriptor)
        {

            Type entityType = GetEntityType(model);
            string text = null;
            string text2 = null;
            bool flag = false;
            bool flag2 = false;
            List<string> list = entityType.GetProperties().Select(p => p.Name).ToList();
            if (descriptor.OrderBy != null && descriptor.OrderBy.Any())
            {
                text = descriptor.OrderBy[0].Key;
                if (!list.Contains(text))
                {
                    text = entityType.GetProperties().Where(p => p.PropertyType == typeof(string)).Select(p => p.Name)
                        .FirstOrDefault();
                }
                text2 = ((descriptor.OrderBy[0].Order == OrderSequence.ASC) ? "asc" : "desc");
            }
            if (descriptor.PageIndex.HasValue && descriptor.PageSize.HasValue)
            {
                flag2 = true;
                if (descriptor.PageSize == 0L)
                {
                    descriptor.PageSize = 20L;
                }
            }
            if (!StringExtensions.IsNullOrEmpty(text))
            {
                flag = true;
                text2 = ((StringExtensions.IsNullOrEmpty(text2) || StringExtensions.EqualsTo(text2, "asc")) ? "asc" : "desc");
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            if (descriptor.Condition != null)
            {
                filterTranslator.Group = descriptor.Condition;
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
                return db.GetHelper(entityType).Page(descriptor.PageIndex.Value, descriptor.PageSize.Value, commandText, filterTranslator.Parms.ToArray());
            }
            IList list2 = db.GetHelper(entityType).Fetch(commandText, filterTranslator.Parms.ToArray());
            return new PagedData(list2, list2.Count);
        }

        public static PagedData GetCommonPageData(DbContext db, string viewName, QueryDescriptor descriptor)
        {
            string sortName = descriptor.SortName;
            string text = descriptor.SortOrder;
            bool flag = false;
            bool flag2 = false;
            if (descriptor.PageIndex.HasValue && descriptor.PageSize.HasValue)
            {
                flag2 = true;
                if (descriptor.PageSize == 0L)
                {
                    descriptor.PageSize = 20L;
                }
            }
            if (!StringExtensions.IsNullOrEmpty(sortName))
            {
                flag = true;
                text = ((StringExtensions.IsNullOrEmpty(text) || StringExtensions.EqualsTo(text, "asc")) ? "asc" : "desc");
            }
            FilterTranslator filterTranslator = new FilterTranslator();
            if (descriptor.Condition != null)
            {
                filterTranslator.Group = descriptor.Condition;
            }
            filterTranslator.Translate();
            string commandText = filterTranslator.CommandText;
            int num = 0;
            if (flag2)
            {
                commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
                commandText = string.Format("SELECT * FROM (SELECT ROW_NUMBER() OVER (order by {1} {2}) peta_rn, * FROM [{0}] {3}  ) peta_paged WHERE peta_rn> {4} AND peta_rn<= {5}", viewName, sortName ?? "ID", text, commandText, (descriptor.PageIndex.Value - 1L) * descriptor.PageSize.Value, descriptor.PageIndex.Value * descriptor.PageSize.Value);
                num = db.ExecuteScalar<int>("select count(*) from " + viewName + " " + (string.IsNullOrEmpty(filterTranslator.CommandText) ? "" : (" where " + filterTranslator.CommandText)), new object[1]
                {
                    filterTranslator.Parms
                });
            }
            else
            {
                commandText = (string.IsNullOrEmpty(commandText) ? "" : ("where " + commandText));
                if (flag)
                {
                    commandText += string.Format(" order by {0} {1}", sortName, text);
                }
                commandText = "select * from " + viewName + " " + commandText;
            }
            DataTable dataTable = new DataTable();
            db.Fill(dataTable, commandText, new object[1]
            {
                filterTranslator.Parms
            });
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            foreach (DataRow row in dataTable.Rows)
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                foreach (DataColumn column in dataTable.Columns)
                {
                    dictionary.Add(column.ColumnName, row[column.ColumnName]);
                }
                list.Add(dictionary);
            }
            if (!flag2)
            {
                num = list.Count;
            }
            return new PagedData(list, num);
        }

        public static Dictionary<string, object> GetDetailData(DbContext db, string model, string id)
        {
            try
            {
                FilterTranslator filterTranslator = new FilterTranslator();
                DataTable dataTable = new DataTable();
                string text = "select * from " + model + " where id = '" + id + "'";
                db.Fill(dataTable, text, new object[1]
                {
                    filterTranslator.Parms
                });
                new List<Dictionary<string, object>>();
                IEnumerator enumerator = dataTable.Rows.GetEnumerator();
                try
                {
                    if (enumerator.MoveNext())
                    {
                        DataRow dataRow = (DataRow)enumerator.Current;
                        Dictionary<string, object> dictionary = new Dictionary<string, object>();
                        foreach (DataColumn column in dataTable.Columns)
                        {
                            dictionary.Add(column.ColumnName, dataRow[column.ColumnName]);
                        }
                        return dictionary;
                    }
                }
                finally
                {
                    IDisposable disposable = enumerator as IDisposable;
                    if (disposable != null)
                    {
                        disposable.Dispose();
                    }
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static IList GetCommonListData(DbContext db, string model, FilterGroup filter, string orderby)
        {
            try
            {
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
                DataTable dataTable = new DataTable();
                commandText = "select * from " + model + " " + commandText;
                db.Fill(dataTable, commandText, new object[1]
                {
                    filterTranslator.Parms
                });
                List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
                foreach (DataRow row in dataTable.Rows)
                {
                    Dictionary<string, object> dictionary = new Dictionary<string, object>();
                    foreach (DataColumn column in dataTable.Columns)
                    {
                        dictionary.Add(column.ColumnName, row[column.ColumnName]);
                    }
                    list.Add(dictionary);
                }
                return list;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static IList GetListData(DbContext db, string model, FilterGroup filter, string orderby, string EntityType = "Report")
        {
            try
            {
                Type entityType = GetEntityType(model, EntityType);
                if (entityType == null)
                {
                    return null;
                }
                IDbContextHelper helper = db.GetHelper(entityType);
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
            catch (Exception)
            {
                return null;
            }
        }

        public static object GetTreeData(DbContext db, FilterTree tree)
        {
            if (!string.IsNullOrEmpty(tree.sourceModel))
            {
                if (tree.sourceModel2 == tree.sourceModel)
                {
                    tree.sourceModel2 = null;
                }
                ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(tree.sourceModel);
                string textField = tree.textField;
                if (string.IsNullOrEmpty(textField))
                {
                    textField = serviceConfig.model.textField;
                }
                //lyl update at 2018-12-28
                DbContext db2find = db;
                if (!string.IsNullOrEmpty(serviceConfig.model.dbName))
                {
                    db2find = SysContext.GetOtherDB(serviceConfig.model.dbName);
                }
                List<Dictionary<string, object>> dic = GetAllProperty(db2find, tree.filter, tree.sourceModel, tree.parentField, "ID", textField, tree.fields, tree.orderBy);
                IList list = FillTreeChild(db2find, dic, "ID", textField, tree.parentField, null, tree.sourceModel, tree);
                if (!string.IsNullOrEmpty(tree.rootText))
                {
                    return new object[1]
                    {
                        new
                        {
                            text = tree.rootText,
                            rootNode = true,
                            children = list
                        }
                    };
                }
                return list;
            }
            return null;
        }

        private static List<Dictionary<string, object>> GetAllProperty(DbContext dbFind, FilterGroup filter, string modelName, string parentFiled, string valueFiled, string textFiled, string fileds = null, string orderBy = null)
        {
            Type entityType = GetEntityType(modelName, "Report");
            if (entityType == null)
            {
                return null;
            }
            //lyl 2018-12-28 还没有弄完，感觉需要 修改DbHelper 的DBContext
            IList listData = DbHelper.GetListData(dbFind, entityType, filter, orderBy);
            List<Dictionary<string, object>> list = new List<Dictionary<string, object>>();
            valueFiled = (string.IsNullOrEmpty(valueFiled) ? "ID" : valueFiled);
            foreach (object item in listData)
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                Type type = item.GetType();
                dictionary[valueFiled] = DataHelper.GetPropertyValue(type, item, valueFiled);
                if (!string.IsNullOrEmpty(parentFiled))
                {
                    dictionary[parentFiled] = DataHelper.GetPropertyValue(type, item, parentFiled);
                }
                dictionary[textFiled] = DataHelper.GetPropertyValue(type, item, textFiled);
                if (!string.IsNullOrEmpty(fileds))
                {
                    string[] array = fileds.Split(',');
                    foreach (string text in array)
                    {
                        try
                        {
                            dictionary[text] = DataHelper.GetPropertyValue(type, item, text);
                        }
                        catch
                        {
                        }
                    }
                }
                list.Add(dictionary);
            }
            return list;
        }

        private static IList FillTreeChild(DbContext dbContext_0, IList<Dictionary<string, object>> lstDicValues, string strIDFiled, string strTextFiled, string strParentIDFiled, string string_3, string sourceModel2, FilterTree filter)
        {
            bool flag = filter.sourceModel2 == sourceModel2;
            List<Dictionary<string, object>> list = null;
            if (string.IsNullOrEmpty(strParentIDFiled))
            {
                list = lstDicValues.ToList();
            }
            else
            {
                if (!string.IsNullOrEmpty(string_3))
                {
                    list = (from a in lstDicValues
                            where ObEx.ToStr(a[strParentIDFiled]) == string_3
                            select a).ToList();
                }
                else
                {
                    list = (from a in lstDicValues
                            where a[strParentIDFiled] == DBNull.Value || a[strParentIDFiled] == null || ObEx.ToStr(a[strParentIDFiled]) == "" || ObEx.ToStr(a[strParentIDFiled]) == "0"
                            select a).ToList();
                }
            }
            List<object> list2 = new List<object>();
            foreach (Dictionary<string, object> item in list)
            {
                Dictionary<string, object> dictionary = new Dictionary<string, object>();
                dictionary["id"] = item[strIDFiled];
                dictionary["text"] = item[strTextFiled];
                dictionary["model"] = sourceModel2;
                dictionary["iconcss"] = sourceModel2;
                string text = flag ? filter.fields2 : filter.fields;
                if (!string.IsNullOrEmpty(text))
                {
                    string[] array = text.Split(',');
                    foreach (string key in array)
                    {
                        dictionary[key] = item[key];
                    }
                }
                IList list3 = null;
                if (!string.IsNullOrEmpty(strParentIDFiled))
                {
                    list3 = FillTreeChild(dbContext_0, lstDicValues, strIDFiled, strTextFiled, strParentIDFiled, ObEx.ToStr(item[strIDFiled]), sourceModel2, filter);
                }
                if (!flag && !string.IsNullOrEmpty(filter.sourceModel2) && !string.IsNullOrEmpty(filter.refSourceField))
                {
                    ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(filter.sourceModel2);
                    string textField = serviceConfig.model.textField;
                    FilterGroup filterGroup = new FilterGroup();
                    filterGroup.rules.Add(new FilterRule
                    {
                        op = "equal",
                        value = ObEx.ToStr(item[strIDFiled]),
                        field = filter.refSourceField
                    });
                    if (filter.filter2 != null)
                    {
                        filterGroup.groups.Add(filter.filter2);
                    }
                    List<Dictionary<string, object>> lstDic = GetAllProperty(dbContext_0, filterGroup, filter.sourceModel2, filter.parentField2, "ID", textField, filter.fields2);
                    IList list4 = FillTreeChild(dbContext_0, lstDic, "ID", textField, filter.parentField2, null, filter.sourceModel2, filter);
                    if (list3 == null)
                    {
                        list3 = list4;
                    }
                    else if (list4 != null)
                    {
                        foreach (object item2 in list4)
                        {
                            list3.Add(item2);
                        }
                    }
                }
                if (list3 != null && list3.Count > 0)
                {
                    dictionary["children"] = list3;
                }
                list2.Add(dictionary);
            }
            return list2;
        }

        public static string GetModeTextField(string modelName)
        {
            if (dictionary_0.ContainsKey(modelName))
            {
                return dictionary_0[modelName];
            }
            ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(modelName);
            if (serviceConfig == null)
            {
                return null;
            }
            string textField = serviceConfig.model.textField;
            dictionary_0[modelName] = textField;
            return textField;
        }

        public static string GetModeEntityText(DbContext db, string model, string id)
        {
            string key = model + "_" + id;
            if (dictionary_1.ContainsKey(key))
            {
                return dictionary_1[key];
            }
            string modeTextField = GetModeTextField(model);
            dictionary_1[key] = db.ExecuteScalar<string>(string.Format("select {0} from {1} where ID = @0", modeTextField, model), new object[1]
            {
                id
            });
            return dictionary_1[key];
        }

        public static void ClearModelEntityText(DbContext db, string model, string id)
        {
            try
            {
                string key = model + "_" + id;
                dictionary_1.Remove(key);
            }
            catch
            {
            }
        }

        public DataAccessHelper()
        {
        }



        static DataAccessHelper()
        {
            assModelCore = null;
            dictionary_0 = new Dictionary<string, string>();
            dictionary_1 = new Dictionary<string, string>();
        }
    }
}
