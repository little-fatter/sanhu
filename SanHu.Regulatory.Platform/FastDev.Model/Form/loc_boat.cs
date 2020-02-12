namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class loc_boat : FastDev.Model.Entity.loc_boat
{
public IList<string> Shipowner
{
get;
set;
}
public IList<string> Lake
{
get;
set;
}
public IList<IList<string>> ShipAttach
{
get;
set;
}
public IList<IList<string>> FishGear
{
get;
set;
}
}

}
