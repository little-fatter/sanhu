using ICSharpCode.SharpZipLib.Checksum;
using ICSharpCode.SharpZipLib.Zip;
using System;
using System.Collections.Generic;
using System.IO;

namespace FastDev.Common
{
	public class ZipHelper
	{
		public static void Zip(IList<ZipFileInfo> fileNames, string zipFileName)
		{
			RunZip(fileNames, zipFileName);
		}

		private static void RunZip(IList<ZipFileInfo> fileNames, string zipFileName)
		{
			Crc32 crc = new Crc32();
			ZipOutputStream zipOutputStream = new ZipOutputStream(File.Create(zipFileName));
			zipOutputStream.SetLevel(9);
			foreach (ZipFileInfo fileName in fileNames)
			{
				byte[] array = null;
				if (fileName.FileName != null)
				{
					if (!File.Exists(fileName.FileName))
					{
						continue;
					}
					FileStream fileStream = File.OpenRead(fileName.FileName);
					array = new byte[fileStream.Length];
					fileStream.Read(array, 0, array.Length);
					fileStream.Close();
				}
				else
				{
					array = fileName.FileContent;
				}
				ZipEntry zipEntry = new ZipEntry(fileName.Name);
				zipEntry.DateTime = DateTime.Now;
				zipEntry.Size = array.Length;
				crc.Reset();
				crc.Update(array);
				zipEntry.Crc = crc.Value;
				zipOutputStream.PutNextEntry(zipEntry);
				zipOutputStream.Write(array, 0, array.Length);
			}
			zipOutputStream.Finish();
			zipOutputStream.Close();
		}

		public static void UnZip(string zipFilePath)
		{
			string directoryName = Path.GetDirectoryName(zipFilePath);
			UnZip(zipFilePath, directoryName);
		}

		public static void UnZip(string zipFilePath, string unZipDir)
		{
			if (zipFilePath == string.Empty)
			{
				throw new Exception("压缩文件不能为空！");
			}
			if (!File.Exists(zipFilePath))
			{
				throw new FileNotFoundException("压缩文件不存在！");
			}
			if (unZipDir == string.Empty)
			{
				unZipDir = zipFilePath.Replace(Path.GetFileName(zipFilePath), Path.GetFileNameWithoutExtension(zipFilePath));
			}
			if (!unZipDir.EndsWith("//"))
			{
				unZipDir += "//";
			}
			if (!Directory.Exists(unZipDir))
			{
				Directory.CreateDirectory(unZipDir);
			}
			using (ZipInputStream zipInputStream = new ZipInputStream(File.OpenRead(zipFilePath)))
			{
				ZipEntry nextEntry;
				while ((nextEntry = zipInputStream.GetNextEntry()) != null)
				{
					string directoryName = Path.GetDirectoryName(nextEntry.Name);
					string fileName = Path.GetFileName(nextEntry.Name);
					if (directoryName.Length > 0)
					{
						Directory.CreateDirectory(unZipDir + directoryName);
					}
					if (!directoryName.EndsWith("//"))
					{
						directoryName += "//";
					}
					if (fileName != string.Empty)
					{
						using (FileStream fileStream = File.Create(unZipDir + nextEntry.Name))
						{
							int num = 2048;
							byte[] array = new byte[num];
							while (true)
							{
								int redCount = zipInputStream.Read(array, 0, array.Length);
								if (redCount <= 0)
								{
									break;
								}
								fileStream.Write(array, 0, redCount);
							}
						}
					}
				}
			}
		}
	}
}
