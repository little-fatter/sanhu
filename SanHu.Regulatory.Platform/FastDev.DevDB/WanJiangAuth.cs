using FastDev.DevDB;
using FastDev.DevDB.Model.Config;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.DevDB
{
    /// <summary>
    /// 关于两个平台对接的过程种设计到的用户，角色，单位的信息同步
    /// 这里有些破坏平台的开放闭合规则，为了能迅速整合系统，出此下策
    /// </summary>
    public static class WanJiangAuth
    {
        private static DbContext dbWanJiang;
        private static Dictionary<string, object> _modelConfigCache;
        private const string WANGJIANG_USER_TABLE = "user";
        private static ServiceConfig GetServiceConfig(string model)
        {
            _modelConfigCache = new Dictionary<string, object>();
            if (string.IsNullOrEmpty(model))
            {
                return null;
            }
            if (!_modelConfigCache.ContainsKey(model) || _modelConfigCache[model] == null)
            {
                _modelConfigCache[model] = ServiceHelper.GetServiceConfig(model);
            }
            return _modelConfigCache[model] as ServiceConfig;
        }

        static WanJiangAuth()
        {
            ServiceConfig serviceConfig = GetServiceConfig(WANGJIANG_USER_TABLE);
            if (serviceConfig != null && !string.IsNullOrEmpty(serviceConfig.model.dbName))
            {
                //根据数据库连接名称，查询数据，获取连接字符串，生成链接
                dbWanJiang = SysContext.GetOtherDB(serviceConfig.model.dbName);
            }
        }
        /// <summary>
        /// 获取万江的用户
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        //public static FastDev.Model.Entity.user GetUserById(string userId)
        //{
        //    return dbWanJiang.FirstOrDefault<FastDev.Model.Entity.user>("where ID = @0", userId);
        //}


        public static List<string> GetRoleUsers(string userId)
        {
            return dbWanJiang.Fetch<string>("Select RoleId from roleuser where UserID = @0", userId);
        }


        public static string GetUserName(string userId)
        {
            return dbWanJiang.ExecuteScalar<string>("Select Name from user where Id = @0", userId);
        }

        /// <summary>
        /// 获取用户的部门，如果有多个也只获取一个
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static string GetCurrentDepartmentId(string userId)
        {
            return dbWanJiang.ExecuteScalar<string>("select OrganizationId from organizationuser where UserId=@0", userId);
        }

        public static string GetCurrentCompanyId(string userId)
        {
            return dbWanJiang.ExecuteScalar<string>("select id from organization where id in (select OrganizationId from organizationuser where UserId=@0) and ParentId=0", userId);
        }


    }
}
