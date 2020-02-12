function server(page)
{

    $.ligerDefaults.Form.editors['fieldRightsRule'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {},form = this;
            var ModelName = null;
            var localType = true,
                idField = editor.idField || "ID";
            var jgrid = $('<div style="margin:2px;"></div>').appendTo(container);
            var op = {
                columns: [
                    {
                        display: '字段',
                        name: 'field',
                        width : 320
                    },
                    //{
                    //    display: '启用',
                    //    name: 'enable',
                    //    render: render_chk,
                    //    width: 80
                    //},
                    //{
                    //    display: '禁用',
                    //    name: 'disable',
                    //    render: render_chk,
                    //    width: 80
                    //}
                    //{
                    //    display: '可读',
                    //    name: 'enableRead',
                    //    render:render_chk,
                    //    width: 80
                    //},
                    //{
                    //    display: '可写',
                    //    name: 'enableWrite',
                    //    render: render_chk,
                    //    width: 80
                    //},
                    //{
                    //    display: '不可读',
                    //    name: 'disableRead',
                    //    render: render_chk,
                    //    width: 80
                    //},
                    //{
                    //    display: '不可写',
                    //    name: 'disableWrite',
                    //    render: render_chk,
                    //    width: 80
                    //}
                ],
                isChecked: function (row)
                {
                    return row.isSelected;
                },
                usePager: false,
                checkbox: true,
                alternatingRow: false,
                mouseoverRowCssClass: null,
                height:500,
                cssClass: 'rights-grid',
                url: null,
                data: []
            }; 
            var grid = jgrid.ligerGrid(op); 
            setTimeout(function ()
            {
                var modeEditor = form.getEditor('ModelName'); debugger
                if (modeEditor)
                {
                    ModelName = modeEditor.getValue();
                    modeEditor.bind('changeValue', function (v)
                    {
                          
                        ModelName = v;
                        load();
                    });
                    if (ModelName)
                    {
                        load();
                    }
                }
            }, 100); 
            function load()
            {
                
                pbc.ajax({
                    url: pbc.toUrl('Web/ModelConfig/') + ModelName, 
                    success: function (r)
                    {
                        var fields = r.data.fields;
                        show(fields);
                    }
                });
            }
            function show(fields)
            {
                var rows = [];
                $(fields).each(function ()
                {
                    var row = {
                        field: this.name
                    };
                    if (o.value)
                    {
                        var old = pbc.web.helper.first(o.value, function (a) { return a.field == row.field });
                        if (old)
                        {
                            row.isSelected = true;
                        }
                    }
                    rows.push(row);
                });

                grid.set('data', {
                    Records: rows,
                    Total: rows.length
                });
            }
            function render_chk(rowdata, index, value, column)
            {
                var h = [];
                 
                var chkId = this.id + "_" + index + "_" + column.name;
                var fnName = "f_chk_change('" + chkId + "')";
                h.push('<input type="checkbox" class="gridcheckbox" onchange="' + fnName + '"');
                if (value)
                {
                     
                    h.push(' checked="checked"');//选中状态

                    h.push(' ised = "true"');
                }
                h.push(' id = "' + chkId + '"');
                h.push(' rowid = "' + rowdata['__id'] + '"');
                h.push(' gridid = "' + this.id + '"');
                h.push(' columnname = "' + column.name + '"');
                h.push('/>');
                return h.join('');
            } 
            window.f_chk_change = function (id)
            {
                
                var jchk = $("#" + id);
                var grid = $.ligerui.get(jchk.attr("gridid"));
                var rowdata = grid.getRow(jchk.attr("rowid"));
                var columnname = jchk.attr("columnname");
                var checked = rowdata[columnname];
                grid.updateCell(columnname, checked ? 0 : 1, rowdata);//保存成1和0 
            };
            var o = {
                grid: grid
            };
            return o;
        },
        getValue: function (o, editParm)
        {
            var data = [];
            var selecteds = o.grid.getSelecteds();
            $(selecteds).each(function ()
            { 
                data.push({
                    field: this.field,
                    disable: 1
                    //enable: this.enable,
                    //disable: this.disable,
                });
            });
            return JSON.stringify(data);
        },
        setValue: function (o, value, editParm)
        {
            if (value)
            {
                o.value = JSON.parse(value);
            }
        },
        resize: function (o, width, height, editParm)
        {
            o.grid.set('width', width);
        }
    };

}