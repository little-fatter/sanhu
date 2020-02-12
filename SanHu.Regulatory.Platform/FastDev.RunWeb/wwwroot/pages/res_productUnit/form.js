define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "UnitName",
                    label: "计量单位名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "textarea",
                    type_textfield: "多行",
                    name_textfield: "备注",
                    width: ""
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                viewType: "form",
                saveCallbackType: "toAdd"
            },
            link: {}
        },
        dataset: 'web/dataset?model=res_productUnit&viewname=form'
    };
    exports.options.model = {
        name: 'res_productUnit',
        title: '单位'
    };

    return exports;
});