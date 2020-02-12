define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: false,
                    name: "Classname",
                    label: "等级名",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {},
                    type: "textarea",
                    type_textfield: "多行",
                    name_textfield: "备注",
                    width: ""
                }]
            },
            common: {},
            link: {}
        },
        dataset: 'web/dataset?model=crm_customerlevel&viewname=form'
    };
    exports.options.model = {
        name: 'crm_customerlevel',
        title: '客户等级'
    };

    return exports;
});