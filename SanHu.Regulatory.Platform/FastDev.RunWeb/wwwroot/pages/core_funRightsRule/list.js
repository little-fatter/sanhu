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
                    name: "ModelName",
                    display: "模型名",
                    type: "text",
                    width: "300",
                    align: "left"
                },
                {
                    width: "250",
                    display: "启用",
                    name: "RuleEnabled",
                    name_text: "启用",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "checkbox",
                    type_text: "复选框"
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
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Title",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_funRightsRule&viewname=list'
    };
    exports.options.model = {
        name: 'core_funRightsRule',
        title: '功能权限规则'
    };

    return exports;
});