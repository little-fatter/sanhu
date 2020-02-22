using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Common
{
    public static class CreateGuid
    {
        /// <summary>
        /// guid字符串
        /// </summary>
        /// <returns></returns>
        public static string CreateId()
        {
            return Guid.NewGuid().ToString().Replace("-", string.Empty);
        }
    }
}
