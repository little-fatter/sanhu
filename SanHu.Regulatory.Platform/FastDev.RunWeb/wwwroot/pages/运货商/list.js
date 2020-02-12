define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "公司名称",
                    display: "公司名称",
                    type: "string"
                },
                {
                    name: "电话",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "运货商ID",
                    display: "运货商ID",
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
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "运货商ID",
                name: "运货商ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "公司名称",
                name: "公司名称",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "电话",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=运货商&viewname=list'
    };
    exports.options.model = {
        name: '运货商',
        title: 'Northwind_ZH运货商'
    };

    exports.service = function service(page) {

};

    return exports;
});