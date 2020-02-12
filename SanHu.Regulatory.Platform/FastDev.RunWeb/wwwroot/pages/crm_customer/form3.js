define([],
function() {
    function view() {
        var options = {
            type: "form",
            form: {
                fields: [{
                    newline: 1,
                    name: "RQ",
                    label: "跟进日期2",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker",
                    width: ""
                },
                {
                    newline: 1,
                    name: "GJXX",
                    label: "跟进信息",
                    editor: {},
                    type: "htmlEditor",
                    width: "",
                    fieldExtend: "{width:800}"
                },
                {
                    newline: 1,
                    name: "XCGJRQ",
                    label: "下次跟进",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker",
                    width: ""
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=crm_customer&viewname=form3'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    exports.service = function service(page) {

};

    return exports;
});