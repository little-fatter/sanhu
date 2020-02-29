using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    public class form_allService : ServiceBase, IService
    {
        public override Dictionary<string, object> GetDetailData(string id, FilterGroup filter, bool loadOne2many = true)
        {
            if (string.IsNullOrEmpty(id) && filter != null)
            {
                List<Dictionary<string, object>> listData = GetListData(filter, "CreateDate desc");
                if (listData != null && listData.Any())
                {
                    return listData[0];
                }
            }
            return base.GetDetailData(id, filter, loadOne2many);
        }
    }
}
