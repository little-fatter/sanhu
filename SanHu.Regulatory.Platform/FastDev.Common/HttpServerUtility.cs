using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace FastDev.Common
{
    public class HttpServerUtility
    {
        private Microsoft.AspNetCore.Http.HttpContext httpContext;

        private EnvConfig RootConfig;
        public HttpServerUtility()
        {
            httpContext = FastDev.Common.HttpContext.Current;
            RootConfig = HttpContext.ServiceProvider.GetService(typeof(EnvConfig)) as EnvConfig;
        }
        public HttpServerUtility(Microsoft.AspNetCore.Http.HttpContext context)
        {
            httpContext = context;
            RootConfig = HttpContext.ServiceProvider.GetService(typeof(EnvConfig)) as EnvConfig;
        }

        public string StaticPath(string vPath)
        {
            string vFile = VUrlToVFile(vPath);
            return System.IO.Path.Combine(RootConfig.ContentRootPath, vFile);
        }
        /// <summary>
        /// 获取相对路径
        /// </summary>
        /// <param name="vPath"></param>
        /// <returns></returns>
        public string MapPath(string vPath)
        {
            string vFile = VUrlToVFile(vPath);
            return System.IO.Path.Combine(RootConfig.WebRootPath, vFile);
        }

        #region url
        private string VUrlToVFile(string vPath)
        {
            string nVPath;
            vPath = vPath.Replace("\\", "/");
            if (vPath.StartsWith("~/"))
                nVPath = vPath.TrimStart('~');
            else
                nVPath = vPath;
            string currentUrl;
            string webRoot = string.Format("{0}://{1}/", httpContext.Request.Scheme, httpContext.Request.Host);
            if (nVPath.StartsWith('/'))
            {
                currentUrl = webRoot;
            }
            else
            {
                currentUrl = string.Format("{0}://{1}{2}", httpContext.Request.Scheme, httpContext.Request.Host, httpContext.Request.Path.Value);
            }

            string fullUrl = StickUrl(currentUrl, nVPath);
            string vFile = fullUrl.Substring(webRoot.Length).Replace("/", "\\");
            return vFile;
        }
        /// <summary>
        /// 处理URL地址，当BranchUrl为一个全名的URL时则返回本身，否则恰当的衔接到BaseUrl后面
        /// </summary>
        /// <param name="BaseUrl">完整的URL</param>
        /// <param name="BranchUrl">分支URL</param>
        /// <returns></returns>
        private  string StickUrl(string BaseUrl, string BranchUrl)
        {
            if (Regex.Match(BranchUrl, @"^(http|https|ftp|rtsp|mms)://", RegexOptions.IgnoreCase | RegexOptions.Compiled).Success)
            {
                return BranchUrl;
            }
            else
            {
                BaseUrl = BaseUrl.Replace("\\", "/");
                BranchUrl = BranchUrl.Replace("\\", "/");
                //2007-09-27 ken暂时修改
                if (BranchUrl.StartsWith("/"))
                {
                    return GetLastUrl(BaseUrl, BranchUrl);
                }
                //--------------------------
                BranchUrl = BranchUrl.TrimStart('/');
                if (BranchUrl.IndexOf("../") != 0)
                {
                    return UrlPlus(BaseUrl, BranchUrl);
                }
                else
                {
                    if (Regex.Match(BaseUrl, @"/$", RegexOptions.Compiled).Success)
                    {
                        BaseUrl = BaseUrl.TrimEnd('/');
                    }
                    else if (Regex.Match(BaseUrl, @"/[^\./]+\.[^/]+$", RegexOptions.Compiled).Success)
                    {
                        BaseUrl = Regex.Replace(BaseUrl, @"/[^\./]+\.[^/]+$", "", RegexOptions.Compiled);
                    }
                    while (BranchUrl.IndexOf("../") >= 0)
                    {
                        BranchUrl = Regex.Replace(BranchUrl, @"^\.\./", "", RegexOptions.Compiled);
                        BaseUrl = Regex.Replace(BaseUrl, @"/[^/]*$", "", RegexOptions.Compiled);
                    }
                    return BaseUrl + "/" + BranchUrl;
                }
            }
        }
        //--------------------------------
        private  string GetLastUrl(string BaseUrl, string BranchUrl)
        {
            BranchUrl = BranchUrl.TrimStart('/');
            string Star_url = "";
            string End_Url = BaseUrl;
            if (BaseUrl.IndexOf("//") > 0)
            {
                BaseUrl = BaseUrl.Replace("//", "|");
                string[] Url_Arr = BaseUrl.Split('|');
                Star_url = Url_Arr[0].ToString();
                End_Url = Url_Arr[1].ToString();
            }
            if (End_Url.IndexOf("/") > 0)
            {
                string[] End_Arr = End_Url.Split('/');
                End_Url = End_Arr[0].ToString();
                if (Star_url != string.Empty)
                {
                    return Star_url + "//" + End_Url + "/" + BranchUrl;
                }
                else
                {
                    return End_Url + "/" + BranchUrl;
                }
            }
            else
            {
                if (Star_url != string.Empty)
                {
                    return Star_url + "//" + End_Url + "/" + BranchUrl;
                }
                else
                {
                    return End_Url + "/" + BranchUrl;
                }
            }
        }



        private  string UrlPlus(string front, string tail)
        {
            if (Regex.Match(front, "(http|https|ftp|rtsp|mms)://[^/]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                return front + "/" + tail;
            }
            else if (Regex.Match(front, "(http|https|ftp|rtsp|mms)://[^/]+/$", RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                return front + tail;
            }
            else if (Regex.Match(front, "(http|https|ftp|rtsp|mms)://.+/$", RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                return front + tail;
            }
            else if (Regex.Match(front, @"/[^/\.]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                return front + "/" + tail;
            }
            else if (Regex.Match(front, @"/[^/\.]+\.[^/]+$", RegexOptions.Compiled | RegexOptions.IgnoreCase).Success)
            {
                return Regex.Replace(front, @"/[^/\.]+\.[^/]+$", "", RegexOptions.IgnoreCase | RegexOptions.Compiled) + "/" + tail;
            }
            else
            {
                return front + "/" + tail;
            }
        }
        #endregion
        public string UrlEncode(string value)
        {
            return System.Net.WebUtility.UrlEncode(value);
        }

        public string UrlDecode(string encodedValue)
        {
            return System.Net.WebUtility.UrlDecode(encodedValue);
        }

        public string HtmlEncode(string value)
        {
            return System.Net.WebUtility.HtmlEncode(value);
        }

        public string HtmlDecode(string encodedValue)
        {
            return System.Net.WebUtility.HtmlDecode(encodedValue);
        }

    }
}
