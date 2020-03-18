using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using WanJiang.Framework.Infrastructure.Caching;
using WanJiang.Framework.Infrastructure.Exceptions;
using WanJiang.Framework.Infrastructure.Logging;
using WanJiang.Framework.Web.Core.Http;

namespace FastDev.RunWeb.Code
{
    public static class FrameworkClaimTypes
    {
        /// <summary>
        /// 用户当前使用的工具ID
        /// </summary>
        public const string ToolId = "ToolId";
        /// <summary>
        /// 用户在当前工具ID下拥有的角色ID（以英文逗号分隔）
        /// </summary>
        public const string RoleIds = "RoleIds";

        /// <summary>
        /// AppKey认证时使用的秘钥
        /// </summary>
        public const string AppSecret = "AppSecret";
        /// <summary>
        /// 微服务Id
        /// </summary>
        public const string ServiceId = "ServiceId";
        /// <summary>
        /// 账户Id（用户登录名）
        /// </summary>
        public const string AccountId = "AccountId";
        /// <summary>
        /// 租户Id
        /// </summary>
        public const string TenantId = "TenantId";
    }
    public class TokenValidatedInvoker2
    {
        public Task Invoke(TokenValidatedContext context)
        {
            var user = context.Principal;
            var clientInfo = context.HttpContext.RequestServices.GetService<ClientInfo>();
            foreach (var claim in user.Claims)
            {
                switch (claim.Type)
                {
                    case JwtClaimTypes.Name:
                        clientInfo.UserName = claim.Value;
                        break;
                    case JwtClaimTypes.Subject:
                        clientInfo.UserId = claim.Value;
                        break;
                    case FrameworkClaimTypes.AccountId:
                        clientInfo.AccountId = claim.Value;
                        break;
                    case FrameworkClaimTypes.ToolId:
                        clientInfo.ToolId = claim.Value;
                        break;
                    case FrameworkClaimTypes.TenantId:
                        clientInfo.TenantId = claim.Value;
                        break;
                    case JwtClaimTypes.SessionId:
                        clientInfo.SessionId = claim.Value;
                        break;
                }
            }

            if (clientInfo.UserName == null)
                clientInfo.UserName = $"{clientInfo.ToolId}_{clientInfo.TenantId}";

            return Task.CompletedTask;
        }
    }
}
