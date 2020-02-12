namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTrackDetails
    {
        
        private string _ExecutorStatusID;
        
        private string _ID;

        public string ExecutorStatusID
        {
            
            get
            {
                return this._ExecutorStatusID;
            }
            
            set
            {
                this._ExecutorStatusID = value;
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

