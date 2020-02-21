using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class FormSaveDto
    {
        /// <summary>
        /// 基础表单
        /// </summary>
        public form_base FormBase { get; set; }
        /// <summary>
        /// 保存表单类型
        /// </summary>
        public FormType Type { get; set; }
        /// <summary>
        /// 表单对象
        /// </summary>
        public object Obj { get; set; }
    }
    public enum FormType
    {
        /// <summary>
        /// 巡检表
        /// </summary>
        PatrolRecord = 1,
    }
}
