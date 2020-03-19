using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
    /// <summary>
    /// 请求四方德信平台api输入数据
    /// </summary>
    public class SFApiDTO
    {
        public string ObjId { get; set; }

        public string ApiType { get; set; }

        public LawFilter filter { get; set; }

        public string keyword { get; set; }

        public string pageNo { get; set; }

        public string pageSize { get; set; }
    }

    public class LawFilter
    {
        public string keyWord { get; set; }

        public string lawRuleFileId { get; set; }
    }
}
