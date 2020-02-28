using FastDev.Common;
using FastDev.DevDB;
using FD.Model.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
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
            var form = data.form_Inquiryrecord;
            form.ID = Guid.NewGuid().ToString().Replace("-", "");
            data.law_Staffs.ToList().ForEach(s => { s.AssociatedobjectID = form.ID; });
            data.law_Parties.ToList().ForEach(s => { s.AssociationobjectID = form.ID; });
            QueryDb.BeginTransaction();
            try
            {
                ServiceHelper.GetService("form_inquiryrecord").Create(form);
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
