namespace FastDev.Model.Form
{
   using System;
   using System.Collections.Generic;
public partial class event_info : FastDev.Model.Entity.event_info
{
public IList<string> EventState
{
get;
set;
}
public IList<string> ConfirmEventType
{
get;
set;
}
public IList<string> ReportEventType
{
get;
set;
}
}

}
