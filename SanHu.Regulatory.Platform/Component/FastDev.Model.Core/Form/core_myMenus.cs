namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_myMenus : FastDev.Model.Core.Entity.core_myMenus
    {
        
        private IList<string> _Menu;
        
        private IList<string> _User;

        public IList<string> Menu
        {
            
            get
            {
                return this._Menu;
            }
            
            set
            {
                this._Menu = value;
            }
        }

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

