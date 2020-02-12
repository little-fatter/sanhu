namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_myMenus
    {
        
        private string _ID;
        
        private string _MenuName;

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

        public string MenuName
        {
            
            get
            {
                return this._MenuName;
            }
            
            set
            {
                this._MenuName = value;
            }
        }
    }
}

