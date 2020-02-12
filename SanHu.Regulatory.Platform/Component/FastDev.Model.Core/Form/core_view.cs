namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class core_view : FastDev.Model.Core.Entity.core_view
    {
       
        public IList<string> Model
        {
            get;set;
        }

        public IList<string> Module
        {
            get;set;
        }
    }
}

