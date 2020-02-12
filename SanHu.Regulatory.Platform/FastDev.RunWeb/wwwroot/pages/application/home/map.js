define([''],
function() {
    function view() {
        return function run(e)
        {
            var renderTo = e.renderTo;
 
            var key = new Date().getTime();
            $(renderTo).attr("id", "baidumap" + key);
         
            require(['http://api.map.baidu.com/getscript?v=2.0&ak=NDzNmeeFX3GfWc5inUF9If2xs67ZsSzl&services=&t=' + new Date().getTime()], show);

            function show() {
                var map = new BMap.Map("baidumap" + key); // 创建Map实例
                map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
                map.setCurrentCity("广州"); // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            }
        };
    }

    var exports = {
        run: view()
    };

    return exports;
});