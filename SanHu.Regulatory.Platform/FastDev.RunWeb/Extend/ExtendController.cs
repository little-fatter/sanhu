using FastDev.Common;
using FastDev.DevDB;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Text;

namespace FD.Web.Extend
{
	public class ExtendController : Controller
	{
		public ActionResult JList(string variableid)
		{
			if (variableid != null)
			{
				byte[] data; string text = string.Empty;
				if (HttpContext.Session.TryGetValue(variableid,out data))
				{
					text = Encoding.UTF8.GetString(data);
				}
				if (text != null)
				{
					base.ViewBag.FilterJson = text;
					FilterGroup filter = JsonHelper.DeserializeJsonToObject<FilterGroup>(text);
					DbContext currentDb = SysContext.GetCurrentDb();
					IList commonListData = DataAccessHelper.GetCommonListData(currentDb, "crm_customer", filter, "order by createdate desc");
					base.ViewBag.DataJson = JsonHelper.SerializeObject(commonListData);
				}
				else
				{
					base.ViewBag.DataJson = "[]";
				}
			}
			else
			{
				base.ViewBag.DataJson = "[]";
			}
			return View();
		}
	}
}
