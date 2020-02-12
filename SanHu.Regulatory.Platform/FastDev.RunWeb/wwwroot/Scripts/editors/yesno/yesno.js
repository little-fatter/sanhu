(function ()
{
    $.ligerDefaults.Form.editors['yesno'] = $.ligerDefaults.Grid.editors['yesno'] = {
        create: function (container, editParm)
        { 
            var field = editParm.field || editParm.column, editor = field.editor || {}; 
            var jinput = $("<select class='ne-select'></select").appendTo(container);
            if ($.isFunction(editor)) editor = this.currentColumnEditor;
            var data = [
                { id: '', text: '' },
                { id: 'true', text: 'true' },
                { id: 'false', text: 'false' }
            ];
            load(data);

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
            var value = jinput.val();
            if (value == "true") return true;
            if (value == "false") return false;
            return undefined;
        },
        setValue: function (jinput, value, editParm)
        {
            if (value == false || value == 0)
            {
                jinput.val("false");
            }
            if (value == true || value == 1)
            {
                jinput.val("true");
            }
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