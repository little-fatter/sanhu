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
    /// <summary>
    /// 登录管理
    /// </summary>
    [Route("[controller]/[action]")]
    public class AccountController : BaseController
    {
        readonly ServerNameConfig _serverNameConfig;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="appsettingsModel"></param>
        public AccountController(IOptionsSnapshot<ServerNameConfig> appsettingsModel)
        {
            _serverNameConfig=appsettingsModel.Value;
        }

        /// <summary>
        /// 登录跳转至框架登录
        /// </summary>
        /// <param name="returnUrl">回跳url</param>
        /// <returns></returns>
        [HttpGet]
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
        /// <summary>
        /// 退出跳转至框架退出
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Logout()
        {
            var mainservicename = _serverNameConfig.MainServiceName;
            return Redirect($"/{mainservicename}/Account/Logout");
        }
        /// <summary>
        /// 未授权跳转至框架未授权页面
        /// </summary>
        /// <param name="returnUrl">回跳url</param>
        /// <returns></returns>
        [HttpGet]
        public IActionResult AccessDenied([FromQuery]string returnUrl)
        {
            var mainservicename = _serverNameConfig.MainServiceName;
            return Redirect($"/{mainservicename}/Account/AccessDenied?returnulr={WebUtility.UrlEncode(returnUrl)}");
        }
    }
}
