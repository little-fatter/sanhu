namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_userRole
    {
        
        private string _coreroleID;
        
        private string _coreuserID;
        
        private string _ID;

        public string coreroleID
        {
            
            get
            {
                return this._coreroleID;
            }
            
            set
            {
                this._coreroleID = value;
            }
        }

        public string coreuserID
        {
            
            get
            {
                return this._coreuserID;
            }
            
            set
            {
                this._coreuserID = value;
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

