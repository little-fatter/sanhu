namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_user : FastDev.Model.Core.Entity.core_user
    {
        
        private IList<string> _Department;
        
        private IList<IList<string>> _Role;

        public IList<string> Department
        {
            
            get
            {
                return this._Department;
            }
            
            set
            {
                this._Department = value;
            }
        }

        public IList<IList<string>> Role
        {
            
            get
            {
                return this._Role;
            }
            
            set
            {
                this._Role = value;
            }
        }
    }
}

