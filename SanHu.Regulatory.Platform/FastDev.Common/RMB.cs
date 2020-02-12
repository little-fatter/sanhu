using System;

namespace FastDev.Common
{
	public static class RMB
	{
		private const decimal MaxNumber = 9999999999999999999999999.99m;

		private const decimal MinNumber = -9999999999999999999999999.99m;

		private static string RMBUppercase = "零壹贰叁肆伍陆柒捌玖";

		private static string RMBUnitChar = "元拾佰仟万拾佰仟亿拾佰仟兆拾佰仟万拾佰仟亿拾佰仟兆";

		private static char[] cDelim = new char[1]
		{
			'.'
		};

		public static decimal MaxSupportNumber
		{
			get
			{
				return 9999999999999999999999999.99m;
			}
		}

		public static decimal MinSupportNumber
		{
			get
			{
				return -9999999999999999999999999.99m;
			}
		}

		public static string Convert(decimal number)
		{
			bool flag = false;
			CheckNumberLimit(number);
			decimal num = Math.Round(number, 2);
			if (num == 0m)
			{
				return "零元整";
			}
			if (num < 0m)
			{
				flag = true;
				num = Math.Abs(num);
			}
			else
			{
				flag = false;
			}
			string text = "";
			string text2 = "";
			string text3 = "";
			string[] array = null;
			string text4 = num.ToString();
			array = text4.Split(cDelim, 2);
			if (num >= 1m)
			{
				text3 = ConvertInt(array[0]);
			}
			text2 = ((array.Length <= 1) ? "整" : ConvertDecimal(array[1]));
			return flag ? ("负" + text3 + text2) : (text3 + text2);
		}

		public static string Convert(double number)
		{
			decimal number2;
			try
			{
				number2 = System.Convert.ToDecimal(number);
			}
			catch
			{
				throw new RMBException("不能转成标准的decimal类型:" + number.ToString());
			}
			return Convert(number2);
		}

		public static string Convert(float number)
		{
			decimal number2;
			try
			{
				number2 = System.Convert.ToDecimal(number);
			}
			catch
			{
				throw new RMBException("不能转成标准的decimal类型:" + number.ToString());
			}
			return Convert(number2);
		}

		public static string Convert(int number)
		{
			decimal number2 = System.Convert.ToDecimal(number);
			return Convert(number2);
		}

		public static string Convert(long number)
		{
			decimal number2 = System.Convert.ToDecimal(number);
			return Convert(number2);
		}

		public static string Convert(string number)
		{
			decimal number2;
			try
			{
				number2 = System.Convert.ToDecimal(number, null);
			}
			catch
			{
				throw new RMBException("不能转成标准的decimal类型:" + number);
			}
			return Convert(number2);
		}

		private static string ConvertInt(string intPart)
		{
			string str = "";
			int length = intPart.Length;
			int num = length;
			string text = "";
			string text2 = "";
			int num2 = 0;
			while (num2 < length - 1)
			{
				if (intPart[num2] != '0')
				{
					text = DigToCC(intPart[num2]);
					text2 = GetUnit(num - 1);
				}
				else if ((num - 1) % 4 == 0)
				{
					text = "";
					text2 = GetUnit(num - 1);
				}
				else
				{
					text2 = "";
					text = ((intPart[num2 + 1] == '0') ? "" : "零");
				}
				str = str + text + text2;
				num2++;
				num--;
			}
			if (intPart[num2] != '0')
			{
				str += DigToCC(intPart[num2]);
			}
			str += "元";
			return CombinUnit(str);
		}

		private static string ConvertDecimal(string decPart)
		{
			string str = "";
			int length = decPart.Length;
			if (decPart == "0" || decPart == "00")
			{
				return "整";
			}
			if (decPart.Length > 1)
			{
				if (decPart[0] == '0')
				{
					str = DigToCC(decPart[1]) + "分";
				}
				else if (decPart[1] == '0')
				{
					str = DigToCC(decPart[0]) + "角整";
				}
				else
				{
					str = DigToCC(decPart[0]) + "角";
					str = str + DigToCC(decPart[1]) + "分";
				}
			}
			else
			{
				str = str + DigToCC(decPart[0]) + "角整";
			}
			return str;
		}

		private static string GetUnit(int n)
		{
			return RMBUnitChar[n].ToString();
		}

		private static string DigToCC(char c)
		{
			return RMBUppercase[c - 48].ToString();
		}

		private static void CheckNumberLimit(decimal number)
		{
			if (number < -9999999999999999999999999.99m || number > 9999999999999999999999999.99m)
			{
				throw new RMBException("超出可转换的范围");
			}
		}

		private static string CombinUnit(string rmb)
		{
			if (rmb.Contains("兆亿万"))
			{
				return rmb.Replace("兆亿万", "兆");
			}
			if (rmb.Contains("亿万"))
			{
				return rmb.Replace("亿万", "亿");
			}
			if (rmb.Contains("兆亿"))
			{
				return rmb.Replace("兆亿", "兆");
			}
			return rmb;
		}
	}
}
