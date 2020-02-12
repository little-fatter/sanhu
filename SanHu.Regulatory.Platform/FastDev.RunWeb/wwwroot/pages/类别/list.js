define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "类别ID",
                    display: "类别ID",
                    type: "string"
                },
                {
                    name: "类别名称",
                    display: "类别名称",
                    type: "string"
                },
                {
                    name: "说明",
                    display: "说明",
                    type: "string"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "top",
                dialogWidth: "600",
                dialogHeight: "400",
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
                display: "类别ID",
                name: "类别ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "类别名称",
                name: "类别名称",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "说明",
                name: "说明",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "图片",
                name: "图片",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=类别&viewname=list'
    };
    exports.options.model = {
        name: '类别',
        title: 'Northwind_ZH类别'
    };

    exports.service = function service(page) {

};

    return exports;
});