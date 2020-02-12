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
                        url: "/web/namedata",
                        parms: {
                            model: "crm_customer"
                        },
                        valueField: "ModelName",
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
                    newline: false,
                    name: "Name",
                    label: "模板名",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }],
                tab: {
                    items: [{
                        title: "模板",
                        fields: [{
                            newline: 0,
                            name: "TemplateBody",
                            label: "模板内容",
                            editor: {
                                type: "text"
                            },
                            type: "pageTemplate",
                            width: "900",
                            hideLabel: 1,
                            hideSpace: 1
                        }]
                    },
                    {
                        title: "样式",
                        fields: [{
                            newline: 0,
                            name: "TemplateStyle",
                            label: "模板样式",
                            editor: {
                                type: "text"
                            },
                            type: "textarea",
                            width: "800",
                            hideLabel: 1,
                            type_textfield: "多行",
                            name_textfield: "模板样式"
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
        dataset: 'web/dataset?model=core_printTemplate&viewname=form'
    };
    exports.options.model = {
        name: 'core_printTemplate',
        title: '打印模板'
    };

    return exports;
});