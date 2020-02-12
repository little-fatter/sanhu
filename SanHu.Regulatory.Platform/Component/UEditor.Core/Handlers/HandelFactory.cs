using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace UEditor.Core.Handlers
{
    public class HandelFactory
    {
        /// <summary>
        /// 获取appid路径
        /// </summary>
        /// <param name="rootPath"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        private static string GetAppIdPath(string rootPath, HttpContext context)
        {
            HttpRequest request = context.Request;
            string appId = request.Query["AppID"];
            if (!string.IsNullOrEmpty(appId))
            {
                return rootPath.Replace("uploads", "uploads/" + appId);
            }
            return rootPath;
        }

        public static Handler GetHandler(string action, HttpContext context)
        {
            switch (action)
            {
                case AppConsts.Action.UploadImage:
                    return new UploadHandler(context, new UploadConfig
                    {
                        AllowExtensions = Config.GetStringList("imageAllowFiles"),
                        PathFormat = GetAppIdPath(Config.GetString("imagePathFormat"), context),
                        SizeLimit = Config.GetInt("imageMaxSize"),
                        UploadFieldName = Config.GetString("imageFieldName")
                    });
                case AppConsts.Action.UploadScrawl:
                    return new UploadHandler(context, new UploadConfig()
                    {
                        AllowExtensions = new string[] { ".png" },
                        PathFormat = GetAppIdPath(Config.GetString("scrawlPathFormat"), context),
                        SizeLimit = Config.GetInt("scrawlMaxSize"),
                        UploadFieldName = Config.GetString("scrawlFieldName"),
                        Base64 = true,
                        Base64Filename = "scrawl.png"
                    });
                case AppConsts.Action.UploadVideo:
                    return new UploadHandler(context, new UploadConfig()
                    {
                        AllowExtensions = Config.GetStringList("videoAllowFiles"),
                        PathFormat = GetAppIdPath(Config.GetString("videoPathFormat"), context),
                        SizeLimit = Config.GetInt("videoMaxSize"),
                        UploadFieldName = Config.GetString("videoFieldName")
                    });
                case AppConsts.Action.UploadFile:
                    return new UploadHandler(context, new UploadConfig()
                    {
                        AllowExtensions = Config.GetStringList("fileAllowFiles"),
                        PathFormat = GetAppIdPath(Config.GetString("filePathFormat"), context),
                        SizeLimit = Config.GetInt("fileMaxSize"),
                        UploadFieldName = Config.GetString("fileFieldName")
                    });

                case AppConsts.Action.ListImage:
                    return new ListFileManager(context, GetAppIdPath(Config.GetString("imageManagerListPath"), context), Config.GetStringList("imageManagerAllowFiles"));
                case AppConsts.Action.ListFile:
                    return new ListFileManager(context, GetAppIdPath(Config.GetString("fileManagerListPath"), context), Config.GetStringList("fileManagerAllowFiles"));
                case AppConsts.Action.CatchImage:
                    return new CrawlerHandler(context);
                default:
                    return new NotSupportedHandler(context);
            }
        }
    }
}
