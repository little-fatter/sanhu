using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FastDev.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace FastDev.RunWeb.Controllers
{
    [Route("[controller]/[action]")]
    public class CaiYunApiController : Controller
    {
        public CaiYunApiController(IConfiguration configuration)
        {
            _caiYunApiService = new CaiYunApiService(configuration["CaiYunApiToken"]);
        }
        private CaiYunApiService _caiYunApiService;

        [HttpGet]
        [ProducesResponseType(typeof(WeatherResponse), 200)]
        public IActionResult GetWeather()
        {
            return Json(_caiYunApiService.GetWeather());
        }
    }
}