using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using System.Text.Unicode;
using System.Threading.Tasks;
using FastDev.Common.ActionValue;
using FastDev.Common.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using UEditor.Core;

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


        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options =>
            {
                options.ValueProviderFactories.Add(new JsonValueProviderFactory());//
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                options.JsonSerializerOptions.PropertyNamingPolicy = null;
            });

            string editorPath = Configuration.GetSection("AppConfig")["EditorPath"];//���ﻹ����ʹ��ConfigurationManager,��ֱ�Ӷ������ļ���
            services.AddUEditorService(basePath: Path.Combine(WebEnvironment.WebRootPath, editorPath));

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
            services.AddControllersWithViews();
            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseStaticHttpContext();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            FastDev.Common.HttpContext.ServiceProvider = app.ApplicationServices;//����ͨ���������ȡ��ע��ķ���


            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/home/swagger", "Data Center API V1");
            });
        }
    }
}
