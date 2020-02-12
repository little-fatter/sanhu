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
                    width: "150"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string"
                },
                {
                    name: "ModelName",
                    display: "模型名",
                    type: "text"
                },
                {
                    name: "RuleEnabled",
                    display: "启用",
                    type: "checkbox"
                }]
            },
            common: {
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "tab",
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
        dataset: 'web/dataset?model=core_fieldRightsRule&viewname=list'
    };
    exports.options.model = {
        name: 'core_fieldRightsRule',
        title: '字段权限规则'
    };

    return exports;
});