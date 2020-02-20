namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class hasAttach : FastDev.Model.Entity.hasAttach
{
public IList<string> Enclosure
{
get;
set;
}
public IList<IList<string>> AttachmentMultiple
{
get;
set;
}
}

}
