namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_exportTemplateDetail : FastDev.Model.Core.Entity.core_exportTemplateDetail
    {
        
        private IList<string> _ModeField;

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
    }
}

