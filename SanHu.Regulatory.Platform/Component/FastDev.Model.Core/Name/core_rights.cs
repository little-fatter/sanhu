namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_rights
    {
        
        private string _ID;
        
        private string _Remark;

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

        public string Remark
        {
            
            get
            {
                return this._Remark;
            }
            
            set
            {
                this._Remark = value;
            }
        }
    }
}

