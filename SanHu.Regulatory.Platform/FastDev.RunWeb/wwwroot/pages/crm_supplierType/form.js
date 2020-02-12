define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: false,
                    name: "TypeName",
                    label: "类别名",
                    editor: {
                        type: "text"
                    },
                    type: "text"
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
                    rightToken: "",
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
            link: {},
            common: {
                saveCallbackType: "toAdd"
            }
        },
        dataset: 'web/dataset?model=crm_supplierType&viewname=form'
    };
    exports.options.model = {
        name: 'crm_supplierType',
        title: '供应商类别'
    };

    return exports;
});