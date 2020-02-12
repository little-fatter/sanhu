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
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: ""
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {}
        },
        dataset: 'web/dataset?model=case_qingjiaType&viewname=form'
    };
    exports.options.model = {
        name: 'case_qingjiaType',
        title: '请假类型'
    };

    return exports;
});