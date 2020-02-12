namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class sales_order : FastDev.Model.Entity.sales_order
{
public IList<string> Purchaser
{
get;
set;
}
public IList<sales_orderdetail> Details
{
get;
set;
}
public IList<string> Customer
{
get;
set;
}
public IList<string> SalesMan
{
get;
set;
}
}

}
