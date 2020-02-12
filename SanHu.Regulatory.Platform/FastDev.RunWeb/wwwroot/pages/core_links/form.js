define([],
function() {
    function view() {
        var options = {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
                    label: "标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },

                {
                    newline: 1,
                    name: "Url",
                    label: "链接",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    },
                    type: "select",
                    width: ""
                },
                {
                    newline: 1,
                    name: "LinkBind",
                    label: "链接参数",
                    type: "select",
                    editor: {
                        isTextBoxMode: true,
                        css: "combobox-selector"
                    },
                    width: ""
                },
                {
                    name: "LinkType",
                    type: "select",
                    label: "类型",
                    editor: {
                        data: [{
                            id: "1",
                            text: "分组1"
                        },
                        {
                            id: "2",
                            text: "分组2"
                        }],
                        value: "1",
                        textField: "",
                        url: "",
                        valueField: ""
                    },
                    newline: 1,
                    width: "200"
                },
                {
                    name: "OpenType",
                    type: "select",
                    label: "打开方式",
                    editor: {
                        data: [{
                            id: "tab",
                            text: "Tab"
                        },
                        {
                            id: "dialog",
                            text: "弹窗"
                        }],
                        value: "tab",
                        textField: "",
                        url: "",
                        valueField: ""
                    },
                    newline: 0,
                    width: "200"
                },
                {
                    newline: 1,
                    name: "BackgroundColor",
                    label: "背景色",
                    dictionary: "#77cdf0|#537cbe|#e9654c|#aecf74|#fcc433|#1b96d2|#fac867|#d97da6|#1b96d2|#eb466e|#f1c958|#56acdb|#e9654c|#5f90b0|#7f7f7f|#bf57a0|#41bff1|#a0cd92|#e73b3b|#8ccfdf|#24b7eb|#f29200|#d5e17f|#69696b|#4d75ba|#859662|#5169af|#6b8852|#e73b3b|#f29200",
                    editor: {
                        isTextBoxMode: true,
                        renderItem: function(r) {
                            return '<div style="background:' + r.value + ';color:white;">' + r.value + '</div>';
                        }
                    },
                    type: "select",
                    validate: {
                        required: 0,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    width: "200"
                },
                {
                    newline: 0,
                    name: "Icon",
                    label: "图标",
                    type: "fileSelector",
                    editor: {
                        filePath: "contents/icons/bubbles"
                    },
                    width: "200"
                },
                {
                    newline: 1,
                    name: "SortNo",
                    label: "排序",
                    editor: {
                        type: "int"
                    },
                    type: "int",
                    width: "200"
                },
                {
                    newline: 0,
                    name: "LinkID",
                    label: "链接ID",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "200"
                }

                ],
                tab: {
                    items: [{
                        title: '配置提醒记录数(自定义过滤)',
                        fields: [{
                            newline: 1,
                            name: "ModelName",
                            label: "绑定模型",
                            type: "ref_popupselect",
                            editor: {
                                isTextBoxMode: true,
                                valueField: "ID",
                                sourceFilter: null,
                                textField: "ModelName",
                                css: "combobox-selector",
                                popupselect_ismul: false,
                                popupselect_type: "popupselect",
                                popupselect_url: "/web/main/?model=core_model&viewtype=list",
                                popupselect_width: "900",
                                popupselect_height: "600",
                                popupselect_title: "选择： 模型"
                            },
                            width: "500"
                        },
                        {
                            newline: 1,
                            name: "FilterData",
                            label: "过滤数据",
                            editor: {
                                type: "text",
                                cls: "filterpanel2",
                                includeMyself: 1,
                                modelField: "ModelName",
                                isJson: 1
                            },
                            type: "modelFilterBuilder",
                            width: "500"
                        }]
                    },
                    {
                        title: '配置提醒记录数(SQL)',
                        fields: [{
                            newline: 1,
                            name: "ValueSQL",
                            label: "SQL",
                            editor: {
                                type: "textarea",
                                height: 60
                            },
                            type: "textarea",
                            width: "500"
                        }]
                    }]
                },
                inputWidth: "530",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_links&viewname=form'
    };
    exports.options.model = {
        name: 'core_links',
        title: '快捷链接(首页按钮)'
    };

    exports.service = function server(page) {
        function getUrlParm(url, name) {
            var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
            if (result == null || result.length < 1) {
                return "";
            }
            return result[1];
        }

        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;
            var field1 = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "Url";
            });
            var field2 = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "LinkBind";
            });

            if (field1 != null && field1.editor) {
                field1.editor.onButtonClick = function() {
                    var dialog, combobox = this;
                    var formData = {
                        ModelName: getUrlParm(combobox.getValue(), "model"),
                        ViewType: getUrlParm(combobox.getValue(), "viewtype"),
                        ViewName: getUrlParm(combobox.getValue(), "viewname")
                    };
                    if (formData.ViewType == "main") formData.ViewType = "list";
                    var options = {
                        url: pbc.toUrl('web/main?model=core_menu&viewtype=form&viewname=form_geturl'),
                        top: 100,
                        width: 600,
                        height: 400,
                        title: '链接自动生成',
                        data: {
                            formData: formData,
                            localType: true,
                            callback: function(data) {
                                combobox.setValue('web/main?model=' + data.ModelName + '&viewtype=' + data.ViewType + '&viewname=' + data.ViewName);

                                setTimeout(function() {
                                    dialog.close();
                                },
                                50);
                            }
                        }
                    };
                    try {
                        var open = top.openDialog ? top.openDialog: $.ligerDialog.open;
                        dialog = open(options);
                    } catch(e) {
                        dialog = $.ligerDialog.open(options);
                    }

                };
            }
            if (field2 != null && field2.editor) {
                field2.editor.onButtonClick = function() {
                    var dialog, combobox = this;
                    var combobox_url = this.get('host_form').getEditor("Url");
                    var model = getUrlParm(combobox_url.getValue(), "model");
                    if (!model) return;

                    pbc.getFilterFields(model,
                    function(filterFields) {
                        var filterData;
                        var binStr = combobox.getValue();
                        if (binStr) {
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
                                onclick: function() {
                                    var data = filter.getData();

                                    combobox.setValue(new pbc.base64().encode(JSON.stringify({
                                        filterData: data
                                    })));
                                    dialog.close();
                                }
                            },
                            {
                                text: '取消',
                                onclick: function() {
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
                        for (name in status) {
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

                        $(fields).each(function() {
                            this.editor = this.editor || {};
                            this.editor.width = 150;
                        });
                        var filter = jfilter.ligerFilter({
                            fields: fields,
                            buttonCls: 'ne-button',
                            addDefult: true
                        });
                        if (filterData) {
                            filter.setData(filterData);
                        } else {
                            filter.addRule(jfilter.find("table:first"));
                        }
                    });

                };
            }
        });

    };

    return exports;
});