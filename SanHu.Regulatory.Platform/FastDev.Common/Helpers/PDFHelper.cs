
using DinkToPdf;
using DinkToPdf.Contracts;
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
        public static byte[] HmtlToPDF(this IConverter converter, string html, double marginleft = 1.25, double margintop = 1.25, double marginright = 1.25, double marginbottom = 1.25)
        {
            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                    ColorMode = ColorMode.Color,
                    PaperSize = PaperKind.A4,
                    Margins = new MarginSettings()
                    {
                       Unit= Unit.Centimeters,
                        Left=marginleft,Top=margintop,
                     Right=marginright,Bottom=marginbottom
                    },
                },
                Objects = {
                    new ObjectSettings() {
                        HtmlContent = html,
                        WebSettings = { DefaultEncoding = "utf-8" },
                    }
                }
            };
            byte[] pdf = converter.Convert(doc);
            //converter = null;
            return pdf;
        }
    }
}
