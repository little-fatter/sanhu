using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    class case_InfoService : ServiceBase, IService
    {
        public case_InfoService()
        {
            OnGetAPIHandler += case_InfoService_OnGetAPIHandler;
        }

        private SHBaseService _sHBaseService;
        private Func<APIContext, object> case_InfoService_OnGetAPIHandler(string id)
        {
            _sHBaseService = ServiceHelper.GetService("SHBaseService") as SHBaseService;
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Handle;
            }
            return null;
        }
        public object Handle(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<case_InfoFinishReq>(context.Data);
            case_Info taskSurvey = new case_Info();
            List<law_party> lawParties = new List<law_party>();
            if (!string.IsNullOrEmpty(data.TaskSurvey.TaskId)) return false;
            if (!string.IsNullOrEmpty(data.TaskSurvey.EventInfoId)) return false;
            string url = data.Url;
            taskSurvey = data.TaskSurvey;
            lawParties = data.LawParties;
            //0:不予处罚
            //1:移交其它部门
            //2:处罚程序
            switch (data.TaskSurvey.ProcessingDecisions)
            {
                case 0:
                    return Finish(taskSurvey, lawParties);
                case 1:
                    return ToEpart(taskSurvey);
                case 2:
                    return CreateCase(taskSurvey, lawParties, url);
            }
            return false;
        }




    }
}
