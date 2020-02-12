define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "NewField1",
                    label: "字段1",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "NewField2",
                    label: "字段2",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "NewField3",
                    label: "字段3",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "NewField4",
                    label: "字段4",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }]
            },
            common: {
                saveCallbackType: "toView"
            }
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=test_order&viewname=form'
    };
    exports.options.model = {
        name: 'test_order',
        title: 'test_order'
    };

    return exports;
});