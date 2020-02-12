namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_user
    {
        
        private string _ID;
        
        private string _RealName;

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

        public string RealName
        {
            
            get
            {
                return this._RealName;
            }
            
            set
            {
                this._RealName = value;
            }
        }
    }
}

