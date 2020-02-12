namespace FastDev.Common
{
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    public class JsonHelper
    {
        public static T DeserializeAnonymousType<T>(string json, T anonymousTypeObject)
        {
            return JsonConvert.DeserializeAnonymousType<T>(json, anonymousTypeObject);
        }

        public static List<T> DeserializeJsonToList<T>(string json) where T : class
        {
            JsonSerializer serializer = new JsonSerializer();
            StringReader reader = new StringReader(json);
            return (serializer.Deserialize(new JsonTextReader(reader), typeof(List<T>)) as List<T>);
        }

        public static T DeserializeJsonToObject<T>(string json) where T : class
        {
            JsonSerializer serializer = new JsonSerializer();
            StringReader reader = new StringReader(json);
            return (serializer.Deserialize(new JsonTextReader(reader), typeof(T)) as T);
        }

        public static string SerializeObject(object o)
        {
            return JsonConvert.SerializeObject(o);
        }
        #region ToDictionary
        /// <summary>
        /// 将JObject转化成字典
        /// </summary>
        /// <param name="json"></param>
        /// <returns></returns>
        public static IDictionary<string, object> ToDictionary(JToken json)
        {
            var propertyValuePairs = json.ToObject<Dictionary<string, object>>();
            ProcessJObjectProperties(propertyValuePairs);
            ProcessJArrayProperties(propertyValuePairs);
            return propertyValuePairs;
        }

        private static void ProcessJObjectProperties(IDictionary<string, object> propertyValuePairs)
        {
            var objectPropertyNames = (from property in propertyValuePairs
                                       let propertyName = property.Key
                                       let value = property.Value
                                       where value is JObject
                                       select propertyName).ToList();

            objectPropertyNames.ForEach(propertyName => propertyValuePairs[propertyName] = ToDictionary((JObject)propertyValuePairs[propertyName]));
        }

        private static void ProcessJArrayProperties(IDictionary<string, object> propertyValuePairs)
        {
            var arrayPropertyNames = (from property in propertyValuePairs
                                      let propertyName = property.Key
                                      let value = property.Value
                                      where value is JArray
                                      select propertyName).ToList();

            arrayPropertyNames.ForEach(propertyName => propertyValuePairs[propertyName] = ToArray((JArray)propertyValuePairs[propertyName]));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="array"></param>
        /// <returns></returns>
        private static object[] ToArray(JArray array)
        {
            return array.ToObject<object[]>().Select(ProcessArrayEntry).ToArray();
        }

        private static object ProcessArrayEntry(object value)
        {
            if (value is JObject)
            {
                return ToDictionary((JObject)value);
            }
            if (value is JArray)
            {
                return ToArray((JArray)value);
            }
            return value;
        }
        #endregion

    }
}

