using OpenHtmlToPdf;
using System;
using System.Collections.Generic;
using System.Text;

namespace FD.Common.Helpers
{
    public static class PDFHelper
    {
        /// <summary>
        /// html转PDF流
        /// </summary>
        /// <param name="html"></param>
        /// <param name="marginleft">左边距厘米</param>
        /// <param name="margintop">上边距厘米</param>
        /// <param name="marginright">右边距厘米</param>
        /// <param name="marginbottom">下边距厘米</param>
        /// <returns></returns>
        public static byte[] HmtlToPDF(string html,double marginleft=1.25, double margintop = 1.25, double marginright = 1.25, double marginbottom = 1.25)
        {
            PaperMargins paperMargins = PaperMargins.None()
                .Left(marginleft.Centimeters())
                .Top(margintop.Centimeters())
                .Right(marginright.Centimeters())
                .Botton(marginbottom.Centimeters());
            var pdf = Pdf
                .From(html)
                .WithObjectSetting("web.defaultEncoding", "utf-8")
                .OfSize(PaperSize.A4)
                .WithMargins(paperMargins)
                .Content();
            return pdf;
        }
    }
}
