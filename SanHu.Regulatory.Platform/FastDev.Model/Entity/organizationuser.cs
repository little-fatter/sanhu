namespace FastDev.Model.Entity
{
    using System;
    using System.Runtime.CompilerServices;
    public partial class organizationuser
    {
        public string Id
        {
            get;
            set;
        }
        public string OrganizationId
        {
            get;
            set;
        }
        public string UserId
        {
            get;
            set;
        }
        public string PositionId
        {
            get;
            set;
        }
        public string Position
        {
            get;
            set;
        }
    }

}
