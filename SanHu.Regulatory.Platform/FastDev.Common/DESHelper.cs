using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace FastDev.Common
{
	public class DESHelper
	{
		public static string Encode(string _KEY, string _IV, string data)
		{
			byte[] array = new byte[8];
			byte[] array2 = new byte[8];
			byte[] bytes = Encoding.ASCII.GetBytes(_KEY);
			byte[] bytes2 = Encoding.ASCII.GetBytes(_IV);
			for (int i = 0; i < array.Length; i++)
			{
				if (bytes.Length > i)
				{
					array[i] = bytes[i];
				}
			}
			for (int i = 0; i < array2.Length; i++)
			{
				if (bytes2.Length > i)
				{
					array2[i] = bytes2[i];
				}
			}
			DESCryptoServiceProvider dESCryptoServiceProvider = new DESCryptoServiceProvider();
			int keySize = dESCryptoServiceProvider.KeySize;
			MemoryStream memoryStream = new MemoryStream();
			CryptoStream cryptoStream = new CryptoStream(memoryStream, dESCryptoServiceProvider.CreateEncryptor(array, array2), CryptoStreamMode.Write);
			StreamWriter streamWriter = new StreamWriter(cryptoStream);
			streamWriter.Write(data);
			streamWriter.Flush();
			cryptoStream.FlushFinalBlock();
			streamWriter.Flush();
			return Convert.ToBase64String(memoryStream.GetBuffer(), 0, (int)memoryStream.Length);
		}

		public static string Decode(string _KEY, string _IV, string data)
		{
			byte[] array = new byte[8];
			byte[] array2 = new byte[8];
			byte[] bytes = Encoding.ASCII.GetBytes(_KEY);
			byte[] bytes2 = Encoding.ASCII.GetBytes(_IV);
			for (int i = 0; i < array.Length; i++)
			{
				if (bytes.Length > i)
				{
					array[i] = bytes[i];
				}
			}
			for (int i = 0; i < array2.Length; i++)
			{
				if (bytes2.Length > i)
				{
					array2[i] = bytes2[i];
				}
			}
			byte[] buffer;
			try
			{
				data.Replace("_%_", "/");
				data.Replace("-%-", "#");
				buffer = Convert.FromBase64String(data);
			}
			catch
			{
				return null;
			}
			DESCryptoServiceProvider dESCryptoServiceProvider = new DESCryptoServiceProvider();
			MemoryStream stream = new MemoryStream(buffer);
			CryptoStream stream2 = new CryptoStream(stream, dESCryptoServiceProvider.CreateDecryptor(array, array2), CryptoStreamMode.Read);
			StreamReader streamReader = new StreamReader(stream2);
			return streamReader.ReadToEnd();
		}
	}
}
