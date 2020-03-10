
namespace FD.Model.Dto
{
    public class RoleDetailsDTO
    {
        public string Id { get; set; }
        public string Name { get; set; }
        /// <summary>
        /// 是否是系统默认角色
        /// </summary>
        public bool IsDefault { get; set; }

        public bool IsToolAdmin { get; set; }

        public string Remark { get; set; }

        /// <summary>
        /// 角色等级枚举名称
        /// </summary>
        public string LevelEnumName { get; set; }

        /// <summary>
        /// 角色等级枚举值Id
        /// </summary>
        public long? LevelEnumItemId { get; set; }

        /// <summary>
        /// 角色等级枚举Item名称
        /// </summary>
        public string LevelEnumItemName { get; set; }
        /// <summary>
        /// 角色等级枚举Item值
        /// </summary>
        public int? LevelEnumValue { get; set; }

        /// <summary>
        /// 业务类型枚举名称
        /// </summary>
        public string BizTypeEnumName { get; set; }

        /// <summary>
        /// 业务类型枚举值Id
        /// </summary>
        public long? BizTypeEnumItemId { get; set; }

        /// <summary>
        /// 业务类型枚举Item名称
        /// </summary>
        public string BizTypeEnumItemName { get; set; }
        /// <summary>
        /// 业务类型枚举Item值
        /// </summary>
        public int? BizTypeEnumValue { get; set; }
    }
}
