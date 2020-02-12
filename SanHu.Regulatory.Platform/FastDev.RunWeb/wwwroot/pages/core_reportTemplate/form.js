define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    name: "Title",
                    type: "text",
                    label: "标题",
                    editor: {},
                    newline: 0,
                    type_textfield: "单行",
                    name_textfield: "标题",
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        regexRule_textfield: "(无)",
                        equalTo: "",
                        equalTo_textfield: "(无)"
                    }
                },
                {
                    label: "模型名",
                    type: "ref_popupselect",
                    editor: {
                        isTextBoxMode: true,
                        url: "/web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
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
                    width: "150",
                    newline: 0,
                    type_textfield: "弹出&自动完成"
                },
                {
                    name: "TemplateName",
                    type: "text",
                    label: "模板名(ID)",
                    editor: {},
                    newline: 1,
                    type_textfield: "单行",
                    name_textfield: "模板标示",
                    width: ""
                },
                {
                    name: "IsDefault",
                    type: "checkbox",
                    label: "是否默认",
                    editor: {},
                    newline: 0,
                    type_textfield: "复选框",
                    name_textfield: "是否默认",
                    width: ""
                }],
                tab: {
                    items: [{
                        title: "模板",
                        fields: [{
                            newline: 0,
                            name: "TemplateBody",
                            label: "模板",
                            editor: {
                                type: "text"
                            },
                            type: "pageTemplate",
                            width: "890",
                            editorExtend: "",
                            hideLabel: 1,
                            hideSpace: 1,
                            fieldExtend: "{\"editor\":{\"isListTemplate\":true}}",
                            type_textfield: "pageTemplate",
                            name_textfield: "模板"
                        }]
                    },
                    {
                        title: "样式",
                        fields: [{
                            newline: 0,
                            name: "TemplateStyle",
                            label: "样式",
                            editor: {
                                type: "text"
                            },
                            type: "textarea",
                            width: "500",
                            editorExtend: "",
                            hideLabel: 1,
                            type_textfield: "多行",
                            name_textfield: "样式"
                        }]
                    },
                    {
                        title: "打印设置",
                        fields: [{
                            name: "PrintPage",
                            type: "text",
                            label: "打印纸型",
                            editor: {},
                            newline: 0,
                            type_textfield: "单行",
                            name_textfield: "打印纸型",
                            width: ""
                        },
                        {
                            name: "Width",
                            type: "number",
                            label: "宽度",
                            editor: {},
                            newline: 1,
                            type_textfield: "数值",
                            width: "",
                            name_textfield: "宽度"
                        },
                        {
                            name: "Height",
                            type: "number",
                            label: "高度",
                            editor: {},
                            newline: 0,
                            type_textfield: "数值",
                            name_textfield: "高度",
                            width: ""
                        },
                        {
                            name: "MarginTop",
                            type: "number",
                            label: "上边距",
                            editor: {},
                            newline: 1,
                            type_textfield: "数值",
                            name_textfield: "上边距",
                            width: ""
                        },
                        {
                            name: "MarginBottom",
                            type: "number",
                            label: "下边距",
                            editor: {},
                            newline: false,
                            type_textfield: "数值",
                            name_textfield: "下边距",
                            width: ""
                        },
                        {
                            name: "MarginLeft",
                            type: "number",
                            label: "左边距",
                            editor: {},
                            newline: 1,
                            type_textfield: "数值",
                            name_textfield: "左边距",
                            width: ""
                        },
                        {
                            name: "MarginRight",
                            type: "number",
                            label: "右边距",
                            editor: {},
                            newline: 0,
                            type_textfield: "数值",
                            width: "",
                            name_textfield: "右边距"
                        }]
                    }]
                }
            },
            link: {
                scripts: "",
                styles: "",
                controls: "pageTemplate"
            },
            common: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_reportTemplate&viewname=form'
    };
    exports.options.model = {
        name: 'core_reportTemplate',
        title: '报表模板'
    };

    return exports;
});