using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Core
{
    /// <summary>
    /// 分页结果集
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PageQueryResult<T>
    {
        /// <summary>
        ///每页结果数
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// 当前页数(从1开始)
        /// </summary>
        public int PageIndex { get; set; }
        public int Total { get; set; }
        public object Rows { get; set; }
    }
}
