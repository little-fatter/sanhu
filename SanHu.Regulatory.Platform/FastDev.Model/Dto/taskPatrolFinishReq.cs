using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class taskPatrolFinishReq : FormReqBase
    {
        /// <summary>
        /// 巡检信息
        /// </summary>
        public task_patrol TaskPatrol { get; set; }
    }
}
