using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 任务巡查拒绝请求
    /// </summary>
    public class TaskPatrolRejectRequest
    {
        /// <summary>
        /// 任务id
        /// </summary>
        public string TaskId { get; set; }
        /// <summary>
        /// 理由
        /// </summary>
        public string Reason { get; set; }
    }
}
