using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    public class loc_field_staffService : ServiceBase, IService
    {
        public loc_field_staffService()
        {
            OnGetAPIHandler += FieldStaff_OnGetAPIHandler;
        }

        private Func<APIContext, object> FieldStaff_OnGetAPIHandler(string id)
        {
            switch (id.ToLower())
            {
                case "get":
                    return GetStaff;
            }
            return null;
        }
        /// <summary>
        /// 获取执法人员
        /// </summary>
        /// <param name="aPIContext"></param>
        /// <returns></returns>
        private Model.Entity.loc_field_staff GetStaff(APIContext aPIContext)
        {
            var locationKey = aPIContext.Context;//根据地址关键词获取用户
            Model.Entity.loc_field_staff rev = QueryDb.FirstOrDefault<Model.Entity.loc_field_staff>("where Lawenforcer=1 and EnforcementScope like @0", new object[] { $"%{locationKey}%" });
            return rev;
        }

    }
}
