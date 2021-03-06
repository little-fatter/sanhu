﻿using DinkToPdf;
using DinkToPdf.Contracts;
using FD.Model.Configs;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FastDev.RunWeb
{
    public static class FileConfig
    {
        /// <summary>
        /// 添加配置服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddConfigsSeivce(this IServiceCollection services, IConfiguration Configuration)
        {
            //配置文件服务
            services.Configure<ServerNameConfigModel>(Configuration);

            //pdf加载
            var context = new CustomAssemblyLoadContext();
            context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), "libwkhtmltox.dll"));

            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
        }
    }
}
