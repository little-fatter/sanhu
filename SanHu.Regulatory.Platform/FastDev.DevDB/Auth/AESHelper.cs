using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace FastDev.DevDB.Auth
{/// <summary>
 /// AES
 /// </summary>
    public class AESHelper
    {

        /// <summary>
        /// 获得密钥
        /// </summary>
        /// <returns>密钥</returns>
        private static byte[] GetLegalKey(SymmetricAlgorithm mobjCryptoService, string sKey)
        {
            mobjCryptoService.GenerateKey();

            byte[] bytTemp = mobjCryptoService.Key;
            int KeyLength = bytTemp.Length;

            if (sKey.Length > KeyLength)
                sKey = sKey.Substring(0, KeyLength);
            else if (sKey.Length < KeyLength)
                sKey = sKey.PadRight(KeyLength, '+');
            return ASCIIEncoding.ASCII.GetBytes(sKey);
        }

        /// <summary>
        /// 获得初始向量IV
        /// </summary>
        /// <returns>初始向量IV</returns>
        private static byte[] GetLegalIV(SymmetricAlgorithm mobjCryptoService)
        {
            string sKey = "E4ghj*Ghg7!rNIfb&95GUY86GfghUb#er57HBh(u%g6HJ($jhWk7&!hg4ui%$hjk";
            mobjCryptoService.GenerateIV();
            byte[] bytTemp = mobjCryptoService.IV;
            int IVLength = bytTemp.Length;
            if (sKey.Length > IVLength)
                sKey = sKey.Substring(0, IVLength);
            else if (sKey.Length < IVLength)
                sKey = sKey.PadRight(IVLength, ' ');
            return ASCIIEncoding.ASCII.GetBytes(sKey);
        }

        /// <summary>
        /// 加密方法
        /// </summary>
        /// <param name="Source">待加密的串</param>
        /// <param name="sKey">密码</param>
        /// <returns>经过加密的串</returns>
        public static string EncryptString(string Source, string sKey)
        {
            byte[] bytIn = UTF8Encoding.UTF8.GetBytes(Source);
            using (MemoryStream ms = new MemoryStream())
            {
                SymmetricAlgorithm mobjCryptoService = new RijndaelManaged();
                mobjCryptoService.Key = GetLegalKey(mobjCryptoService, sKey);
                mobjCryptoService.IV = GetLegalIV(mobjCryptoService);
                ICryptoTransform encrypto = mobjCryptoService.CreateEncryptor();
                CryptoStream cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Write);
                cs.Write(bytIn, 0, bytIn.Length);
                cs.FlushFinalBlock();
                ms.Close();
                byte[] bytOut = ms.ToArray();
                StringBuilder strB = new StringBuilder();
                for (int i = 0; i < bytOut.Length; i++)
                {
                    strB.Append(bytOut[i].ToString("X2"));
                }

                return strB.ToString();
            }
        }
        /// <summary>
        /// 将16进制的字符串转为byte[]
        /// </summary>
        /// <param name="hexString"></param>
        /// <returns></returns>
        private static byte[] HexStrToByte(string hexString)
        {
            hexString = hexString.Replace(" ", "");
            if ((hexString.Length % 2) != 0)
                hexString += " ";
            byte[] returnBytes = new byte[hexString.Length / 2];
            for (int i = 0; i < returnBytes.Length; i++)
                returnBytes[i] = Convert.ToByte(hexString.Substring(i * 2, 2), 16);
            return returnBytes;
        }
        /// <summary>
        /// 解密方法
        /// </summary>
        /// <param name="Source">待解密的串</param>
        /// <param name="sKey">密码</param>
        /// <returns>经过解密的串</returns>
        public static string DecryptString(string Source, string sKey)
        {
            byte[] bytIn = HexStrToByte(Source);
            using (MemoryStream ms = new MemoryStream(bytIn, 0, bytIn.Length))
            {
                SymmetricAlgorithm mobjCryptoService = new RijndaelManaged();
                mobjCryptoService.Key = GetLegalKey(mobjCryptoService, sKey);
                mobjCryptoService.IV = GetLegalIV(mobjCryptoService);
                ICryptoTransform encrypto = mobjCryptoService.CreateDecryptor();
                CryptoStream cs = new CryptoStream(ms, encrypto, CryptoStreamMode.Read);
                StreamReader sr = new StreamReader(cs);
                return sr.ReadToEnd();
            }
        }

    }
}
