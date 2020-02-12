using FastDev.Common;
using FastDev.DevDB.Auth;
using FastDev.DevDB.Model.Config;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using FastDev.Common.Helpers;
using FastDev.DevDB;

namespace FD.Web.Extend
{
	public class EController : Controller
	{
		public HttpServerUtility Server
		{
			get
			{
				return new HttpServerUtility();
			}
		}
		public ActionResult GetCode()
		{
			string rNum = new SoftReg().getRNum();
			return Content(rNum);
		}

		private string GetRootPath()
		{
			DirectoryInfo directoryInfo = new DirectoryInfo(Server.MapPath("~/"));
			return directoryInfo.Parent.FullName + "\\";
		}

		public ActionResult Test(string id)
		{
			string str = "<div style='font-size:12px;'>";
			string text = System.IO.File.ReadAllText(Server.MapPath("~/validate.code" + id));
			if (string.IsNullOrEmpty(text))
			{
				throw new UserException("验证授权失败，请检查根目录validate.code文件");
			}
			string key = "AwEAAbfyNG2IR7IHAJ2v54mCM3QFnOy+NbQ+qg8g3HE8T6RceBoQS65twfI+y7D4B1Bzf58UCsDJe4UgJU4UvNFtSgXy+9OrqBNSkiasCO2gBgAKWRnYXG6DxEerPhJYOQvY1NmRltqAVrYCEwko7bKacUOXmi5XLlDAdtDrXVGfx4dh";
			string rNum = new SoftReg().getRNum();
			text = AESHelper.DecryptString(text, key);
			if (string.IsNullOrEmpty(text))
			{
				throw new UserException("验证授权失败");
			}
			Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(text);
			if (dictionary == null)
			{
				throw new UserException("验证授权失败");
			}
			string str2 = dictionary["code"] as string;
			long num = Convert.ToInt64(dictionary["time"]);
			DateTime dateTime = new DateTime(2000, 1, 1, 0, 0, 0).AddSeconds((double)num);
			str = str + "result_code:" + str2;
			str = str + "<br >time:" + dateTime.ToString();
			str += "</div>";
			return Content(str);
		}

		public ActionResult ResetMd5Password()
		{
			DbContext currentDb = SysContext.GetCurrentDb();
			int num = currentDb.Execute("update core_user set LoginPassword = @0", new object[1]
			{
				HashHelper.GetMd5("1")
			});
			return Content("操作成功");
		}

		public ActionResult Index()
		{
			string text = "<div style='font-size:12px;'>";
			DbContext currentDb = SysContext.GetCurrentDb();
			bool flag = false;
			try
			{
				currentDb.ExecuteScalar<string>("select id from core_user", new object[0]);
				text += "数据库测试成功<br />";
			}
			catch (Exception ex)
			{
				flag = true;
				text = text + "数据库测试不成功，错误信息：" + ex.Message + "<br />";
			}
			try
			{
				FileInfo fileInfo = new FileInfo(Server.MapPath("~/bin/ne.model.dll"));
				if (fileInfo != null)
				{
					text = text + "FastDev.Model.dll更新时间：" + fileInfo.LastWriteTime.ToString() + "<br>";
				}
			}
			catch
			{
			}
			try
			{
				string text2 = ConfigurationManager.AppSettings["ProjectPath"];
				string text3 = ConfigurationManager.AppSettings["MSBuildPath"];
				if (!text2.EndsWith("\\"))
				{
					text2 += "\\";
				}
				text2 = text2.Replace("#ROOT#", GetRootPath());
				text3 = text3.Replace("#ROOT#", GetRootPath());
				text = text + "ProjectPath:" + text2 + "<br />";
				if (!Directory.Exists(text2))
				{
					text += "ProjectPath配置路径不存在，请检查<br />";
				}
				text = text + "MSBuildPath:" + text3 + "<br />";
				if (!System.IO.File.Exists(text3))
				{
					text += "MSBuildPath配置路径不存在，请检查<br />";
				}
				string text4 = CompileProject(text3, text2 + "FastDev.Model\\FastDev.Model.csproj");
				if (!string.IsNullOrEmpty(text4))
				{
					if (text4.Length < 2000)
					{
						text = text + "<b>实体类编译信息：</b><br>" + text4 + "<br>";
					}
				}
				else
				{
					text += "实体类编译成功<br>";
				}
				text3 = "C:\\Windows\\Microsoft.NET\\Framework\\v4.0.30319\\MSBuild.exe";
				if (System.IO.File.Exists(text3))
				{
					text4 = CompileProject(text3, text2 + "FastDev.Model\\FastDev.Model.csproj");
					if (!string.IsNullOrEmpty(text4))
					{
						if (text4.Length < 2000)
						{
							text = text + "<b>实体类编译信息2：</b><br>" + text4 + "<br>";
						}
					}
					else
					{
						text += "实体类编译成功2<br>";
					}
				}
			}
			catch
			{
			}
			try
			{
				FileInfo fileInfo = new FileInfo(Server.MapPath("~/bin/ne.model.dll"));
				Assembly assembly = Assembly.Load("FastDev.Model");
				ModelsConfig modelsConfig = ServiceHelper.GetModelsConfig();
				foreach (FastDev.DevDB.Model.Config.Model model in modelsConfig.models)
				{
					try
					{
						ServiceConfig serviceConfig = ServiceHelper.GetServiceConfig(model.name);
						if (serviceConfig != null && !flag)
						{
							List<string> list = currentDb.Fetch<string>("select name from syscolumns where id=object_id('" + model.name + "')", new object[0]);
							bool flag2 = assembly.GetTypes().Any((Type a) => a.FullName.EndsWith("." + model.name));
							int num = 0;
							if (flag2)
							{
								num = assembly.GetTypes().FirstOrDefault((Type a) => a.FullName.EndsWith("." + model.name)).GetProperties()
									.Count();
							}
							text += string.Format("<b>【{0}】【{1}】(包括{2}个字段)(包括{3}个DB字段)【状态：{4}】</b><br>", model.moduleName, model.name, serviceConfig.fields.Count, list.Count, flag2 ? "正常" : "未编译");
							if (!ExistSql(currentDb, "SELECT\r\ncount(*),\r\ntbl.name AS [Name]\r\nFROM sys.tables AS tbl\r\nWHERE (tbl.name=N'" + model.name + "' and SCHEMA_NAME(tbl.schema_id)=N'dbo')"))
							{
								text += "不存在于数据库 <br>";
							}
							string text5 = Server.MapPath(string.Format("~/UI/{0}/{1}/", model.moduleName, model.name));
							if (Directory.Exists(text5))
							{
								string[] files = Directory.GetFiles(text5);
								text += "包括以下界面：<br>";
								string[] array = files;
								foreach (string text6 in array)
								{
									string text7 = text6.Replace(text5, "");
									if (!text7.StartsWith("service_"))
									{
										text = text + text7 + "<br>";
									}
								}
							}
							foreach (Field field in serviceConfig.fields)
							{
								if (!IsMatch(field.name, "^[a-zA-Z][a-zA-Z0-9_]+$"))
								{
									text = text + "字段" + field.name + "命名不规范<br>";
								}
								if (field.type == "many2one")
								{
									if (!list.Any((string a) => a == field.dbName))
									{
										text = text + "数据库缺少字段" + field.dbName + "<br>";
									}
								}
								else if (!field.type.Contains("2") && !list.Any((string a) => a == field.name))
								{
									text = text + "数据库缺少字段" + field.name + "<br>";
								}
								if (flag2)
								{
									Type type = assembly.GetTypes().FirstOrDefault((Type a) => a.FullName.EndsWith("." + model.name));
									if (field.type == "many2one")
									{
										if (!type.GetProperties().Any((PropertyInfo a) => a.Name == field.dbName))
										{
											text = text + "缺少字段" + field.name + "<br>";
										}
									}
									else if (!field.type.Contains("2") && !type.GetProperties().Any((PropertyInfo a) => a.Name == field.name))
									{
										text = text + "缺少字段" + field.name + "<br>";
									}
								}
							}
						}
					}
					catch (Exception ex)
					{
						if (model != null)
						{
							string text8 = text;
							text = text8 + "<b>模型" + model.name + "</b>检查出错：" + ex.Message + "<br>";
						}
					}
				}
			}
			catch (Exception)
			{
			}
			text += "</div>";
			return Content(text, "text/html");
		}

		private static bool ExistSql(DbContext db, string sql)
		{
			try
			{
				return db.ExecuteScalar<int>(sql, new object[0]) > 0;
			}
			catch
			{
				return true;
			}
		}

		public static bool IsMatch(string inputStr, string patternStr)
		{
			return Regex.IsMatch(inputStr, patternStr);
		}

		public string CompileProject(string msBuildFile, string csproj_filename)
		{
			Process process = new Process();
			process.StartInfo.FileName = "cmd.exe";
			process.StartInfo.UseShellExecute = false;
			process.StartInfo.RedirectStandardInput = true;
			process.StartInfo.RedirectStandardOutput = true;
			process.StartInfo.RedirectStandardError = true;
			process.StartInfo.CreateNoWindow = true;
			string text = null;
			try
			{
				process.Start();
				process.StandardInput.WriteLine("\"" + msBuildFile + "\" \"" + csproj_filename + "\"");
				process.StandardInput.WriteLine("exit");
				text = process.StandardOutput.ReadToEnd();
				process.WaitForExit();
				process.Close();
			}
			catch (Exception ex)
			{
				text = ex.Message;
			}
			return text;
		}
	}
}
