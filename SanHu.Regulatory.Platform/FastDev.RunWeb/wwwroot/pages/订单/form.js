define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "订购日期",
                    label: "订购日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: false,
                    name: "到货日期",
                    label: "到货日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: true,
                    name: "发货日期",
                    label: "发货日期",
                    editor: {
                        type: "datepicker"
                    },
                    type: "datepicker"
                },
                {
                    newline: 1,
                    name: "雇员ID",
                    label: "雇员ID",
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
                        grid_source: {
                            model: "雇员",
                            url: "/web/pageddata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "雇员ID",
                            textField: "雇员ID"
                        },
                        isTextBoxMode: 1,
                        value: ""
                    },
                    type: "gridselect",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "运货商",
                    label: "运货商",
                    editor: {
                        data: [],
                        freedesign_source: {
                            model: "运货商",
                            url: "/web/listdata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "运货商ID",
                            textField: "公司名称"
                        },
                        isTextBoxMode: 1,
                        value: ""
                    },
                    type: "select",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "客户ID",
                    label: "客户ID",
                    editor: {
                        selectBoxWidth: 500,
                        selectBoxHeight: 300,
                        grid: {
                            checkbox: false,
                            usePager: false,
                            columns: [{
                                name: "客户ID",
                                display: "客户ID",
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
                                name: "城市",
                                display: "城市",
                                type: "string"
                            },
                            {
                                name: "地区",
                                display: "地区",
                                type: "string"
                            }]
                        },
                        grid_source: {
                            model: "客户",
                            url: "/web/pageddata/",
                            filter: {
                                op: "and"
                            },
                            valueField: "客户ID",
                            textField: "客户ID"
                        },
                        isTextBoxMode: 1,
                        value: ""
                    },
                    type: "gridselect",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "运货费",
                    label: "运货费",
                    editor: {},
                    type: "currency",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "货主名称",
                    label: "货主名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "货主地址",
                    label: "货主地址",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "货主城市",
                    label: "货主城市",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "货主地区",
                    label: "货主地区",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "货主邮政编码",
                    label: "货主邮政编码",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "货主国家",
                    label: "货主国家",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=订单&viewname=form'
    };
    exports.options.model = {
        name: '订单',
        title: 'Northwind_ZH订单'
    };

    exports.service = function service(page) {

};

    return exports;
});