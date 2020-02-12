using FastDev.Common;
using FastDev.DevDB.Auth;
using FastDev.DevDB.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace FastDev.DevDB
{
	public class VaildateUser : ActionFilterAttribute
	{
		private string AppCreatorRoleID
		{
			get
			{
				return ConfigurationManager.AppSettings["AppCreatorRoleID"];
			}
		}

		private string GetAppAdminRoleID()
		{
			return ConfigurationManager.AppSettings["AppAdminRoleID"];
		}

		public static string GetServiceNo(string type)
		{
			string arg = type.ToString();
			int num = new Random().Next(0, 9999);
			if (num < 10)
			{
				return arg + "000" + num;
			}
			if (num < 100)
			{
				return arg + "00" + num;
			}
			if (num < 1000)
			{
				return arg + "000" + num;
			}
			return arg + num;
		}

		private void ShowError(ActionExecutingContext actionExecutingContext, string strParam)
		{
			string value = actionExecutingContext.ActionDescriptor.DisplayName.ToLower();
			HttpRequest request = actionExecutingContext.HttpContext.Request;
			string text2 = ConfigurationManager.AppSettings["WebSite"];
			if (new string[4]
			{
				"index",
				"welcome",
				"home",
				"main"
			}.Contains(value))
			{
				string s = request.Path.Value;
				string text = string.Format("/designer/error?sourceurl={0}", WebUtility.UrlEncode(s));
				if (!string.IsNullOrEmpty(strParam))
				{
					if (text.IndexOf("&msg=") > -1)
					{
						int length = text.IndexOf("&msg=");
						text = text.Substring(0, length);
					}
					if (strParam.Contains("验证授权失败"))
					{
						text = string.Format("/designer/validate");
						actionExecutingContext.Result = new RedirectResult(text);
						return;
					}
					strParam = WebUtility.UrlEncode(strParam);
					text = text + "&msg=" + strParam;
				}
				actionExecutingContext.Result = new RedirectResult(text);
			}
			else
			{
				JsonResult jsonResult = new JsonResult(new
				{
					statusCode = "3",
					message = strParam
				});
				jsonResult.ContentType = "application/json";
				actionExecutingContext.Result = jsonResult;
			}
		}

		private void CheckValidate(Microsoft.AspNetCore.Http.HttpContext httpContextBase)
		{
			try
			{
				if (!File.Exists(new HttpServerUtility(httpContextBase).MapPath("~/validate.code")))
				{
					try
					{
						string string_ = string.Format("http://auth.cht.com/web/getvalidatecode/?code={0}&isdesigner=Y", new SoftReg().getRNum());
						Dictionary<string, object> dictionary = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(WebSiteRequest(string_));
						if (dictionary != null)
						{
							string text = dictionary["data"] as string;
							if (!string.IsNullOrEmpty(text))
							{
								File.WriteAllText(new HttpServerUtility(httpContextBase).MapPath("~/validate.code"), text);
							}
						}
					}
					catch
					{
					}
				}
				if (!File.Exists(new HttpServerUtility(httpContextBase).MapPath("~/validate.code")))
				{
					throw new UserException("验证授权失败，请检查根目录validate.code文件");
				}
				string ciphertext = File.ReadAllText(new HttpServerUtility(httpContextBase).MapPath("~/validate.code"));
				if (string.IsNullOrEmpty(ciphertext))
				{
					throw new UserException("验证授权失败，请检查根目录validate.code文件");
				}
				string key = "AwEAAbfyNG2IR7IHAJ2v54mCM3QFnOy+NbQ+qg8g3HE8T6RceBoQS65twfI+y7D4B1Bzf58UCsDJe4UgJU4UvNFtSgXy+9OrqBNSkiasCO2gBgAKWRnYXG6DxEerPhJYOQvY1NmRltqAVrYCEwko7bKacUOXmi5XLlDAdtDrXVGfx4dh";
				string rNum = new SoftReg().getRNum();
				string plaintext = AESHelper.DecryptString(ciphertext, key);
				if (string.IsNullOrEmpty(plaintext))
				{
					throw new UserException("验证授权失败");
				}
				Dictionary<string, object> dictionary2 = JsonHelper.DeserializeJsonToObject<Dictionary<string, object>>(plaintext);
				if (dictionary2 == null)
				{
					throw new UserException("验证授权失败");
				}
				string a = dictionary2["code"] as string;
				if (a != rNum)
				{
					throw new UserException("验证授权失败");
				}
				long num = Convert.ToInt64(dictionary2["time"]);
				DateTime t = new DateTime(2000, 1, 1, 0, 0, 0).AddSeconds((double)num);
				if (DateTime.Now > t)
				{
					throw new UserException("验证授权失败(已过期)");
				}
			}
			catch
			{
				throw new UserException("验证授权失败");
			}
		}

		private string WebSiteRequest(string url)
		{
			try
			{
				HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
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

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
   //         try
   //         {

			//	ISession session = filterContext.HttpContext.Session;
			//	HttpRequest request = filterContext.HttpContext.Request;
			//	CheckValidate(filterContext.HttpContext);
			//	DbContext currentDb = SysContext.GetCurrentDb();
			//	string siteUrl = ConfigurationManager.AppSettings["WebSite"];
			//	string appId = SysContext.AppId;
			//	string name = "app_" + appId;
			//	string appValue = session.GetString(name);

			//	if (SysContext.IsDev)
			//	{
			//		if (string.IsNullOrEmpty(appValue))
			//		{
			//			string coreRoleId = ConfigurationManager.AppSettings["AppAdminRoleID"];
			//			session.SetString(name, ConfigurationManager.AppSettings["AppAdminUserID"]);
			//		}
			//	}
			//	else
			//	{
			//		if (!string.IsNullOrEmpty(appValue) && !currentDb.Exists<core_user>(" ID = @0", new object[1]
			//		{
			//		appValue
			//		}))
			//		{
			//			session.SetString(name, null);
			//			appValue = null;
			//		}
			//		if (string.IsNullOrEmpty(appValue))
			//		{
			//			string coreRoleId = ConfigurationManager.AppSettings["AppAdminRoleID"];
			//			session.SetString(name, currentDb.ExecuteScalar<string>("select coreuserid from core_userrole where coreroleid = @0 ", new object[1]
			//			{
			//			coreRoleId
			//			}));
			//		}
			//	}
			//}
   //         catch (Exception ex)
   //         {
   //             if (ex is UserException)
   //             {
   //                 ShowError(filterContext, ex.Message);
   //             }
   //             else
   //             {
   //                 string str = ex.Message + " ";
   //                 if (ex.InnerException != null)
   //                 {
   //                     str += ex.InnerException.Message;
   //                 }
   //                 str = str + "StackTrace:" + ex.StackTrace;
   //                 ShowError(filterContext, "验证异常：" + str);
   //             }
   //         }
        }

		public VaildateUser()
		{
			
			
		}
	}
}
