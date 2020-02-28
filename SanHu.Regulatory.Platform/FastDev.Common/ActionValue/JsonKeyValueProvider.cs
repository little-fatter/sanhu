using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Text;
using System.Linq;
namespace FastDev.Common.ActionValue
{
    public class JsonKeyValueProvider : IValueProvider
    {
        private const string FULL_JSON_REQUEST = "fullJson";
        private JObject JsonData;
        public JsonKeyValueProvider(ActionContext actionContext)
        {
            if (actionContext.HttpContext.Request.Method == "POST")
            {
                if (actionContext.HttpContext.Request.ContentType == "application/json")
                {
                    var body = actionContext.HttpContext.Request.Body;
                    actionContext.HttpContext.Request.EnableBuffering();
                    byte[] buffs;
                    using (var ms = new MemoryStream())
                    {
                        body.CopyTo(ms);
                        buffs = ms.ToArray();
                    }
                    string jsonBody = Encoding.UTF8.GetString(buffs);
                    if (jsonBody.Length != 0 && (jsonBody.Contains('{') || jsonBody.Contains('[')))
                    {
                        try
                        {
                            JsonData = JObject.Parse(jsonBody);
                        }
                        catch
                        {
                            JsonData = null;
                        }
                    }
                    else
                    {
                        JsonData = null;
                    }
                    return;
                }
            }
            JsonData = null;
        }

        public bool ContainsPrefix(string prefix)
        {
            if (JsonData == null) return false;
            if (prefix == FULL_JSON_REQUEST)
            {
                return true;
            }
            return JsonData.ContainsKey(prefix);
        }

        public ValueProviderResult GetValue(string key)
        {
            StringValues sValues;
            if (JsonData == null) return ValueProviderResult.None;
            if (string.IsNullOrEmpty(key)) return ValueProviderResult.None;
            JToken jt;
            if (key != FULL_JSON_REQUEST)
            {
                if (JsonData.TryGetValue(key, out jt))
                {
                    if (jt is JArray)
                    {
                        sValues = new StringValues(jt.ToObject<string[]>().ToArray());
                    }
                    else
                    {
                        sValues = new StringValues(jt.ToString());
                    }
                }
                else
                {
                    return ValueProviderResult.None;
                }
            }
            else
            {
                sValues = new StringValues(JsonData.ToString());
            }

            return new ValueProviderResult(
                sValues,
                System.Globalization.CultureInfo.CurrentCulture);
        }
    }
}
