using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DingTalk.Api.Request;
using DinkToPdf.Contracts;
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
        IConverter _converter;
        public TestController(IDingDingServices dingDingServices, IConverter converter)
        {
            _dingDingServices = dingDingServices;
            _converter = converter;
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
    @"<title></title>
<style>
    body {
        background-color: #eeeeee;
    }

    .TTbody {
        background-color: #ffffff;
        width: 800px;
        margin: 0 auto;
    }

    .Tbody {
        margin-left: 80px;
        padding-top: 50px;
    }
</style>
<div class=""TTbody"">
    <div class=""Tbody"">
        <p style=""line-height: 28pt; margin: 0pt; "">
            <span style=""font-family:方正小标宋_GBK; font-size:16pt; letter-spacing:2pt"">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;玉溪市抚仙湖管理局</span>
            &nbsp; &nbsp;
        </p>
        <p style=""margin: 0pt;  line-height: normal;"">
            <span style=""font-family:宋体; font-size:22pt"">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;勘验（检查）</span><span
                style=""font-family:宋体; font-size:22pt"">笔录</span>&nbsp; &nbsp; &nbsp;
        </p>
        <div style=""margin: 0pt 0pt 0pt 32pt; border-bottom: 2px solid black; width: 420pt; line-height: normal;"">
            <span style=""font-family: 宋体; font-size: 21.3333px; text-indent: 28px; white-space: normal;"">&nbsp;
                &nbsp;&nbsp;</span><span style=""text-align: center; width: 100%;"">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>&nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp;
            &nbsp; &nbsp;&nbsp;<span style=""font-size: 18px;text-align: center;;"">第%%页，共%%页</span>
        </div>
        <p style=""text-align: left; margin: 0pt; line-height: 1.5em; width: 65%;"">
            <span style=""border-bottom:1px solid black;""><span
                    style=""text-align: center; white-space: normal;width:100%""></span></span>
        </p>
        <div style=""line-height:22pt; margin:0pt; orphans:0; widows:0; display: flex;"">
            <div style=""font-family: 宋体; font-size: 21.3333px; text-indent: 22px; white-space: normal;"">&nbsp; &nbsp;
                检查事由：%Inspectionreason%</div>
            <div style=""width:300pt;text-align:center;"">%%</div>
        </div>
        <div style=""line-height:22pt; margin:0pt; orphans:0; widows:0; display: flex;"">
            <div style=""font-family: 宋体; font-size: 21.3333px; text-indent: 22px; white-space: normal;"">&nbsp; &nbsp;
                检查地点：%Incidentlocation%</div>
            <div style=""width:300pt;text-align:center;"">%%</div>
        </div>

        <div style=""line-height:22pt;  orphans:0; text-align:justify;display: flex; margin-left: 48pt; widows:0"">
            <div style=""font-family:宋体; font-size:16pt"">当事人:%Law_Party%</div>
            <div style=""font-family:宋体; font-size:16pt;width:350pt;border-bottom: 2px solid black;text-align: center;"">
                %%%%%</div>
        </div>

        <div style=""margin: 0pt; text-indent: 21pt; line-height: normal;text-indent: 22px; display:flex;"">
            <div style=""font-family:宋体; font-size:16pt"">&nbsp; &nbsp; 检查人：%Inspector1%、%Inspector2%</div>
            &nbsp; &nbsp;<div style=""width:50pt;border-bottom:1px solid black;text-align: center;"">%%</div>、<div
                style=""width:50pt;border-bottom:1px solid black;text-align: center;"">%%</div>
            <div>记录人：%NoteTaker%</div>
            <div style=""width:50pt;text-align:center;"">%%</div>
        </div>
        <div style=""line-height:22pt; margin:0pt; orphans:0; widows:0; display: flex;"">
            <div style=""font-family: 宋体; font-size: 21.3333px; text-indent: 22px; white-space: normal;"">&nbsp; &nbsp;
                监督检查类别:</div>
            <div style=""width:300pt;text-align:center;"">%%</div>
        </div>
        <div
            style=""line-height:22pt; margin:0pt; orphans:0;display: flex; text-indent:18pt; widows:0;border-bottom:2px solid black;width: 480pt;"">
            <div style=""font-family:宋体; font-size:16pt;"">&nbsp; &nbsp; 检查时间：</div>
            <div style=""font-family:宋体; font-size:16pt;width: 30pt;;text-align: center;"">%11%</div>
            <div style=""font-family:宋体; font-size:16pt;width: 12pt; "">年</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt; width: 12pt;"">月</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt;width: 12pt; "">日</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt; width: 12pt;"">时</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt; width: 12pt;"">分</div>
            <div style=""font-family:宋体; font-size:16pt; width: 12pt;"">至</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt; width: 12pt;"">时</div>
            <div style=""font-family:宋体; font-size:16pt;width: 20pt;;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt;width: 12pt;"">分</div>
            <div style=""text-indent: 21pt;"">&nbsp;</div>
        </div>
        <div style=""line-height:22pt; margin:0pt; orphans:0;margin-left: 18pt; widows:0;display: flex;"">
            <div style=""font-family:宋体; font-size:16pt"">&nbsp; &nbsp; 我们是</div>
            <div style=""font-family:宋体; font-size:16pt"">玉溪市抚仙湖管理局</div>
            <div style=""font-family:宋体; font-size:16pt"">的执法人</div>
            <div style=""width:50pt;border-bottom:1px solid black;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt"">、</div>
            <div style=""width:50pt;border-bottom:1px solid black;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt"">，执</div>
        </div>

        <div style=""line-height:22pt; margin:0pt; orphans:0; margin-left: 18pt; widows:0;display: flex;"">
            <div style=""font-family:宋体; font-size:16pt"">法证件编号是：</div>
            <div style=""width:100pt;border-bottom:1px solid black;text-align: center;"">%%</div>
            <div style=""font-family:宋体; "">、</div>
            <div style=""width:100pt;border-bottom:1px solid black;text-align: center;"">%%</div>
            <div style=""font-family:宋体; font-size:16pt"">。</div>
        </div>



        <div
            style=""line-height:22pt; margin:0pt; orphans:0; text-align:justify;display: flex; margin-left: 18pt; widows:0"">
            <div style=""font-family:宋体; font-size:16pt"">&nbsp; &nbsp; 我们在你单位</div>
            <div style=""font-family:宋体; font-size:16pt;width:200pt;border-bottom: 2px solid black;text-align: center;"">
                %%%%%</div>
            <div style=""font-family:宋体; font-size:16pt"">陪同下进行现场</div>
        </div>
        <div
            style=""line-height:22pt; margin:0pt; orphans:0; text-align:justify;display: flex; margin-left: 18pt; widows:0"">
            <div style=""font-family:宋体; font-size:16pt"">勘验（检查）</div>
            <div style=""font-family:宋体; font-size:16pt"">。</div>
        </div>

        <div>
            <div style=""line-height:22pt; margin:0pt; orphans:0; text-align:justify;  widows:0;"">
                <div style=""font-family:宋体; font-size:16pt;margin-left: 50pt;""> 勘验（检查）记录：</div>

                <div
                    style=""margin-left:18pt;text-indent: 34pt;word-wrap:break-word;white-space: normal;max-width: 450pt;height: 150px;line-height: 30px;"">
                    %勘验记录% </div>
                <div style=""width: 460pt;position: relative;top: -150px;left: 0px;"">
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                    <div style=""width: 480pt; border-bottom: 1px solid black; height: 29px; ""> </div>
                </div>
            </div>
        </div>
    </div>
</div>";
            var filebyte= _converter.HmtlToPDF(html);
            return File(filebyte, "application/pdf");
        }
    }
}