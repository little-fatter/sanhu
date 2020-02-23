define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Id",
                    display: "Id",
                    type: "string"
                },
                {
                    name: "Name",
                    display: "Name",
                    type: "string"
                },
                {
                    name: "Mobile",
                    display: "Mobile",
                    type: "string"
                },
                {
                    name: "Email",
                    display: "Email",
                    type: "string"
                },
                {
                    name: "Sex",
                    display: "Sex",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "Address",
                    type: "string"
                },
                {
                    name: "Avatar",
                    display: "Avatar",
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
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "Id",
                name: "Id",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Name",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "AccountId",
                name: "AccountId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "TenantId",
                name: "TenantId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Sex",
                name: "Sex",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Mobile",
                name: "Mobile",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Email",
                name: "Email",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Address",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Password",
                name: "Password",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Avatar",
                name: "Avatar",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "Remark",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=user&viewname=list'
    };
    exports.options.model = {
        name: 'user',
        title: 'frameworkuser'
    };

    exports.service = function service(page) {

};

    return exports;
});