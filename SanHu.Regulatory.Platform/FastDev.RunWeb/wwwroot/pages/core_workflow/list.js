define([],
function() {
    function view() {
        var options = {
            search: {
                conditions: [],
                fields: [{
                    label: "流程名",
                    type: "text",
                    editor: {},
                    name: "Name",
                    name_text: "流程名",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "150"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            },
            list: {
                columns: [

                {
                    name: "Name",
                    type: "",
                    width: 400,
                    display: "流程名"
                },
                {
                    width: "250",
                    display: "模型名",
                    name: "ModelName",
                    align: "left",
                    type: "text"
                }]
            },
            common: {
                showList: 1,
                showCalendar: 1,
                showKanban: 1,
                showReport: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "tab",
                formShowPosition: "",
                dialogWidth: "1000",
                dialogHeight: "700",
                openParm: ""
            },
            kanban: {
                fields: []
            },
            calendar: {
                titleField: "Mode",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            link: {},
            report: {},
            filterFields: [{
                display: "流程名",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "视图定义结构",
                name: "ViewData",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否启用",
                name: "Enabled",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "模型名",
                name: "ModelName",
                editor: {
                    type: "string"
                },
                type: "string"
            }]
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_workflow&viewname=list'
    };
    exports.options.model = {
        name: 'core_workflow',
        title: '工作流定义'
    };

    return exports;
});