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
                    width: "250",
                    display: "模型名",
                    name: "ModelName",
                    align: "left"
                },
                {
                    width: "250",
                    display: "模型字段",
                    name: "FieldName",
                    name_text: "模型字段",
                    align: "left"
                },
                {
                    width: "150",
                    display: "是否启用",
                    name: "Enabled",
                    name_text: "是否启用",
                    align: "left",
                    type: "checkbox",
                    type_text: "复选框",
                    align_textfield: "左对齐"
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
                titleField: "DatePart",
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
        dataset: 'web/dataset?model=core_autoCode&viewname=list'
    };
    exports.options.model = {
        name: 'core_autoCode',
        title: '自动编码'
    };

    return exports;
});