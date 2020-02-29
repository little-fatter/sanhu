using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class task_surveyFinishReq:FormReqBase
    {
        /// <summary>
        /// 勘察信息
        /// </summary>
        public task_survey TaskSurvey { get; set; }

        /// <summary>
        /// 当事人信息
        /// </summary>
        public List<law_party> LawParties { get; set; }
        /// <summary>
        /// 证据信息
        /// </summary>
        public List<attachment> Attachments { get; set; }

    }
}
