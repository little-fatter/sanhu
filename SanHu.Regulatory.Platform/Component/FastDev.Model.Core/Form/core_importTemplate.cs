namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_importTemplate : FastDev.Model.Core.Entity.core_importTemplate
    {
        
        private IList<FastDev.Model.Core.Form.core_importTemplateDetail> _Details;

        public IList<FastDev.Model.Core.Form.core_importTemplateDetail> Details
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
    }
}

