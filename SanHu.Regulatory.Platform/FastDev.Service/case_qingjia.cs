using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FastDev.Common;

using FastDev.Model.Entity;
using FastDev.DevDB;

namespace FastDev.Service
{
    public class case_qingjia : ServiceBase, IService
    {
        public case_qingjia()
        {

            OnWorkflowExecute += case_qingjia_OnWorkflowExecute;
        }

        void case_qingjia_OnWorkflowExecute(WorkflowExecuteParm data)
        {
            var db = this.MainDb;

            var id = data.Context.Context;

            if (data.FromReturnTask != null)  //退回操作
            {

                db.Update("case_qingjia", "ID", new
                {
                    ID = id,
                    Remarks = "从" + data.FromReturnTask.NodeTitle + "退回到：" + data.CurrentTask.NodeTitle
                });

                return;
            }


            if (data.CurrentTask.NodeTitle == "经理审批")
            {
                db.Update("case_qingjia", "ID", new
                {
                    ID = id,
                    Remarks = "执行到：" + data.CurrentTask.NodeTitle
                });
            }
            else if (data.CurrentTask.NodeTitle == "财务审批")
            {
                db.Update("case_qingjia", "ID", new
                {
                    ID = id,
                    Remarks = "执行到：" + data.CurrentTask.NodeTitle
                });
            }
            else
            {
                db.Update("case_qingjia", "ID", new
               {
                   ID = id,
                   Remarks = "执行到：" + data.CurrentTask.NodeTitle
               });
            }

        }

    }
}
