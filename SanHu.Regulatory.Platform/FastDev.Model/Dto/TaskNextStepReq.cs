using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 任务下一步
    /// </summary>
    public class TaskNextStepReq
    {
        /// <summary>
        /// 当前任务关联的事件id
        /// </summary>
        public string  TaskId { get; set; }
        /// <summary>
        /// 待办地址
        /// </summary>
        public string Url { get; set; }
    }
}
