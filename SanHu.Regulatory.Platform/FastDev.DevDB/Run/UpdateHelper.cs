using FastDev.Common;
using FastDev.DevDB.Auth;
using PetaPoco;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using FastDev.DevDB;
namespace FastDev.RunWeb.Core
{
	public class UpdateHelper
	{
		
		public static string type
		{
			get
			{
				try
				{
					return ConfigurationManager.AppSettings["SysName"];
				}
				catch
				{
					return "dev";
				}
			}
		}

		public static int GetVersionSort(string version)
		{
			try
			{
				version = version.Replace("V", "").Replace("v", "");
				string[] array = version.Split('.');
				return Convert.ToInt32(array[0]) * 10000 + Convert.ToInt32(array[1]) * 1000 + Convert.ToInt32(array[2]);
			}
			catch
			{
				return 0;
			}
		}

		private static string GetServerIp()
		{
			try
			{
				using (WebClient webClient = new WebClient())
				{
					string input = webClient.DownloadString("http://www.ip138.com/ips1388.asp");
					return new Regex("\\[((\\d{1,3}\\.){3}\\d{1,3})\\]").Match(input).Groups[1].Value;
				}
			}
			catch
			{
				return "";
			}
		}

		public static List<UpdateInfo> GetUpdateInfos(string version, bool includeData = false)
		{
			try
			{
				if (version == null)
				{
					version = GetVersion();
				}
				UpdateUpInfo updateUpInfo = new UpdateUpInfo();
				updateUpInfo.type = type;
				updateUpInfo.version = version;
				updateUpInfo.includedata = (includeData ? "Y" : "N");
				updateUpInfo.ip = GetServerIp();
				updateUpInfo.softCode = new SoftReg().getRNum();
				string url = "http://auth.cht.com/web/getupdate/";
				string postStr = "data=" + GetUpdateUpData(updateUpInfo);
				return JsonHelper.DeserializeJsonToList<UpdateInfo>(WebPost(url, postStr));
			}
			catch (Exception)
			{
				return new List<UpdateInfo>();
			}
		}

		public static string GetUpdateUpData(UpdateUpInfo info)
		{
			try
			{
				string key = "AwEAAdidHa6npFP1kbXvgITJ+mXzUHTkQVABzOyfpmesYhefJG8vkFm9LlrAX7J4n/X6eLuTEvO41kQ0XKkdOKPT+YMddx4GK2R5CYs41l4DdWarp4AFyUY5XqFyVnpT3Db6uzzvI+Haw0jaeUynaPykNOIcmaDDHP84ZLGNoIOUG5Pj";
				string source = JsonHelper.SerializeObject(info);
				return AESHelper.EncryptString(source, key);
			}
			catch
			{
				return "";
			}
		}

		private static string WebPost(string url, string postData)
		{
			try
			{
				HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
				httpWebRequest.Method = "POST";
				byte[] bytes = Encoding.UTF8.GetBytes(postData);
				httpWebRequest.ContentType = "application/x-www-form-urlencoded";
				httpWebRequest.ContentLength = bytes.Length;
				Stream requestStream = httpWebRequest.GetRequestStream();
				requestStream.Write(bytes, 0, bytes.Length);
				requestStream.Close();
				HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
				using (StreamReader streamReader = new StreamReader(httpWebResponse.GetResponseStream()))
				{
					return streamReader.ReadToEnd();
				}
			}
			catch (Exception ex)
			{
				return ex.Message;
			}
		}

		public static string GetVersion()
		{
			try
			{
				return File.ReadAllText(new HttpServerUtility(HttpContext.Current).MapPath("~/version"));
			}
			catch
			{
				return "2.5.3";
			}
		}

		public static void Update()
		{
			//IL_0027: Unknown result type (might be due to invalid IL or missing references)
			//IL_005e: Unknown result type (might be due to invalid IL or missing references)
			string version = GetVersion();
			List<UpdateInfo> updateInfos = GetUpdateInfos(version, true);
			if (updateInfos == null || !updateInfos.Any())
			{
				throw new UserException("已经是最新版本,无需更新");
			}
			int myIndex = GetVersionSort(version);
			updateInfos = (from a in updateInfos
			where GetVersionSort(a.version) > myIndex
			select a).ToList();
			if (!updateInfos.Any())
			{
				throw new UserException("已经是最新版本,无需更新");
			}
			updateInfos = updateInfos.OrderBy(o => GetVersionSort(o.version)).ToList();
			DbContext currentDb = SysContext.GetCurrentDb();
			foreach (UpdateInfo item in updateInfos)
			{
				if (!string.IsNullOrEmpty(item.data))
				{
					bool flag = item == updateInfos[0];
					string oPath = GetOneItemPath(item);
					File.WriteAllBytes(oPath, Convert.FromBase64String(item.data));
					File.WriteAllText(oPath.Replace(".zip", ".txt"), item.content);
					if (File.Exists(oPath))
					{
						string unZipDir = oPath.Substring(0, oPath.Length - ".zip".Length) + "\\";
						string newValue = oPath.Substring(0, oPath.Length - ".zip".Length) + "_bak\\";
						ZipHelper.UnZip(oPath, unZipDir);
						File.Delete(oPath);
						string str = "db";
						if (CheckIsSQLite())
						{
							str = "db_sqlite";
						}
						string zipFilesPath = unZipDir + "files\\";
						if (Directory.Exists(zipFilesPath))
						{
							string[] files = Directory.GetFiles(zipFilesPath, "*", SearchOption.AllDirectories);
							string[] array = files;
							foreach (string text4 in array)
							{
								DirectoryInfo directoryInfo = new DirectoryInfo(new HttpServerUtility(HttpContext.Current).MapPath("~/"));
								string newValue2 = directoryInfo.Parent.FullName + "\\";
								string text5 = text4.Replace(zipFilesPath, newValue2);
								if (File.Exists(text5))
								{
									string text6 = text4.Replace(zipFilesPath, newValue);
									FileHelper.Copy(text5, text6);
								}
								FileHelper.Copy(text4, text5);
							}
						}
						if (Directory.Exists(unZipDir + str + "\\"))
						{
							string[] files2 = Directory.GetFiles(unZipDir + str + "\\", "*", SearchOption.AllDirectories);
							string[] array = files2;
							foreach (string path in array)
							{
								string text7 = File.ReadAllText(path);
								try
								{
									if (!string.IsNullOrEmpty(text7))
									{
										currentDb.Execute(text7, new object[0]);
									}
								}
								catch (Exception ex)
								{
									WriteLog("执行SQL(" + text7 + ")出错:" + ex.Message);
								}
							}
						}
						WriteLog(string.Format("更新:{0}\r\n更新内容:\r\n{1}", item.version, item.content));
						UpdatetVersion(item.version);
					}
				}
			}
		}
        /// <summary>
        /// 获取该项的路径
        /// </summary>
        /// <param name="uInfo"></param>
        /// <returns></returns>
		private static string GetOneItemPath(UpdateInfo uInfo)
		{
			string upPath = new HttpServerUtility(HttpContext.Current).MapPath("../update") + "\\";
			if (!Directory.Exists(upPath))
			{
				Directory.CreateDirectory(upPath);
			}
			int num = 1;
			string rev = upPath + uInfo.version;
			while (Directory.Exists(rev))
			{
				rev = upPath + uInfo.version + "_" + num++;
			}
			return rev + ".zip";
		}

		public static void WriteLog(string content)
		{
			//IL_0001: Unknown result type (might be due to invalid IL or missing references)
			try
			{
				new LogManager().WriteLog("update", content);
			}
			catch
			{
			}
		}

		public static void UpdatetVersion(string version)
		{
			try
			{
				string path = new HttpServerUtility(HttpContext.Current).MapPath("~/version");
				File.WriteAllText(path, version);
			}
			catch
			{
			}
		}

		private static bool CheckIsSQLite()
		{
			string text = ConfigurationManager.AppSettings["ProviderName"];
			if (text.Contains("sqlite"))
			{
				return true;
			}
			return false;
		}

		public UpdateHelper()
		{
			
			
		}

		
	}
}
