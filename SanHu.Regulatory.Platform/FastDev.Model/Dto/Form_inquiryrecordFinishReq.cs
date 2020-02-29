using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 询问
    /// </summary>
    public class Form_inquiryrecordFinishReq: FormReqBase
    {
        /// <summary>
        /// 询问信息
        /// </summary>
        public form_inquiryrecord form_Inquiryrecord { get; set; }
        /// <summary>
        /// 执法人
        /// </summary>
        public law_staff[] law_Staffs { get; set; }
        /// <summary>
        /// 当事人
        /// </summary>
        public law_party[] law_Parties { get; set; }
    }
}
