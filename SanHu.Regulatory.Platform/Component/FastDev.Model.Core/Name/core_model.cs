namespace FastDev.Model.Core.Name
{
    using System;
    using System.Runtime.CompilerServices;

    public class core_model
    {
        
        private string _ID;
        
        private string _ModelTitle;

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

        public string ModelTitle
        {
            
            get
            {
                return this._ModelTitle;
            }
            
            set
            {
                this._ModelTitle = value;
            }
        }
    }
}

