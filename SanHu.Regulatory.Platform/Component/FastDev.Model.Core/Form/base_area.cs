namespace FastDev.Model.Core.Form
{
    using FastDev.Model.Core.Entity;
    using System;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;

    public class base_area : FastDev.Model.Core.Entity.base_area
    {
        public IList<string> Parent { get; set; }
    }
}

