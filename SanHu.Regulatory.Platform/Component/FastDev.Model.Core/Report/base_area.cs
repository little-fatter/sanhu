namespace FastDev.Model.Core.Report
{
    using System;
    using System.Runtime.CompilerServices;

    public class base_area
    {
        public DateTime? CreateDate { get; set; }

        public string CreateUserID { get; set; }

        public string ID { get; set; }

        public DateTime? ModifyDate { get; set; }

        public string ModifyUserID { get; set; }

        public string ParentID { get; set; }

        public string Remarks { get; set; }

        public string Status { get; set; }

        public string Title { get; set; }

        public string Type { get; set; }
    }
}

