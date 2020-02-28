using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class case_InfoFinishReq
    {
        /// <summary>
        /// 案件信息
        /// </summary>
        public case_Info CaseInfo { get; set; }

        /// <summary>
        /// 当事人信息
        /// </summary>
        public List<law_party> LawParties { get; set; }
        /// <summary>
        /// 待办地址
        /// </summary>
        public string Url { get; set; }
    }
}
