using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Common
{
    /// <summary>
    /// 简单存放几个环境变量
    /// </summary>
    public class EnvConfig
    {
        /// <summary>
        /// 程序根目录位置
        /// </summary>
        public string ContentRootPath { get; set; }
        /// <summary>
        /// wwwroot的物理位置
        /// </summary>
        public string WebRootPath { get; set; }
    }
}
