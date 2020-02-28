using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class taskPatrolFinishReq
    {
        /// <summary>
        /// 任务id
        /// </summary>
        public string TaskId { get; set; }
        /// <summary>
        /// 事件id
        /// </summary>
        public string EventId { get; set; }
        /// <summary>
        /// 案件id
        /// </summary>
        public string CaseId { get; set; }

        /// <summary>
        /// 巡检信息
        /// </summary>
        public task_patrol TaskPatrol { get; set; }
    }
}
