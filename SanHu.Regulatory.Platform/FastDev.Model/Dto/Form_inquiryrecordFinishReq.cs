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
        public form_inquiryrecord formInquiryrecord { get; set; }
        /// <summary>
        /// 执法人
        /// </summary>
        public law_staff[] lawStaffs { get; set; }
        /// <summary>
        /// 当事人
        /// </summary>
        public law_party[] lawParties { get; set; }
    }
}
