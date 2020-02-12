<%@ WebHandler Language="C#" Class="BarCodeHandler" %>

using System;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Web;
 
public class BarCodeHandler : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {

        var code = context.Request.QueryString["code"];
        if (code != null && code.StartsWith("{"))
        {
            code = "000000000000";
        }
        var bitmap = NE.Core.Code39.GetBitmap(code);

        MemoryStream ms = new MemoryStream();
        bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Bmp);
        byte[] bytes = ms.GetBuffer();


        context.Response.ContentType = "image/png";
        context.Response.OutputStream.Write(bytes, 0, bytes.Length);
    }

    /// <summary>
    /// Return true to indicate that the handler is thread safe because it is stateless
    /// </summary>
    public bool IsReusable
    {
        get { return true; }
    }
}
 