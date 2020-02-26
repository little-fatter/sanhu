using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FD.Model.Configs
{
    public class ServerNameConfigModel
    {
        /// <summary>
        /// 主框架名称
        /// </summary>
        public string MainServiceName { get; set; }
        /// <summary>
        /// 主框架地址
        /// </summary>
        public string MainServiceUrl { get; set; }
        public string AgentId { get; set; }
    }
}
