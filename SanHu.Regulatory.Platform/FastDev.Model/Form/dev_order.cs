namespace NE.Model.Form
{
    using System;
    using System.Collections.Generic; 

    public class dev_order : NE.Model.Entity.dev_order
    {
        public IList<dev_orderdetail> Detailed
        {
             get;
             set;
        }
        public IList<string> Ordertype
        {
             get;
             set;
        }
    }
} 