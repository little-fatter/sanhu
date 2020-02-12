(function ()
{
    function getFormatDate(date, dateformat)
    {
        dateformat = dateformat || "yyyy-MM-dd";
        if (typeof (date) == "string" && /^\/Date/.test(date))
        {
            date = date.replace(/^\//, "new ").replace(/\/$/, "");
            eval("date = " + date);
        }
        if (isNaN(date)) return null;
        var format = dateformat;
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        }
        if (/(y+)/.test(format))
        {
            format = format.replace(RegExp.$1, (date.getFullYear() + "")
        .substr(4 - RegExp.$1.length));
        }
        for (var k in o)
        {
            if (new RegExp("(" + k + ")").test(format))
            {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    liger.editors.date.getValue = function (editor, editParm)
    {
        
        var value = editor.getValue();
        if (!value) return null;
        value = value.replace(/-/g, "/");
             
        var date = new Date(value);
        //var str = '/Date(' + date.getTime() + ')/';
        var format = "yyyy-MM-dd hh:mm:ss";  
        var str = getFormatDate(date, format);
            
        return str;
    };

    liger.editors.date.setValue = function (editor, value, editParm)
    {
        var field = editParm.field;
        if (typeof value == "string" && /^\/Date/.test(value))
        {
            value = value.replace(/^\//, "new ").replace(/\/$/, "");
            eval("value = " + value);
            value = getFormatDate(value);
        }
        editor.setValue(value); 
    };

})();