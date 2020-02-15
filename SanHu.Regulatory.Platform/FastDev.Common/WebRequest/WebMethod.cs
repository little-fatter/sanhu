using System;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Text;

namespace FastDev.Common
{
    public class WebMethod
    {

        private Encoding _Encode = Encoding.UTF8;
        /// <summary>
        /// 网站的编码
        /// </summary>
        public Encoding Encode
        {
            get
            {
                return _Encode;
            }
            set
            {
                _Encode = value;
            }
        }
        private string _contentType = "application/x-www-form-urlencoded";
        public string ContentType
        {
            get
            {
                if (_postString == null || _postString == "" || _method.ToLower() == "get") return null;
                return _contentType;
            }
            set
            {
                if (value == null || value == "") { _contentType = null; return; }
                _contentType = value;
            }
        }

        private string _postString = "";
        public string PostString
        {
            get
            {
                return _postString;
            }
            set
            {
                _postString = value;
            }
        }



        private string _referer;

        public string Referer
        {
            get { return _referer; }
            set { _referer = value; }
        }

        private string _userAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
        public string UserAgent
        {
            get
            {
                return _userAgent;
            }
            set
            {
                _userAgent = value;
            }
        }
        private string _method = "post";

        public string Method
        {
            get { return _method; }
            set { _method = value; }
        }

        //请求地址
        private string _reqUrl;
        /// <summary>
        /// 请求的地址
        /// </summary>
        public string ReqUrl
        {
            get { return _reqUrl; }
            set { _reqUrl = value; }
        }

        //请求结果
        private string _reqResult;

        public string ReqResult
        {
            get { return _reqResult; }
            set { _reqResult = value; }
        }
        private string _accept = "image/gif, image/jpeg, image/pjpeg, image/pjpeg, application/x-shockwave-flash, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/msword, application/x-ms-application, application/x-ms-xbap, application/vnd.ms-xpsdocument, application/xaml+xml, */*";
        public string Accept
        {
            get
            {
                return _accept;
            }
            set
            {
                if (value != string.Empty)
                {
                    _accept = value;
                }

            }
        }
       
        public string UploadPendData(string fieldName, string filePath, string fields)
        {
            return "";
        }
        /// <summary>
        /// 将本地文件上传到指定的服务器(HttpWebRequest方法)
        /// </summary>
        /// <param name="fileNamePath">文件路径名称</param>
        /// <param name="pendData"></param>
        /// <returns>成功返回1，失败返回0</returns>
        public string Upload_Request(string fileNamePath, string pendData)
        {
            int returnValue = 1;

            // 要上传的文件
            FileStream fs = new FileStream(fileNamePath, FileMode.Open, FileAccess.Read);
            BinaryReader r = new BinaryReader(fs);

            byte[] boundaryBytes = Encode.GetBytes(pendData);
            byte[] postHeaderBytes = Encode.GetBytes(PostString);
            // 根据uri创建HttpWebRequest对象
            HttpWebRequest httpReq = (HttpWebRequest)WebRequest.Create(new Uri(ReqUrl));
            httpReq.Method = Method;
            httpReq.Referer = Referer;
            httpReq.KeepAlive = false;
            httpReq.ContentType = this.ContentType;
            httpReq.UserAgent = UserAgent;
            //设置获得响应的超时时间（30秒）
            httpReq.Timeout = 300000;
            //httpReq.Headers.Add("Accept-Language", "zh-cn");
            //httpReq.Headers.Add("Accept-Encoding","gzip, deflate");
            long length = fs.Length + postHeaderBytes.Length + boundaryBytes.Length;
            httpReq.ContentLength = length;
            long fileLength = fs.Length;
            try
            {
                //每次上传4k

                byte[] buffer = new Byte[(uint)Math.Min(4096, (int)fileLength)];

                int size = 0;
                Stream postStream = httpReq.GetRequestStream();
                //发送请求头部消息
                postStream.Write(postHeaderBytes, 0, postHeaderBytes.Length);
                while ((size = fs.Read(buffer, 0, buffer.Length)) != 0)
                {
                    postStream.Write(buffer, 0, size);
                }
                postStream.Write(boundaryBytes, 0, boundaryBytes.Length);
                postStream.Close();

                //获取服务器端的响应
                WebResponse webRespon = httpReq.GetResponse();
                Stream s = webRespon.GetResponseStream();
                StreamReader sr = new StreamReader(s, Encode);

                //读取服务器端返回的消息
                _reqResult = sr.ReadToEnd();
                s.Close();
                sr.Close();

            }
            catch (WebException ex)
            {
                Stream s = ex.Response.GetResponseStream();
                StreamReader sr = new StreamReader(s, Encoding.UTF8);

                //读取服务器端返回的消息
                _reqResult = sr.ReadToEnd();
                s.Close();
                sr.Close();
                returnValue = 0;
            }
            catch
            {
                returnValue = 0;
            }
            finally
            {
                fs.Close();
                r.Close();
            }
            if (returnValue == 0) return null;
            return _reqResult;
        }
        public string RequestToGetSessionId()
        {
            return "";

        }
        public string UpLoadString(bool pIsNeedReturnCookie)
        {
            // 将提交的字符串数据转换成字节数组
            try
            {
                System.IO.Stream responseStream = GetStream(pIsNeedReturnCookie);
                if (responseStream == null)
                {
                    _reqResult = string.Empty;
                }
                else
                {
                    System.IO.StreamReader reader = new System.IO.StreamReader(responseStream, Encode);
                    _reqResult = reader.ReadToEnd();
                }
            }
            catch (Exception ex)
            {
            }
            return _reqResult;
        }
        public string GetRedirectLocation()
        {
            // 设置提交的相关参数
            HttpWebRequest request = WebRequest.Create(_reqUrl) as HttpWebRequest;
            request.Method = "GET";
            request.Accept = Accept;
            request.Headers.Add("Accept-Encoding", "gzip, deflate");
            request.Headers.Add("Accept-Language", "zh-CN");
            request.KeepAlive = false;
            request.ServicePoint.Expect100Continue = false;
            request.AllowWriteStreamBuffering = false;
            request.Timeout = 15000;
            request.Referer = Referer;
            request.KeepAlive = true;
            request.UserAgent = "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)";
            // 提交请求数据
            try
            {
                HttpWebResponse res = (HttpWebResponse)request.GetResponse();
                string revUrl = res.ResponseUri.AbsoluteUri;
                if (revUrl.StartsWith("res://ieframe.dll"))
                {
                    return "";
                }
                return revUrl;
            }
            catch
            {
                return "";
            }
            //if (res.StatusCode == HttpStatusCode.Redirect)
            //{
            //    return res.Headers["Location"];
            //}
            //else
            //{
            //    return "";
            //}
        }
        public Stream GetStream(bool pIsNeedReturnCookie)
        {
            // 将提交的字符串数据转换成字节数组
            Stream rev = null;
            byte[] postData = new byte[0];
            if (_postString != null && _postString != "")
            {
                postData = Encode.GetBytes(_postString);
            }
            // 设置提交的相关参数
            HttpWebRequest request = WebRequest.Create(_reqUrl) as HttpWebRequest;
            request.Method = _method;
            request.Accept = Accept;
            request.Headers.Add("Accept-Encoding", "gzip, deflate");
            request.Headers.Add("Accept-Language", "zh-CN");
            request.KeepAlive = false;
            request.ServicePoint.Expect100Continue = false;
            if (postData.Length != 0)
            {
                request.ContentLength = postData.Length;
            }
            request.AllowWriteStreamBuffering = false;
            request.Timeout = 15000;
            request.Referer = Referer;
            if (ContentType != null)
            {
                request.ContentType = ContentType;
            }
            request.KeepAlive = true;
            request.UserAgent = UserAgent;
            // 提交请求数据
            if (postData.Length != 0)
            {
                System.IO.Stream outputStream = request.GetRequestStream();
                int OnePost = 2048, pCount = 0;//每次上传2k
                while (pCount * OnePost < postData.Length)
                {
                    int pLeftLength = postData.Length - pCount * OnePost;
                    if (pLeftLength > OnePost)
                    {
                        outputStream.Write(postData, pCount * OnePost, OnePost);
                    }
                    else
                    {
                        outputStream.Write(postData, pCount * OnePost, pLeftLength % OnePost);
                    }
                    pCount++;
                    System.Threading.Thread.Sleep(10);
                }
                outputStream.Close();
            }
            // 接收返回的页面
            try
            {
                HttpWebResponse response = request.GetResponse() as HttpWebResponse;

                if (response.ContentEncoding.ToLower() == "gzip")
                {
                    rev = new GZipStream(response.GetResponseStream(), CompressionMode.Decompress);
                }
                else if (response.ContentEncoding.ToLower() == "deflate")
                {
                    rev = new DeflateStream(response.GetResponseStream(), CompressionMode.Decompress);
                }
                else
                {
                    rev = response.GetResponseStream();
                }
            }
            catch (Exception ex)
            {
                //ErrLog.Write("提交字符串失败" + ex.Message+"\r\n"+_reqUrl+"\r\n");
                return null;
            }
            return rev;
        }


        /// <summary>
        /// Deflate解压函数
        /// JS:var details = eval_r('(' + utf8to16(zip_depress(base64decode(hidEnCode.value))) + ')')对应的C#压缩方法
        /// </summary>
        /// <param name="strSource"></param>
        /// <returns></returns>
        private string GetDeflateHtml(HttpWebResponse response, Encoding pEncode)
        {
            StringBuilder s = new StringBuilder(102400);
            DeflateStream g = new DeflateStream(response.GetResponseStream(), CompressionMode.Decompress);
            byte[] d = new byte[20480];
            int l = g.Read(d, 0, 20480);
            while (l > 0)
            {
                s.Append(pEncode.GetString(d, 0, l));
                l = g.Read(d, 0, 20480);
            }
            return s.ToString();
        }
        private string getZipHtml(HttpWebResponse response, Encoding pEncode)
        {

            StringBuilder s = new StringBuilder(102400);
            GZipStream g = new GZipStream(response.GetResponseStream(), CompressionMode.Decompress);
            byte[] d = new byte[20480];
            int l = g.Read(d, 0, 20480);
            while (l > 0)
            {
                s.Append(pEncode.GetString(d, 0, l));
                l = g.Read(d, 0, 20480);
            }
            return s.ToString();
        }
    }
}
