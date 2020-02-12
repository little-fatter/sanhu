define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "NewField1",
                    display: "字段1",
                    type: "string"
                },
                {
                    name: "NewField2",
                    display: "字段2",
                    type: "datetime"
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
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "字段3",
                name: "NewField3",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "字段4",
                name: "NewField4",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=test_02&viewname=list'
    };
    exports.options.model = {
        name: 'test_02',
        title: 'test_02'
    };

    return exports;
});