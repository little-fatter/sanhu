using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    public class GetProcessReq
    {
       public string OriUserId { get; set; }
        public string OriDeptId { get; set; }
        public string taskUserId { get; set; }
        public string OpeUserId { get; set; }
        public int pageIndex{get;set;}
        public int pageSize{get;set;}
    }
}
