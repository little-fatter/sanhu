using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FastDev.RunWeb.Controllers
{
    public class AccountController : WanJiang.Framework.Web.Core.Mvc.BaseController
    {
        readonly ServerNameConfig _serverNameConfig;
        public AccountController(IOptionsSnapshot<ServerNameConfig> appsettingsModel)
        {
            _serverNameConfig=appsettingsModel.Value;
        }
        // GET: /<controller>/
        public IActionResult Login([FromQuery]string returnUrl)
        {
            var mainservicename = _serverNameConfig.MainServiceName;
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                if (string.IsNullOrEmpty(returnUrl))
                {
                    var toolid = GetToolId();
                    if (string.IsNullOrEmpty(toolid))
                    {
                        return Redirect($"/{mainservicename}/Tool/Navigation");
                    }
                    return Redirect($"/{mainservicename}");
                }
                return Redirect(returnUrl);
            }
            if (string.IsNullOrEmpty(returnUrl))
            {
                return Redirect($"/{mainservicename}/Account/Login?toolid=SHJG");
            }
            return Redirect($"/{mainservicename}/Account/Login?toolid=SHJG&returnulr={WebUtility.UrlEncode(returnUrl)}");
        }
        public IActionResult Logout()
        {
            var mainservicename = _serverNameConfig.MainServiceName;
            return Redirect($"/{mainservicename}/Account/Logout");
        }
        public IActionResult AccessDenied([FromQuery]string returnUrl)
        {
            var mainservicename = _serverNameConfig.MainServiceName;
            return Redirect($"/{mainservicename}/Account/AccessDenied?returnulr={WebUtility.UrlEncode(returnUrl)}");
        }
    }
}
