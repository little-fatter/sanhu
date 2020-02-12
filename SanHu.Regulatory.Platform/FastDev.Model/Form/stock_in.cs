namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class stock_in : FastDev.Model.Entity.stock_in
{
public IList<stock_indetails> Details
{
get;
set;
}
public IList<string> Supplier
{
get;
set;
}
}

}
