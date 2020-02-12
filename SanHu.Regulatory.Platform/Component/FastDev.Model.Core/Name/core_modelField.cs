namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_modelField
    {
        
        private string _FieldTitle;
        
        private string _ID;

        public string FieldTitle
        {
            
            get
            {
                return this._FieldTitle;
            }
            
            set
            {
                this._FieldTitle = value;
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

