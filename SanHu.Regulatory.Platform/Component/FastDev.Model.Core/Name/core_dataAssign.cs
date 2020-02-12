namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_dataAssign
    {
        
        private string _ID;
        
        private string _ModelName;

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

        public string ModelName
        {
            
            get
            {
                return this._ModelName;
            }
            
            set
            {
                this._ModelName = value;
            }
        }
    }
}

