using FastDev.Common;
using FastDev.DevDB;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace FastDev.RunWeb.Controllers
{
	[Route("[controller]/[action]")]
	public class MyWebController : Controller
	{
		public HttpServerUtility Server
		{
			get
			{
				return new HttpServerUtility();
			}
		}
		[VaildateUser]
		[HttpGet]
		public ActionResult DownloadUserPics1(string context)
		{
			//IL_0016: Unknown result type (might be due to invalid IL or missing references)
			//IL_00e3: Unknown result type (might be due to invalid IL or missing references)
			//IL_00ed: Expected O, but got Unknown
			DbContext currentDb = SysContext.GetCurrentDb();
			if (string.IsNullOrEmpty(context))
			{
				throw new UserException("请选择用户");
			}
			currentDb.BeginTransaction();
			List<ZipFileInfo> list = new List<ZipFileInfo>();
			try
			{
				string[] array = context.Split(';');
				string[] array2 = array;
				foreach (string text in array2)
				{
					Model.Core.Entity.core_user core_user = currentDb.FirstOrDefault<Model.Core.Entity.core_user>("where ID = @0", new object[1]
					{
						text
					});
					if (System.IO.File.Exists(Server.MapPath("~/" + core_user.MyPic)))
					{
						currentDb.Update("core_user", "ID", (object)new
						{
							ID = text,
							字段1 = 1
						});
						string extension = Path.GetExtension(core_user.MyPic);
						list.Add(new ZipFileInfo(Server.MapPath("~/" + core_user.MyPic), core_user.RealName + extension));
					}
				}
				currentDb.CompleteTransaction();
			}
			catch (Exception ex)
			{
				currentDb.AbortTransaction();
				throw ex;
			}
			string text2 = Server.MapPath("~/" + DateTime.Now.ToString("yyyyMMddHHmmssss") + ".zip");
			ZipHelper.Zip((IList<ZipFileInfo>)list, text2);
			return File(new FileStream(text2, FileMode.Open), "application/octet-stream", Server.UrlEncode("匹配下载图片.zip"));
		}

		[VaildateUser]
		[HttpGet]
		public ActionResult DownloadUserPics2(string context)
		{
			//IL_0016: Unknown result type (might be due to invalid IL or missing references)
			//IL_00e3: Unknown result type (might be due to invalid IL or missing references)
			//IL_00ed: Expected O, but got Unknown
			DbContext currentDb = SysContext.GetCurrentDb();
			if (string.IsNullOrEmpty(context))
			{
				throw new UserException("请选择用户");
			}
			currentDb.BeginTransaction();
			List<ZipFileInfo> list = new List<ZipFileInfo>();
			try
			{
				string[] array = context.Split(';');
				string[] array2 = array;
				foreach (string text in array2)
				{
					Model.Core.Entity.core_user core_user = currentDb.FirstOrDefault<Model.Core.Entity.core_user>("where ID = @0", new object[1]
					{
						text
					});
					if (System.IO.File.Exists(Server.MapPath("~/" + core_user.MyPic)))
					{
						currentDb.Update("core_user", "ID", (object)new
						{
							ID = text,
							字段1 = 1
						});
						string extension = Path.GetExtension(core_user.MyPic);
						list.Add(new ZipFileInfo(Server.MapPath("~/" + core_user.MyPic), core_user.RealName + extension));
					}
				}
				currentDb.CompleteTransaction();
			}
			catch (Exception ex)
			{
				currentDb.AbortTransaction();
				throw ex;
			}
			string text2 = Server.MapPath("~/" + DateTime.Now.ToString("yyyyMMddHHmmssss") + ".zip");
			ZipHelper.Zip((IList<ZipFileInfo>)list, text2);
			return File(new FileStream(text2, FileMode.Open), "application/octet-stream", Server.UrlEncode("匹配下载图片.zip"));
		}

		public MyWebController()
		{
			
			
		}
	}
}
