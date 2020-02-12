namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowExecutorStatus
    {
        
        private string _ExecutorID;
        
        private string _ID;

        public string ExecutorID
        {
            
            get
            {
                return this._ExecutorID;
            }
            
            set
            {
                this._ExecutorID = value;
            }
        }

        public string ID
        {
            
            get
            {
                return this._ID;
            }
            
            set
            {
                this._ID = value;
            }
        }
    }
}

