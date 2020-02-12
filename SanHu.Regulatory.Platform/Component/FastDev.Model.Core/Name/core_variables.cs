namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_variables
    {
        
        private string _ID;
        
        private string _VariableTitle;

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

        public string VariableTitle
        {
            
            get
            {
                return this._VariableTitle;
            }
            
            set
            {
                this._VariableTitle = value;
            }
        }
    }
}

