using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace FastDev.Common
{
	public class FileHelper
	{
		public static void OutputFile(string filepath, string content, bool over = true)
		{
			if (!File.Exists(filepath) || over)
			{
				string directoryName = Path.GetDirectoryName(filepath);
				if (!Directory.Exists(directoryName))
				{
					Directory.CreateDirectory(directoryName);
				}
				StreamWriter streamWriter = new StreamWriter(filepath, false, Encoding.UTF8);
				streamWriter.Write(content);
				streamWriter.Flush();
				streamWriter.Close();
			}
		}

		public static void Copy(string filename, string newfilename)
		{
			if (File.Exists(filename))
			{
				string directoryName = Path.GetDirectoryName(newfilename);
				if (!Directory.Exists(directoryName))
				{
					Directory.CreateDirectory(directoryName);
				}
				File.Copy(filename, newfilename, true);
			}
		}

		public static void Delete(string filename)
		{
			try
			{
				File.Delete(filename);
			}
			catch (Exception)
			{
			}
		}

		public static string GetContentType(string ext)
		{
			Dictionary<string, string> dictionary = new Dictionary<string, string>();
			dictionary.Add("abs", "audio/x-mpeg");
			dictionary.Add("ai", "application/postscript");
			dictionary.Add("aif", "audio/x-aiff");
			dictionary.Add("aifc", "audio/x-aiff");
			dictionary.Add("aiff", "audio/x-aiff");
			dictionary.Add("aim", "application/x-aim");
			dictionary.Add("art", "image/x-jg");
			dictionary.Add("asf", "video/x-ms-asf");
			dictionary.Add("asx", "video/x-ms-asf");
			dictionary.Add("au", "audio/basic");
			dictionary.Add("avi", "video/x-msvideo");
			dictionary.Add("avx", "video/x-rad-screenplay");
			dictionary.Add("bcpio", "application/x-bcpio");
			dictionary.Add("bin", "application/octet-stream");
			dictionary.Add("bmp", "image/bmp");
			dictionary.Add("body", "text/html");
			dictionary.Add("cdf", "application/x-cdf");
			dictionary.Add("cer", "application/x-x509-ca-cert");
			dictionary.Add("class", "application/java");
			dictionary.Add("cpio", "application/x-cpio");
			dictionary.Add("csh", "application/x-csh");
			dictionary.Add("css", "text/css");
			dictionary.Add("dib", "image/bmp");
			dictionary.Add("doc", "application/msword");
			dictionary.Add("dtd", "application/xml-dtd");
			dictionary.Add("dv", "video/x-dv");
			dictionary.Add("dvi", "application/x-dvi");
			dictionary.Add("eps", "application/postscript");
			dictionary.Add("etx", "text/x-setext");
			dictionary.Add("exe", "application/octet-stream");
			dictionary.Add("gif", "image/gif");
			dictionary.Add("gtar", "application/x-gtar");
			dictionary.Add("gz", "application/x-gzip");
			dictionary.Add("hdf", "application/x-hdf");
			dictionary.Add("hqx", "application/mac-binhex40");
			dictionary.Add("htc", "text/x-component");
			dictionary.Add("htm", "text/html");
			dictionary.Add("html", "text/html");
			dictionary.Add("ief", "image/ief");
			dictionary.Add("jad", "text/vnd.sun.j2me.app-descriptor");
			dictionary.Add("jar", "application/java-archive");
			dictionary.Add("java", "text/plain");
			dictionary.Add("jnlp", "application/x-java-jnlp-file");
			dictionary.Add("jpe", "image/jpeg");
			dictionary.Add("jpeg", "image/jpeg");
			dictionary.Add("jpg", "image/jpeg");
			dictionary.Add("js", "text/javascript");
			dictionary.Add("jsf", "text/plain");
			dictionary.Add("jspf", "text/plain");
			dictionary.Add("kar", "audio/x-midi");
			dictionary.Add("latex", "application/x-latex");
			dictionary.Add("m3u", "audio/x-mpegurl");
			dictionary.Add("mac", "image/x-macpaint");
			dictionary.Add("man", "application/x-troff-man");
			dictionary.Add("mathml", "application/mathml+xml");
			dictionary.Add("me", "application/x-troff-me");
			dictionary.Add("mid", "audio/x-midi");
			dictionary.Add("midi", "audio/x-midi");
			dictionary.Add("mif", "application/x-mif");
			dictionary.Add("mov", "video/quicktime");
			dictionary.Add("movie", "video/x-sgi-movie");
			dictionary.Add("mp1", "audio/x-mpeg");
			dictionary.Add("mp2", "audio/x-mpeg");
			dictionary.Add("mp3", "audio/x-mpeg");
			dictionary.Add("mp4", "video/mp4");
			dictionary.Add("mpa", "audio/x-mpeg");
			dictionary.Add("mpe", "video/mpeg");
			dictionary.Add("mpeg", "video/mpeg");
			dictionary.Add("mpega", "audio/x-mpeg");
			dictionary.Add("mpg", "video/mpeg");
			dictionary.Add("mpv2", "video/mpeg2");
			dictionary.Add("ms", "application/x-wais-source");
			dictionary.Add("nc", "application/x-netcdf");
			dictionary.Add("oda", "application/oda");
			dictionary.Add("odb", "application/vnd.oasis.opendocument.database");
			dictionary.Add("odc", "application/vnd.oasis.opendocument.chart");
			dictionary.Add("odf", "application/vnd.oasis.opendocument.formula");
			dictionary.Add("odg", "application/vnd.oasis.opendocument.graphics");
			dictionary.Add("odi", "application/vnd.oasis.opendocument.image");
			dictionary.Add("odm", "application/vnd.oasis.opendocument.text-master");
			dictionary.Add("odp", "application/vnd.oasis.opendocument.presentation");
			dictionary.Add("ods", "application/vnd.oasis.opendocument.spreadsheet");
			dictionary.Add("odt", "application/vnd.oasis.opendocument.text");
			dictionary.Add("ogg", "application/ogg");
			dictionary.Add("otg", "application/vnd.oasis.opendocument.graphics-template");
			dictionary.Add("oth", "application/vnd.oasis.opendocument.text-web");
			dictionary.Add("otp", "application/vnd.oasis.opendocument.presentation-template");
			dictionary.Add("ots", "application/vnd.oasis.opendocument.spreadsheet-template ");
			dictionary.Add("ott", "application/vnd.oasis.opendocument.text-template");
			dictionary.Add("pbm", "image/x-portable-bitmap");
			dictionary.Add("pct", "image/pict");
			dictionary.Add("pdf", "application/pdf");
			dictionary.Add("pgm", "image/x-portable-graymap");
			dictionary.Add("pic", "image/pict");
			dictionary.Add("pict", "image/pict");
			dictionary.Add("pls", "audio/x-scpls");
			dictionary.Add("png", "image/png");
			dictionary.Add("pnm", "image/x-portable-anymap");
			dictionary.Add("pnt", "image/x-macpaint");
			dictionary.Add("ppm", "image/x-portable-pixmap");
			dictionary.Add("ppt", "application/powerpoint");
			dictionary.Add("ps", "application/postscript");
			dictionary.Add("psd", "image/x-photoshop");
			dictionary.Add("qt", "video/quicktime");
			dictionary.Add("qti", "image/x-quicktime");
			dictionary.Add("qtif", "image/x-quicktime");
			dictionary.Add("ras", "image/x-cmu-raster");
			dictionary.Add("rdf", "application/rdf+xml");
			dictionary.Add("rgb", "image/x-rgb");
			dictionary.Add("rm", "application/vnd.rn-realmedia");
			dictionary.Add("roff", "application/x-troff");
			dictionary.Add("rtf", "application/rtf");
			dictionary.Add("rtx", "text/richtext");
			dictionary.Add("sh", "application/x-sh");
			dictionary.Add("shar", "application/x-shar");
			dictionary.Add("shtml", "text/x-server-parsed-html");
			dictionary.Add("smf", "audio/x-midi");
			dictionary.Add("sit", "application/x-stuffit");
			dictionary.Add("snd", "audio/basic");
			dictionary.Add("src", "application/x-wais-source");
			dictionary.Add("sv4cpio", "application/x-sv4cpio");
			dictionary.Add("sv4crc", "application/x-sv4crc");
			dictionary.Add("swf", "application/x-shockwave-flash");
			dictionary.Add("t", "application/x-troff");
			dictionary.Add("tar", "application/x-tar");
			dictionary.Add("tcl", "application/x-tcl");
			dictionary.Add("tex", "application/x-tex");
			dictionary.Add("texi", "application/x-texinfo");
			dictionary.Add("texinfo", "application/x-texinfo");
			dictionary.Add("tif", "image/tiff");
			dictionary.Add("tiff", "image/tiff");
			dictionary.Add("tr", "application/x-troff");
			dictionary.Add("tsv", "text/tab-separated-values");
			dictionary.Add("txt", "text/plain");
			dictionary.Add("ulw", "audio/basic");
			dictionary.Add("ustar", "application/x-ustar");
			dictionary.Add("vxml", "application/voicexml+xml");
			dictionary.Add("xbm", "image/x-xbitmap");
			dictionary.Add("xht", "application/xhtml+xml");
			dictionary.Add("xhtml", "application/xhtml+xml");
			dictionary.Add("xml", "application/xml");
			dictionary.Add("xpm", "image/x-xpixmap");
			dictionary.Add("xsl", "application/xml");
			dictionary.Add("xslt", "application/xslt+xml");
			dictionary.Add("xul", "application/vnd.mozilla.xul+xml");
			dictionary.Add("xwd", "image/x-xwindowdump");
			dictionary.Add("wav", "audio/x-wav");
			dictionary.Add("svg", "image/svg+xml");
			dictionary.Add("svgz", "image/svg+xml");
			dictionary.Add("vsd", "application/x-visio");
			dictionary.Add("wbmp", "image/vnd.wap.wbmp");
			dictionary.Add("wml", "text/vnd.wap.wml");
			dictionary.Add("wmlc", "application/vnd.wap.wmlc");
			dictionary.Add("wmls", "text/vnd.wap.wmlscript");
			dictionary.Add("wmlscriptc", "application/vnd.wap.wmlscriptc");
			dictionary.Add("wmv", "video/x-ms-wmv");
			dictionary.Add("wrl", "x-world/x-vrml");
			dictionary.Add("wspolicy", "application/wspolicy+xml");
			dictionary.Add("Z", "application/x-compress");
			dictionary.Add("z", "application/x-compress");
			dictionary.Add("zip", "application/zip");
			dictionary.Add("xls", "application/vnd.ms-excel");
			ext = ext.ToLower();
			if (dictionary.ContainsKey(ext))
			{
				return dictionary[ext];
			}
			return dictionary["txt"];
		}
	}
}
