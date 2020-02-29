using FastDev.DevDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    public class form_allService : ServiceBase, IService
    {
        /// <summary>
        /// 
        /// {
        /// 	"model": "form_all",
        /// 	"filter": {
        /// 		"rules": [
        /// 			{
        /// 				"field": "EventInfoId",
        /// 				"op": "equal",
        /// 				"value": "45345",
        /// 				"type": "string"
        /// 			},
        /// 			{
        /// 				"field": "FormType",
        /// 				"op": "equal",
        /// 				"value": "from_inspectiontrecord",
        /// 				"type": "string"
        /// 			},
        /// 		]
        /// 	}
        /// }
        /// <paramref name="id">数据id， 可以不传id 而传filter，则获取最新一条数据</paramref>
        /// <paramref name="filter">如以上json结构所示</paramref>
        ///</summary>
        /// <returns></returns>
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
