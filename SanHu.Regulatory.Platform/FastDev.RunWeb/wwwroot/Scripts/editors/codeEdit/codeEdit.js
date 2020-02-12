(function ()
{ 
    $.ligerDefaults.Grid.editors['codeEdit'] = $.ligerDefaults.Form.editors['codeEdit'] = {
        create: function (container, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
 
            var wrap = $("<div style='width:99%;border:1px solid #d3d3d3;' ></div>").appendTo(container);
            wrap.height(editor.height || 300);

            var codeMirror = CodeMirror(wrap.get(0), {
                lineNumbers: true,
                matchBrackets: true,
                lineWrapping: true,
                theme: 'eclipse',
                width: '100%',
                height: '100%',
                continueComments: "Enter",
                extraKeys: { "Ctrl-Q": "toggleComment" }
            });

            return codeMirror;
        },
        getValue: function (codeMirror, editParm)
        {
            return codeMirror.getValue();
        },
        setValue: function (codeMirror, value, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {}; 

            codeMirror.setValue(value);
        },
        resize: function (input, width, height, editParm)
        {
             
        }
    };



})();