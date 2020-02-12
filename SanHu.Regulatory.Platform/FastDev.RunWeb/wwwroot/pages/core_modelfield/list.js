define([],
function() {
    function view() {
        var options = {
            list: {
                usePager: false,
                enabledSort: false,
                columns: [{
                    name: "FieldName",
                    display: "字段名",
                    width: 200,
                    align: 'left',
                    type: "string"
                },
                {
                    name: "FieldTitle",
                    display: "字段标题",
                    width: 200,
                    align: 'left',
                    type: "string"
                }]
            },
            common: {
                hideViewSwitch: 1,
                formShowType: "",
                formShowPosition: "",
                dialogWidth: "",
                dialogHeight: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "selectBox"
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_modelfield&viewname=list'
    };
    exports.options.model = {
        name: 'core_modelfield',
        title: '模型字段'
    };

    return exports;
});