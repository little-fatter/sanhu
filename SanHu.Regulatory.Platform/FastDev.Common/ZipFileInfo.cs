namespace FastDev.Common
{
	public class ZipFileInfo
	{
		public string Name
		{
			get;
			set;
		}

		public string FileName
		{
			get;
			set;
		}

		public byte[] FileContent
		{
			get;
			set;
		}

		public ZipFileInfo()
		{
		}

		public ZipFileInfo(byte[] fileContent, string name)
		{
			Name = name;
			FileContent = fileContent;
		}

		public ZipFileInfo(string fileName, string name)
		{
			Name = name;
			FileName = fileName;
		}
	}
}
