using System.Collections.Generic;

namespace FD.Model.Dto
{
    public class UserDetailsDTO : UserAccountDTO
    {
        public List<RoleDetailsDTO> Roles { get; set; }
        public List<UserOrganizationInfoDTO> Organizations { get; set; }
    }
}
