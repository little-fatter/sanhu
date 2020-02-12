using FastDev.Common.JSON;
using System;

namespace FastDev.Common.Extensions
{
	public static class ObjectExtensions
	{
		public static string ToJSON(this object obj)
		{
			return JsonMsHelper.ToJson(obj);
		}

		public static int ToInt(this object obj)
		{
			return ConvertHelper.ObjToInt(obj);
		}

		public static string ToStr(this object obj)
		{
			return ConvertHelper.ObjToStr(obj);
		}

		public static decimal ToDecimal(this object obj)
		{
			return ConvertHelper.ObjToDecimal(obj);
		}

		public static int? ToIntNull(this object obj)
		{
			return ConvertHelper.ObjToIntNull(obj);
		}

		public static decimal? ToDecimalNull(this object obj)
		{
			return ConvertHelper.ObjToDecimalNull(obj);
		}

		public static bool ToBool(this object obj)
		{
			return ConvertHelper.ObjToBool(obj);
		}

		public static DateTime? ToDateNull(this object obj)
		{
			return ConvertHelper.ObjToDateNull(obj);
		}
	}
}
