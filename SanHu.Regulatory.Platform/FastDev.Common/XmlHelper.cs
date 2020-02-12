using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Serialization;

namespace FastDev.Common
{
	public static class XmlHelper
	{
		private static void XmlSerializeInternal(Stream stream, object o, Encoding encoding)
		{
			if (o == null)
			{
				throw new ArgumentNullException("o");
			}
			if (encoding == null)
			{
				throw new ArgumentNullException("encoding");
			}
			XmlSerializer xmlSerializer = new XmlSerializer(o.GetType());
			XmlWriterSettings xmlWriterSettings = new XmlWriterSettings();
			xmlWriterSettings.Indent = true;
			xmlWriterSettings.NewLineChars = "\r\n";
			xmlWriterSettings.Encoding = encoding;
			xmlWriterSettings.IndentChars = "    ";
			using (XmlWriter xmlWriter = XmlWriter.Create(stream, xmlWriterSettings))
			{
				xmlSerializer.Serialize(xmlWriter, o);
				xmlWriter.Close();
			}
		}

		public static string XmlSerialize(object o, Encoding encoding)
		{
			using (MemoryStream memoryStream = new MemoryStream())
			{
				XmlSerializeInternal(memoryStream, o, encoding);
				memoryStream.Position = 0L;
				using (StreamReader streamReader = new StreamReader(memoryStream, encoding))
				{
					return streamReader.ReadToEnd();
				}
			}
		}

		public static void XmlSerializeToFile(object o, string path, Encoding encoding)
		{
			if (string.IsNullOrEmpty(path))
			{
				throw new ArgumentNullException("path");
			}
			using (FileStream stream = new FileStream(path, FileMode.Create, FileAccess.Write))
			{
				XmlSerializeInternal(stream, o, encoding);
			}
		}

		public static T XmlDeserialize<T>(string s, Encoding encoding)
		{
			if (string.IsNullOrEmpty(s))
			{
				throw new ArgumentNullException("s");
			}
			if (encoding == null)
			{
				throw new ArgumentNullException("encoding");
			}
			XmlSerializer xmlSerializer = new XmlSerializer(typeof(T));
			using (MemoryStream stream = new MemoryStream(encoding.GetBytes(s)))
			{
				using (StreamReader textReader = new StreamReader(stream, encoding))
				{
					return (T)xmlSerializer.Deserialize(textReader);
				}
			}
		}

		public static T XmlDeserializeFromFile<T>(string path, Encoding encoding)
		{
			if (string.IsNullOrEmpty(path))
			{
				throw new ArgumentNullException("path");
			}
			if (encoding == null)
			{
				throw new ArgumentNullException("encoding");
			}
			string s = File.ReadAllText(path, encoding);
			return XmlDeserialize<T>(s, encoding);
		}
	}
}
