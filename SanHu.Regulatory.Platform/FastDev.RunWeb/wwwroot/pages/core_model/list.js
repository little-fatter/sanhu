define([],
function() {
    function view() {
        var options = {
            list: {
                usePager: false,
                enabledSort: false,
                columns: [{
                    name: "ModelTitle",
                    display: "模型标题",
                    width: 200,
                    align: 'left',
                    type: "string"
                },
                {
                    name: "ModelName",
                    display: "模型名",
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
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Module",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            search: {
                fields: [{
                    label: "所属模块",
                    type: "ref_select",
                    name: "Module",
                    operator: "equal",
                    width: "150",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "core_module"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "ModuleTitle",
                        many2many: true
                    },
                    type_text: "下拉框"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_model&viewname=list'
    };
    exports.options.model = {
        name: 'core_model',
        title: '模型'
    };

    return exports;
});