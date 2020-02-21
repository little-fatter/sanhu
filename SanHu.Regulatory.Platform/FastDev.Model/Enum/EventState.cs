using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Enum
{
    /// <summary>
    /// 事件状态
    /// </summary>
   public enum EventState
    {
        /// <summary>
        /// 未分配
        /// </summary>
        Undistributed = 0,
        /// <summary>
        /// 分配
        /// </summary>
        Allocation = 1,
        /// <summary>
        /// 已关闭
        /// </summary>
        Close =2
    }
}
