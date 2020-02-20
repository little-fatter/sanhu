using FastDev.DevDB;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{

    public class attachmentService : ServiceBase, IService
    {
        public attachmentService()
        {

            OnWorkflowExecute += attachmentService_OnWorkflowExecute;
        }

        void attachmentService_OnWorkflowExecute(WorkflowExecuteParm data)
        {
            var db = this.MainDb;

            var id = data.Context.Context;

            if (data.FromReturnTask != null)  //退回操作
            {

                db.Update("attachment", "ID", new
                {
                    ID = id,
                    Remark = "从" + data.FromReturnTask.NodeTitle + "退回到：" + data.CurrentTask.NodeTitle
                });

                return;
            }

            if (!string.IsNullOrEmpty(data.CurrentTask.NodeTitle))
            {
                db.Update("attachment", "ID", new
                {
                    ID = id,
                    Remarks = "执行到：" + data.CurrentTask.NodeTitle
                });
            }

        }

    }
}
