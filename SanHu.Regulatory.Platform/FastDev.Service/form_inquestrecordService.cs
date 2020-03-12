using FastDev.Common;
using FastDev.DevDB;
using FastDev.Model.Entity;
using FD.Model.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FastDev.Service
{
    /// <summary>
    /// 勘验笔录
    /// </summary>
    public class Form_inquestrecordService : SHBaseService, IService
    {
        public Form_inquestrecordService()
        {
            OnGetAPIHandler += Form_inquestrecordService_OnGetAPIHandler;
        }

        private Func<APIContext, object> Form_inquestrecordService_OnGetAPIHandler(string id)
        {
            switch (id.ToUpper())
            {
                case "FINISH":
                    return Finish;
            }
            return null;
        }
        public object Finish(APIContext context)
        {
            var data = JsonHelper.DeserializeJsonToObject<form_inquestrecordFinishReq>(context.Data);

            QueryDb.BeginTransaction();
            try
            {
                data.form_inquestrecord.TaskId = data.SourceTaskId;
                data.form_inquestrecord.EventInfoId = data.EventInfoId;
                var form = ServiceHelper.GetService("form_inquestrecord").Create(data.form_inquestrecord) as form_inquestrecord;
                data.law_Staffs.ToList().ForEach(s => { s.AssociatedobjectID = form.ID; });
                data.law_Parties.ToList().ForEach(s => { s.AssociationobjectID = form.ID; });
                ServiceHelper.GetService("law_staff").SaveList(data.law_Staffs);
                ServiceHelper.GetService("law_party").SaveList(data.law_Parties);

                CreatTasksAndCreatWorkrecor(data.NextTasks, data.SourceTaskId);

                //PDF打印预生成
                var PDFSerivce = ServiceHelper.GetService("form_printPDFService") as form_printPDFService;
                PDFSerivce.AsposeToPdf(new APIContext() { Data = @"{""formId"":"""+data.form_inquestrecord.ID+@""",""formName"":""form_inquestrecord""}" });
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                return false;
            }

            return true;
        }
    }
}
