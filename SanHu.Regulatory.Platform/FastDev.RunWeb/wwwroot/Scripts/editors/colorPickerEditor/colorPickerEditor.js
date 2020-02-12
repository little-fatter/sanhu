(function ()
{
   
    $.ligerDefaults.Form.editors['colorPickerEditor'] = $.ligerDefaults.Grid.editors['colorPickerEditor'] = {
        create: function (container, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var precision = editor.precision || field.precision || 0;
            var input = $("<input type='text' style='text-align:left' class='l-text' />");
            input.ColorPicker({
                onSubmit: function (hsb, hex, rgb, el)
                {
                    input.val(hex);
                    input.ColorPickerHide();
                },
                onBeforeShow: function ()
                {
                    input.ColorPickerSetColor(this.value);
                },
                onChange: function (hsb, hex, rgb)
                {
                    input.val(hex);
                }
            })
             .bind('keyup', function ()
             {
                 input.ColorPickerSetColor(this.value);
             }).bind('blur', function ()
             {
                 if (editor.onChangeValue)
                 {
                     editor.onChangeValue(this.value);
                 }
             });
            container.append(input);
            return input;
        },
        getValue: function (input, editParm)
        {
            var showVal = input.val();
     
            return showVal;
        },
        setValue: function (input, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};

            input.val(value);
        },
        resize: function (input, width, height, editParm)
        {
            input.width(width - 2);
        }
    };
     

})();