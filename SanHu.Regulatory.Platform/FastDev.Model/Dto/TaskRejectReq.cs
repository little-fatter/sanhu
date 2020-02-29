using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
   public  class TaskRejectReq: FormReqBase
    {
        /// <summary>
        /// 理由
        /// </summary>
        public string Reason { get; set; }
    }
}
