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
        [Display(Name = "四方-待处理")]
        unAccept,
        [Display(Name = "四方-处理中")]
        doning,
        [Display(Name = "四方-已处理")]
        done,

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
        toCase,
        /// <summary>
        /// 处理中
        /// </summary>
        [Display(Name = "处理中")]
        dispose,

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
        /// 日常巡查     
        /// </summary>
        [Display(Name = "日常巡查")]
        DailyPatrol,
        /// <summary>
        /// 事件核查    
        /// </summary>
        [Display(Name = "事件核查")]
        EventCheck,
        /// <summary>
        /// 现场勘察       
        /// </summary>
        [Display(Name = "现场勘察")]
        OnSpot,
        /// <summary>
        /// 案件
        /// </summary>
        [Display(Name = "案件")]
        CaseInfo,
        /// <summary>
        /// 现场处罚决定书   
        /// </summary>
        [Display(Name = "现场处罚决定书")]
        Punishment,
        /// <summary>
        /// 没收物品
        /// </summary>
        [Display(Name = "没收物品")]
        confiscated,
        /// <summary>
        /// 询问笔录
        /// </summary>
        [Display(Name = "询问笔录")]
        questionRecord,
        /// <summary>
        /// 勘验笔录
        /// </summary>
        [Display(Name = "勘验笔录")]
        inquestRecord,
        /// <summary>
        /// 结案报告
        /// </summary>
        [Display(Name = "结案报告")]
        finalReport
    }
    public enum ApprovalStatus
    {
        [Display(Name = "待审核")]
        Close = 0,
        [Display(Name = "审核中")]
        Normal = 1,
        [Display(Name = "完结")]
        Reject = 2,
        [Display(Name = "中止")]
        HandOver = 3
    }
}
