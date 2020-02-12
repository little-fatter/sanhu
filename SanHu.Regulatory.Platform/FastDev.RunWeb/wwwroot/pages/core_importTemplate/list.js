define([],
function() {
    function view() {
        var options = {
            search: {
                fields: [{
                    label: "模型名",
                    type: "text",
                    name: "ModelName",
                    name_text: "模型名",
                    operator: "like",
                    width: "250"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            list: {
                columns: [{
                    name: "Title",
                    display: "模板名",
                    type: "string",
                    width: "250"
                },
                {
                    name: "ModelName",
                    display: "模型名",
                    width: "250"
                }]
            },
            common: {
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "",
                formShowPosition: "",
                dialogWidth: "700",
                dialogHeight: "500",
                openParm: ""
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_importTemplate&viewname=list'
    };
    exports.options.model = {
        name: 'core_importTemplate',
        title: '导入模板'
    };

    return exports;
});