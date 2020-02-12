namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class stock_out : FastDev.Model.Entity.stock_out
{
public IList<stock_outdetails> Details
{
get;
set;
}
public IList<string> Customer
{
get;
set;
}
}

}
