namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_model : FastDev.Model.Core.Entity.core_model
    {
        
        private IList<FastDev.Model.Core.Form.core_modelField> _Fields;
        
        private IList<string> _Module;

        public IList<FastDev.Model.Core.Form.core_modelField> Fields
        {
            
            get
            {
                return this._Fields;
            }
            
            set
            {
                this._Fields = value;
            }
        }

        public IList<string> Module
        {
            
            get
            {
                return this._Module;
            }
            
            set
            {
                this._Module = value;
            }
        }
    }
}

