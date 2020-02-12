using FastDev.Common;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Configuration;
using System.IO;

namespace FastDev.DevDB
{
	public class UnicodeFontFactory
	{
		private static readonly string str_arialuni;

		private static readonly string str_simkai;

		private static readonly string str_st;

		public Font GetFont(string fontname, string encoding, bool embedded, float size, int style, BaseColor color, bool cached)
		{
            FontFactoryImp fontFactoryImp = FontFactoryImp.Instance;
            BaseFont bf = BaseFont.CreateFont(str_st, "Identity-H", true);
			return fontFactoryImp.GetFont(fontname, encoding, embedded, size, style, color, cached);
		}

		public UnicodeFontFactory()
		{
		}

		static UnicodeFontFactory()
		{
			str_arialuni = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "arialuni.ttf");
			str_simkai = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "simkai.ttf");
			str_st = Path.Combine(ConfigurationManager.AppSettings["FontPath"], "ST.ttf");
		}
	}
}
