namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_autoCode : FastDev.Model.Core.Entity.core_autoCode
    {
        
        private IList<string> _ModeField;
        
        private IList<string> _Model;

        public IList<string> ModeField
        {
            
            get
            {
                return this._ModeField;
            }
            
            set
            {
                this._ModeField = value;
            }
        }

        public IList<string> Model
        {
            
            get
            {
                return this._Model;
            }
            
            set
            {
                this._Model = value;
            }
        }
    }
}

