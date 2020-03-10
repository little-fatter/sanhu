namespace FD.Model.Dto
{
    public class UserOrganizationInfoDTO
    {
        /// <summary>
        /// 组织机构Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 组织机构名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 父级组织机构Id
        /// </summary>
        public long ParentId { get; set; }

        /// <summary>
        /// 组织机构级别
        /// </summary>
        public int Level { get; set; }

        /// <summary>
        /// 组织机构的地址位置纬度
        /// </summary>
        public float? Latitude { get; set; }
        /// <summary>
        /// 组织机构的地址位置经度
        /// </summary>
        public float? Longitude { get; set; }

        /// <summary>
        /// 行政区划Id
        /// </summary>
        public string AreaId { get; set; }

        /// <summary>
        /// 父级行政区划Id
        /// </summary>
        public string ParentAreaId { get; set; }

        /// <summary>
        /// 行政区划名称
        /// </summary>
        public string AreaName { get; set; }

        /// <summary>
        /// 行政区划级别
        /// </summary>
        public int AreaLevel { get; set; }

        /// <summary>
        /// 职位Id
        /// </summary>
        public long? PositionId { get; set; }

        /// <summary>
        /// 用户职位名称
        /// </summary>
        public string UserPosition { get; set; }
    }

    public class OrganizationInfoUsersDTO
    {

        public long Id { get; set; }
        /// <summary>
        /// 用于登录名
        /// </summary>
        public string AccountId { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public bool Sex { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Remark { get; set; }
        public string Position { get; set; }
    }
}
