define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string"
                },
                {
                    name: "SortNo",
                    display: "排序",
                    type: "number"
                },
                {
                    name: "Remarks",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "hide",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "标题",
                name: "Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "排序",
                name: "SortNo",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "备注",
                name: "Remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            search: {
                fields: [{
                    label: "标题",
                    type: "text",
                    editor: {},
                    name: "Title",
                    name_text: "标题",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=res_accountType&viewname=list'
    };
    exports.options.model = {
        name: 'res_accountType',
        title: '资金账号类型'
    };

    return exports;
});