using FastDev.Common;
using FastDev.DevDB;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FastDev.Service
{
    class CaiYunApi : ServiceBase, IService
    {
        private string _token;
        public CaiYunApi()
        {
            OnGetAPIHandler += CaiYunApi_OnGetAPIHandler;
            _token = ConfigurationManager.AppSettings["CaiYunApiToken"];
        }

        private Func<APIContext, object> CaiYunApi_OnGetAPIHandler(string id)
        {
            return GetWeather;
        }

        public WeatherResponse GetWeather(APIContext aPIContext)
        {
            HttpClient httpClient = new HttpClient();
            var result = httpClient.GetAsync($"https://api.caiyunapp.com/v2/{_token}/121.6544,25.1552/realtime.json").Result;
            return JsonConvert.DeserializeObject<WeatherResponse>(result.Content.ReadAsStringAsync().Result);
        }
    }

    public class WeatherResponse
    {
        public string Status { get; set; }
        /// <summary>
        /// 版本号
        /// </summary>
        public string Api_Version { get; set; }
        /// <summary>
        /// 版本号状态
        /// </summary>
        public string Api_Status { get; set; }
        /// <summary>
        /// 服务器本次返回的utc时间戳
        /// </summary>
        public long Server_Time { get; set; }
        /// <summary>
        /// 经纬度
        /// </summary>
        public double[] Location { get; set; }
        /// <summary>
        /// 时区的偏移秒数，如东八区就是 28800 秒
        /// </summary>
        public int TZShift { get; set; }
        /// <summary>
        /// 语言
        /// </summary>
        public string Lang { get; set; }
        /// <summary>
        /// 单位制
        /// </summary>
        public string Unit { get; set; }
        public WeatherResult Result { get; set; }

    }

    public class WeatherResult
    {
        public string Status { get; set; }
        /// <summary>
        /// 温度
        /// </summary>
        public double Temperature { get; set; }
        /// <summary>
        /// 相对湿度
        /// </summary>
        public double Humidity { get; set; }
        /// <summary>
        /// 云量
        /// </summary>
        public double CloudRate { get; set; }
        /// <summary>
        /// 主要天气现象
        /// </summary>
        public string Skycon { get; set; }
        /// <summary>
        /// 能见度
        /// </summary>
        public double Visibility { get; set; }
        /// <summary>
        /// 向下短波辐射通量
        /// </summary>
        public double Dswrf { get; set; }
        public WeatherWind Wind { get; set; }
        /// <summary>
        /// 气压
        /// </summary>
        public double Pres { get; set; }
        public double Apparent_Temperature { get; set; }
        public WeatherPrecipitation Precipitation { get; set; }
        /// <summary>
        /// AQI（国标）
        /// </summary>
        public int Aqi { get; set; }
        /// <summary>
        /// pm25，质量浓度值
        /// </summary>
        public int Pm25 { get; set; }
        /// <summary>
        /// 紫外线指数及其自然语言描述
        /// </summary>
        public WeatherUltraviolet Ultraviolet { get; set; }
        /// <summary>
        /// 舒适度指数及其自然语言描述
        /// </summary>
        public WeatherComfort Comfort { get; set; }

        public class WeatherWind
        {
            /// <summary>
            /// 风速，米制下是公里每小时
            /// </summary>
            public double Speed { get; set; }
            /// <summary>
            /// 风向，单位是度。正北方向为0度，顺时针增加到360度
            /// </summary>
            public double Direction { get; set; }
        }
        public class WeatherPrecipitation
        {
            public class Local
            {
                public string Status { get; set; }
                /// <summary>
                /// 本地降水观测的数据源（radar，GFS）
                /// </summary>
                public string DataSource { get; set; }
                /// <summary>
                /// 本地降水强度（单位为雷达降水强度）
                /// </summary>
                public double Intensity { get; set; }
            }
            public class Nearest
            {
                public string Status { get; set; }
                /// <summary>
                /// 最近的降水带降水强度（单位为雷达降水强度）
                /// </summary>
                public double Intensity { get; set; }
                /// <summary>
                /// 最近的降水带距离
                /// </summary>
                public double Distance { get; set; }
            }
        }
        public class WeatherUltraviolet
        {
            public double Index { get; set; }
            public string Desc { get; set; }
        }
        public class WeatherComfort : WeatherUltraviolet
        {
        }
    }
}
