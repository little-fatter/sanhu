using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Common.Extensions
{
    public static class FormExtension
    {
        public static string[] GetValues(this IFormCollection form, string name)
        {
            StringValues sv;
            form.TryGetValue(name, out sv);
            return sv.ToArray();
        }

    }
}
