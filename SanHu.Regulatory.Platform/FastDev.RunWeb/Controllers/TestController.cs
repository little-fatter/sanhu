using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastDev.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FastDev.RunWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        IDingDingServices _dingDingServices;
        public TestController(IDingDingServices dingDingServices)
        {
            _dingDingServices = dingDingServices;
        }
        /// <summary>
        /// 测试
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            _dingDingServices.add();
            return Content("ok");
        }
    }
}