using System.Collections.Generic;
using System.Linq;

namespace FastDev.Common.Extensions
{
	public static class ArrayExtension
	{
		public static bool In<T>(this T t, IEnumerable<T> enumerable)
		{
			return enumerable.Contains(t);
		}

		public static bool In(this string str, params string[] args)
		{
			foreach (string text in args)
			{
				if (text.Equals(str))
				{
					return true;
				}
			}
			return false;
		}
	}
}
