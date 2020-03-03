using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class FormDataReq
    {
        /// <summary>
        /// 主表模块
        /// </summary>
        public string Model { get; set; }
        /// <summary>
        /// 事件id(有则判断)
        /// </summary>
        public string EventInfoId { get; set; }
        /// <summary>
        /// 主表id(有则判断)
        /// </summary>
        public string FormId { get; set; }
        /// <summary>
        /// 需要的数据(执法人,当事人,附件),不传默认三个都有
        /// </summary>
        public string[] FilterModels { get; set; }
    }
}
