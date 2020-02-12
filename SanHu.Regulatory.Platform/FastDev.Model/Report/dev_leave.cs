namespace NE.Model.Report
{
    using System;
    using System.Runtime.CompilerServices;

    public class dev_leave
    {
        public string ID
        {
             get;
             set;
        }
        public string Title
        {
             get;
             set;
        }
        public string Content
        {
             get;
             set;
        }
        public int? Leavedays
        {
             get;
             set;
        }
        public DateTime? Starttime
        {
             get;
             set;
        }
        public DateTime? Endtime
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