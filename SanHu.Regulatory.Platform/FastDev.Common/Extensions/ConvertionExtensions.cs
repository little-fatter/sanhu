using System;

namespace FastDev.Common.Extensions
{
	public static class ConvertionExtensions
	{
		public static T? ConvertTo<T>(this IConvertible convertibleValue) where T : struct
		{
			if (null == convertibleValue)
			{
				return null;
			}
			return (T?)Convert.ChangeType(convertibleValue, typeof(T));
		}
	}
}
