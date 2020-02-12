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
    public class crm_customer : ServiceBase, IService
    {
        string ADMIN_ID
        {
            get
            {
                return ConfigurationManager.AppSettings["AppAdminRoleID"];
            }
        }
        string OrderRoleID
        {
            get
            {
                return ConfigurationManager.AppSettings["OrderRoleID"];
            }
        }
        string StockRoleID
        {
            get
            {
                return ConfigurationManager.AppSettings["StockRoleID"];
            }
        }
        string SalesRoleID
        {
            get
            {
                return ConfigurationManager.AppSettings["SalesRoleID"];
            }
        }

        public crm_customer()
        {
            OnGetListData += crm_customer_OnGetListData;

            OnGetNameData += crm_customer_OnGetNameData;

            OnGetPagedData += crm_customer_OnGetPagedData;
        }

        void crm_customer_OnGetPagedData(object data)
        {
            OnGetData(data);
        }

        void crm_customer_OnGetNameData(object data)
        {
            OnGetData(data);
        }

        void crm_customer_OnGetListData(object data)
        {
            OnGetData(data);
        }

        void OnGetData(object data)
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


            var currentUserID = SysContext.CurrentUserID;

           // var currentRoleIDs = db.Fetch<string>("select coreroleID from core_userRole where coreuserID = @0", currentUserID);

        }
        private bool ExistCustomerName(FilterGroup group)
        {
            if (group.rules != null)
            {
                foreach (var rule in group.rules)
                {
                    if (rule.field == "CustomerName" && rule.value != null && rule.value.ToString().Length >= 2) return true;
                }
            }
            if (group.groups != null)
            {
                foreach (var sub in group.groups)
                {
                    if (ExistCustomerName(sub)) return true;
                }
            }
            return false;
        } 
         
    }
}
