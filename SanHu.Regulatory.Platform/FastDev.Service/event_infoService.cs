using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FastDev.Service
{
    class event_infoService : ServiceBase, IService
    {
        public event_infoService()
        {
            
        }

        /// <summary>
        /// 事件每次生成2条,OriginalID为空的不能用于创建任务,仅用作备份
        /// </summary>
        /// <param name="postdata"></param>
        /// <returns></returns>
        public override object Create(object postdata)
        {
            var eventInfo = postdata as event_info;
            base.QueryDb.BeginTransaction();
            try
            {
                base.Create(postdata);
                eventInfo.objId = Guid.NewGuid().ToString().Replace("-", "");
                eventInfo.OriginalID = eventInfo.objId;
                base.Create(postdata);
                QueryDb.CompleteTransaction();
            }
            catch(Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }
            return true;
        }


    }
}
