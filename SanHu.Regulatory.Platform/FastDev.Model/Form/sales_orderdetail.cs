namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class sales_orderdetail : FastDev.Model.Entity.sales_orderdetail
{
public IList<string> Products
{
get;
set;
}
public IList<string> Warehouse
{
get;
set;
}
public IList<string> Unit
{
get;
set;
}
}

}
