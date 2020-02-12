define([],
function ()
{
    function view()
    {
        var options = {
            form: {
                inputWidth: 500,
                fields: [{
                    label: "菜单名",
                    name: "MenuName",
                    type: "text",
                    validate: {
                        required: true
                    }
                },
                {
                    label: "菜单编码",
                    name: "MenuNo",
                    type: "text",
                    validate: {
                        required: true
                    }
                },
                {
                    label: "链接",
                    name: "MenuUrl",
                    type: "select",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    }
                },
                {
                    label: "菜单分组",
                    name: "MenuGroup",
                    type: "text"
                },
                {
                    label: "菜单图标",
                    name: "MenuIcon",
                    type: "fileSelector",
                    editor: {
                        filePath: "contents/icons/bubbles"
                    }
                },
                {
                    label: "父菜单",
                    name: "Parent",
                    textField: "parent_text",
                    type: "select",
                    editor: {
                        valueField: "id",
                        many2one: true,
                        treeLeafOnly: false,
                        textField: "text",
                        tree: {
                            url: "/web/treedata/",
                            checkbox: false,
                            parms: {
                                sourceModel: "core_menu",
                                parentField: "ParentID",
                                enabled: 1
                            },
                            isExpand: false
                        }
                    },
                    type_textfield: "单选下拉框"
                },
                {
                    label: "数据过滤",
                    name: "MenuUrlBind",
                    type: "select",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    }
                },
                {
                    name: "SeqNo",
                    type: "text",
                    label: "排序"
                },
                {
                    name: "MenuGroupSeqNo",
                    type: "text",
                    label: "分组排序"
                },
                {
                    name: "ShowInDesign",
                    type: "checkbox",
                    label: "仅设计可见"
                }]
            },
            common: {},
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_menu&viewname=form'
    };
    exports.options.model = {
        name: 'core_menu',
        title: '菜单'
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
                return a.name == "MenuUrl";
            });
            var field2 = pbc.web.helper.first(op.fields,
            function (a)
            {
                return a.name == "MenuUrlBind";
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
                    if (formData.ViewType == "main") formData.ViewType = "list";
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
                                combobox.setValue('pages/' + data.ModelName + '/' + data.ViewType + ".w");

                                setTimeout(function ()
                                {
                                    dialog.close();
                                },
                                100);
                            }
                        }
                    };
                    dialog = $.ligerDialog.open(options);

                };
            }
            if (field2 != null && field2.editor)
            {
                field2.editor.onButtonClick = function ()
                {
                    var dialog, combobox = this;
                    var combobox_url = this.get('host_form').getEditor("MenuUrl");

                    var path = combobox_url.getValue().replace("/pages/", "");
                    path = path.replace("pages/", "");
                    path = path.replace(".w", "");
                    var model = path.substr(0, path.indexOf("/"));

                    pbc.getFilterFields(model,
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