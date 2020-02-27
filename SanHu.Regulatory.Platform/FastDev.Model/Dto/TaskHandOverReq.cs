using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 任务移交请求
    /// </summary>
    public class TaskHandOverReq
    {
        /// <summary>
        /// 当前任务id
        /// </summary>
        public string TaskId { get; set; }
        /// <summary>
        /// 移交目标
        /// </summary>
        public long UserId { get; set; }
    }
}
