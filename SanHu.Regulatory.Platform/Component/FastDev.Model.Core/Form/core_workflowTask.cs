namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_workflowTask : FastDev.Model.Core.Entity.core_workflowTask
    {
        
        private IList<FastDev.Model.Core.Form.core_workflowExecutorStatus> _ExecutorStatus;

        public IList<FastDev.Model.Core.Form.core_workflowExecutorStatus> ExecutorStatus
        {
            
            get
            {
                return this._ExecutorStatus;
            }
            
            set
            {
                this._ExecutorStatus = value;
            }
        }
    }
}

