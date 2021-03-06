﻿using DingTalk.Api.Request;
using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class case_reportFinishReq:FormReqBase
    {
        /// <summary>
        /// 结案报告
        /// </summary>
        public case_report CaseReport { get; set; }

        /// <summary>
        /// 钉钉审核流参数
        /// </summary>
        public OapiProcessinstanceCreateRequest oapiProcessinstanceCreateRequest { get; set; }
    }
}
