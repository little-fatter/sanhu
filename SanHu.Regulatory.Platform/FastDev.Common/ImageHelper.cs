using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace FastDev.Common
{
	public static class ImageHelper
	{
		public static byte[] BitmapToBytes(Bitmap bitmap, ImageFormat imageFormat)
		{
			if (bitmap == null)
			{
				return null;
			}
			byte[] array = null;
			using (MemoryStream memoryStream = new MemoryStream())
			{
				bitmap.Save(memoryStream, imageFormat);
				memoryStream.Position = 0L;
				array = new byte[memoryStream.Length];
				memoryStream.Read(array, 0, Convert.ToInt32(memoryStream.Length));
				memoryStream.Flush();
			}
			return array;
		}

		public static void CreateImageOutput(int width, int height, string oPath, string tPath)
		{
			Image original = Image.FromFile(oPath);
			Bitmap bitmap = null;
			bitmap = new Bitmap(original);
			if (bitmap.Width <= width && bitmap.Height <= height)
			{
				int x = (int)Math.Round((decimal)(width - bitmap.Width) / 2m);
				int y = (int)Math.Round((decimal)(height - bitmap.Height) / 2m);
				Bitmap bitmap2 = new Bitmap(width, height);
				using (Graphics graphics = Graphics.FromImage(bitmap2))
				{
					graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
					graphics.Clear(Color.White);
					graphics.DrawImage(bitmap, x, y);
				}
				OutputImgTo(tPath, bitmap2);
				bitmap2.Dispose();
			}
			else
			{
				int num;
				int num2;
				int x;
				int y;
				if (width * bitmap.Height < height * bitmap.Width)
				{
					num = width;
					num2 = (int)Math.Round((decimal)bitmap.Height * (decimal)width / (decimal)bitmap.Width);
					x = 0;
					y = (int)Math.Round((decimal)(height - num2) / 2m);
				}
				else
				{
					num = (int)Math.Round((decimal)bitmap.Width * (decimal)height / (decimal)bitmap.Height);
					num2 = height;
					x = (int)Math.Round((decimal)(width - num) / 2m);
					y = 0;
				}
				Bitmap image = new Bitmap(num, num2);
				using (Graphics graphics = Graphics.FromImage(image))
				{
					graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
					graphics.FillRectangle(Brushes.White, 0, 0, num, num2);
					graphics.DrawImage(bitmap, 0, 0, num, num2);
				}
				Bitmap bitmap3 = new Bitmap(width, height);
				using (Graphics graphics = Graphics.FromImage(bitmap3))
				{
					graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
					graphics.Clear(Color.White);
					graphics.DrawImage(image, x, y);
				}
				OutputImgTo(tPath, bitmap3);
				bitmap3.Dispose();
			}
		}

		private static void OutputImgTo(string filename, Bitmap bmp)
		{
			bmp.Save(filename, ImageFormat.Jpeg);
			bmp.Dispose();
		}
	}
}
