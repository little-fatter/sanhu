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
                var form = ServiceHelper.GetService("form_inquiryrecord").Create(data.form_Inquiryrecord) as form_inquiryrecord;
                data.law_Staffs.ToList().ForEach(s => { s.AssociatedobjectID = form.ID; });
                data.law_Parties.ToList().ForEach(s => { s.AssociationobjectID = form.ID; });
                ServiceHelper.GetService("law_staff").SaveList(data.law_Staffs);
                ServiceHelper.GetService("law_party").SaveList(data.law_Parties);
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
