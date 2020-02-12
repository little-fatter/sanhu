namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_role
    {
        
        private string _ID;
        
        private string _RoleName;

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

        public string RoleName
        {
            
            get
            {
                return this._RoleName;
            }
            
            set
            {
                this._RoleName = value;
            }
        }
    }
}

