(function ()
{ 

    $.ligerDefaults.Form.editors['tabSelect'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            var jtab = $('<ul class="ne-tab"></ul>').appendTo(container);
            if (editor.url)
            {
                JXC.ajax({
                    url: editor.url,
                    success: function (data)
                    {
                        load(data);
                    }
                });
            } else if (editor.data)
            {
                load(editor.data);
            }
            function load(data)
            {
                if (!data) return;
                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];
                    var jitem = $('<li></li>'),
                        val = item[editor.valueField || "id"],
                        text = item[editor.textField || "text"];

                    if (i == 0) jitem.addClass("first");
                    jitem.attr("data-value", val);
                    jitem.html(text);
                    jtab.append(jitem);

                    jitem.click(function ()
                    {
                        $(this).addClass("cur").siblings("li").removeClass("cur");
                        editor.onSelected && editor.onSelected($(this).attr("data-value"));
                    }).hover(function ()
                    {
                        $(this).addClass("over");
                    }, function ()
                    {
                        $(this).removeClass("over");
                    });
                }
            }
            return jtab;
        },
        getValue: function (jtab, editParm)
        {
            return jtab.find("li.cur").attr("data-value");
        },
        setValue: function (jtab, value, editParm)
        {
            var jitems = jtab.find("li");
            for (var i = 0; i < jitems.length; i++)
            {
                var jitem = $(jitems[i]);
                var v = jitem.attr("data-value");
                if (v == value)
                {
                    jitem.addClass("cur");
                } else
                {
                    jitem.removeClass("cur");
                }
            }
        },
        setText: function ()
        {

        },
        resize: function (jtab, width, height, editParm)
        {

        }
    };

})();