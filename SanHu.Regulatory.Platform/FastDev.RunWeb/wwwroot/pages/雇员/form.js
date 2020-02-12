define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "姓氏",
                    label: "姓氏",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: false,
                    name: "名字",
                    label: "名字",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: true,
                    name: "上级",
                    label: "上级",
                    editor: {
                        selectBoxWidth: 500,
                        selectBoxHeight: 300,
                        grid: {
                            checkbox: false,
                            usePager: false,
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
                            }]
                        },
                        grid_source: {
                            model: "雇员",
                            url: "/web/pageddata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "雇员ID",
                            textField: "雇员ID"
                        },
                        isTextBoxMode: 0,
                        value: ""
                    },
                    type: "gridselect",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "职务",
                    label: "职务",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "尊称",
                    label: "尊称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "出生日期",
                    label: "出生日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: false,
                    name: "雇用日期",
                    label: "雇用日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: true,
                    name: "地址",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "城市",
                    label: "城市",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "地区",
                    label: "地区",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "邮政编码",
                    label: "邮政编码",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "国家",
                    label: "国家",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "家庭电话",
                    label: "家庭电话",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "分机",
                    label: "分机",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "照片",
                    label: "照片",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "备注",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=雇员&viewname=form'
    };
    exports.options.model = {
        name: '雇员',
        title: 'Northwind_ZH雇员'
    };

    exports.service = function service(page) {

};

    return exports;
});