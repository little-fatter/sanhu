using System;

namespace FastDev.Common
{
	public class ConvertHelper
	{
		public static int ObjToInt(object obj)
		{
			if (obj == null)
			{
				return 0;
			}
			if (obj.Equals(DBNull.Value))
			{
				return 0;
			}
			int result;
			if (int.TryParse(obj.ToString(), out result))
			{
				return result;
			}
			return 0;
		}

		public static bool ObjToBool(object obj)
		{
			if (obj == null)
			{
				return false;
			}
			if (obj.Equals(DBNull.Value))
			{
				return false;
			}
			bool result;
			if (bool.TryParse(obj.ToString(), out result))
			{
				return result;
			}
			return false;
		}

		public static int? ObjToIntNull(object obj)
		{
			if (obj == null)
			{
				return null;
			}
			if (obj.Equals(DBNull.Value))
			{
				return null;
			}
			return ObjToInt(obj);
		}

		public static int? ObjToByteNull(object obj)
		{
			if (obj == null)
			{
				return null;
			}
			if (obj.Equals(DBNull.Value))
			{
				return null;
			}
			return ObjToByte(obj);
		}

		public static int ObjToByte(object obj)
		{
			if (obj == null)
			{
				return 0;
			}
			if (obj.Equals(DBNull.Value))
			{
				return 0;
			}
			byte result;
			if (byte.TryParse(obj.ToString(), out result))
			{
				return result;
			}
			return 0;
		}

		public static string ObjToStr(object obj)
		{
			if (obj == null)
			{
				return "";
			}
			if (obj.Equals(DBNull.Value))
			{
				return "";
			}
			return Convert.ToString(obj);
		}

		public static float ObjToSingle(object obj)
		{
			if (obj == null)
			{
				return 0f;
			}
			if (!obj.Equals(DBNull.Value))
			{
				try
				{
					return Convert.ToSingle(obj);
				}
				catch
				{
					return 0f;
				}
			}
			return 0f;
		}

		public static float? ObjToSingleNull(object obj)
		{
			if (obj == null)
			{
				return null;
			}
			if (obj.Equals(DBNull.Value))
			{
				return null;
			}
			return ObjToSingle(obj);
		}

		public static decimal ObjToDecimal(object obj)
		{
			if (obj != null)
			{
				if (!obj.Equals(DBNull.Value))
				{
					try
					{
						return Convert.ToDecimal(obj);
					}
					catch
					{
						return 0m;
					}
				}
				return 0m;
			}
			return 0m;
		}

		public static decimal? ObjToDecimalNull(object obj)
		{
			if (obj == null)
			{
				return null;
			}
			if (obj.Equals(DBNull.Value))
			{
				return null;
			}
			return ObjToDecimal(obj);
		}

		public static DateTime ObjToDate(object obj)
		{
			return Convert.ToDateTime(obj);
		}

		public static DateTime? ObjToDateNull(object obj)
		{
			if (obj != null)
			{
				try
				{
					return Convert.ToDateTime(obj);
				}
				catch
				{
					return null;
				}
			}
			return null;
		}
	}
}
