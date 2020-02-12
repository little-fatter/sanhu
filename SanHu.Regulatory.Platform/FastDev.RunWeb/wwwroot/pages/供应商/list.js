define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "供应商ID",
                    display: "供应商ID",
                    type: "string"
                },
                {
                    name: "公司名称",
                    display: "公司名称",
                    type: "string"
                },
                {
                    name: "联系人姓名",
                    display: "联系人姓名",
                    type: "string"
                },
                {
                    name: "联系人职务",
                    display: "联系人职务",
                    type: "string"
                },
                {
                    name: "地址",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "电话",
                    display: "电话",
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
                hideViewSwitch: 1,
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
                display: "供应商ID",
                name: "供应商ID",
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
                display: "联系人姓名",
                name: "联系人姓名",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "联系人职务",
                name: "联系人职务",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "地址",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "城市",
                name: "城市",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地区",
                name: "地区",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "邮政编码",
                name: "邮政编码",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "国家",
                name: "国家",
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
            },
            {
                display: "传真",
                name: "传真",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "主页",
                name: "主页",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=供应商&viewname=list'
    };
    exports.options.model = {
        name: '供应商',
        title: 'Northwind_ZH供应商'
    };

    exports.service = function service(page) {

};

    return exports;
});