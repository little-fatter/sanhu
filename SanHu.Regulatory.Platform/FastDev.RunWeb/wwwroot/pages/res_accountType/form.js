define([],
function() {

    var exports = {
        type: 'form',
        options: {
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
                    name: "SortNo",
                    label: "排序",
                    editor: {
                        type: "int"
                    },
                    type: "int",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: ""
                }],
                inputWidth: "240",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {}
        },
        dataset: 'web/dataset?model=res_accountType&viewname=form'
    };
    exports.options.model = {
        name: 'res_accountType',
        title: '资金账号类型'
    };

    return exports;
});