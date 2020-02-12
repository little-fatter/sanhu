namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_log : FastDev.Model.Core.Entity.core_log
    {
        
        private IList<string> _User;

        public IList<string> User
        {
            
            get
            {
                return this._User;
            }
            
            set
            {
                this._User = value;
            }
        }
    }
}

