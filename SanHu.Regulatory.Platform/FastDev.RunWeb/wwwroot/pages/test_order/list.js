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
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=test_order&viewname=list'
    };
    exports.options.model = {
        name: 'test_order',
        title: 'test_order'
    };

    return exports;
});