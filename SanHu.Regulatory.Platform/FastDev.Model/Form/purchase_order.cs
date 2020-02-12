namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class purchase_order : FastDev.Model.Entity.purchase_order
{
public IList<purchase_orderdetail> Details
{
get;
set;
}
public IList<string> Supplier
{
get;
set;
}
public IList<string> Purchaser
{
get;
set;
}
public IList<string> Warehouse
{
get;
set;
}
public IList<string> Account
{
get;
set;
}
}

}
