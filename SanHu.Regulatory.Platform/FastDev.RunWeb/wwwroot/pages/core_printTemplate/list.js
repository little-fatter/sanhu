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
                    type: "ref",
                    name_text: "模型",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    name: "Name",
                    display: "模板名",
                    type: "string",
                    name_text: "模板名",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                }]
            },
            common: {
                hideViewSwitch: 1,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "",
                formShowType: "tab",
                formShowPosition: "top",
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
            report: {},
            treeFilter: {
                enabled: 0,
                rootText: "全部",
                filterField: "Model",
                sourceModel: "core_model",
                parentField: "",
                textField: "ModelName",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                filterField_textfield: "模型"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_printTemplate&viewname=list'
    };
    exports.options.model = {
        name: 'core_printTemplate',
        title: '打印模板'
    };

    return exports;
});