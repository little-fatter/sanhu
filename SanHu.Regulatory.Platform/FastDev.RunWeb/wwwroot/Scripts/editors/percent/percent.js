(function ()
{
   
    $.ligerDefaults.Form.editors['percent'] = $.ligerDefaults.Grid.editors['percent'] = {
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
                var showVal = input.val() || "0";
                showVal.replace('%', '');
                showVal = parseFloat(showVal);

                input.val(showVal.toFixed(precision) + "%");
            });
            container.append(input);
            return input;
        },
        getValue: function (input, editParm)
        {
            var showVal = input.val();
            showVal.replace('%', '');
            var value = parseFloat(showVal) * 0.01;
            if (value < 0) value = 0;
            if (value > 1) value = 1;
            return value;
        },
        setValue: function (input, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var precision = editor.precision || field.precision || 0;
            if (value < 0) value = 0;
            if (value > 1) value = 1;
            var showVal = (value * 100).toFixed(precision) + "%";
            input.val(showVal);
        },
        resize: function (input, width, height, editParm)
        {
            input.width(width - 2);
        }
    };
     

})();