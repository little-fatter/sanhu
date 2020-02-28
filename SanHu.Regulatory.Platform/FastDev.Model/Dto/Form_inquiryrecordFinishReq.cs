using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 询问
    /// </summary>
    public class Form_inquiryrecordFinishReq
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
        public string Url { get; set; }

    }
}
