using Newtonsoft.Json;
using System;

namespace FD.Common.ActionValue
{
    public class FullJsonValue
    {


        public static object GetObjectByType(Type entityType, string strJson)
        {
            var setting = new JsonSerializerSettings()
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
            };
            setting.Converters.Add(new JsonByteConvert());
            return JsonConvert.DeserializeObject(strJson, entityType, setting);
        }
        public static object GetObject(Type entityType, string strJson)
        {
            Type type = typeof(PostDataDescriptor<>).MakeGenericType(entityType);
            return GetObjectByType(type, strJson);
        }

        public static object GetListObject(Type entityType, string strJson)
        {
            Type type = typeof(ListPostDataDescriptor<>).MakeGenericType(entityType);
            return GetObjectByType(type, strJson);
        }
       

        public static T GetObject<T>(string strJson)
        {
            if (string.IsNullOrEmpty(strJson)) return default(T);
            return JsonConvert.DeserializeObject<T>(strJson);
        }
    }
}
