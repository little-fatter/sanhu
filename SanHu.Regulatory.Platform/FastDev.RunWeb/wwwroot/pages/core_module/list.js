define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "ModuleName",
                    display: "模块标示",
                    type: "string",
                    name_text: "ModuleName",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "ModuleTitle",
                    display: "模块标题",
                    type: "string",
                    name_text: "ModuleTitle",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "500",
                dialogHeight: "400",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "ModuleName",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {},
            filterFields: [{
                display: "ModuleName",
                name: "ModuleName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ModuleTitle",
                name: "ModuleTitle",
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
        dataset: 'web/dataset?model=core_module&viewname=list'
    };
    exports.options.model = {
        name: 'core_module',
        title: 'core_module'
    };

    return exports;
});