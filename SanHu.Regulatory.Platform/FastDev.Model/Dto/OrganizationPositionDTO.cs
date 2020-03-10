namespace FD.Model.Dto
{
    public class OrganizationPositionDTO
    {

        /// <summary>
        /// 组织机构Id
        /// </summary>
        public long OrganizationId { get; set; }

        /// <summary>
        /// 职位Id
        /// </summary>
        public long? PositionId { get; set; }

        /// <summary>
        /// 职位名称
        /// </summary>
        public string Position { get; set; }
    }
}
