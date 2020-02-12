define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "TypeName",
                    label: "类别名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_text: "单行"
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "textarea",
                    type_text: "多行",
                    name_text: "备注",
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
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            link: {}
        },
        dataset: 'web/dataset?model=crm_customerType&viewname=form'
    };
    exports.options.model = {
        name: 'crm_customerType',
        title: '客户类别'
    };

    return exports;
});