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
                    display: "模板名",
                    type: "string",
                    name_text: "模板名",
                    width: "400",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
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
            kanban: {},
            calendar: {
                titleField: "Model",
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
        dataset: 'web/dataset?model=core_exportTemplate&viewname=list'
    };
    exports.options.model = {
        name: 'core_exportTemplate',
        title: '导出模板'
    };

    return exports;
});