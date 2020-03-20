using FastDev.Common;
using FastDev.DevDB;
using FD.Model.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using FastDev.Model.Entity;

namespace FastDev.Service
{
    /// <summary>
    /// 询问笔录
    /// </summary>
    public class Form_inquiryrecordService : SHBaseService, IService
    {
        public Form_inquiryrecordService()
        {
            OnGetAPIHandler += Form_inquiryrecordService_OnGetAPIHandler;
        }

        private Func<APIContext, object> Form_inquiryrecordService_OnGetAPIHandler(string id)
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
            var data = JsonHelper.DeserializeJsonToObject<Form_inquiryrecordFinishReq>(context.Data);

            QueryDb.BeginTransaction();
            try
            {

               if(data.SourceTaskId!=null) data.formInquiryrecord.TaskId = data.SourceTaskId;
               if(data.EventInfoId!=null) data.formInquiryrecord.EventInfoId = data.EventInfoId;
                var form = ServiceHelper.GetService("form_inquiryrecord").Create(data.formInquiryrecord);
                if (string.IsNullOrEmpty((string)form)) throw new Exception();
                var formid = form.ToString();
                if (data.lawStaffs != null)
                {
                    foreach (var l in data.lawStaffs)
                    {
                        l.Associatedobjecttype = "form_inquiryrecord";
                        l.AssociatedobjectID= formid;
                        l.ID = Guid.NewGuid().ToString()
                            ;
                        l.CreateDate = DateTime.Now;
                        l.CreateUserID = SysContext.WanJiangUserID;
                        QueryDb.Insert(l);
                    }
                }
                if (data.lawParties != null)
                {
                    foreach (var l in data.lawParties)
                    {
                        l.Associatedobjecttype = "form_inquiryrecord";
                        l.AssociationobjectID = formid;
                        l.ID = Guid.NewGuid().ToString();
                        l.CreateDate = DateTime.Now;
                        l.CreateUserID = SysContext.WanJiangUserID;
                        QueryDb.Insert(l);
                    }
                }



                //打印预生成
                //var PDFSerivce = ServiceHelper.GetService("form_printPDFService") as form_printPDFService;
                //PDFSerivce.AsposeToPdf(new APIContext() { Data = @"{""formId"":""" + formid + @""",""formType"":""form_inquiryrecord""}" });
                QueryDb.CompleteTransaction();
            }
            catch (Exception e)
            {
                QueryDb.AbortTransaction();
                throw e;
                return false;
            }

            return true;
        }
    }
}
