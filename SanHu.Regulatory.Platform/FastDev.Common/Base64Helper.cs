using System;
using System.IO;
using System.Net;
using System.Text;

namespace FastDev.Common
{
	public class Base64Helper
	{
		public static string EncodingString(string SourceString, Encoding Ens)
		{
			return Convert.ToBase64String(Ens.GetBytes(SourceString));
		}

		public static string EncodingString(string SourceString)
		{
			return EncodingString(SourceString, Encoding.Default);
		}

		public static string DecodingString(string Base64String, Encoding Ens)
		{
			return Ens.GetString(Convert.FromBase64String(Base64String));
		}

		public static string DecodingString(string Base64String)
		{
			return DecodingString(Base64String, Encoding.UTF8);
		}

		public static string EncodingFileToString(string strFileName)
		{
			FileStream fileStream = File.OpenRead(strFileName);
			BinaryReader binaryReader = new BinaryReader(fileStream);
			string result = Convert.ToBase64String(binaryReader.ReadBytes((int)fileStream.Length));
			binaryReader.Close();
			fileStream.Close();
			return result;
		}

		public static bool EncodingFileToFile(string strSourceFileName, string strSaveFileName)
		{
			string value = EncodingFileToString(strSourceFileName);
			StreamWriter streamWriter = new StreamWriter(strSaveFileName);
			streamWriter.Write(value);
			streamWriter.Close();
			return true;
		}

		public static bool DecodingFileFromString(string Base64String, string strSaveFileName)
		{
			FileStream fileStream = new FileStream(strSaveFileName, FileMode.Create);
			BinaryWriter binaryWriter = new BinaryWriter(fileStream);
			binaryWriter.Write(Convert.FromBase64String(Base64String));
			binaryWriter.Close();
			fileStream.Close();
			return true;
		}

		public static bool DecodingFileFromFile(string strBase64FileName, string strSaveFileName)
		{
			StreamReader streamReader = new StreamReader(strBase64FileName, Encoding.ASCII);
			char[] array = new char[streamReader.BaseStream.Length];
			streamReader.Read(array, 0, (int)streamReader.BaseStream.Length);
			string base64String = new string(array);
			streamReader.Close();
			return DecodingFileFromString(base64String, strSaveFileName);
		}

		public static string EncodingWebFile(string strURL, WebClient objWebClient)
		{
			return Convert.ToBase64String(objWebClient.DownloadData(strURL));
		}

		public static string EncodingWebFile(string strURL)
		{
			return EncodingWebFile(strURL, new WebClient());
		}
	}
}
