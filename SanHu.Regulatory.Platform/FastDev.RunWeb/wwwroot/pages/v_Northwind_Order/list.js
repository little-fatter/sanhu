define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "客户名",
                    display: "客户名",
                    type: "string"
                },
                {
                    name: "订单ID",
                    display: "订单ID",
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
                    name: "运货商",
                    display: "运货商",
                    type: "string"
                },
                {
                    name: "运货费",
                    display: "运货费",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            }
        },
        dataset: 'web/dataset?model=v_Northwind_Order&viewname=list'
    };
    exports.options.model = {
        name: 'v_Northwind_Order',
        title: 'v_Northwind_Order'
    };

    return exports;
});