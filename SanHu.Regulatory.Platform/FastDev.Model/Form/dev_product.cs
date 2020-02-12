namespace NE.Model.Form
{
    using System;
    using System.Collections.Generic; 

    public class dev_product : NE.Model.Entity.dev_product
    {
        public IList<string> Producttype
        {
             get;
             set;
        }
    }
} 