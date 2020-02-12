namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTrack
    {
        
        private string _ID;
        
        private string _NextTaskID;

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

        public string NextTaskID
        {
            
            get
            {
                return this._NextTaskID;
            }
            
            set
            {
                this._NextTaskID = value;
            }
        }
    }
}

