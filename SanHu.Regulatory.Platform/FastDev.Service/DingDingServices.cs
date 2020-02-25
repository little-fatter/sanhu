using FastDev.IServices;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using FD.Common.Extensions;
using System.Threading.Tasks;
using FastDev.DevDB.Common;

namespace FastDev.Service
{
    public class DingDingServices : ApplicationServices, IDingDingServices
    {
        /// <summary>
        /// httpclient工厂
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;
        public DingDingServices(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public void add()
        {
            var test = 'a';
        }

        /// <summary>
        /// 框架post数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="apiurl"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        private async Task<T> PostFrameWork<T>(string apiurl, object data)
        {
            var client = _clientFactory.CreateClient(HostData.FrameWorkSeverName);
            return await client.PostAsync<T>(apiurl, data);
        }
    }
}
