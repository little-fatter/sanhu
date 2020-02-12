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
                    name: "Remarks",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "top",
                dialogWidth: "600",
                dialogHeight: "300",
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
                searchAdShowType: "left",
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
                display: "备注",
                name: "Remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {}
        },
        dataset: 'web/dataset?model=case_qingjiaType&viewname=list'
    };
    exports.options.model = {
        name: 'case_qingjiaType',
        title: '请假类型'
    };

    return exports;
});