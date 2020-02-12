using System;
using System.Net.NetworkInformation;
using System.Runtime.InteropServices;
using System.Web;

namespace FastDev.DevDB.Auth
{
	public class SoftReg
	{
		public int[] intCode;

		public int[] intNumber;

		public char[] Charcode;

		public string GetDiskVolumeSerialNumber()
		{
            string os = RuntimeInformation.IsOSPlatform(OSPlatform.Linux) ? "1" : "0";
            os += RuntimeInformation.IsOSPlatform(OSPlatform.OSX) ? "1" : "0";
            os += RuntimeInformation.IsOSPlatform(OSPlatform.Windows) ? "1" : "0";
            os += RuntimeInformation.OSArchitecture + RuntimeInformation.OSDescription + RuntimeInformation.ProcessArchitecture;
            return os;

        }
        /// <summary>
        /// 获取电脑 MAC（物理） 地址
        /// </summary>
        /// <returns></returns>
        public string GetMACIp()
        {
            //本地计算机网络连接信息
            IPGlobalProperties computerProperties = IPGlobalProperties.GetIPGlobalProperties();
            //获取本机所有网络连接
            NetworkInterface[] nics = NetworkInterface.GetAllNetworkInterfaces();

            //获取本机电脑名
            var HostName = computerProperties.HostName;
            //获取域名
            var DomainName = computerProperties.DomainName;

            if (nics == null || nics.Length < 1)
            {
                return "";
            }

            var MACIp = "";
            foreach (NetworkInterface adapter in nics)
            {
                var adapterName = adapter.Name;

                var adapterDescription = adapter.Description;
                var NetworkInterfaceType = adapter.NetworkInterfaceType;
                if (adapterName == "本地连接")
                {
                    PhysicalAddress address = adapter.GetPhysicalAddress();
                    byte[] bytes = address.GetAddressBytes();

                    for (int i = 0; i < bytes.Length; i++)
                    {
                        MACIp += bytes[i].ToString("X2");

                        if (i != bytes.Length - 1)
                        {
                            MACIp += "-";
                        }
                    }
                }
            }

            return MACIp;
        }
        public string getCpu()
		{
			
			return GetMACIp();
		}

		public string getMNum()
		{
			string cpu = getCpu();
			string diskVolumeSerialNumber = GetDiskVolumeSerialNumber();
			string text = cpu + diskVolumeSerialNumber;
			return text.Substring(0, 24);
		}

		public void setIntCode()
		{
			for (int i = 1; i < intCode.Length; i++)
			{
				intCode[i] = i % 9;
			}
		}

		public string getRNum()
		{
			setIntCode();
			string mNum = getMNum();
			for (int i = 1; i < Charcode.Length; i++)
			{
				Charcode[i] = Convert.ToChar(mNum.Substring(i - 1, 1));
			}
			for (int j = 1; j < intNumber.Length; j++)
			{
				intNumber[j] = intCode[Convert.ToInt32(Charcode[j])] + Convert.ToInt32(Charcode[j]);
			}
			string text = "";
			for (int j = 1; j < intNumber.Length; j++)
			{
				text = ((intNumber[j] < 48 || intNumber[j] > 57) ? ((intNumber[j] < 65 || intNumber[j] > 90) ? ((intNumber[j] < 97 || intNumber[j] > 122) ? ((intNumber[j] <= 122) ? (text + Convert.ToChar(intNumber[j] - 9).ToString()) : (text + Convert.ToChar(intNumber[j] - 10).ToString())) : (text + Convert.ToChar(intNumber[j]).ToString())) : (text + Convert.ToChar(intNumber[j]).ToString())) : (text + Convert.ToChar(intNumber[j]).ToString()));
			}
			return text;
		}

		public SoftReg()
		{
			
			intCode = new int[127];
			intNumber = new int[25];
			Charcode = new char[25];
			
		}
	}
}
