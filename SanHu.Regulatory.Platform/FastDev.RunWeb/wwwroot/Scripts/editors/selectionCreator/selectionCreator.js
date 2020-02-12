(function ()
{
    if (pbc.web.designer && pbc.web.designer.editors)
    {
        pbc.web.designer.editors.selectionCreator = {
            propertyFields: [  
                {
                    name: 'addNewMessage',
                    label: '新增提示文本',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                },
                {
                    name: 'itemMessage',
                    label: '默认选项文本',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                },
                {
                    name: 'defaultItemLength',
                    label: '默认新增选项数目',
                    width: 142,
                    group: '扩展',
                    type: 'int'
                }
            ]
        };
    }

    $.ligerDefaults.Form.editors['selectionCreator'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            var creator = $('<div class="optionsCreator selectionCreator"></div>');
            container.append(creator);
            var editor = new selectionCreator($.extend({
                renderTo: creator,
                field: editParm.field
            }, editor));

            editor.render();
            return editor;
        },
        getValue: function (o, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;

            var value = o.getValue(); 

            return value;
        },
        setValue: function (o, data, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            o.setValue(data);
        },
        resize: function (o, width, height, editParm)
        {
        }
    };


    var selectionCreator = pbc.editors.selectionCreator =  function (options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,
            data: null
        }, options);
    };
    $.extend(selectionCreator.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            g.addNewOption();
        },
        addNewOption: function ()
        {
            var g = this, p = this.options;
            $(p.renderTo).html('');
            var addNewMessage = p.addNewMessage || "创建新选项";
            var itemMessage = p.itemMessage || "选项";
            var defaultItemLength = p.defaultItemLength || 3;
            defaultItemLength = parseInt(defaultItemLength);

            $("<a class='addNewOption'>" + addNewMessage + "</a>").appendTo(p.renderTo).click(function ()
            {
                var data = [];

                for (var i = 0; i < defaultItemLength; i++)
                {
                    data.push({ id: 'op' + (i + 1), text: itemMessage + (i + 1) });
                }
                $(this).remove();
                g.setOptions(data);
            });
        },
        setValue: function (data)
        {
            var g = this, p = this.options;
            if (data) data = JSON.parse(data);
            $(p.renderTo).html('');
            if (!data || !data.length)
            {
                g.addNewOption();
            }
            else
            {
                g.setOptions(data);
            }
        },
        getValue: function ()
        {
            var g = this, p = this.options;
            var data = [];
            p.renderTo.find("input:text").each(function ()
            {
                var value = this.value;
                if (!value) return;
                var vs = value.split('=');
                data.push({
                    id: vs.length > 1 ? vs[1] : vs[0],
                    text: vs[0]
                });
            });
            return JSON.stringify(data);
        },
        setOptions: function (data)
        {
            var g = this, p = this.options;
            $(data).each(function (i, item)
            {
                g.createItemUI(function (e)
                {
                    var jitem = e.jitem,
                        jinput = e.jinput;
                    jitem.appendTo(p.renderTo);
                    jinput.val(item.text + "=" + item.id);
                });
            });
        },
        createItemUI: function (callback)
        {
            var g = this, p = this.options;
            var jitem = $("<div class='option'></div>");
            var jinput = $('<input type="text" class="l-text textbox fleft" />').appendTo(jitem).width((p.field.width || 120) - 80);
            var jadd = $('<div class="icon glyphicon glyphicon-plus-sign fleft"></div>').appendTo(jitem).click(function ()
            {
                g.createItemUI(function (e)
                {
                    e.jitem.insertAfter(jitem);
                });
            });
            var jdel = $('<div class="icon glyphicon glyphicon-minus-sign fleft"></div>').appendTo(jitem).click(function ()
            {
                if (jitem.parent().find(">.option").length == 1)
                {
                    g.addNewOption();
                }
                jitem.remove();
            });
            //var jmove = $('<div class="icon glyphicon glyphicon-move fleft"></div>').appendTo(jitem);
            $('<div class="clear"></div>').appendTo(jitem);
            if (callback)
            {
                callback({
                    jitem: jitem,
                    jinput: jinput
                });
            }
        }

    });



})();