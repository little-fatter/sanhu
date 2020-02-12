(function ()
{
    $.ligerDefaults.Form.editors['select2'] =
    $.ligerDefaults.Form.editors['htmlSelect'] =
     $.ligerDefaults.Grid.editors['htmlSelect'] = {
        create: function (container, editParm)
        { 
            var field = editParm.field || editParm.column, editor = field.editor || {}; 
            var jinput = $("<select class='ne-select'></select").appendTo(container);
            if ($.isFunction(editor)) editor = this.currentColumnEditor;
              
            if (editor.url)
            {
                pbc.ajax({
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
            if (editor.onchange)
            {
                jinput.bind('change', function ()
                {
                    editor.onchange({ 
                        value: this.value
                    });
                });
            }
            function load(data)
            {
                if (!data) return;
                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];
                    var joption = $("<option></option>"),
                        val = item[editor.valueField || "id"],
                        text = item[editor.textField || "text"];

                    joption.attr("value", val);
                    if (editor.value && val == editor.value)
                    {
                        joption.attr("selected", "selected");
                    }
                    joption.html(text);
                    jinput.append(joption);
                }
            }
            return jinput;
        },
        getValue: function (jinput, editParm)
        {
            return jinput.val();
        },
        setValue: function (jinput, value, editParm)
        {
            jinput.val(value);
        },
        setText: function ()
        {

        },
        resize: function (jinput, width, height, editParm)
        {
            jinput.width(width - 5);
        }
    };
})();