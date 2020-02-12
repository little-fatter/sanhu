namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_exportTemplate : FastDev.Model.Core.Entity.core_exportTemplate
    {
        
        private IList<FastDev.Model.Core.Form.core_exportTemplateDetail> _Details;
        
        private IList<string> _Model;

        public IList<FastDev.Model.Core.Form.core_exportTemplateDetail> Details
        {
            
            get
            {
                return this._Details;
            }
            
            set
            {
                this._Details = value;
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

