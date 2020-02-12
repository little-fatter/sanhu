namespace NE.Model.Form
{
    using System;
    using System.Collections.Generic; 

    public class dev_orderdetail : NE.Model.Entity.dev_orderdetail
    {
        public IList<string> Product
        {
             get;
             set;
        }
    }
} 