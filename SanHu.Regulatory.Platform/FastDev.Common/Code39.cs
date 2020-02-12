
using System.Drawing;

namespace FastDev.Common
{
	public class Code39
	{
		public static Bitmap GetBitmap(string strSource)
		{
			int num = 5;
			int num2 = 0;
			int num3 = 2;
			int num4 = 1;
			int num5 = 24;
			int length = strSource.Length;
			string arg = "010010100";
			string text = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
			string[] array = new string[44]
			{
				"000110100",
				"100100001",
				"001100001",
				"101100000",
				"000110001",
				"100110000",
				"001110000",
				"000100101",
				"100100100",
				"001100100",
				"100001001",
				"001001001",
				"101001000",
				"000011001",
				"100011000",
				"001011000",
				"000001101",
				"100001100",
				"001001100",
				"000011100",
				"100000011",
				"001000011",
				"101000010",
				"000010011",
				"100010010",
				"001010010",
				"000000111",
				"100000110",
				"001000110",
				"000010110",
				"110000001",
				"011000001",
				"111000000",
				"010010001",
				"110010000",
				"011010000",
				"010000101",
				"110000100",
				"011000100",
				"010101000",
				"010100010",
				"010001010",
				"000101010",
				"010010100"
			};
			strSource = strSource.ToUpper();
			Bitmap bitmap = new Bitmap((num3 * 3 + num4 * 7) * (length + 2) + num * 2, num5 + num2 * 2);
			Graphics graphics = Graphics.FromImage(bitmap);
			graphics.FillRectangle(Brushes.White, 0, 0, bitmap.Width, bitmap.Height);
			for (int i = 0; i < length; i++)
			{
				if (text.IndexOf(strSource[i]) == -1 || strSource[i] == '*')
				{
					graphics.DrawString("含有非法字符", SystemFonts.DefaultFont, Brushes.Red, (float)num, (float)num2);
					return bitmap;
				}
				arg = string.Format("{0}0{1}", arg, array[text.IndexOf(strSource[i])]);
			}
			arg = string.Format("{0}0010010100", arg);
			int length2 = arg.Length;
			for (int i = 0; i < length2; i++)
			{
				int num6 = (arg[i] == '1') ? num3 : num4;
				graphics.FillRectangle((i % 2 == 0) ? Brushes.Black : Brushes.White, num, num2, num6, num5);
				num += num6;
			}
			return bitmap;
		}
	}
}
