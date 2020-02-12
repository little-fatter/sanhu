namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_autoCodeInfo : FastDev.Model.Core.Entity.core_autoCodeInfo
    {
        
        private IList<string> _AutoCode;

        public IList<string> AutoCode
        {
            
            get
            {
                return this._AutoCode;
            }
            
            set
            {
                this._AutoCode = value;
            }
        }
    }
}

