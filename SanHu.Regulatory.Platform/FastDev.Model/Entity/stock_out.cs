namespace FastDev.Model.Entity
{
  using System;
 using System.Runtime.CompilerServices;
public partial class stock_out
{
public string ID
{
get;
set;
}
public DateTime? OrderDate
{
get;
set;
}
public string OrderNo
{
get;
set;
}
public string Remark
{
get;
set;
}
public string CustomerID
{
get;
set;
}
public string OutType
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
