using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 表单请求基础
    /// </summary>
    public class FormReqBase
    {
        /// <summary>
        /// 源任务id
        /// </summary>
        public string SourceTaskId { get; set; }
        /// <summary>
        /// 源事件id
        /// </summary>
        public string EventInfoId { get; set; }
        /// <summary>
        /// 需要新建任务信息
        /// </summary>
        public work_task[] NextTasks { get; set; } 
    }
}
