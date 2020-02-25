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
            //OapiWorkrecordAddRequest oapiWorkrecordAddRequest = new OapiWorkrecordAddRequest()
            //{
            //    Userid = "2825136819665808",//user的accountID
            //    CreateTime = DateTime.Now.GetTimeStamp(),
            //    Title = "测试待办233",//待办事项的标题
            //    Url = "https://oa.dingtalk.com",//待办事项的跳转链接
            //    FormItemList_ = new List<OapiWorkrecordAddRequest.FormItemVoDomain>()
            //    {
            //        new OapiWorkrecordAddRequest.FormItemVoDomain
            //        {
            //            Title="待办表单标题",
            //            Content="待办表单内容"
            //        },
            //    }
            //};
            //_dingDingServices.WorkrecordAdd(oapiWorkrecordAddRequest);
            return Content("ok");
        }
    }
}