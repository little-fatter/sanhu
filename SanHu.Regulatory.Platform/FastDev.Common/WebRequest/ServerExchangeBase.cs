using System.Text;

namespace FastDev.Common
{
    public class ServerExchangeBase
    {
        public string GetStringFromServer(string sUrl, string functionName, string paramString)
        {
            WebMethod wbp = new WebMethod();
            wbp.Referer = sUrl;
            wbp.ReqResult = "";
            wbp.Encode = Encoding.UTF8;
            wbp.Method = "POST";
            wbp.PostString = "";
            wbp.ContentType = "application/x-www-form-urlencoded";
            wbp.Accept = "application/javascript, */*;q=0.8";
            wbp.ReqUrl = sUrl + functionName;
            wbp.PostString = paramString;
            string rev = wbp.UpLoadString(true);
            return rev;
        }
        public string GetStringFromServer(string functionName, string paramString)
        {
            return GetStringFromServer(ConfigurationManager.AppSettings["remote1"] + "/api/", functionName, paramString);
        }
        protected T GetDataFromServer<T>(string functionName, string paramString) where T : class,new()
        {
            var revStr = GetStringFromServer(functionName, paramString);
            if (revStr == string.Empty || revStr == "null")
            {//超时
                return null;
            }
            else
            {
                T lRev = JsonHelper.DeserializeJsonToObject<T>(revStr);
                return lRev;
            }
        }
    }
}
