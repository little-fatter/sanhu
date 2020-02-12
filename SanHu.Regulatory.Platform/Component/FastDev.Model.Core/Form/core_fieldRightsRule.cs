namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_fieldRightsRule : FastDev.Model.Core.Entity.core_fieldRightsRule
    {
        
        private IList<string> _Model;
        
        private IList<IList<string>> _Roles;

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

        public IList<IList<string>> Roles
        {
            
            get
            {
                return this._Roles;
            }
            
            set
            {
                this._Roles = value;
            }
        }
    }
}

