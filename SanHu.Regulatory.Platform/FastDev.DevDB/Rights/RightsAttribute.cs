using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace FastDev.DevDB.Rights
{
    public class RightsAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            if (!SysContext.IsUserLogined)
            {
                filterContext.HttpContext.Response.StatusCode = 403;
                filterContext.Result = new RedirectResult("/Home/Login");
            }
        }

    }
}
