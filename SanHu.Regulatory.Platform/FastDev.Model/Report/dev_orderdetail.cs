namespace NE.Model.Report
{
    using System;
    using System.Runtime.CompilerServices;

    public class dev_orderdetail
    {
        public string ID
        {
             get;
             set;
        }
        public string ProductID
        {
             get;
             set;
        }
        public decimal? UnitPrice
        {
             get;
             set;
        }
        public int? Number
        {
             get;
             set;
        }
        public decimal? Total
        {
             get;
             set;
        }
        public string Remarks
        {
             get;
             set;
        }
        public string OrderID
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