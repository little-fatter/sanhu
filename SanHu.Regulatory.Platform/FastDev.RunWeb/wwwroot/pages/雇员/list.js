define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                tree: {
                    idField: "雇员ID",
                    parentIDField: "上级",
                    columnName: "名称"
                },
                columns: [{
                    name: "名称",
                    display: "名称",
                    width: 190,
                    align: "left",
                    type: "string",
                    render: "function(row,index,value){\n   return row.姓氏 + row.名字 + \"(\" + row.尊称 + \")\";\n}"
                },
                {
                    name: "姓氏",
                    display: "姓氏",
                    type: "string"
                },
                {
                    name: "名字",
                    display: "名字",
                    type: "string"
                },
                {
                    name: "职务",
                    display: "职务",
                    type: "string"
                },
                {
                    name: "尊称",
                    display: "尊称",
                    type: "string"
                },
                {
                    name: "出生日期",
                    display: "出生日期",
                    type: "datetime"
                },
                {
                    name: "雇用日期",
                    display: "雇用日期",
                    type: "datetime"
                },
                {
                    name: "地址",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "上级",
                    display: "上级",
                    type: "number"
                },
                {
                    name: "雇员ID",
                    display: "雇员ID",
                    type: "string"
                }]
            },
            common: {
                formShowType: "dialog",
                formShowPosition: "top",
                dialogWidth: "800",
                dialogHeight: "600",
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
                display: "雇员ID",
                name: "雇员ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "姓氏",
                name: "姓氏",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "名字",
                name: "名字",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "职务",
                name: "职务",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "尊称",
                name: "尊称",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "出生日期",
                name: "出生日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "雇用日期",
                name: "雇用日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
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
                display: "家庭电话",
                name: "家庭电话",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "分机",
                name: "分机",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "照片",
                name: "照片",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "备注",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "上级",
                name: "上级",
                editor: {
                    type: "int"
                },
                type: "int"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=雇员&viewname=list'
    };
    exports.options.model = {
        name: '雇员',
        title: 'Northwind_ZH雇员'
    };

    exports.service = function service(page) {

};

    return exports;
});