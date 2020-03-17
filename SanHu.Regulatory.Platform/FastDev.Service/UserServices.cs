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
using FD.Model.Dto;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class UserServices : ApplicationServices, IUserServices
    {
        /// <summary>
        /// httpclient工厂
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;
        readonly ServerNameConfigModel _serverNameConfig;
        public UserServices(IOptionsSnapshot<ServerNameConfigModel> appsettingsModel, IHttpClientFactory clientFactory)
        {
            _serverNameConfig = appsettingsModel.Value;
            _clientFactory = clientFactory;
        }
        public Task<UserDetailsDTO> GetUserDetails(string userId)
        {
            var url = "api/users/" + userId;

            return GetFrameWork<UserDetailsDTO>(url,null);
        }
        /// <summary>
        /// 框架get数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="apiurl"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private async Task<T> GetFrameWork<T>(string apiurl, object data)
        {
            var client = _clientFactory.CreateClient(HostData.FrameWorkSeverName);
            return await client.GetDataAsync<T>(apiurl, data);
        }


    }
}
