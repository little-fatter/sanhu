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
    public class core_roleService : ServiceBase, IService
    { 

        public core_roleService()
        {
            OnDelete += core_role_OnDelete;
        }

        void core_role_OnDelete(object[] args)
        {
            var db = this.MainDb;

            if (args != null && args.Length != 0)
            {
                foreach (var arg in args)
                { 
                }
            }
        }


    }
}