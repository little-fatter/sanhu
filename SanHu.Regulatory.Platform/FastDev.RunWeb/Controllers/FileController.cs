using FastDev.Common;
using FastDev.DevDB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace FastDev.RunWeb.Controllers
{
	public class FileController : Controller
	{
		public HttpServerUtility Server
		{
			get
			{
				return new HttpServerUtility();
			}
		}
		[HttpPost]
		public ActionResult GetBrowse(string browse, string name, string patterns, string root, bool? FolderOnly)
		{
			try
			{
				bool flag = false;
				if (FolderOnly.HasValue)
				{
					flag = FolderOnly.Value;
				}
				if (string.IsNullOrEmpty(patterns))
				{
					patterns = "*.gif,*.png,*.jpg,*.xls,*xlsx,*.doc,*.docx,*.pdf";
				}
				string searchPattern = "*";
				if (!string.IsNullOrEmpty(name))
				{
					searchPattern = "*" + name + "*";
				}
				string text = "";
				string text2 = Server.MapPath("~");
				if (!string.IsNullOrEmpty(browse))
				{
					text = browse.Replace("/", "\\");
					if (text.StartsWith("\\"))
					{
						text = text.Substring(1);
					}
				}
				if (!string.IsNullOrEmpty(root))
				{
					root = Server.UrlDecode(root);
					if (!root.StartsWith("/"))
					{
						root = "/" + root;
					}
					if (root.EndsWith("/"))
					{
						root = root.Substring(0, root.Length - 1);
					}
					text2 = Server.MapPath("~" + root);
				}
				text = (string.IsNullOrEmpty(browse) ? text2 : (text2 + text));
				string[] directories = Directory.GetDirectories(text, searchPattern, SearchOption.TopDirectoryOnly);
				string[] array = method_0(text, patterns.Split(','));
				List<object> list = new List<object>();
				string[] array2 = directories;
				foreach (string text3 in array2)
				{
					list.Add(new
					{
						Type = "目录",
						IsFile = false,
						Name = text3.Replace(text, "").Replace("\\", "").Replace("\\", ""),
						LastModifyTime = Directory.GetLastWriteTime(text3).ToString(),
						Path = text3.Replace(text2, "").Replace("\\", "/")
					});
				}
				if (!flag)
				{
					array2 = array;
					foreach (string text4 in array2)
					{
						list.Add(new
						{
							Type = "文件",
							IsFile = true,
							LastModifyTime = System.IO.File.GetLastWriteTime(text4).ToString(),
							Name = text4.Replace(text, "").Replace("\\", "").Replace("\\", ""),
							Path = text4.Replace(text2, "").Replace("\\", "/")
						});
					}
				}
				return Json(new
				{
					Success = true,
					Rows = list,
					Total = list.Count
				});
			}
			catch (Exception ex)
			{
				ServiceHelper.Log(ex);
				return Json(new AjaxResult
				{
					Success = false,
					message = ex.Message
				});
			}
		}

		private static string smethod_0()
		{
			return DateTime.Now.ToString("yyyyMMddhhmms");
		}

		[HttpPost]
		public ActionResult Download(string src, string contentType)
		{
			if (string.IsNullOrEmpty(src))
			{
				return new EmptyResult();
			}
			src = Base64Helper.DecodingString(src);
			if (string.IsNullOrEmpty(contentType))
			{
				string text = FileHelper.GetContentType(Path.GetExtension(src));
				if (text.StartsWith("."))
				{
					text = text.Replace(".", "");
				}
				contentType = FileHelper.GetContentType(text);
			}
			return File(Server.MapPath("~/" + src), contentType);
		}

		[HttpPost]
		[VaildateUser]
		public ActionResult Upload(string appid, IFormFile fileData, string fileType)
		{
			try
			{
				if (fileData != null)
				{
					string text = Server.MapPath("~/uploads/") + appid + "/";
					if (!string.IsNullOrEmpty(fileType))
					{
						text = text + fileType + "/";
					}
					if (!Directory.Exists(text))
					{
						Directory.CreateDirectory(text);
					}
					string str = smethod_0() + Path.GetExtension(fileData.FileName);
					using (var stream = new FileStream(text + str, FileMode.Create))
					{
						fileData.CopyTo(stream);
					}
					string str2 = "uploads/" + appid + "/";
					if (!string.IsNullOrEmpty(fileType))
					{
						str2 = str2 + fileType + "/";
					}
					str2 += str;
					return Json(new AjaxResult
					{
						Success = true,
						data = str2
					});
				}
				return Json(new AjaxResult
				{
					Success = false
				});
			}
			catch (Exception ex)
			{
				ServiceHelper.Log(ex);
				return Json(new AjaxResult
				{
					Success = false,
					message = ex.Message
				});
			}
		}

		[VaildateUser]
		[HttpPost]
		public ActionResult CkUpload(IFormFile upload, string CKEditorFuncNum)
		{
			try
			{
				string format = "<script type=\"text/javascript\">window.parent.CKEDITOR.tools.callFunction({0} ,'{1}');</script>";
				if (upload == null)
				{
					return Content("0");
				}
				string str = smethod_0() + Path.GetExtension(upload.FileName);
				if (upload != null)
				{
					using (var stream = new FileStream(Server.MapPath("~/uploads/" + str), FileMode.Create))
					{
						upload.CopyTo(stream);
					}
					format = string.Format(format, CKEditorFuncNum, "/uploads/" + str);
					return Content(format);
				}
				return Content("0");
			}
			catch (Exception ex)
			{
				return Json(new AjaxResult
				{
					Success = false,
					message = ex.Message
				});
			}
		}

		private string[] method_0(string string_0, params string[] searchPatterns)
		{
			if (searchPatterns.Length <= 0)
			{
				return null;
			}
			DirectoryInfo directoryInfo = new DirectoryInfo(string_0);
			FileInfo[][] array = new FileInfo[searchPatterns.Length][];
			int num = 0;
			for (int i = 0; i < searchPatterns.Length; i++)
			{
				num += (array[i] = directoryInfo.GetFiles(searchPatterns[i], SearchOption.TopDirectoryOnly)).Length;
			}
			string[] array2 = new string[num];
			int num2 = 0;
			for (int i = 0; i <= array.GetUpperBound(0); i++)
			{
				for (int j = 0; j < array[i].Length; j++)
				{
					string text = array2[num2] = array[i][j].FullName;
					num2++;
				}
			}
			return array2;
		}

		public ActionResult Test(string id)
		{
			try
			{
				string content = string.Format("{0:yyyy-dd-MM}", DateTime.Now);
				return Content(content);
			}
			catch (Exception ex)
			{
				return Json(new AjaxResult
				{
					Success = false,
					message = ex.Message
				});
			}
		}

		public FileController()
		{
		}
	}
}
