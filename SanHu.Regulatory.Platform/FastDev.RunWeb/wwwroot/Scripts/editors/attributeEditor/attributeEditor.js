(function ()
{
    if (pbc.web.designer && pbc.web.designer.editors)
    {
    }

    $.ligerDefaults.Grid.editors['attributeEditor'] = $.ligerDefaults.Form.editors['attributeEditor'] = {
        create: function (container, editParm)
        {
            var field = editParm.field || editParm.column, editor = field.editor || {};


            var jgrid = $('<div style="margin:2px;"></div>').appendTo(container);

            var op = {
                columns: [
                    {
                        width: 80, display: '操作',
                        render: function (r)
                        {
                            var fnName = "fcell_" + this.id; 
                            var fnAdd = fnName + "_add('" + r['__id'] + "')";
                            var fnDel = fnName + "_del('" + r['__id'] + "')";
                            var h = '<div class="operating">';
                            h += '<a class="ui-icon ui-icon-plus" title="新增" href="javascript:' + fnAdd + '"></a>';
                            h += '<a class="ui-icon ui-icon-trash" title="删除" href="javascript:' + fnDel + '"></a>';
                            h += '</div>';
                            return h;
                        }
                    },
                    {
                        width: 200, display: '属性名',
                        name : 'name',
                        render: function (rowdata)
                        {
                            var rowId = rowdata['__id'];
                           
                            var h = ['<div class="grid_attr_name" style="padding:2px"'];
                            h.push(' rowid="' + rowId + '"'); 
                            h.push('/></div>'); 
                            return h.join('');
                        }
                    },
                    {
                        width: 370, display: '属性选项',
                        name: 'options',
                        render: function (rowdata)
                        {
                            var rowId = rowdata['__id']; 
                            var h = ['<div class="grid_attr_value"  style="padding:2px"'];
                            h.push(' rowid="' + rowId + '"');
                            h.push('/></div>'); 
                            return h.join('');
                        }
                    }
                ],
                onAfterShowData : function()
                {
                    var grid = this;
                    input_init();
                },
                onAfterAddRow : function()
                {
                    var grid = this;
                    input_init();
                },
                usePager: false,
                fixedCellHeight: false,
                checkbox: false,
                enabledSort: false,
                toolbar: null,
                alternatingRow: false,
                mouseoverRowCssClass: null,
                cssClass: 'rights-grid',
                height:280,
                data: []
            };

            var grid = jgrid.ligerGrid(op);
            var fnName = "fcell_" + grid.id; 
            (function (grid, editor)
            {
                window[fnName + "_del"] = function (rowid)
                {
                    var rowdata = grid.getRow(rowid);
                    grid.remove(rowdata);
                };
                window[fnName + "_add"] = function (rowid)
                {
                    var rowData = grid.getRow(rowid);
                    grid.add({ name: '', options: '' }, rowData, false);
                };
                $('<a class="addnewproject">创建新属性</a>').appendTo(grid.element).click(function ()
                { 
                    var rows = [
                        {
                            name : '颜色',options:'白色,红色,黄色'
                        },
                        {
                            name: '尺寸', options: 'M,XL,XXL'
                        }
                    ];
                    grid.set('data', {
                        Records: rows, Total: rows.length
                    });
                });
            })(grid, editor);

            function input_init()
            { 
                $(".grid_attr_name", jgrid).each(function ()
                {
                    if ($(this).attr("data-setted")) return;
                    var rowdata = grid.getRow($(this).attr("rowid"));
                    var input = $('<input type="text" value=""/>');
                    input.width(170);
                    $(this).append(input); 
                    var textbox = input.ligerTextBox({
                        nullText: '输入属性名',
                        onChangeValue: function (value)
                        {
                            rowdata.name = value;
                        }
                    });
                    if (rowdata.name)
                    {
                        textbox.setValue(rowdata.name);
                    }
                    $(this).attr("data-setted", true);
                });
                $(".grid_attr_value", jgrid).each(function ()
                {
                    if ($(this).attr("data-setted")) return;
                    var rowdata = grid.getRow($(this).attr("rowid")); 
                    var input = $('<input type="text" value=""/>');
                    var inputId = new Date().getTime() + "_" + $(this).attr("rowid") + "_" + field.name;
                    input.attr("id", inputId);
                    $(this).append(input); 
                    input.tagsInput({
                        width: 350,
                        height: 60,
                        defaultText: '输入值',
                        onChange: function ()
                        { 
                            rowdata.options = input.val();
                        }
                    });
                    if (rowdata.options)
                    {
                        input.importTags(rowdata.options);
                    }
                    $("#" + inputId + "_tagsinput").height("60px"); 
                    $(this).attr("data-setted", true);
                });
            }
            return grid;
        },
        getValue: function (grid, editParm)
        {
            
            var data = grid.getData();
            return JSON.stringify(data);
        },
        setValue: function (grid, value, editParm)
        {
            if (value) value = JSON.parse(value); 
            grid.set('data', { Records: value, Total: value ? value.length : 0 });
        },
        resize: function (grid, width, height, editParm)
        {
            grid.set('width', width);
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