namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class crm_supplier : FastDev.Model.Entity.crm_supplier
{
public IList<string> SupplierCategory
{
get;
set;
}
public IList<crm_supplierContract> Contracts
{
get;
set;
}
}

}
