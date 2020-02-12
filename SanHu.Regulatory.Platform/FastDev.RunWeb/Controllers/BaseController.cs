using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Data;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FastDev.RunWeb.Controllers
{
    public class BaseController : Controller
    {

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
        /// <param name="strJson"></param>
        /// <returns></returns>
        [NonAction]
        protected ContentResult GetContentDataJson(string strJson)
        {
            var content = new ContentResult();
            content.ContentType = "application/json";
            content.Content = "{\"data\":" + strJson + "}";//把要返回的数据放入data字段中
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