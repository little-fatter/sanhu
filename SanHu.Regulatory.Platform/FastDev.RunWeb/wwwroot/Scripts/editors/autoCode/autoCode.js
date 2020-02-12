(function ()
{
   
    $.ligerDefaults.Form.editors['autoCode'] = {
        create: function (container, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var precision = editor.precision || field.precision || 0;
            var input = $("<input type='text' style='text-align:left;padding-left:4px;color: #AAAAAA;' class='l-text' />");
            input.attr("readonly", "readonly");
            input.val("(自动编码)");
            container.append(input);
            return input;
        },
        getValue: function (input, editParm)
        { 
            return input.attr("v");
        },
        setValue: function (input, value, editParm)
        {
            if (value)
            {
                input.attr("v", value).css({
                    color : '#333333'
                });
                input.val(value);
            }
        },
        resize: function (input, width, height, editParm)
        {
            input.width(width - 6);
        }
    };
     

})();