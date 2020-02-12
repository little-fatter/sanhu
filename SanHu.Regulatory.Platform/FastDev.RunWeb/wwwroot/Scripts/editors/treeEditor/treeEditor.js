(function ()
{
    $.ligerDefaults.Form.editors['treeEditor']  = {
        create: function (container, editParm)
        { 
            var field = editParm.field || editParm.column, editor = field.editor || {}; 
            var jtree = $('<div class="treepanel"><ul></ul></div>').appendTo(container);
            var options = $.extend({
                onsuccess: function ()
                {
                    if (tree.value)
                    { 
                        var vs = tree.value.split(';');
                        $(vs).each(function (i, v)
                        {
                            tree.selectNode(v);
                        }); 
                    }
                }
            }, editor);
            if (editor.height)
            {
                jtree.height(editor.height);
            }
            if (editor.width)
            {
                jtree.width(editor.width);
            }
            var tree = jtree.find("ul").ligerTree(options);
            return tree;
        },
        getValue: function (tree, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};
             
            var values = []; 
            var selecteds = tree.getCheckedData();
            $(selecteds).each(function ()
            {
                var value = this[editor.valueField || "id"];
                values.push(value);
            });
            return values.join(';');

        },
        setValue: function (tree, value, editParm)
        {
            tree.value = value;
        },
        setText: function ()
        {

        },
        resize: function (tree, width, height, editParm)
        { 
        }
    };
})();