using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Common
{
    public static class HttpContext
    {
        private static IHttpContextAccessor _accessor;
        public static Microsoft.AspNetCore.Http.HttpContext Current => _accessor.HttpContext;
        public static void Configure(IHttpContextAccessor accessor)
        {
            _accessor = accessor;
        }

        public static IServiceProvider ServiceProvider { get; set; }
    }
}
