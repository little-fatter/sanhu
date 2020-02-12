namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class erp_processing : FastDev.Model.Entity.erp_processing
{
public IList<string> OldProduct
{
get;
set;
}
public IList<string> NewProduct
{
get;
set;
}
public IList<string> NewWarehouse
{
get;
set;
}
public IList<string> OldWarehouse
{
get;
set;
}
}

}
