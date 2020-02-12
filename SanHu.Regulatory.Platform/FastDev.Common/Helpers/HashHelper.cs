using System;
using System.Security.Cryptography;
using System.Text;

namespace FastDev.Common.Helpers
{
    public class HashHelper
    {
        public static string GetMd5(string value)
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.UTF8.GetBytes(value));
                var strResult = BitConverter.ToString(result);
                string result3 = strResult.Replace("-", "");
                return result3;
            }
        }
    }
}
