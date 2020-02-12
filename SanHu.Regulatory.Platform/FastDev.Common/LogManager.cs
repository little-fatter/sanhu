using System;
using System.IO;
using System.Web;

namespace FastDev.Common
{
	public class LogManager
	{
		private string logPath;

		public string LogPath
		{
			get
			{
				if (string.IsNullOrEmpty(logPath) && HttpContext.Current != null)
				{
					logPath = AppContext.BaseDirectory;
				}
				return logPath;
			}
			set
			{
				logPath = value;
			}
		}

		public string Prev
		{
			get;
			set;
		}

		public void WriteLog(string prev, string msg)
		{
			try
			{
				string text = (LogPath + "/logs/" + DateTime.Now.ToString("yyyyMM") + "/" + Prev) ?? ("/" + prev) ?? "/";
				if (!Directory.Exists(text))
				{
					Directory.CreateDirectory(text);
				}
				text = text + "/" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
				StreamWriter streamWriter = File.AppendText(text);
				streamWriter.WriteLine(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"));
				streamWriter.WriteLine(msg);
				streamWriter.Close();
			}
			catch (Exception)
			{
			}
		}
	}
}
