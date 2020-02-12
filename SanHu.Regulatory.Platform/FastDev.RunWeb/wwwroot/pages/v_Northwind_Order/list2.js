define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                pageSize: 50,
                pageSizeOptions: [20, 50, 100, 200, 300, 400, 500, 1000],
                checkbox: false,
                allowHideColumn: true,
                columns: [{
                    name: "订单ID",
                    display: "订单ID",
                    type: "string"
                },
                {
                    name: "客户名",
                    display: "客户名",
                    type: "string"
                },
                {
                    name: "雇员姓名",
                    display: "雇员姓名",
                    type: "string"
                },
                {
                    name: "订购日期",
                    display: "订购日期",
                    type: "string"
                },
                {
                    name: "到货日期",
                    display: "到货日期",
                    type: "string"
                },
                {
                    name: "发货日期",
                    display: "发货日期",
                    type: "string"
                },
                {
                    name: "运货商公司",
                    display: "运货商公司",
                    type: "string"
                },
                {
                    name: "运货费",
                    display: "运货费",
                    type: "string"
                },
                {
                    name: "货主名称",
                    display: "货主名称",
                    type: "string"
                },
                {
                    name: "货主地址",
                    display: "货主地址",
                    type: "string"
                },
                {
                    name: "货主城市",
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
                searchBoxShowType: "",
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
                display: "客户ID",
                name: "客户ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户名",
                name: "客户名",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "雇员ID",
                name: "雇员ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "雇员姓名",
                name: "雇员姓名",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "订购日期",
                name: "订购日期",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "到货日期",
                name: "到货日期",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "发货日期",
                name: "发货日期",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "运货商",
                name: "运货商",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "运货费",
                name: "运货费",
                editor: {
                    type: "string"
                },
                type: "string"
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
                display: "运货商公司",
                name: "运货商公司",
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
                            buttonText: "报表分析"
                        }
                    }
                },
                {
                    name: "增加数据导出按钮",
                    title: "增加数据导出按钮(增加数据导出按钮)",
                    value: {
                        title: "增加数据导出按钮",
                        value: {
                            buttonText: "导出Excel"
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=v_Northwind_Order&viewname=list2'
    };
    exports.options.model = {
        name: 'v_Northwind_Order',
        title: 'v_Northwind_Order'
    };

    exports.service = function service(page) {

};

    return exports;
});