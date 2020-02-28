using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
   public class law_punishmentInfoFinishReq
    {
        /// <summary>
        /// 处罚决定书信息
        /// </summary>
        public law_punishmentInfo LawPunishmentInfo { get; set; }

        /// <summary>
        /// 当事人信息
        /// </summary>
        public List<law_party> LawParties { get; set; }
        /// <summary>
        /// 证据信息
        /// </summary>
        public List<attachment> Attachments { get; set; }
        /// <summary>
        /// 待办地址
        /// </summary>
        public string Url { get; set; }
    }
}
