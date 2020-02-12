namespace NE.Model.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class dev_productType
    {
        public string ID
        {
             get;
             set;
        }
        public string Typename
        {
             get;
             set;
        }
        public string Description
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