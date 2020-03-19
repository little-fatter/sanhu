using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 更改表单状态
    /// </summary>
    public class Case_Report_StateChange
    {
        /// <summary>
        /// 审批实例ID
        /// </summary>
        public string InstaceId { get; set; }
        /// <summary>
        /// 表单状态
        /// </summary>
        public string FormState { get; set; }
    }
}
