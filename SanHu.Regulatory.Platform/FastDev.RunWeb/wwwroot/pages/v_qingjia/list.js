define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "username",
                    display: "username",
                    type: "string"
                },
                {
                    name: "title",
                    display: "title",
                    type: "string"
                },
                {
                    name: "starttime",
                    display: "starttime",
                    type: "string"
                },
                {
                    name: "Endtime",
                    display: "Endtime",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
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
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "ID",
                name: "ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "username",
                name: "username",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "title",
                name: "title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "starttime",
                name: "starttime",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Endtime",
                name: "Endtime",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {
                items: []
            }
        },
        dataset: 'web/dataset?model=v_qingjia&viewname=list'
    };
    exports.options.model = {
        name: 'v_qingjia',
        title: '开发库（本库）v_qingjia'
    };

    exports.service = function service(page) {

};

    return exports;
});