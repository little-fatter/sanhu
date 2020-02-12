namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_modelField : FastDev.Model.Core.Entity.core_modelField
    {
        
        private IList<string> _Model;

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

