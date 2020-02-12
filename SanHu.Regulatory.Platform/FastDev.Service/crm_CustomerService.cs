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
    public class crm_CustomerService : ServiceBase, IService
    {

        public crm_CustomerService()
        {
            this.OnSave += crm_CustomerService_OnSave;

            this.OnAfterGetDetailData += crm_CustomerService_OnAfterGetDetailData;
        }

        void crm_CustomerService_OnAfterGetDetailData(object query, object data)
        {
            var db = this.MainDb;
            var o = data as Dictionary<string,object>;

            o["审批人"] = db.ExecuteScalar<string>("select realname from core_user where id = @0", SysContext.CurrentUserID);
            o["审批时间"] = DateTime.Now.ToString();
        }

        void crm_CustomerService_OnSave(object entity, object viewdata, bool isCreate)
        {
            var o = viewdata as FastDev.Model.Form.crm_customer;
            if (o == null) return;
            if (o.Clientarea != null && !o.Clientarea.Any()) return;
            var ClientareaID = o.Clientarea[0];
            if (string.IsNullOrEmpty(ClientareaID)) return;

            var area = this.MainDb.FirstOrDefault<FastDev.Model.Entity.base_area>("where ID = @0", ClientareaID);
            if (area == null)
            {
                return;
            }
            if (area.Type == "city")
            {
                o.Province  = new string[]{ area.ParentID , ""};
            }
            else if (area.Type == "district")
            {
                o.City = new string[]{ area.ParentID } ;
                o.Province = new string[] { this.MainDb.ExecuteScalar<string>("select ParentID from base_area where ID = @0", area.ParentID), "" };
            }
        }

  
         

        public override FilterGroup GetTreeCondition(Dictionary<string, object> treeNode)
        {
            if (treeNode == null) return null;
            if (!treeNode.ContainsKey("id")) return null;

            var area = this.MainDb.FirstOrDefault<FastDev.Model.Entity.base_area>("where ID = @0", treeNode["id"].ToString());

            if (area == null) return null;

            var fieldName = "ClientareaID";
            if (area.Type == "city")
            {
                fieldName = "CityID";
            }
            else if (area.Type == "province")
            {
                fieldName = "ProvinceID";
            }
        
            var filter = new FilterGroup();
            filter.rules.Add(new FilterRule()
            {
                field = fieldName,
                op = "equal",
                value = area.ID
            });

            return filter;
        }
 

    }
}