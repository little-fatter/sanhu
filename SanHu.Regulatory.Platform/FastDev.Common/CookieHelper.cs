using Microsoft.AspNetCore.Http;
using System;

namespace FastDev.Common
{
    public class CookieHelper
    {
        public static string GetCookieValue(string cookieName)
        {
            HttpRequest request = HttpContext.Current.Request;
            if (request != null)
            {
                return GetCookieValue(request.Cookies[cookieName]);
            }
            return "";
        }

        public static string GetCookieValue(HttpCookie cookie)
        {
            if (cookie != null)
            {
                return cookie.Value;
            }
            return "";
        }

        public static string GetCookie(string cookieName)
        {
            HttpRequest request = HttpContext.Current.Request;
            if (request != null)
            {
                return request.Cookies[cookieName];
            }
            return null;
        }

        public static void RemoveCookie(string cookieName)
        {
            HttpResponse response = HttpContext.Current.Response;
            if (response != null)
            {
                response.Cookies.Delete(cookieName);
            }
        }
        public static void SetCookie(HttpCookie httpCookie)
        {
            SetCookie(httpCookie.Name, httpCookie.Value, httpCookie.Expires);
        }
        public static void SetCookie(string cookieName, string value, DateTime? expires)
        {
            HttpResponse response = HttpContext.Current.Response;
            if (response != null)
            {
                if (expires.HasValue)
                {

                    response.Cookies.Append(cookieName, value, new CookieOptions
                    {
                        Expires = expires
                    });
                }
                else
                {
                    response.Cookies.Append(cookieName, value);
                }
            }
        }

        public static void AddCookie(string cookieName, string value, DateTime expires)
        {
            HttpCookie httpCookie = new HttpCookie(cookieName);
            httpCookie.Expires = expires;
            httpCookie.Value = value;
            AddCookie(httpCookie);
        }

        public static void AddCookie(HttpCookie cookie)
        {
            HttpResponse response = HttpContext.Current.Response;
            if (response != null)
            {
                cookie.HttpOnly = true;
                cookie.Path = "/";
                SetCookie(cookie.Name, cookie.Value, cookie.Expires);
            }
        }
    }
}
