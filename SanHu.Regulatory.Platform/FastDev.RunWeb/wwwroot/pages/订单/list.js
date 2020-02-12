define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "订单ID",
                    display: "订单ID",
                    type: "string"
                },
                {
                    name: "客户ID",
                    display: "客户ID",
                    type: "string",
                    name_text: "客户ID",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "雇员ID",
                    display: "雇员ID",
                    type: "string",
                    name_text: "雇员ID",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "订购日期",
                    width: "100",
                    display: "订购日期",
                    type: "datetime"
                },
                {
                    name: "到货日期",
                    width: "100",
                    display: "到货日期",
                    type: "datetime"
                },
                {
                    name: "发货日期",
                    width: "100",
                    display: "发货日期",
                    type: "datetime"
                },
                {
                    name: "运货商",
                    width: "100",
                    display: "运货商",
                    type: "number"
                },
                {
                    name: "运货费",
                    width: "100",
                    display: "运货费",
                    type: "number"
                },
                {
                    name: "货主名称",
                    width: "100",
                    display: "货主名称",
                    type: "string"
                },
                {
                    name: "货主地址",
                    width: "100",
                    display: "货主地址",
                    type: "string"
                },
                {
                    name: "货主城市",
                    width: "100",
                    display: "货主城市",
                    type: "string"
                },
                {
                    name: "货主地区",
                    display: "货主地区",
                    type: "string"
                },
                {
                    name: "货主邮政编码",
                    display: "货主邮政编码",
                    type: "string"
                },
                {
                    name: "货主国家",
                    display: "货主国家",
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
                display: "订单ID",
                name: "订单ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "雇员ID",
                name: "雇员ID",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "订购日期",
                name: "订购日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "到货日期",
                name: "到货日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "发货日期",
                name: "发货日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "运货商",
                name: "运货商",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "运货费",
                name: "运货费",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "货主名称",
                name: "货主名称",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "货主地址",
                name: "货主地址",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "货主城市",
                name: "货主城市",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "货主地区",
                name: "货主地区",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "货主邮政编码",
                name: "货主邮政编码",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "货主国家",
                name: "货主国家",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户ID",
                name: "客户ID",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {
                items: [{
                    name: "增加生成报表按钮",
                    title: "增加生成报表按钮(增加生成报表按钮)",
                    value: {
                        title: "增加生成报表按钮",
                        value: {
                            buttonText: "生成报表"
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=订单&viewname=list'
    };
    exports.options.model = {
        name: '订单',
        title: 'Northwind_ZH订单'
    };

    exports.service = function service(page) {

};

    return exports;
});