using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Text;

namespace FD.Common
{
    public static class EumHelper
    {
        public static string GetDisplayName(this Enum eum)
        {
            var type = eum.GetType();//先获取这个枚举的类型
            var field = type.GetField(eum.ToString());//通过这个类型获取到值
            var obj = (DisplayAttribute)field.GetCustomAttribute(typeof(DisplayAttribute));//得到特性
            return obj.Name ?? "";
        }
    }
}
