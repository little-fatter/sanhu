using FastDev.DevDB.Common;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FastDev.RunWeb
{
    /// <summary>
    /// http客户端配置
    /// </summary>
    public static class HttpClientConfigs
    {
        /// <summary>
        /// http服务注册
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void AddConfigHttpClient(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddHttpClient();
            services.AddHttpClient(HostData.FrameWorkSeverName, x =>
            {
                x.BaseAddress = new Uri(configuration.GetSection("MainServiceBaseUrl").Value);
            });
        }
    }
}
