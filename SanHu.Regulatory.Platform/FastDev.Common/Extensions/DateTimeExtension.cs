using System;

namespace FastDev.Common.Extensions
{
	public static class DateTimeExtension
	{
		public static DateTime ShortDateValue(this DateTime dateTime)
		{
			return new DateTime(dateTime.Year, dateTime.Month, dateTime.Day);
		}
	}
}
