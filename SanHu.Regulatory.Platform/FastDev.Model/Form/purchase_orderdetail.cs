namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class purchase_orderdetail : FastDev.Model.Entity.purchase_orderdetail
{
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
public IList<string> Products
{
get;
set;
}
}

}
