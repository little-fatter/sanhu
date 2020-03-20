using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 勘验记录
    /// </summary>
    public class form_inquestrecordFinishReq: FormReqBase
    {
        /// <summary>
        /// 勘验记录
        /// </summary>
        public form_inquestrecord forminquestrecord { get; set; }
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
