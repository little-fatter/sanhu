(function ()
{
    if (pbc.web.designer && pbc.web.designer.editors)
    {
        pbc.web.designer.editors.tagsEditor = {
            propertyFields: [
                {
                    name: 'height',
                    label: '高度',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                }, 
                {
                    name: 'defaultText',
                    label: '新增提示',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                },
                {
                    name: 'minChars',
                    label: '最少tag数',
                    width: 142,
                    group: '扩展',
                    type: 'int'
                },
                {
                    name: 'maxChars',
                    label: '最多tag数',
                    width: 142,
                    group: '扩展',
                    type: 'int'
                } 


                
            ]
        };
    }

    $.ligerDefaults.Grid.editors['tagsEditor'] = $.ligerDefaults.Form.editors['tagsEditor'] = {
        create: function (container, editParm,p)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            var isReadonly = p.readonly || field.readonly || (field.editor && field.editor.readonly);
             
            editor.placeholderColor = "#e6e6e6";
            var input = $('<input type="text" value=""/>');
            var inputId = new Date().getTime() + "_" + field.name;
            input.attr("id", inputId);
            container.append(input); 

            input.tagsInput(editor);

            var jtagsinput = $("#" + inputId + "_tagsinput");
            
            if (isReadonly)
            {
                jtagsinput.addClass("tagsinput_readonly");
            }
            if (editor.height)
            {
                jtagsinput.height(editor.height);
            }
            return input;
        },
        getValue: function (input, editParm)
        {
            return input.val();
        },
        setValue: function (input, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
            if (value)
            {
                input.importTags(value);
            }
        },
        resize: function (input, width, height, editParm)
        {
            var id = input.attr("id");
            var jtagsinput = $("#" + id + "_tagsinput");

            if (width) jtagsinput.width(width-16); 
        }
    };


    /*
    $(selector).tagsInput({
   'autocomplete_url': url_to_autocomplete_api,
   'autocomplete': { option: value, option: value},
   'height':'100px',
   'width':'300px',
   'interactive':true,
   'defaultText':'add a tag',
   'onAddTag':callback_function,
   'onRemoveTag':callback_function,
   'onChange' : callback_function,
   'removeWithBackspace' : true,
   'minChars' : 0,
   'maxChars' : 0 //if not provided there is no limit,
   'placeholderColor' : '#666666'
});*/
})();