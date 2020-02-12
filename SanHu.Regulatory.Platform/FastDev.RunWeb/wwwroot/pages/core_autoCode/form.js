define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    label: "模型名",
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
                    name: "ModelName",
                    width: "150"
                },
                {
                    label: "字段名",
                    type: "ref_popupselect",
                    editor: {
                        isTextBoxMode: true,
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "FieldName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_width: "900",
                        popupselect_height: "600",
                        popupselect_title: "选择： 模型字段"
                    },
                    name: "FieldName",
                    width: "150"
                },

                {
                    name: "Enabled",
                    type: "checkbox",
                    label: "是否启用",
                    editor: {},
                    newline: 1,
                    type_textfield: "复选框",
                    name_textfield: "是否启用",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Prefix",
                    type: "text",
                    label: "前缀",
                    syseditor: "#editor,Prefix,text#",
                    type_textfield: "单行",
                    name_textfield: "前缀",
                    width: "60",
                    validate: {
                        required: 0,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        regexRule_textfield: "(无)",
                        equalTo: "",
                        equalTo_textfield: "(无)"
                    }
                },
                {
                    newline: 0,
                    name: "Infix",
                    type: "text",
                    label: "中缀",
                    syseditor: "#editor,Infix,text#",
                    dictionary: "",
                    width: "60",
                    textField: "",
                    type_textfield: "单行",
                    name_textfield: "中缀",
                    labelWidth: "auto"
                },
                {
                    newline: 0,
                    name: "Suffix",
                    type: "text",
                    label: "后缀",
                    syseditor: "#editor,Suffix,text#",
                    dictionary: "",
                    width: "60",
                    textField: "",
                    type_textfield: "单行",
                    name_textfield: "后缀",
                    labelWidth: "auto"
                },
                {
                    newline: 1,
                    name: "DatePart",
                    type: "listbox",
                    label: "包括日期部分",
                    dictionary: "y,年份|ym,年份+月份|ymd,年+月+日|null,不设置",
                    width: "200",
                    textField: "",
                    editor: {
                        data: [{
                            id: "null",
                            text: "无"
                        },
                        {
                            id: "y",
                            text: "年"
                        },
                        {
                            id: "ym",
                            text: "年+月"
                        },
                        {
                            id: "ymd",
                            text: "年+月+日"
                        }],
                        value: "null",
                        textField: "",
                        url: "",
                        valueField: ""
                    },
                    type_textfield: "单选列表框",
                    name_textfield: "包括日期部分"
                },
                {
                    name: "SerialNumberLenght",
                    type: "int",
                    label: "流水号长度",
                    editor: {},
                    newline: 1,
                    type_textfield: "整数",
                    name_textfield: "流水号长度",
                    width: "60"
                },
                {
                    name: "SerialNumberStart",
                    type: "text",
                    label: "流水号开始编号",
                    editor: {},
                    newline: 0,
                    type_textfield: "单行",
                    name_textfield: "流水号开始编号",
                    width: "60",
                    labelWidth: "auto"
                },
                {
                    name: "SerialNumberStep",
                    type: "int",
                    label: "流水号递增长度",
                    editor: {},
                    newline: 1,
                    type_textfield: "整数",
                    name_textfield: "流水号递增长度",
                    width: "60"
                }],
                width: "",
                inputWidth: "180",
                labelWidth: "120",
                space: "40",
                appendID: 1,
                prefixID: "",
                labelCss: "",
                fieldCss: "",
                spaceCss: "",
                readonly: 0,
                unSetValidateAttr: 0,
                syseditor: "#editor,undefined,undefined#"
            },
            link: {},
            common: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_autoCode&viewname=form'
    };
    exports.options.model = {
        name: 'core_autoCode',
        title: '自动编码'
    };

    exports.service = function server(page) {
        page.bind('beforeShowForm',
        function(e) {

            var page = e.page;
            var op = e.options;

            var field = pbc.web.helper.first(op.fields,
            function(a) {
                return a.name == "FieldName";
            });

            if (field != null && field.editor) {
                field.editor.popupselect_url = function() {
                    var combobox = this;
                    var modelName = $("[name=ModelName]").val();
                    if (!modelName) return false;

                    var url = "/web/main/?model=core_modelfield&viewtype=list";
                    bindStr = new pbc.base64().encode(JSON.stringify({
                        filterData: {
                            groups: [],
                            op: 'and',
                            rules: [{
                                field: 'ModelName',
                                value: modelName,
                                op: 'equal'
                            }]
                        }
                    }));
                    return url + "&bind=" + bindStr;
                };
            }

        });

    };

    return exports;
});