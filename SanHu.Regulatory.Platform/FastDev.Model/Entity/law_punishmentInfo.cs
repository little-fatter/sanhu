namespace FastDev.Model.Entity
{
  using System;
 using System.Runtime.CompilerServices;
public partial class law_punishmentInfo
{
public string ID
{
get;
set;
}
public string EventInfoId
{
get;
set;
}
public string CaseId
{
get;
set;
}
public string PreviousformID
{
get;
set;
}
public string Illegalfacts
{
get;
set;
}
public string IllegalbasisIDs
{
get;
set;
}
public string PunishmentbasisIDs
{
get;
set;
}
public string Punishmentdecision
{
get;
set;
}
public bool Isfine
{
get;
set;
}
public bool IsConfiscationgoods
{
get;
set;
}
public string Amountofpenalty
{
get;
set;
}
public string PaymentmethodID
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

        public string TaskId { get; set; }
}

}
