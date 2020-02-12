(function ()
{
 
    $.ligerDefaults.Form.editors.file =
    {
        create: function (container, editParm, p)
        {
            var editor = $('<input type="file"  class="fileinput" />');
            var text = $('<div class="l-text l-text-file"><input type="text" class="l-text-field valid"><div class="l-text-l"></div><div class="l-text-r"></div><div class="l-trigger">选择...</div></div>');
            text.append(editor);
            editor.bind("change", function ()
            {
                text.find(".l-text-field").val(this.value);
            });
            var id = (p.prefixID || "") + editParm.field.name;
            if ($("#" + id).length)
            {
                editor = $("#" + id);
            }
            editor.attr({
                id: id,
                name: id
            });
            container.append(text);
            text.find(".l-trigger").click(function ()
            {
                //editor.click();
            });
            if (editParm.field && editParm.field.afterRender)
            {
                container.append(editParm.field.afterRender());
            }
            return text;
        },
        getValue: function (editor, editParm)
        {
            return editor.find(":file").val();
        },
        setValue: function (editor, value, editParm)
        {
            editor.find(":file").val(value);
        },
        resize: function (editor, width, height, editParm)
        {
            editor.css({
                width: width - 2
            }).find(".l-text-field").css({
                width: width - 50
            }).find(".fileinput").css({
                width: width - 2
            });
        }
    };

})();