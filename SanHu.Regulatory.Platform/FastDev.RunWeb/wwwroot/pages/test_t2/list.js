define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CON1",
                    display: "con1",
                    type: "string"
                },
                {
                    name: "Con2",
                    display: "con2",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "con1",
                name: "CON1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "con2",
                name: "Con2",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=test_t2&viewname=list'
    };
    exports.options.model = {
        name: 'test_t2',
        title: '测试2'
    };

    exports.service = function service(page) {

};

    return exports;
});