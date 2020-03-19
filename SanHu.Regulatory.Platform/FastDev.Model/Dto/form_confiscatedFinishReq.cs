using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
   public class form_confiscatedFinishReq : FormReqBase
    {
        /// <summary>
        /// 没收清单
        /// </summary>
        public form_confiscated formConfiscated { get; set; }
        /// <summary>
        /// 没收物品列表
        /// </summary>
        public List<form_confiscated_item> formConfiscatedItems { get; set; }

    }
}
