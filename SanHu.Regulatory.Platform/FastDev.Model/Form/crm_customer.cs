namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class crm_customer : FastDev.Model.Entity.crm_customer
{
public IList<string> Industry
{
get;
set;
}
public IList<string> Clientarea
{
get;
set;
}
public IList<string> Province
{
get;
set;
}
public IList<string> City
{
get;
set;
}
public IList<string> CustomerType
{
get;
set;
}
public IList<crm_customerContract> Contracts
{
get;
set;
}
public IList<string> Customerlevel
{
get;
set;
}
public IList<string> CustomerCategory
{
get;
set;
}
public IList<string> CustomerLevel
{
get;
set;
}
}

}
