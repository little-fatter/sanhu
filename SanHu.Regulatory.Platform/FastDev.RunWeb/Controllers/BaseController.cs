﻿using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Text.RegularExpressions;
using System.Text.Unicode;
using System.Threading.Tasks;
using FastDev.DevDB;
using Microsoft.AspNetCore.Mvc;
using WanJiang.Framework.Infrastructure.Logging;
using WanJiang.Framework.Web.Core.Http;

namespace FastDev.RunWeb.Controllers
{
    public class BaseController : WanJiang.Framework.Web.Core.Mvc.BaseController
    {
        /// <summary>
        /// 获取三湖当前登录用户信息
        /// </summary>
        /// <returns></returns>
        [NonAction]
        protected ClientInfo GetUserInfo()
        {
            return HttpContext.GetClientInfo();
        }
        /// <summary>
        /// 返回json
        /// </summary>
        /// <param name="strJson"></param>
        /// <returns></returns>
        [NonAction]
        protected ContentResult GetContentJson(string strJson)
        {
            var content = new ContentResult();
            content.ContentType = "application/json";
            content.Content = strJson;
            return content;
        }


        /// <summary>
        /// 返回json
        /// </summary>
        /// <param name="ajax">把AjaxResult 转为string输出，解决部分Json对象无法输出的问题</param>
        /// <param name="dataJson">数据部分json</param>
        /// <returns></returns>
        [NonAction]
        protected ContentResult GetContentDataJson(AjaxResult ajax, string dataJson)
        {
            var content = new ContentResult();
            content.ContentType = "application/json; charset=utf-8";
            content.Content = "\r\n"+ajax.ToJsonString(dataJson)+"\r\n";//把要返回的数据放入data字段中
            return content;
        }

        private void ParseUrl(string url, NameValueCollection nvc)
        {
            if (url == null)
            {
                throw new ArgumentNullException("url");
            }
            if (!(url == ""))
            {
                int num = url.IndexOf('?');
                if (num != -1)
                {
                    url.Substring(0, num);
                    if (num != url.Length - 1)
                    {
                        string input = url.Substring(num + 1);
                        Regex regex = new Regex("(^|&)?(\\w+)=([^&]+)(&|$)?", RegexOptions.Compiled);
                        MatchCollection matchCollection = regex.Matches(input);
                        foreach (Match item in matchCollection)
                        {
                            nvc.Add(item.Result("$2"), item.Result("$3"));
                        }
                    }
                }
            }
        }
        [NonAction]
        protected string GetNewUrl(string url)
        {
            NameValueCollection nameValueCollection = new NameValueCollection();
            ParseUrl(url, nameValueCollection);
            string text = nameValueCollection["viewname"] ?? nameValueCollection["viewtype"];
            if (string.IsNullOrEmpty(nameValueCollection["model"]))
            {
                return url;
            }
            if (string.IsNullOrEmpty(text))
            {
                return url;
            }
            string text2 = nameValueCollection["model"];
            string text3 = "pages/" + text2 + "/" + text + ".js";
            string[] allKeys = nameValueCollection.AllKeys;
            foreach (string text4 in allKeys)
            {
                if (string.Compare(text4, "model", true) != 0 && string.Compare(text4, "viewtype", true) != 0 && string.Compare(text4, "viewname", true) != 0)
                {
                    text3 += (text3.Contains("?") ? "&" : "?");
                    text3 += text4;
                    text3 += "=";
                    text3 += nameValueCollection[text4];
                }
            }
            return text3;
        }

    }
}