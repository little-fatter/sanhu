namespace FastDev.Model.Entity
{
  using System;
 using System.Runtime.CompilerServices;
public partial class case_order
{
public string ID
{
get;
set;
}
public string customerID
{
get;
set;
}
public string Ordertitle
{
get;
set;
}
public decimal? Amount
{
get;
set;
}
public decimal? Payment
{
get;
set;
}
public string remarks
{
get;
set;
}
public DateTime? Orderdate
{
get;
set;
}
public DateTime? CreateDate
{
get;
set;
}
public string CreateUserID
{
get;
set;
}
public DateTime? ModifyDate
{
get;
set;
}
public string ModifyUserID
{
get;
set;
}
public string Status
{
get;
set;
}
}

}
