using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FastDev.IServices
{
    public interface IAuthorizationServices: IApplicationServices
    {
        /// <summary>
        /// 去授权
        /// </summary>
        /// <returns>是否成功</returns>
        Task<bool> ToAuthor();
    }
}
