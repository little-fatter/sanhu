using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Model.Dto
{
   public class form_confiscated_itemFinishReq : FormReqBase
    {
        /// <summary>
        /// 没收物品列表
        /// </summary>
        public List<form_confiscated_item> formConfiscatedItems { get; set; }

    }
}
