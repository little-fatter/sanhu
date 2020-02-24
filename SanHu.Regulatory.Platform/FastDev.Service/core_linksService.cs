using FastDev.Common;
using FastDev.DevDB;
using System.Collections.Generic;
using System.Linq;

namespace FastDev.Service
{
    public class core_linksService : ServiceBase, IService
    {

        public core_linksService()
        {


        }

        public override List<Dictionary<string, object>> GetListData(FilterGroup filter)
        {
            var db = this.MainDb;

            var data = base.GetListData(filter);
            foreach (var item in data)
            {
                try
                {
                    if (!string.IsNullOrEmpty(item["ValueSQL"].ToString()))
                    {
                        var sql = item["ValueSQL"].ToString();
                        if (sql.Contains("@0"))
                        {
                            item["Value"] = db.ExecuteScalar<string>(sql, SysContext.WanJiangUserID);
                        }
                        else
                        {
                            item["Value"] = db.ExecuteScalar<string>(sql);
                        }
                    }
                    else
                    {
                        var model = item["ModelName"].ToString();
                        var filterData = item["FilterData"].ToString();
                        if (string.IsNullOrEmpty(model)) continue;
                        FilterGroup model_filter = new FilterGroup();
                        if (!string.IsNullOrEmpty(filterData))
                        {
                            model_filter = JsonHelper.DeserializeJsonToObject<FilterGroup>(filterData);
                        }
                        model_filter = new FastDev.DevDB.Rights.RightsServer(db).AppendDataFilter(model, model_filter);

                        var whereTranslator = new FilterTranslator();
                        if (model_filter != null)
                        {
                            whereTranslator.Group = model_filter;
                        }
                        whereTranslator.Translate();
                        string sql = whereTranslator.CommandText;
                        sql = string.IsNullOrEmpty(sql) ? "" : "where " + sql;
                        sql = "select count(*) from " + model + " " + sql;

                        item["Value"] = db.ExecuteScalar<string>(sql, whereTranslator.Parms.ToArray());
                    }

                }
                catch
                {

                }
            }

            return data;
        }

    }
}