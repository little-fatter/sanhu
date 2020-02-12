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
                    newline: 0,
                    name: "RuleEnabled",
                    label: "启用",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox",
                    type_text: "复选框",
                    name_text: "是否启用",
                    group: "",
                    width: "auto",
                    labelAlign: "",
                    labelWidth: "",
                    labelInAfter: 0,
                    rightToken: "",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 0,
                    hideInAdd: 0
                },
                {
                    newline: 1,
                    name: "Title",
                    label: "标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_text: "单行",
                    name_text: "标题",
                    group: "",
                    width: "",
                    labelAlign: "",
                    labelWidth: "",
                    labelInAfter: 0,
                    rightToken: "：",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 0,
                    hideInAdd: 0
                },
                {
                    newline: 1,
                    name: "RuleContent",
                    label: "规则",
                    editor: {
                        type: "text",
                        cls: "filterpanel2",
                        includeMyself: 1,
                        modelField: "ModelName",
                        isJson: 1
                    },
                    type: "modelFilterBuilder",
                    name_text: "规则",
                    group: "",
                    width: "600",
                    labelAlign: "",
                    labelWidth: "",
                    labelInAfter: 0,
                    rightToken: "：",
                    fieldExtend: "",
                    readonly: 0,
                    hideLabel: 0,
                    hideSpace: 0,
                    hideInAdd: 0
                }]
            },
            link: {
                scripts: "",
                styles: "",
                controls: "modelFilterBuilder"
            }
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_dataRightsRule&viewname=form'
    };
    exports.options.model = {
        name: 'core_dataRightsRule',
        title: '数据权限规则'
    };

    return exports;
});