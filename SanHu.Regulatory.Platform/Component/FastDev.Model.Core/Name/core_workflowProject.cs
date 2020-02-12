namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowProject
    {
        
        private string _ID;
        
        private string _SponsorID;

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

        public string SponsorID
        {
            
            get
            {
                return this._SponsorID;
            }
            
            set
            {
                this._SponsorID = value;
            }
        }
    }
}

