using FastDev.DevDB;
using FastDev.Model.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace FastDev.Service
{
    class patrol_pointsService : ServiceBase, IService
    {
        public patrol_pointsService()
        {
        }

        public override object Create(object postdata)
        {
            var points = postdata as patrol_points;
            double bdLng, bdLat;
            if (double.TryParse(points.lng, out bdLng) && double.TryParse(points.lat, out bdLat))
            {
                var wgsPoint = BaiduToWGS(bdLng, bdLat);
                points.wlng = wgsPoint.lng.ToString();
                points.wlat = wgsPoint.lat.ToString();
            }

            base.Create(points);

            return true;
        }

        const double pi = 3.14159265358979324;
        const double x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        const double a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
        const double ee = 0.00669342162296594323; //  ee: 椭球的偏心率。

        WGSPoint BaiduToWGS(double bd_lng, double bd_lat)
        {
            //先将百度坐标转换成火星坐标
            double x = bd_lng - 0.0065, y = bd_lat - 0.006;
            double z = Math.Sqrt(x * x + y * y) - 0.00002 * Math.Sin(y * x_pi);
            double theta = Math.Atan2(y, x) - 0.000003 * Math.Cos(x * x_pi);
            var mlng = z * Math.Cos(theta);
            var mlat = z * Math.Sin(theta);

            
            double dLat = transformLat(mlng - 105.0, mlat - 35.0);
            double dLon = transformLon(mlng - 105.0, mlat - 35.0);
            double radLat = mlat / 180.0 * pi;
            double magic = Math.Sin(radLat);
            magic = 1 - ee * magic * magic;
            double sqrtMagic = Math.Sqrt(magic);
            dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
            dLon = (dLon * 180.0) / (a / sqrtMagic * Math.Cos(radLat) * pi);

            return new WGSPoint { lat = mlat - dLat, lng = mlng - dLon };
        }

        double transformLat(double x, double y)
        {
            double ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.Sqrt(Math.Abs(x));
            ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.Sin(y * pi) + 40.0 * Math.Sin(y / 3.0 * pi)) * 2.0 / 3.0;
            ret += (160.0 * Math.Sin(y / 12.0 * pi) + 320 * Math.Sin(y * pi / 30.0)) * 2.0 / 3.0;
            return ret;
        }

        double transformLon(double x, double y)
        {
            double ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.Sqrt(Math.Abs(x));
            ret += (20.0 * Math.Sin(6.0 * x * pi) + 20.0 * Math.Sin(2.0 * x * pi)) * 2.0 / 3.0;
            ret += (20.0 * Math.Sin(x * pi) + 40.0 * Math.Sin(x / 3.0 * pi)) * 2.0 / 3.0;
            ret += (150.0 * Math.Sin(x / 12.0 * pi) + 300.0 * Math.Sin(x / 30.0 * pi)) * 2.0 / 3.0;
            return ret;
        }
    }

    public class WGSPoint
    {
        public double lng { get; set; }
        public double lat { get; set; }
    }
}
