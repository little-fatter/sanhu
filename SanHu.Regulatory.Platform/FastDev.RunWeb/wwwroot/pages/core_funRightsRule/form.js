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
                    newline: 0,
                    name: "RuleEnabled",
                    label: "启用",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "启用",
                    width: "auto",
                    labelAlign: "",
                    labelInAfter: 0,
                    rightToken: "：",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelWidth: "50",
                    group: ""
                },
                {
                    newline: 1,
                    name: "EnabledVisit",
                    label: "访问",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "访问",
                    width: "auto",
                    labelAlign: "",
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelInAfter: 1,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 0,
                    name: "EnabledAdd",
                    label: "新增",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "新增",
                    width: "auto",
                    labelAlign: "",
                    labelInAfter: 1,
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 0,
                    name: "EnabledEdit",
                    label: "修改",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "修改",
                    width: "auto",
                    labelAlign: "",
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelInAfter: 1,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 0,
                    name: "EnabledDel",
                    label: "删除",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "删除",
                    width: "auto",
                    labelAlign: "",
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelInAfter: 1,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 1,
                    name: "EnabledImport",
                    label: "导入",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "导入",
                    width: "auto",
                    labelAlign: "",
                    labelInAfter: 1,
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 0,
                    name: "EnabledExport",
                    label: "导出",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "导出",
                    width: "auto",
                    labelAlign: "",
                    labelInAfter: 1,
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    newline: 0,
                    name: "EnabledPrint",
                    label: "打印",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "打印",
                    width: "auto",
                    labelAlign: "",
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 1,
                    hideInAdd: 0,
                    labelInAfter: 1,
                    labelWidth: "50",
                    group: "功能点"
                },
                {
                    name: "EnabledButtons",
                    type: "selectionCreator",
                    label: "",
                    editor: {
                        isJson: 1,
                        addNewMessage: "创建新功能",
                        itemMessage: "功能",
                        defaultItemLength: "1"
                    },
                    newline: 1,
                    group: "自定义功能点",
                    width: "400",
                    labelAlign: "",
                    labelWidth: "",
                    labelInAfter: 0,
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 1,
                    hideSpace: 0,
                    hideInAdd: 0,
                    name_text: "自定义功能"
                }]
            },
            link: {
                scripts: "",
                styles: "",
                controls: "selectionCreator"
            }
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_funRightsRule&viewname=form'
    };
    exports.options.model = {
        name: 'core_funRightsRule',
        title: '功能权限规则'
    };

    return exports;
});