#define TRACE
using System;
using System.Diagnostics;

namespace FastDev.Common.Extensions
{
	public static class TryCatchExtensions
	{
		public static bool TryCatch<T>(this T source, Action<T> action, Action<Exception> failureAction, Action<T> successAction) where T : class
		{
			try
			{
				action(source);
				successAction(source);
				return true;
			}
			catch (Exception ex)
			{
				Trace.WriteLine(ex.Message);
				Trace.WriteLine(ex.StackTrace);
				failureAction(ex);
				return false;
			}
		}

		public static bool TryCatch<T>(this T source, Action<T> action, Action<Exception> failureAction) where T : class
		{
			return source.TryCatch(action, failureAction, delegate
			{
			});
		}

		public static U TryCatch<T, U>(this T source, Func<T, U> func, Action<Exception> failureAction, Action<T> successAction) where T : class
		{
			try
			{
				U result = func(source);
				successAction(source);
				return result;
			}
			catch (Exception ex)
			{
				Trace.WriteLine(ex.Message);
				Trace.WriteLine(ex.StackTrace);
				failureAction(ex);
				return default(U);
			}
		}

		public static U TryCatch<T, U>(this T source, Func<T, U> func, Action<Exception> failureAction) where T : class
		{
			return source.TryCatch(func, failureAction);
		}
	}
}
