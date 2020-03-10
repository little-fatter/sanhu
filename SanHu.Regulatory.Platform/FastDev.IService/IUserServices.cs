using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using FD.Model.Dto;

namespace FastDev.IServices
{
    /// <summary>
    /// 框架用户服务
    /// </summary>
    public interface IUserServices : IApplicationServices
    {
        /// <summary>
        /// 获取用户明细
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<UserDetailsDTO> GetUserDetails(string userId);
    }
}
