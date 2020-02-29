using System;

namespace FastDev.Common.Extensions
{
	public static class DateTimeExtension
	{
		public static DateTime ShortDateValue(this DateTime dateTime)
		{
			return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day);
		}
        /// <summary>
        /// 获取时间戳 秒
        /// </summary>
        /// <returns></returns>
        private static TimeSpan GetTimeSpan(this DateTime dt)
        {
            TimeSpan ts = dt.ToUniversalTime() - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return ts;
        }
        /// <summary>
        /// 获取时间戳 秒
        /// </summary>
        /// <returns></returns>
        public static long GetTimeStamp(this DateTime dt)
        {
            return (long)dt.GetTimeSpan().TotalSeconds;
        }
        /// <summary>
        /// 获取时间戳 毫秒级
        /// </summary>
        /// <returns></returns>
        public static long GetTimeStampM(this DateTime dt)
        {
            return (long)dt.GetTimeSpan().TotalMilliseconds;
        }
    }
}
