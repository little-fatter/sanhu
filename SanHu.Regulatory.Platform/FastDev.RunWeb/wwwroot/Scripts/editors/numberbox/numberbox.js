(function ()
{ 
    $.ligerDefaults.Grid.editors['numberbox'] = $.ligerDefaults.Form.editors['numberbox'] = {
        create: function (container, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var precision = editor.precision || field.precision || 0;
       
            var input = $("<input type='text' style='text-align:right' class='l-text' />");
            input.bind('keypress', function (e)
            {
                var keyCode = window.event ? e.keyCode : e.which;
                return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
            });
            input.bind('blur', function ()
            {
                var value = input.val();
                input.val(parseFloat(value).toFixed(precision));
            });
            container.append(input);
            return input;
        },
        getValue: function (input, editParm)
        {
            return parseFloat(input.val());
        },
        setValue: function (input, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var precision = editor.precision || field.precision || 0;

            input.val(value.toFixed(precision));
        },
        resize: function (input, width, height, editParm)
        {
            input.width(width).height(height);
        }
    };



})();