namespace FastDev.Model.Core.Entity
{
    using System;
    using System.Runtime.CompilerServices;

    public class Common
    {
        public DateTime? CreateDate { get; set; }

        public string CreateUserID { get; set; }

        public string ID { get; set; }

        public DateTime? ModifyDate { get; set; }

        public string ModifyUserID { get; set; }

        public string Status { get; set; }
    }
}

