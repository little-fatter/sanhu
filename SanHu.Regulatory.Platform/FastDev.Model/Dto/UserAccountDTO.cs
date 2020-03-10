
using System;

namespace FD.Model.Dto
{
    /// <summary>
    /// 用户账户信息传输对象（其依赖于某个工具而存在）
    /// </summary>
    public class UserAccountDTO 
    {
        public long? Id { get; set; }
        /// <summary>
        /// 用户登录名
        /// </summary>
        public string AccountId { get; set; }

        /// <summary>
        /// 微信登录唯一标识符
        /// </summary>
        public string Thirdparty { get; set; }
        /// <summary>
        /// 用户姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 租户Id
        /// </summary>
        public long TenantId { get; set; }
        public string Mobile { get; set; }
        public bool Sex { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Remark { get; set; }
        /// <summary>
        /// 账号有效期开始时间
        /// </summary>
        public DateTime? StartTime { get; set; }
        /// <summary>
        /// 账号有效期结束时间
        /// </summary>
        public DateTime? EndTime { get; set; }

        /// <summary>
        /// 自定义的排序字段
        /// </summary>
        public int? Index { get; set; }

        /// <summary>
        /// 关联的角色ID列表
        /// </summary>
        public string[] RoleIds { get; set; }

        /// <summary>
        /// 用户关联的组织或职位
        /// </summary>
        public OrganizationPositionDTO[] OrganizationPositionList { get; set; }
        public DateTime? CreateTime { get; set; }
        public string Creator { get; set; }
        public string CreatorId { get; set; }
        public DateTime? UpdateTime { get; set; }
        public string Updator { get; set; }
        public string UpdatorId { get; set; }
    }
}
