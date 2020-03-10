using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 打印pdf
    /// </summary>
    public class Form_printPDFReq
    {
        /// <summary>
        /// 表单ID
        /// </summary>
        public string formID { get; set; }


        /// <summary>
        /// 表单名称
        /// </summary>
        public string formName { get; set; }
        /// <summary>
        /// 文件绝对路径
        /// </summary>
        public string filePath { get; set; }
    }
}
