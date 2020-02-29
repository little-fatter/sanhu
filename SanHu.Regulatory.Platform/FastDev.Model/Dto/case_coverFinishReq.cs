using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class case_coverFinishReq:FormReqBase
    {
        /// <summary>
        /// 结案报告
        /// </summary>
        public case_cover CaseCover { get; set; }

    }
}
