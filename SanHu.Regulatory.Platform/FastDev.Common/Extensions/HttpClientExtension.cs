using FD.Common.Http;
using Microsoft.AspNetCore.WebUtilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace FD.Common.Extensions
{
    public static class HttpClientExtension
    {
        /// <summary>
        /// get异步请求接口数据
        /// </summary>
        /// <typeparam name="T">输出参数</typeparam>
        /// <param name="httpClient"></param>
        /// <param name="url"></param>
        /// <returns></returns>
        public static async Task<T> GetDataAsync<T>(this HttpClient httpClient, string url, object pairs)
        {
            try
            {
                string uri;
                if (pairs != null)
                {
                    var dicts = ParaToDictionary(pairs);
                    uri = QueryHelpers.AddQueryString(url, dicts);
                }
                else
                {
                    uri = url;
                }
             
                var response = await httpClient.GetStringAsync(uri);
                if (!string.IsNullOrEmpty(response))//请求成功
                {
                    return JsonConvert.DeserializeObject<T>(response);
                }
                return default(T);
            }
            catch (Exception e)
            {
                return default(T);
            }
        }
        /// <summary>
        /// post异步请求接口数据
        /// </summary>
        /// <typeparam name="T">输出参数</typeparam>
        /// <param name="httpClient"></param>
        /// <param name="api"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static async Task<T> PostAsync<T>(this HttpClient httpClient, string api, object data)
        {
            try
            {
                var response = await httpClient.PostAsync(api, new JsonContent(data));
                if (response.IsSuccessStatusCode)//请求成功
                {
                    string str = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(str))
                    {
                        return JsonConvert.DeserializeObject<T>(str);
                    }
                }
                return default(T);
            }
            catch (Exception e)
            {
                return default(T);
            }
        }
        /// <summary>
        /// post异步请求接口数据,参数放在url里面
        /// </summary>
        /// <typeparam name="T">输出参数</typeparam>
        /// <param name="httpClient"></param>
        /// <param name="api"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static async Task<T> PostQueryAsync<T>(this HttpClient httpClient, string url, object data)
        {
            try
            {
                var dicts = ParaToDictionary(data);
                var uri = QueryHelpers.AddQueryString(url, dicts);
                var response = await httpClient.PostAsync(uri, new StringContent(""));
                if (response.IsSuccessStatusCode)//请求成功
                {
                    string str = await response.Content.ReadAsStringAsync();
                    if (!string.IsNullOrEmpty(str))
                    {
                        return JsonConvert.DeserializeObject<T>(str);
                    }
                }
                return default(T);
            }
            catch (Exception e)
            {
                return default(T);
            }
        }
        /// <summary>
        /// 参数转字典
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        private static Dictionary<string, string> ParaToDictionary(object data)
        {
            //TODO:未进行urlEncode
            return JsonConvert.DeserializeObject<Dictionary<string, string>>(JsonConvert.SerializeObject(data));
        }
    }
}
