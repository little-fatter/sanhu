define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "公司名称",
                    label: "公司名称",
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
                    name: "电话",
                    label: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=运货商&viewname=form'
    };
    exports.options.model = {
        name: '运货商',
        title: 'Northwind_ZH运货商'
    };

    exports.service = function service(page) {

};

    return exports;
});