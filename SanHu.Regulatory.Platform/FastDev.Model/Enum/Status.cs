using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace FD.Model.Enum
{
    /// <summary>
    /// 事件状态
    /// </summary>
    public enum EventStatus
    {
        /// <summary>
        /// 待处理
        /// </summary>
        [Display(Name = "待处理")]
        untreated,
        /// <summary>
        /// 事件核查中
        /// </summary>
        [Display(Name = "事件核查中")]
        patrol,
        /// <summary>
        /// 跟踪整改中
        /// </summary>
        [Display(Name = "跟踪整改中")]
        track,
        /// <summary>
        /// 现场勘察中
        /// </summary>
        [Display(Name = "现场勘察中")]
        survey,
        /// <summary>
        /// 处理完成
        /// </summary>
        [Display(Name = "处理完成")]
        finish,
        /// <summary>
        /// 转为案件办理
        /// </summary>
        [Display(Name = "转为案件办理")]
        toCase
    }

    public enum WorkTaskStatus
    {
        /// <summary>
        /// 关闭
        /// </summary>
        Close = 0,
        /// <summary>
        /// 正常
        /// </summary>
        Normal = 1,
        /// <summary>
        /// 拒绝
        /// </summary>
        Reject = 2,
        /// <summary>
        /// 已移交
        /// </summary>
        HandOver = 3
    }

    public enum TaskType
    {
        /// <summary>
        /// 巡查任务
        /// </summary>
        [Display(Name = "巡查任务")]
        Patrol=0,
        /// <summary>
        /// 勘察
        /// </summary>
        [Display(Name = "勘察任务")]
        Survey =1,
        /// <summary>
        /// 案件
        /// </summary>
        [Display(Name = "案件任务")]
        Case =2
    }



}
