using Autofac;
using FastDev.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WanJiang.Framework.Infrastructure.Caching;
using WanJiang.Framework.Infrastructure.Logging;

namespace FastDev.RunWeb
{
    public class DependencyRegistrationModule : Module
    {
        public DependencyRegistrationModule(string dbConnectionString, string cacheConnectionString)
        {
            this._dbConnectionString = dbConnectionString;
            this._cacheConnectionString = cacheConnectionString;
        }

        private readonly string _dbConnectionString;
        private readonly string _cacheConnectionString;

        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(c => new RedisClient(_cacheConnectionString)).As<RedisClient>().SingleInstance();
            //builder.Register(c => new IdWorker(1, 1)).As<IIdWorker>();
            //builder.RegisterAssemblyTypes(Assembly.GetExecutingAssembly()).Where(t => t.Name.EndsWith("Controller"))
            //    .PropertiesAutowired();
            var serviceInterfaceType = typeof(IApplicationServices);
            builder.RegisterAssemblyTypes(serviceInterfaceType.Assembly).Where(t => t.Name.EndsWith("Service") && !t.IsInterface && !t.IsGenericType)
                .AsClosedTypesOf(serviceInterfaceType).AsImplementedInterfaces().PropertiesAutowired().InstancePerLifetimeScope();

            //builder.Register(c => new MySqlConnection(_dbConnectionString)).As<IDbConnection>().InstancePerLifetimeScope();

            //builder.RegisterAssemblyTypes(typeof(ToolRepository).Assembly).Where(t => t.Name.EndsWith("Repository"))
            //    .AsClosedTypesOf(typeof(IRepository<>)).AsImplementedInterfaces().InstancePerLifetimeScope();



            //builder.RegisterGeneric(typeof(BaseRepository<>)).As(typeof(IRepository<>)).InstancePerLifetimeScope();
            //builder.RegisterGeneric(typeof(BaseApplicationService<>)).As(serviceInterfaceType).PropertiesAutowired().InstancePerLifetimeScope();
            //builder.RegisterGeneric(typeof(AuditInfoApplicationService<>)).As(serviceInterfaceType).PropertiesAutowired().InstancePerLifetimeScope();

            builder.RegisterType<ClientInfo>().AsSelf().InstancePerLifetimeScope();
            //builder.RegisterType<InitializationService>().As<IInitializationService>().PropertiesAutowired();
            //builder.RegisterType<AccountService>().As<IAccountService>().PropertiesAutowired().InstancePerLifetimeScope();


            //builder.RegisterType<ApplicationLogService>().As<IApplicationLogService>().PropertiesAutowired().InstancePerLifetimeScope();
            //builder.RegisterType<ApplicationLogRepository>().As<IApplicationLogRepository>().PropertiesAutowired().InstancePerLifetimeScope();

            //builder.RegisterAssemblyTypes(typeof(RoleMenusReplacedEventHandler).Assembly).Where(t => t.Name.EndsWith("EventHandler"))
            //    .AsClosedTypesOf(typeof(IEventHandler<>)).AsSelf().InstancePerLifetimeScope();

            ////配置identityserver4获取用户扩展实现
            //builder.RegisterType<ClientStore>().As<IClientStore>().InstancePerLifetimeScope();
        }
    }
}
