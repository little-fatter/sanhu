using System;
using System.Collections.Generic;

namespace FastDev.Common.Extensions
{
	public static class IEnumerableExtension
	{
		public static IEnumerable<T> ForEach<T>(this IEnumerable<T> source, Action<T> action) where T : class, new()
		{
			foreach (T item in source)
			{
				action(item);
				yield return item;
			}
		}
	}
}
