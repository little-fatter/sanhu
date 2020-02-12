(function ()
{ 
   
    $.ligerDefaults.Form.editors['grid'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, readonly = false;
            if (this.options.readonly) readonly = true;
            if (field.readonly) readonly = true;
            if (editor.readonly) readonly = true;
            var localType = true,
                idField = editor.idField || "ID"; 
            if (editor.buttons)
            {
                var jbuttons = $('<div style="margin:2px;"></div>').appendTo(container);
                $(editor.buttons).each(function (i,item)
                {
                    var jbutton = $('<a href="javascript:void()"></a>').appendTo(jbuttons);
                    jbutton.html(item.text);
                    item.cls && jbutton.addClass(item.cls);
                    jbutton.click(function ()
                    {
                        if (item.click)
                        {
                            item.click(grid);
                        }
                    }); 
                });
            }
            var jgrid = $('<div style="margin:2px;"></div>').appendTo(container);
 
            editor.grid = $.extend({
                columns: [], toolbar: {
                    items: []
                },
                usePager: false,
                url: null,
                data: []
            }, editor.grid);
             
            if (!readonly)
            {
                if (editor.modeType == "none")
                {
                   
                } else if (editor.modeType == "select")
                {
                    localType = false;
                    editor.grid.toolbar.items.splice(0, 0, { text: '添加', icon: 'add', click: toolbar_openSelect });
                } else if (editor.modeType == "editgrid")
                {
                    editor.grid.enabledEdit = true;
                    editor.grid.toolbar = null;
                    editor.grid.checkbox = false;
                    editor.grid.rowSelectable = false;
                } else
                {
                    editor.grid.toolbar.items.splice(0, 0, { text: '新增', icon: 'add', click: toolbar_openAdd });
                }
                if (editor.grid.toolbar && (field.editor.header || field.label ))
                {
                    editor.grid.toolbar.items.splice(0, 0, { text: (field.editor.header || field.label), type: 'text' });
                }
                if (editor.modeType != "none")
                {
                    var operationCol = pbc.web.helper.first(editor.grid.columns, function (a) { a && a.id == "operation" });
                    if (!operationCol)
                    {
                        editor.grid.columns.splice(0, 0,
                            {
                                width: 80, display: '操作', id: 'operation',
                                render: function (r)
                                {
                                    var fnName = "fcell_" + this.id;
                                    var fnEdit = fnName + "_edit('" + r['__id'] + "')";
                                    var fnAdd = fnName + "_add('" + r['__id'] + "')";
                                    var fnDel = fnName + "_del('" + r['__id'] + "')";
                                    var h = '<div class="operating">';
                                    if (editor.modeType == "editgrid")
                                    {
                                        h += '<a class="ui-icon ui-icon-plus" title="新增" href="javascript:' + fnAdd + '"></a>';
                                    }
                                    if ((editor.modeType != "editgrid" || editor.showEdit) && editor.hideEdit != true)
                                    {
                                        h += '<a class="ui-icon ui-icon-pencil" title="修改" href="javascript:' + fnEdit + '"></a>';
                                    }

                                    h += '<a class="ui-icon ui-icon-trash" title="删除" href="javascript:' + fnDel + '"></a>';
                                    h += '</div>';
                                    return h;
                                }
                            }
                            );
                    }
                }
            } else
            {
                if (editor.modeType == "editgrid")
                { 
                    editor.grid.toolbar = null; 
                }
                else
                {
                    editor.grid.toolbar.items.splice(0, 0, { text: field.label, type: 'text' });
                }
                editor.grid.checkbox = false;
            }
          
            var grid = jgrid.ligerGrid(editor.grid);
            var fnName = "fcell_" + grid.id; 

            (function (grid, editor)
            {
                window[fnName + "_del"] = function (rowid)
                {
                    var rowdata = grid.getRow(rowid);

                    grid.removeData = grid.removeData || [];

                    grid.removeData.push(rowdata);

                    grid.remove(rowdata);

         
                };
                window[fnName + "_add"] = function (rowid)
                {
                    var rowData = grid.getRow(rowid);
                    grid.add($.extend({}, editor.newRow), rowData, false);
                };
                window[fnName + "_edit"] = function (rowid)
                {
                    var rowData = grid.getRow(rowid);

                    var url = $.isFunction(editor.detailUrl) ? editor.detailUrl() : editor.detailUrl;
                    if (url === false)
                    {
                        return;
                    }
                    if (editor.modeType == "select")
                    {
                        if (url.indexOf('?') > 0) url += "&";
                        else url += "?";
                        url += "id=" + rowData[idField];
                    }
                    var options = $.extend({
                        url: url,
                        title: editor.titleEdit,
                        data: {
                            formData: rowData,
                            localType: localType,
                            formValidate: editor.formValidate,
                            callback: function (data)
                            {
                                grid.update(rowid, data);
                                dialog.close();
                            }
                        }
                    }, editor.dialog);
                    var w = $(window).width(), h = $(window).height();

                    var open = $.ligerDialog.open;
                    try{
                        open = parent.$.ligerDialog.open;
                    }
                    catch (e)
                    {
                    }
                    var dialog = open($.extend({
                        top: 100,
                        height: editor.detailHeight || h * 0.95,
                        width: editor.detailWidth || w * 0.95,
                        showMax: false,
                        showToggle: true,
                        showMin: false,
                        isResize: true,
                        slide: false
                    }, options));
                };
                if (editor.modeType == "editgrid")
                {
                    $('<a class="addnewproject">创建新数据</a>').appendTo(grid.element).click(function ()
                    {
                        var count = editor.grid.defaultRowCount || 1;

                        var rows = [];
                        for (var i = 0; i < count; i++)
                        {
                            var defaultRow = editor.grid.defaultRow || editor.defaultRow;
                            if ($.isFunction(defaultRow)) defaultRow = defaultRow(i);
                            var row = $.extend({}, defaultRow);
                            rows.push(row);
                        }
                        grid.set('data', {
                            Records: rows, Total: count
                        });
                    });
                }
            })(grid, editor);

            return grid;

            function toolbar_addNew()
            {
                grid.add({});
            }

            function toolbar_openAdd()
            {
                var options = {
                    url: editor.detailUrl,
                    title: editor.titleAdd,
                    data: {
                        localType: true,
                        formValidate: editor.formValidate,
                        callback: function (data)
                        {
                            grid.add(data);
                            dialog.close();
                        }
                    }
                };
                if (top && top.openDialog)
                {
                    var dialog = top.openDialog(options);
                }
                else
                {
                    var w = $(window).width(), h = $(window).height();
                    var dialog = $.ligerDialog.open($.extend({
                        height: h * 0.95,
                        width: w * 0.95,
                        showMax: false,
                        showToggle: true,
                        showMin: false,
                        isResize: true,
                        slide: false
                    }, options));
                }
            }

            function getSelectedIds()
            {
                var ids = [];
                for (var i = 0; i < grid.rows.length; i++)
                {
                    var row = grid.rows[i];
                    if (!row || !row.ID) continue;
                    ids.push(row.ID);
                }
                return ids;
            }
            function toolbar_openSelect()
            {
                var options = {
                    url: editor.selectorUrl,
                    title: editor.titleSelect,
                    data: {
                        selectorType: true,
                        filter: [
                            { field: 'id', op: 'notin', value: getSelectedIds() }
                        ],
                        callback: function (rows)
                        {
                            if (!rows || !rows.length) return;
                            var adds = []; 
                            $(rows).each(function ()
                            {
                                var curId = this.ID;
                                var exist = pbc.web.helper.any(grid.rows, function (a) { return a.ID == curId; });
                                if (!exist)
                                {
                                    adds.push(this);
                                }
                            });
                            grid.addRows(adds);
                            dialog.close();
                        }
                    }
                };
                if (top && top.openDialog)
                {
                    var dialog = top.openDialog(options);
                }
                else
                {
                    var w = $(window).width(), h = $(window).height();
                    var dialog = $.ligerDialog.open($.extend({
                        height: h * 0.95,
                        width: w * 0.95,
                        showMax: false,
                        showToggle: true,
                        showMin: false,
                        isResize: true,
                        slide: false
                    }, options));
                }
            }
        },
        getValue: function (grid, editParm)
        {
            var field = editParm.field,
                editor = field.editor || {},
                data = grid.getData();

            var idField = editor.idField || "ID";

            if (editor.fulldata)
            {
                return data;
            }
            if (editor.modeType == "select")
            {
                var values = [];
                for (var i = 0; i < data.length; i++)
                {
                    var id = data[i][idField];
                    var text = "";
                    if (editor.textField)
                    {
                        text = data[i][editor.textField];
                    }
                    values.push([id, text]);
                }
                return values;
            }

            data = data || [];

            var deletedData = grid.removeData;
            if (deletedData && deletedData.length)
            {
                $(deletedData).each(function ()
                {
                    var o = $.extend({}, this);
                    o.Status = "deleted";
                    data.push(o);
                });
            }

            if ($.isFunction(editor.dataFilter) && data)
            {
                var rows = [];
                for (var i = 0; i < data.length; i++)
                {
                    if (editor.dataFilter(data[i])) rows.push(data[i]);
                }
                return rows;
            }
            return data;
        },
        setValue: function (grid, value, editParm)
        {
            var field = editParm.field,
                 editor = field.editor || {},
                 data = grid.getData(); 
            if (!editor.grid.url)
            {
                if (editor.modeType == "select")
                {
                    var rows = [];
                    if (value)
                    {
                        $(value).each(function ()
                        {
                            var row = {};
                            row.ID = this[0];
                            if (editor.textField)
                            {
                                row[editor.textField] = this[1];
                            }
                            rows.push(row);
                        });
                    }
                    value = rows;
                }
                grid.set('data', { Records: value, Total: value ? value.length : 0 });
            } else
            {
                if (value)
                {
                    if (editor.mainFieldName)
                    {
                        var o = {};
                        o[editor.mainFieldName] = value;
                        g.grid.setParm('Condition', pbc.createFilter(o));
                        grid.reload();
                    }
                    else
                    {
                        var ids = [];
                        $(value).each(function ()
                        {
                            ids.push(this[0]);
                        });
                        if (ids.length)
                        {
                            grid.setParm('id', ids.join(';'));
                            grid.reload();
                        }
                    }
                } 
            }
        },
        resize: function (grid, width, height, editParm)
        {
            grid.set('width', width);
        }
    };

})();