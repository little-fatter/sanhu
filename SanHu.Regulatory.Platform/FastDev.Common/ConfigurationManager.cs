using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Common
{
    public class ConfigurationManager
    {



        private static StringValueSetting _AppSettings = null;
        /// <summary>
        /// app设置
        /// </summary>
        public static StringValueSetting AppSettings
        {
            get
            {
                if (_AppSettings == null)
                {
                    _AppSettings = new StringValueSetting("AppConfig");
                }
                return _AppSettings;
            }
        }
        private static ConnValueSetting _ConnectionStrings = null;
        public static ConnValueSetting ConnectionStrings
        {
            get
            {
                if (_ConnectionStrings == null)
                {
                    _ConnectionStrings = new ConnValueSetting("ConnectionStrings");
                }
                return _ConnectionStrings;
            }
        }




    }

    #region 相关类

    public class StringValueSetting
    {
        private IConfiguration config = null;
        private string sectionName;
        public StringValueSetting(string secName)
        {
            config=HttpContext.ServiceProvider.GetService(typeof(IConfiguration)) as IConfiguration;
            sectionName = secName;
        }
        public string this[string name]
        {
            get
            {
                if (AllKeys.Contains(name))
                {
                    var str= config.GetSection(sectionName)[name];//第一种方法
                    return str;
                }
                return "";
            }
        }

        public List<string> AllKeys
        {
            get
            {
                List<string> rev = new List<string>();
                var all = config.GetSection(sectionName).GetChildren();
                foreach (var k in all)
                {
                    rev.Add(k.Key);
                }
                return rev;
            }
        }

    }


    public class ConnValueSetting
    {
        private IConfiguration config = null;
        private string sectionName;
        public ConnValueSetting(string secName)
        {
            config = HttpContext.ServiceProvider.GetService(typeof(IConfiguration)) as IConfiguration;
            sectionName = secName;
        }
        public ConnectionStringSettings this[string name]
        {
            get
            {
                if (AllKeys.Contains(name))
                {
                    ConnectionStringSettings rev = new ConnectionStringSettings();
                    var item = config.GetSection(sectionName).GetSection(name);//第一种方法
                    foreach(var kv in item.AsEnumerable())
                    {
                        if (kv.Key == "ConnectionString") rev.ConnectionString = kv.Value;
                        if (kv.Key == "ProviderName") rev.ProviderName = kv.Value;
                    }
                    return rev;
                }
                return null;
            }
        }

        public List<string> AllKeys
        {
            get
            {
                List<string> rev = new List<string>();
                var all = config.GetSection(sectionName).GetChildren();
                foreach (var k in all)
                {
                    rev.Add(k.Key);
                }
                return rev;
            }
        }

    }

    public class ConnectionStringSettings
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="connStr"></param>
        /// <param name="dbProviderName"></param>
        public ConnectionStringSettings(string connStr,string dbProviderName)
        {
            ConnectionString = connStr;
            ProviderName = dbProviderName;
        }
        public ConnectionStringSettings()
        {

        }
        /// <summary>
        /// 连接字符串
        /// </summary>
        public string ConnectionString { get; set; }
        /// <summary>
        /// ProviderName
        /// </summary>
        public string ProviderName { get; set; }
    }
    #endregion

}
