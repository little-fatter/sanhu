namespace NE.Model.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class dev_order
    {
        public string ID
        {
             get;
             set;
        }
        public string Price
        {
             get;
             set;
        }
        public string Customer
        {
             get;
             set;
        }
        public string Remarks
        {
             get;
             set;
        }
        public string OrderNo
        {
             get;
             set;
        }
        public decimal? TotalPrice
        {
             get;
             set;
        }
        public string OrdertypeID
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