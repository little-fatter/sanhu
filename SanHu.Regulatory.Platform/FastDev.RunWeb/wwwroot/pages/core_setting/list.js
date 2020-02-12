define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "SettingName",
                    display: "配置项",
                    type: "string",
                    name_text: "SettingName",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "SettingKey",
                    display: "配置标示",
                    type: "string",
                    name_text: "Key",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "SettingValue",
                    display: "值",
                    type: "string",
                    name_text: "Value",
                    width: "200",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                }]
            },
            common: {
                viewType: "list",
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "",
                searchBoxShowType: "left",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Value",
                startField: "",
                endField: ""
            },
            report: {},
            search: {
                fields: [{
                    label: "关键字",
                    type: "text",
                    labelWidth: "auto",
                    editor: {},
                    name: "Key",
                    name_text: "Key",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: 140
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
        dataset: 'web/dataset?model=core_setting&viewname=list'
    };
    exports.options.model = {
        name: 'core_setting',
        title: '配置信息'
    };

    return exports;
});