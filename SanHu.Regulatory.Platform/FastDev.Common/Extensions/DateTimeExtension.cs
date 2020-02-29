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
        /// ��ȡʱ��� ��
        /// </summary>
        /// <returns></returns>
        private static TimeSpan GetTimeSpan(this DateTime dt)
        {
            TimeSpan ts = dt.ToUniversalTime() - new DateTime(1970, 1, 1, 0, 0, 0, 0);
            return ts;
        }
        /// <summary>
        /// ��ȡʱ��� ��
        /// </summary>
        /// <returns></returns>
        public static long GetTimeStamp(this DateTime dt)
        {
            return (long)dt.GetTimeSpan().TotalSeconds;
        }
        /// <summary>
        /// ��ȡʱ��� ���뼶
        /// </summary>
        /// <returns></returns>
        public static long GetTimeStampM(this DateTime dt)
        {
            return (long)dt.GetTimeSpan().TotalMilliseconds;
        }
    }
}
