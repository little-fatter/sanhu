using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Common
{
    public class HttpCookie
    {
        public HttpCookie()
        {

        }
        public HttpCookie(string cookieName)
        {
            Name = cookieName;
        }
        public HttpCookie(string cookieName, string cookieValue)
        {
            Name = cookieName;
            Value = cookieValue;
        }
        public string Domain { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public DateTime? Expires { get; set; }

        public bool HttpOnly { get; set; }

        public string Path { get; set; }

        public Microsoft.AspNetCore.Http.CookieOptions GetCookieOptions()
        {
            var ops = new Microsoft.AspNetCore.Http.CookieOptions();
            if (!string.IsNullOrEmpty(this.Path))
                ops.Path = this.Path;
            if (this.Expires != null)
                ops.Expires = this.Expires;

            ops.HttpOnly = this.HttpOnly;
            if (!string.IsNullOrEmpty(this.Domain))
                ops.Domain = this.Domain;
            return ops;
        }
    }
}
