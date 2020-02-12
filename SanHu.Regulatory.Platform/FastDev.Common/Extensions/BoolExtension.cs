namespace FastDev.Common.Extensions
{
	public static class BoolExtension
	{
		public static int ToInt32(this bool value)
		{
			return value ? 1 : 0;
		}

		public static short ToShort(this bool value)
		{
			return (short)(value ? 1 : 0);
		}

		public static int ToInt32(this bool? value)
		{
			if (!value.HasValue)
			{
				return 0;
			}
			return value.Value ? 1 : 0;
		}

		public static short ToShort(this bool? value)
		{
			if (!value.HasValue)
			{
				return 0;
			}
			return (short)(value.Value ? 1 : 0);
		}
	}
}
