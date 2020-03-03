using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DingTalk.Api.Request;
using FastDev.Common.Extensions;
using FastDev.IServices;
using FD.Common.Helpers;
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
        //[Authorize]
        public async Task<IActionResult> Get()
        {
            //OapiWorkrecordAddRequest oapiWorkrecordAddRequest = new OapiWorkrecordAddRequest()
            //{
            //    Userid = "2825136819665808",//user的accountID
            //    CreateTime = DateTime.Now.GetTimeStampM(),
            //    Title = "测试待办2555",//待办事项的标题
            //    Url = "https://oa.dingtalk.com",//待办事项的跳转链接
            //    FormItemList_ = new List<OapiWorkrecordAddRequest.FormItemVoDomain>()
            //    {
            //        new OapiWorkrecordAddRequest.FormItemVoDomain
            //        {
            //            Title="待办表单标题22555",
            //            Content="待办表单内容333555"
            //        },
            //    }
            //};
            //var reulst=await _dingDingServices.WorkrecordAdd(oapiWorkrecordAddRequest);
            //var s= reulst.RecordId;

            var reulst = await _dingDingServices.WorkrecordUpdate("2825136819665808", "recordf55f33bd147dc983b096680a5bd76b95");
            var s = reulst;
            return Content("ok");
        }
        [HttpGet("pdf")]
        public IActionResult GetPdf()
        {
            string html =
    "<!DOCTYPE html>" +
    "<html>" +
    "<head><meta charset='UTF-8'><title>Title</title></head>" +
    "<body>Body text...</body>" +
    "</html>";
            var filebyte= PDFHelper.HmtlToPDF(html);
            return File(filebyte, "application/pdf");
        }
    }
}