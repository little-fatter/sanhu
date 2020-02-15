using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Threading.Tasks;
using Autofac;
using FastDev.Common.ActionValue;
using FastDev.Common.Extensions;
using IdentityModel;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using UEditor.Core;
using WanJiang.Framework.Web.Core;
using WanJiang.Framework.Web.Core.Authentication;
using WanJiang.Framework.Web.Core.Authorization;
using WanJiang.Framework.Web.Core.Builder;
using WanJiang.Framework.Web.Core.Configuration;
using WanJiang.Framework.Web.Core.DependencyInjection;
using WanJiang.Framework.Web.Core.Filters;

namespace FastDev.RunWeb
{
    public class Startup
    {

        private IConfiguration Configuration { get; set; }
        private IWebHostEnvironment WebEnvironment { get; set; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
              .SetBasePath(env.ContentRootPath)
              .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
              .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
              .AddEnvironmentVariables();
            Configuration = configuration;// builder.Build();
            WebEnvironment = env;
        }
        public void ConfigureContainer(ContainerBuilder builder)
        {
            var mysqlConnectionString = Configuration.GetConnectionString("MySQLConnection");
            var redisConnectionString = Configuration.GetConnectionString("RedisConnection");
            builder.RegisterModule(new DependencyRegistrationModule(mysqlConnectionString, redisConnectionString));
            //var mongoConnection = Configuration.GetConnectionString("MongoConnection");
            //var mongoDbName = Configuration.GetConnectionString("MongoDbName");
            //builder.Register<IMongoClient>(c => new MongoClient(mongoConnection)).SingleInstance();
            //builder.Register(c => c.Resolve<IMongoClient>().GetDatabase(mongoDbName)).InstancePerDependency();
            //DDServerBaseUrl.SetValue(Configuration.GetSection("DDServer").GetSection("BaseUrl").Value);
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddConfigsSeivce(Configuration);
            //读取设置配置项
            JwtParameterConfiguration jwtParameterConfig = new JwtParameterConfiguration();
            Configuration.Bind("JwtParameters", jwtParameterConfig);
            services.AddSingleton(jwtParameterConfig);
            ExpiresTime expiresTime = new ExpiresTime();
            Configuration.Bind("ExpiresTime", expiresTime);
            services.AddSingleton(expiresTime);
            SecurityKeys securityKeys = new SecurityKeys();
            Configuration.Bind("SecurityKeys", securityKeys);
            services.AddSingleton(securityKeys);

            //生成RsaSecurityKey用于JWT Token签名
            var rsaKeyBytes = Convert.FromBase64String(securityKeys.RSAKey);
            var rsaProvider = new RSACryptoServiceProvider();
            rsaProvider.ImportCspBlob(rsaKeyBytes);
            RSAParameters rsaParams = rsaProvider.ExportParameters(true);
            var rsaSecurityKey = new RsaSecurityKey(rsaParams);
            services.AddSingleton(rsaSecurityKey);

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, option =>
                {
                    //option.Cookie.Expiration = TimeSpan.FromDays(14);
                    option.Cookie.Path = "/";
                    option.ExpireTimeSpan = TimeSpan.FromDays(14);
                    option.Cookie.SameSite = SameSiteMode.Lax;
                    option.SlidingExpiration = true;
                    option.LoginPath = "/Account/Login";
                    option.LogoutPath = "/Account/Logout";
                    option.AccessDeniedPath = "/Account/AccessDenied";
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, option =>
                {
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        NameClaimType = JwtClaimTypes.Name,
                        RoleClaimType = JwtClaimTypes.Role,

                        ValidIssuer = jwtParameterConfig.Issuer,
                        ValidAudience = jwtParameterConfig.Audience,
                        IssuerSigningKey = rsaSecurityKey
                    };
                    option.Events = new JwtBearerEvents
                    {
                        OnTokenValidated = context =>
                            new TokenValidatedInvoker(expiresTime.SessionTimeout).Invoke(context),
                    };
                })
                .AddAppKey(AppKeyDefaults.AuthenticationScheme, option =>
                {
                    option.XWsseTimeout = expiresTime.XWsseTimeout;
                });


            services.AddControllersWithViews(options =>
            {
                //options.EnableEndpointRouting = false;
                options.ValueProviderFactories.Add(new JsonValueProviderFactory());//
                options.Filters.Add<SessionValidationActionFilter>();
                //options.Filters.Add<ActionLogFilter>();
                options.Filters.Add<RestResultFilter>();
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });
            //.AddControllersAsServices(); 

            string editorPath = Configuration.GetSection("AppConfig")["EditorPath"];//这里还不能使用ConfigurationManager,就直接读配置文件吧
            services.AddUEditorService(basePath: Path.Combine(WebEnvironment.WebRootPath, editorPath));

            // If using Kestrel:
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
                options.Limits.MaxRequestBodySize = int.MaxValue;//限制请求长度
            });

            // If using IIS:
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
                options.MaxRequestBodySize = int.MaxValue;//限制请求长度
            });
            //配置文件大小限制
            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = int.MaxValue;// 60000000; 
                options.MultipartHeadersLengthLimit = int.MaxValue;
            });
            var envCfg = new FastDev.Common.EnvConfig();
            envCfg.ContentRootPath = WebEnvironment.ContentRootPath;
            envCfg.WebRootPath = WebEnvironment.WebRootPath;

            services.AddSingleton(Configuration);//将配置保存起来
            services.AddSingleton(envCfg);//将环境变量保存起来

            // 添加一个内存缓存
            services.AddDistributedMemoryCache();
            services.AddHttpContextAccessor();
            //services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSession(options =>
            {
                // 设置10秒钟Session过期来测试
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
            });
            services.AddCors();
            services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
            services.AddTransient<CookieAuthenticationHandler, CustomCookieAuthenticationHandler>();
            //配置数据保护共享的机器秘钥
            services.AddDataProtection(configure =>
            {
                //需要使用共享Session的业务系统此处的名字必须设置一样
                configure.ApplicationDiscriminator = "WanJiang.Framework";
            })
               .AddKeyManagementOptions(option => option.XmlRepository = new CustomFileXmlRepository(WebEnvironment.ContentRootPath));

            //配置Redis缓存
            services.AddStackExchangeRedisCache(redisOption =>
            {
                redisOption.Configuration = Configuration.GetConnectionString("RedisConnection");
                redisOption.InstanceName = "Framework";
            });

            //配置Session
            services.AddSession(sessionOption =>
            {
                sessionOption.IdleTimeout = TimeSpan.FromMinutes(expiresTime.SessionTimeout);
                sessionOption.Cookie.HttpOnly = true;
            });
            services.AddSwaggerGen();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //此处需要注意UsePathBase,UserSpaService,UseDefaultFiles,UseStaticFiles的顺序不能错乱
            AppInfo appInfo = new AppInfo();
            Configuration.GetSection("AppInfo").Bind(appInfo);
            var pathBase = $"/{appInfo.ServiceName.Trim()}";
            app.UsePathBase(new PathString(pathBase), true);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseCors(configurePolicy: builder => {
                builder.AllowAnyOrigin() //允许任何来源的主机访问
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
            var mainServiceName = $"/{Configuration["MainServiceName"].Trim()}";
            app.UseGlobalExceptionHandler(mainServiceName);
            app.UserSpaService(new PathString("/api"));
            app.UseDefaultFiles();
            app.UseStaticFiles();
            //绕过SameSite Cookie的设置，如果不使用此语句，会导致部分版本的360浏览器无法登陆
            //app.UseSameSiteBypass();
            //使用Session，注意此语句必须在UseMvc之前，否则在Controller-Action中操作Session会报错。
            app.UseSession();
            //使用ForwardHeader，如果没有添加此语句，在使用nginx进行反向代理并配置为HTTPS部署模式时,会导致无法进行正常的跳转
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
           

            app.UseStaticHttpContext();

            app.UseRouting();

            app.UseMultipleAuthentication();
            app.UseAuthorization();
            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Home}/{action=Index}/{id?}");
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            FastDev.Common.HttpContext.ServiceProvider = app.ApplicationServices;//后面通过这个来获取已注入的服务


            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"{pathBase}/swagger", "Data Center API V1");
            });
        }
    }
}
