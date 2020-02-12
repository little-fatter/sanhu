namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_workflowTask
    {
        
        private string _Description;
        
        private string _ID;

        public string Description
        {
            
            get
            {
                return this._Description;
            }
            
            set
            {
                this._Description = value;
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

