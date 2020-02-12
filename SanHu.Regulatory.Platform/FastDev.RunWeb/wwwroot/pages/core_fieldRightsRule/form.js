define([],
function() {
    function view() {
        return {
            "form": {
                "fields": [{
                    "newline": 1,
                    "name": "Title",
                    "label": "标题",
                    "editor": {
                        "type": "text"
                    },
                    "type": "text",
                    "type_text": "单行",
                    "name_text": "标题",
                    "group": "",
                    "width": "255",
                    "labelAlign": "",
                    "labelWidth": "",
                    "labelInAfter": 0,
                    "rightToken": "",
                    "fieldExtend": "",
                    "readonly": 0,
                    "hideLabel": 0,
                    "hideSpace": 0,
                    "hideInAdd": 0
                },
                {
                    "newline": false,
                    "name": "RuleEnabled",
                    "label": "启用",
                    "editor": {
                        "type": "checkbox"
                    },
                    "type": "checkbox",
                    "type_text": "复选框"
                },
                {
                    "label": "模型名",
                    "type": "ref_popupselect",
                    "editor": {
                        "isTextBoxMode": true,
                        "url": "/web/namedata",
                        "parms": {
                            "model": "crm_customer"
                        },
                        "valueField": "ID",
                        "sourceFilter": null,
                        "textField": "ModelName",
                        "css": "combobox-selector",
                        "popupselect_ismul": false,
                        "popupselect_type": "popupselect",
                        "popupselect_url": "/web/main/?model=core_model&viewtype=list",
                        "popupselect_width": "900",
                        "popupselect_height": "600",
                        "popupselect_title": "选择： 模型"
                    },
                    "name": "ModelName",
                    "width": "255"
                }],
                "tab": {
                    "items": [{
                        "title": "选择禁用的字段",
                        "fields": [{
                            "newline": false,
                            "name": "RuleContent",
                            "label": "规则",
                            "editor": {
                                "type": "text"
                            },
                            "type": "fieldRightsRule",
                            "group": "",
                            "width": "800",
                            "labelAlign": "",
                            "labelWidth": "",
                            "labelInAfter": 0,
                            "rightToken": "",
                            "fieldExtend": "",
                            "readonly": 0,
                            "hideLabel": 1,
                            "hideSpace": 0,
                            "hideInAdd": 0
                        }]
                    }]
                }
            }
        };
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_fieldRightsRule&viewname=form'
    };
    exports.options.model = {
        name: 'core_fieldRightsRule',
        title: '字段权限规则'
    };

    exports.service = function server(page) {

        $.ligerDefaults.Form.editors['fieldRightsRule'] = {
            create: function(container, editParm) {
                var field = editParm.field,
                editor = field.editor || {},
                form = this;
                var ModelName = null;
                var localType = true,
                idField = editor.idField || "ID";
                var jgrid = $('<div style="margin:2px;"></div>').appendTo(container);
                var op = {
                    columns: [{
                        display: '字段',
                        name: 'field',
                        width: 320
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
                    isChecked: function(row) {
                        return row.isSelected;
                    },
                    usePager: false,
                    checkbox: true,
                    alternatingRow: false,
                    mouseoverRowCssClass: null,
                    height: 500,
                    cssClass: 'rights-grid',
                    url: null,
                    data: []
                };
                var grid = jgrid.ligerGrid(op);
                setTimeout(function() {
                    var modeEditor = form.getEditor('ModelName');
                     
                    if (modeEditor) {
                        ModelName = modeEditor.getValue();
                        modeEditor.bind('changeValue',
                        function(v) {

                            ModelName = v;
                            load();
                        });
                        if (ModelName) {
                            load();
                        }
                    }
                },
                100);
                function load() {

                    pbc.ajax({
                        url: pbc.toUrl('Web/ModelConfig/') + ModelName,
                        success: function(r) {
                            var fields = r.data.fields;
                            show(fields);
                        }
                    });
                }
                function show(fields) {
                    var rows = [];
                    $(fields).each(function() {
                        var row = {
                            field: this.name
                        };
                        if (o.value) {
                            var old = pbc.web.helper.first(o.value,
                            function(a) {
                                return a.field == row.field
                            });
                            if (old) {
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
                function render_chk(rowdata, index, value, column) {
                    var h = [];

                    var chkId = this.id + "_" + index + "_" + column.name;
                    var fnName = "f_chk_change('" + chkId + "')";
                    h.push('<input type="checkbox" class="gridcheckbox" onchange="' + fnName + '"');
                    if (value) {

                        h.push(' checked="checked"'); //选中状态

                        h.push(' ised = "true"');
                    }
                    h.push(' id = "' + chkId + '"');
                    h.push(' rowid = "' + rowdata['__id'] + '"');
                    h.push(' gridid = "' + this.id + '"');
                    h.push(' columnname = "' + column.name + '"');
                    h.push('/>');
                    return h.join('');
                }
                window.f_chk_change = function(id) {

                    var jchk = $("#" + id);
                    var grid = $.ligerui.get(jchk.attr("gridid"));
                    var rowdata = grid.getRow(jchk.attr("rowid"));
                    var columnname = jchk.attr("columnname");
                    var checked = rowdata[columnname];
                    grid.updateCell(columnname, checked ? 0 : 1, rowdata); //保存成1和0 
                };
                var o = {
                    grid: grid
                };
                return o;
            },
            getValue: function(o, editParm) {
                var data = [];
                var selecteds = o.grid.getSelecteds();
                $(selecteds).each(function() {
                    data.push({
                        field: this.field,
                        disable: 1
                        //enable: this.enable,
                        //disable: this.disable,
                    });
                });
                return JSON.stringify(data);
            },
            setValue: function(o, value, editParm) {
                if (value) {
                    o.value = JSON.parse(value);
                }
            },
            resize: function(o, width, height, editParm) {
                o.grid.set('width', width);
            }
        };

    };

    return exports;
});