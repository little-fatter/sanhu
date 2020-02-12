namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class case_order : FastDev.Model.Entity.case_order
{
public IList<string> customer
{
get;
set;
}
public IList<case_orderDetail> orderdetails
{
get;
set;
}
}

}
