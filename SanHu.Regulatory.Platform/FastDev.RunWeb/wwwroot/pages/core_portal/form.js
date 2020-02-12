define([],
function ()
{
    function view()
    {
        var options = {
            form: {
                fields: [{
                    newline: 1,
                    name: "Title",
                    label: "标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "标题",
                    width: "550",
                    fieldExtend: "{\"style\":\"margin-bottom:10px\"}"
                },
                {
                    newline: 1,
                    name: "Width",
                    label: "宽度",
                    editor: {},
                    type: "text",
                    name_textfield: "宽度",
                    width: "50",
                    labelWidth: "auto",
                    type_textfield: "单行"
                },
                {
                    newline: 0,
                    name: "Height",
                    label: "高度",
                    editor: {},
                    type: "text",
                    name_textfield: "高度",
                    width: "50",
                    labelWidth: "auto",
                    type_textfield: "单行"
                },
                {
                    newline: 0,
                    name: "RowNumber",
                    label: "行数",
                    editor: {
                        type: "float"
                    },
                    type: "float",
                    name_textfield: "行数",
                    width: "50",
                    labelWidth: "auto"
                },
                {
                    newline: 0,
                    name: "ColumnNumber",
                    label: "列数",
                    editor: {
                        type: "float"
                    },
                    type: "float",
                    name_textfield: "列数",
                    width: "50",
                    labelWidth: "auto"
                },
                {
                    name: "PanelNumber",
                    type: "number",
                    label: "排序",
                    editor: {},
                    newline: 0,
                    type_textfield: "数值",
                    name_textfield: "排序",
                    width: "60",
                    labelWidth: "auto"
                },
                {
                    label: '链接',
                    name: 'Link',
                    type: 'select',
                    width: "550",
                    fieldExtend: "{\"style\":\"margin-top:10px\"}",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    }
                },
                {
                    label: '数据过滤',
                    name: 'LinkBind',
                    type: 'select',
                    width: "550",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    }
                }

                ]
            },
            common: {
                viewType: "form",
                saveCallbackType: "toView"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_portal&viewname=form'
    };
    exports.options.model = {
        name: 'core_portal',
        title: '门户设置'
    };

    exports.service = function server(page)
    {
        function getUrlParm(url, name)
        {
            var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1)
            {
                return "";
            }
            return result[1];
        }

        page.bind('beforeShowForm',
        function (e)
        {

            var page = e.page;
            var op = e.options;

            var field1 = pbc.web.helper.first(op.fields,
            function (a)
            {
                return a.name == "Link";
            });
            var field2 = pbc.web.helper.first(op.fields,
            function (a)
            {
                return a.name == "LinkBind";
            });

            if (field1 != null && field1.editor)
            {
                field1.editor.onButtonClick = function ()
                {
                    var dialog, combobox = this;

                    var path = combobox.getValue().replace("/pages/", "");
                    path = path.replace("pages/", "");
                    path = path.replace(".w", ""); 
                    var formData = {
                        ModelName: path.substr(0, path.indexOf("/")),
                        ViewName: path.substr(path.indexOf("/") + 1),
                    };
                    var options = {
                        url: pbc.toUrl('pages/core_menu/form_geturl.w'),
                        top: 100,
                        width: 600,
                        height: 400,
                        title: '链接自动生成',
                        data: {
                            formData: formData,
                            localType: true,
                            callback: function (data)
                            {
                                combobox.setValue('pages/' + data.ModelName + '/' + data.ViewName + ".w");

                                setTimeout(function ()
                                {
                                    dialog.close();
                                },
                                50);
                            }
                        }
                    };
                    try
                    {
                        var open = top.openDialog ? top.openDialog : $.ligerDialog.open;
                        dialog = open(options);
                    } catch (e)
                    {
                        dialog = $.ligerDialog.open(options);
                    }

                };
            }
            if (field2 != null && field2.editor)
            {
                field2.editor.onButtonClick = function ()
                {
                    var dialog, combobox = this;
                    var combobox_url = this.get('host_form').getEditor("Link");

                    var path = combobox_url.getValue().replace("/pages/", "");
                    path = path.replace("pages/", "");
                    path = path.replace(".w", "");

                    pbc.getFilterFields(path.substr(0, path.indexOf("/")),
                    function (filterFields)
                    {
                        var filterData;
                        var binStr = combobox.getValue();
                        if (binStr)
                        {
                            filterData = JSON.parse(new pbc.base64().decode(binStr));
                            if (filterData) filterData = filterData.filterData;
                        }
                        var jfilterpanel = $('<div class="filterpanel"></div>');
                        var jfilter = $('<div class="filter"></div>').appendTo(jfilterpanel);
                        dialog = $.ligerDialog.open({
                            target: jfilterpanel,
                            isHidden: true,
                            title: '设置过滤条件',
                            width: 500,
                            top: 80,
                            height: 'auto',
                            buttons: [{
                                text: '确定',
                                cls: 'l-dialog-btn-highlight',
                                onclick: function ()
                                {
                                    var data = filter.getData();

                                    combobox.setValue(new pbc.base64().encode(JSON.stringify({
                                        filterData: data
                                    })));
                                    dialog.close();
                                }
                            },
                            {
                                text: '取消',
                                onclick: function ()
                                {
                                    dialog.close();
                                }
                            }]
                        });

                        var fields = filterFields;
                        pbc.preEditor(fields, "fields");

                        fields.push({
                            name: "CreateUserID",
                            display: '(创建人)'
                        });
                        fields.push({
                            name: "ModifyUserID",
                            display: '(最后修改人)'
                        });
                        var status = pbc.web.status_items;

                        var status_data = [];
                        for (name in status)
                        {
                            var id = name;
                            id = id.substring(0, 1).toUpperCase() + id.substring(1).toLowerCase();

                            status_data.push({
                                text: status[name],
                                id: id
                            });
                        }
                        fields.push({
                            name: "Status",
                            type: 'select',
                            editor: {
                                data: status_data
                            },
                            display: '(工作流状态)'
                        });

                        $(fields).each(function ()
                        {
                            this.editor = this.editor || {};
                            this.editor.width = 150;
                        });
                        var filter = jfilter.ligerFilter({
                            fields: fields,
                            buttonCls: 'ne-button',
                            addDefult: true
                        });
                        if (filterData)
                        {
                            filter.setData(filterData);
                        } else
                        {
                            filter.addRule(jfilter.find("table:first"));
                        }
                    });

                };
            }
        });

    };

    return exports;
});