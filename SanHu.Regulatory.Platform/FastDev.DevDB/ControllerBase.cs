using Microsoft.AspNetCore.Mvc;
using System;

namespace FastDev.DevDB
{
	public abstract class ControllerBase : Controller
    {
		public ActionResult GetErrorResult(Exception err)
		{
			return Json(new
			{
				Success = false,
				message = err.Message
			});
		}

		protected ControllerBase()
		{
			
			
		}
	}
}
