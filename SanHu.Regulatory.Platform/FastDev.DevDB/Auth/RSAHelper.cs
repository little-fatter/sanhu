using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;

namespace FastDev.DevDB.Auth
{
    public static class RSAHelper
    {

        public static bool CheckSourceValidate(string source)
        {
            return 117 >= source.Length;
        }

        private static string DoContentCombine(byte[] byte_0, byte[] byte_1)
        {
            List<byte> list = new List<byte>();
            list.Add((byte)byte_0.Length);
            list.AddRange(byte_0);
            list.AddRange(byte_1);
            byte[] inArray = Enumerable.ToArray(list);
            return Convert.ToBase64String(inArray);
        }
        /// <summary>
        /// 将密码分成两个部分
        /// </summary>
        /// <param name="strKey"></param>
        /// <param name="byteKeyOne"></param>
        /// <param name="byteKeyTow"></param>
        private static void DoKeySplit(string strKey, out byte[] byteKeyOne, out byte[] byteKeyTow)
        {
            byte[] array = Convert.FromBase64String(strKey);
            byteKeyOne = new byte[array[0]];
            byteKeyTow = new byte[array.Length - array[0] - 1];
            int i = 1;
            int num = 0;
            int num2 = 0;
            for (; i < array.Length; i++)
            {
                if (i <= array[0])
                {
                    byteKeyOne[num++] = array[i];
                }
                else
                {
                    byteKeyTow[num2++] = array[i];
                }
            }
        }

        public static string EncryptString(string source, string publicKey)
        {
            RSAEncryptBase RC = new RSAEncryptBase();
            return RC.RSAEncrypt(publicKey, source);
        }

        public static string DecryptString(string encryptString, string privateKey)
        {
            RSAEncryptBase RC = new RSAEncryptBase();
            return RC.RSADecrypt(privateKey, encryptString);
        }

        /// <summary>
        /// 进行数字签名
        /// </summary>
        /// <param name="Data"></param>
        /// <returns></returns>
        public static string SiginData(string Data, string PrivateKey)
        {
            string m_strHashbyteSignature = "";
            string m_strEncryptedSignatureData = "";
            RSAEncryptBase RC = new RSAEncryptBase();
            if (RC.GetHash(Data, ref m_strHashbyteSignature) == false)
            {
                throw new Exception("输入数据有误");
            }
            if (RC.SignatureFormatter(PrivateKey, m_strHashbyteSignature, ref m_strEncryptedSignatureData) == false)
            {
                throw new Exception("RSA数字签名错误！");
            }
            return m_strEncryptedSignatureData;
        }
        /// <summary>
        /// 数字签名验证
        /// </summary>
        /// <param name="Data"></param>
        /// <param name="EncryptedSignatureData"></param>
        /// <returns></returns>
        public static bool SiginCheck(string Data, string EncryptedSignatureData, string PublicKey)
        {
            string m_strHashbyteDeformatter = "";
            RSAEncryptBase RC = new RSAEncryptBase();
            if (RC.GetHash(Data, ref m_strHashbyteDeformatter) == false)
            {
                throw new Exception("输入数据有误");
            }

            if (RC.SignatureDeformatter(PublicKey, m_strHashbyteDeformatter, EncryptedSignatureData) == false)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
