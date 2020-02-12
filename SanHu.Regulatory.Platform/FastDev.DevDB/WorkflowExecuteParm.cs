using FastDev.DevDB.Model;
using FastDev.DevDB.Workflow;
using System.Runtime.CompilerServices;

namespace FastDev.DevDB
{
    public class WorkflowExecuteParm
    {


        public WorkflowContext Context
        {
            get;
            set;
        }

        public core_workflow Define
        {
            get;
            set;
        }

        public core_workflowProject CurrentProject
        {
            get;
            set;
        }

        public core_workflowTask CurrentTask
        {
            get;
            set;
        }

        public core_workflowTask FromReturnTask
        {
            get;
            set;
        }

        public WorkflowExecuteParm()
        {


        }
    }
}
