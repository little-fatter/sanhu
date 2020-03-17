using FastDev.Common.ActionValue;
using FastDev.Common.Extensions;
using FastDev.RunWeb.Code;
using FD.Common.ActionValue;
using FD.Model.Configs;
using IdentityModel;
using Microsoft.AspNetCore.Authentication;
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
using Microsoft.OpenApi.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Threading.Tasks;
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

            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddConfigsSeivce(Configuration);
            //��ȡ����������
            JwtParameterConfiguration jwtParameterConfig = new JwtParameterConfiguration();
            Configuration.Bind("JwtParameters", jwtParameterConfig);
            services.AddSingleton(jwtParameterConfig);
            ExpiresTime expiresTime = new ExpiresTime();
            Configuration.Bind("ExpiresTime", expiresTime);
            services.AddSingleton(expiresTime);
            SecurityKeys securityKeys = new SecurityKeys();
            Configuration.Bind("SecurityKeys", securityKeys);
            services.AddSingleton(securityKeys);
            AppInfo appInfo = new AppInfo();
            Configuration.Bind("AppInfo", appInfo);
            services.AddSingleton(appInfo);

            //����RsaSecurityKey����JWT Tokenǩ��
            var rsaKeyBytes = Convert.FromBase64String(securityKeys.RSAKey);
            var rsaProvider = new RSACryptoServiceProvider();
            rsaProvider.ImportCspBlob(rsaKeyBytes);
            RSAParameters rsaParams = rsaProvider.ExportParameters(true);
            var rsaSecurityKey = new RsaSecurityKey(rsaParams);
            services.AddSingleton(rsaSecurityKey);

            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            }).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, option =>
            {
                option.Authority = jwtParameterConfig.Issuer;
                option.RequireHttpsMetadata = false;
                option.Audience = jwtParameterConfig.Audience;
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = JwtClaimTypes.Name,
                    RoleClaimType = JwtClaimTypes.Role,
                };
                option.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        if (context.Request.Headers.TryGetValue("Authorization", out var tokenInfo))
                        {
                            context.Token = tokenInfo[0].Split(" ")[1];
                        }
                        else if (context.Request.Cookies.TryGetValue(jwtParameterConfig.CookieName, out var token))
                        {
                            context.Token = token;
                        }
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                        new TokenValidatedInvoker().Invoke(context),
                };
            });
            services.AddConfigHttpClient(Configuration);

            services.AddControllersWithViews(options =>
            {
                options.EnableEndpointRouting = false;
                options.ValueProviderFactories.Add(new JsonValueProviderFactory());//
                options.Filters.Add<SessionValidationActionFilter>();
                //options.Filters.Add<ActionLogFilter>();
                options.Filters.Add<RestResultFilter>();
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
                options.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
                options.JsonSerializerOptions.Converters.Add(new DateTimeNullConverter());
            });
            //.AddControllersAsServices(); 

            string editorPath = Configuration.GetSection("AppConfig")["EditorPath"];//���ﻹ����ʹ��ConfigurationManager,��ֱ�Ӷ������ļ���
            services.AddUEditorService(basePath: WebEnvironment.WebRootPath, editorPath: editorPath);

            // If using Kestrel:
            services.Configure<KestrelServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
                options.Limits.MaxRequestBodySize = int.MaxValue;//�������󳤶�
            });

            // If using IIS:
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
                options.MaxRequestBodySize = int.MaxValue;//�������󳤶�
            });
            //�����ļ���С����
            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = int.MaxValue;// 60000000; 
                options.MultipartHeadersLengthLimit = int.MaxValue;
            });
            var envCfg = new FastDev.Common.EnvConfig();
            envCfg.ContentRootPath = WebEnvironment.ContentRootPath;
            envCfg.WebRootPath = WebEnvironment.WebRootPath;

            services.AddSingleton(Configuration);//�����ñ�������
            services.AddSingleton(envCfg);//������������������

            // ���һ���ڴ滺��
            services.AddDistributedMemoryCache();
            services.AddHttpContextAccessor();
            //services.TryAddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddSession(options =>
            {
                // ����10����Session����������
                options.IdleTimeout = TimeSpan.FromMinutes(20);
                options.Cookie.HttpOnly = true;
            });
            services.AddCors();
            //services.AddSingleton<IAuthorizationHandler, PermissionAuthorizationHandler>();
            //services.AddTransient<CookieAuthenticationHandler, CustomCookieAuthenticationHandler>();
            //�������ݱ�������Ļ�����Կ
            services.AddDataProtection(configure =>
            {
                //��Ҫʹ�ù���Session��ҵ��ϵͳ�˴������ֱ�������һ��
                configure.ApplicationDiscriminator = "WanJiang.Framework";
            })
               .AddKeyManagementOptions(option => option.XmlRepository = new CustomFileXmlRepository(WebEnvironment.ContentRootPath));

            //����Redis����
            services.AddStackExchangeRedisCache(redisOption =>
            {
                redisOption.Configuration = Configuration.GetConnectionString("RedisConnection");
                redisOption.InstanceName = "Framework";
            });

            //����Session
            services.AddSession(sessionOption =>
            {
                sessionOption.IdleTimeout = TimeSpan.FromMinutes(expiresTime.SessionTimeout);
                sessionOption.Cookie.HttpOnly = true;
            });
            services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "��� HTTP API",
                    Version = "v1",
                    Description = "��� HTTP API",
                    //TermsOfService = "Terms Of Service"
                });

                var basePath = AppContext.BaseDirectory;
                var xmlPath = Path.Combine(basePath, "FastDev.RunWeb.xml");
                var ModelPath = Path.Combine(basePath, "FastDev.Model.xml");
                var devDbPath = Path.Combine(basePath, "FastDev.DevDB.xml");

                option.IncludeXmlComments(xmlPath);
                option.IncludeXmlComments(ModelPath);
                option.IncludeXmlComments(devDbPath);
                option.DocumentFilter<ModelDocumentFilter>();
                option.AddSecurityDefinition("bearerAuth", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    Description = "JWT��Ȩ��¼."
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "bearerAuth" }
            },
            new string[] {}
                    }
                });
            });
            services.AddDependencyConfigs(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //�˴���Ҫע��UsePathBase,UserSpaService,UseDefaultFiles,UseStaticFiles��˳���ܴ���
            var appInfo = app.ApplicationServices.GetRequiredService<AppInfo>();
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
            app.UseCors(configurePolicy: builder =>
            {
                builder.AllowAnyOrigin() //�����κ���Դ����������
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
            var mainServiceName = $"/{Configuration["MainServiceName"].Trim()}";
            app.UseGlobalExceptionHandler(mainServiceName);
            //app.UserSpaService(new PathString("/api"));
            app.UseDefaultFiles();
            app.UseStaticFiles();
            //�ƹ�SameSite Cookie�����ã������ʹ�ô���䣬�ᵼ�²��ְ汾��360������޷���½
            //app.UseSameSiteBypass();
            //ʹ��Session��ע�����������UseMvc֮ǰ��������Controller-Action�в���Session�ᱨ��
            app.UseSession();
            //ʹ��ForwardHeader�����û����Ӵ���䣬��ʹ��nginx���з����������ΪHTTPS����ģʽʱ,�ᵼ���޷�������������ת
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });


            app.UseStaticHttpContext();
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint($"/swagger/v1/swagger.json", "Data Center API V1");

            });

            app.UseRouting();

            //app.UseMultipleAuthentication();
            app.UseAuthentication();
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
            FastDev.Common.HttpContext.ServiceProvider = app.ApplicationServices;//����ͨ���������ȡ��ע��ķ���



        }
    }
}
