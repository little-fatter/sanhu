﻿using FastDev.Common;
using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using FastDev.Model.Entity;
using FD.Model.Dto;
using FD.Model.Enum;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    class user_InfoService : ServiceBase, IService
    {
        public user_InfoService()
        {
            OnGetAPIHandler += user_InfoService_OnGetAPIHandler;
        }

        private Func<APIContext, object> user_InfoService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "CHECKSTAFFLIST":
                    return CheckStaffList;
                case "TAKEUSERTASK":
                    return TakeUserTask;
            }
            return null;
        }


        private object TakeUserTask(APIContext context)
        {
            var userid = JsonHelper.DeserializeJsonToObject<string>(context.Data);
            return QueryDb.ExecuteScalar<int>("select count(*) from work_task where MainHandler=@0 and TaskStatus=1", userid);
        }


        private object CheckStaffList(APIContext context)
        {
            try
            {      
                ServiceConfig organzationConfig = ServiceHelper.GetServiceConfig("organization");
                ServiceConfig organizationuserServiceConfig = ServiceHelper.GetServiceConfig("organizationuser");
                ServiceConfig userConfig = ServiceHelper.GetServiceConfig("user");
                List<organization> orgs = new List<organization>();
                var org1 = SysContext.GetOtherDB(organzationConfig.model.dbName).FirstOrDefault<organization>($"select * from organization where Name='综合行政执法一大队'");
                var org2 = SysContext.GetOtherDB(organzationConfig.model.dbName).FirstOrDefault<organization>($"select * from organization where Name='综合行政执法二大队'");
                var org3 = SysContext.GetOtherDB(organzationConfig.model.dbName).FirstOrDefault<organization>($"select * from organization where Name='综合行政执法三大队'");
                var org4 = SysContext.GetOtherDB(organzationConfig.model.dbName).FirstOrDefault<organization>($"select * from organization where Name='综合行政执法四大队'");
                if(org1!=null)orgs.Add(org1);
                if (org2 != null) orgs.Add(org2);
                if (org3 != null) orgs.Add(org3);
                if (org4 != null) orgs.Add(org4);
                if (orgs == null || orgs.Count < 1) return null;
                List<organizationuser> orgulist = new List<organizationuser>();
                foreach (var o in orgs)
                {
                    var orgus = SysContext.GetOtherDB(organizationuserServiceConfig.model.dbName).Query<organizationuser>($"select * from organizationuser where OrganizationId={o.Id}");
                   if(orgus!=null)orgulist.AddRange(orgus);
                }
                if (orgulist == null || orgulist.Count < 1) return null;
                List<Dictionary<string, object>> returncollection = new List<Dictionary<string, object>>();
                foreach (var u in orgulist)
                {
                    Dictionary<string, object> udic = new Dictionary<string, object>();
                    var  organzation = orgs.FirstOrDefault(o => o.Id == u.OrganizationId);
                    var ur = SysContext.GetOtherDB(userConfig.model.dbName).FirstOrDefault<user>($"select * from user where Id={u.UserId}");
                    if (ur!=null)
                    { 
                       udic.Add("Organization", organzation.Name);
                        udic.Add("OrganizationId", organzation.Id);
                        udic.Add("userId", ur.Id);
                        udic.Add("userName", ur.Name);
                        returncollection.Add(udic);
                    }
                }
                return returncollection;
            }
            catch (Exception ex)
            {
                return null;
            }
        }


     
    }
}
