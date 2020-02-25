using FastDev.IServices;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using WanJiang.Framework.Infrastructure.Caching;
using WanJiang.Framework.Infrastructure.Logging;

namespace FastDev.RunWeb
{
    public static class DependencyConfigs
    {
        /// <summary>
        /// 添加系统依赖注入
        /// </summary>
        /// <param name="services"></param>
        /// <param name="Configuration"></param>
        public static void AddDependencyConfigs(this IServiceCollection services, IConfiguration Configuration)
        {
            var mysqlConnectionString = Configuration.GetConnectionString("MySQLConnection");
            var redisConnectionString = Configuration.GetConnectionString("RedisConnection");
            services.AddSingleton(new RedisClient(redisConnectionString));
            services.AddScoped<ClientInfo>();
            //注入服务层
            services.AddSevices();
        }
        public static void AddSevices(this IServiceCollection service)
        {
            //实现
            Assembly assemblys = Assembly.Load("FastDev.Service");
            var typesImpl = assemblys.GetTypes();

            //接口
            Assembly assemblysInterface = Assembly.Load("FastDev.IServices");
            var baseinterfacetype = typeof(IApplicationServices);
            var typesInterface = assemblysInterface.GetTypes().Where(t => t.GetInterfaces().Contains(baseinterfacetype));
            foreach (var item in typesInterface)
            {
                if (item.Name == baseinterfacetype.Name)
                {
                    continue;
                }
                var name = item.Name.Substring(1).ToLower();

                var impl = typesImpl.FirstOrDefault(w => w.Name.ToLower() == name);
                if (impl != null)
                {
                    service.AddScoped(item, impl);
                }
            }

        }
    }
}
