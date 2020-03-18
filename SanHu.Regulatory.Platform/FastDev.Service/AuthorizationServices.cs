using FastDev.DevDB.Common;
using FastDev.IServices;
using FD.Model.Configs;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using FD.Common.Extensions;
using IdentityModel.Client;
using WanJiang.Framework.Web.Core.Configuration;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class AuthorizationServices : ApplicationServices, IAuthorizationServices
    {
        /// <summary>
        /// httpclient工厂
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;
        readonly ServerNameConfigModel _serverNameConfig;
        readonly AppInfo _appInfo;
        public AuthorizationServices(IOptionsSnapshot<ServerNameConfigModel> appsettingsModel, AppInfo appinfoModel, IHttpClientFactory clientFactory)
        {
            _serverNameConfig = appsettingsModel.Value;
            _appInfo = appinfoModel;
            _clientFactory = clientFactory;
        }
        public async Task<bool> ToAuthor()
        {
            var client = _clientFactory.CreateClient();
            var disco = await client.GetDiscoveryDocumentAsync(new DiscoveryDocumentRequest
            {
                Address = _serverNameConfig.MainServiceBaseUrl,
                Policy =
                {
                    RequireHttps = false
                }
            });
            if (disco.IsError)
            {
                return false;
            }
            var tokenResponse = await client.RequestClientCredentialsTokenAsync(new ClientCredentialsTokenRequest
            {
                Address = disco.TokenEndpoint,
                ClientId = _appInfo.AppKey,
                ClientSecret = _appInfo.AppSecret,

                Scope = "Wit3LakeApi"
            });
            if (tokenResponse.IsError)
            {
                return false;
            }
            SysContext.FrameworkAccessToken = tokenResponse.AccessToken;
            SysContext.AuthTime = DateTime.Now;
            return true;
        }
    }
}
