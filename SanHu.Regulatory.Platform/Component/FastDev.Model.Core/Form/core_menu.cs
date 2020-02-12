namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_menu : FastDev.Model.Core.Entity.core_menu
    {
        
        private IList<string> _Parent;
        
        private IList<string> _View;

        public IList<string> Parent
        {
            
            get
            {
                return this._Parent;
            }
            
            set
            {
                this._Parent = value;
            }
        }

        public IList<string> View
        {
            
            get
            {
                return this._View;
            }
            
            set
            {
                this._View = value;
            }
        }
    }
}

