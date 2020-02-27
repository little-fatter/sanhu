define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "NewField1",
                    display: "字段1",
                    type: "string"
                },
                {
                    name: "NewField2",
                    display: "字段2",
                    type: "string"
                },
                {
                    name: "NewField3",
                    display: "字段3",
                    type: "string"
                },
                {
                    name: "NewField4",
                    display: "字段4",
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
                display: "字段1",
                name: "NewField1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "字段2",
                name: "NewField2",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "字段3",
                name: "NewField3",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "字段4",
                name: "NewField4",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=test_pdf&viewname=list'
    };
    exports.options.model = {
        name: 'test_pdf',
        title: '测试pdf'
    };

    exports.service = function service(page) {

};

    return exports;
});