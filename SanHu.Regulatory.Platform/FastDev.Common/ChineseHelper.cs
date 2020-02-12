using System.Text;

namespace FastDev.Common
{
	public static class ChineseHelper
	{
		public static string GetSpellCode(string CnStr)
		{
			string text = "";
			int length = CnStr.Length;
			int num = 0;
			for (num = 0; num <= length - 1; num++)
			{
				text += GetCharSpellCode(CnStr.Substring(num, 1));
			}
			return text;
		}

		private static string GetCharSpellCode(string CnChar)
		{
			byte[] bytes = Encoding.Default.GetBytes(CnChar);
			if (bytes.Length == 1)
			{
				return CnChar.ToUpper();
			}
			int num = bytes[0];
			int num2 = bytes[1];
			long num3 = num * 256 + num2;
			if (num3 >= 45217 && num3 <= 45252)
			{
				return "A";
			}
			if (num3 >= 45253 && num3 <= 45760)
			{
				return "B";
			}
			if (num3 >= 45761 && num3 <= 46317)
			{
				return "C";
			}
			if (num3 >= 46318 && num3 <= 46825)
			{
				return "D";
			}
			if (num3 >= 46826 && num3 <= 47009)
			{
				return "E";
			}
			if (num3 >= 47010 && num3 <= 47296)
			{
				return "F";
			}
			if (num3 >= 47297 && num3 <= 47613)
			{
				return "G";
			}
			if (num3 >= 47614 && num3 <= 48118)
			{
				return "H";
			}
			if (num3 >= 48119 && num3 <= 49061)
			{
				return "J";
			}
			if (num3 >= 49062 && num3 <= 49323)
			{
				return "K";
			}
			if (num3 >= 49324 && num3 <= 49895)
			{
				return "L";
			}
			if (num3 >= 49896 && num3 <= 50370)
			{
				return "M";
			}
			if (num3 >= 50371 && num3 <= 50613)
			{
				return "N";
			}
			if (num3 >= 50614 && num3 <= 50621)
			{
				return "O";
			}
			if (num3 >= 50622 && num3 <= 50905)
			{
				return "P";
			}
			if (num3 >= 50906 && num3 <= 51386)
			{
				return "Q";
			}
			if (num3 >= 51387 && num3 <= 51445)
			{
				return "R";
			}
			if (num3 >= 51446 && num3 <= 52217)
			{
				return "S";
			}
			if (num3 >= 52218 && num3 <= 52697)
			{
				return "T";
			}
			if (num3 >= 52698 && num3 <= 52979)
			{
				return "W";
			}
			if (num3 >= 52980 && num3 <= 53640)
			{
				return "X";
			}
			if (num3 >= 53689 && num3 <= 54480)
			{
				return "Y";
			}
			if (num3 >= 54481 && num3 <= 55289)
			{
				return "Z";
			}
			return "?";
		}
	}
}
