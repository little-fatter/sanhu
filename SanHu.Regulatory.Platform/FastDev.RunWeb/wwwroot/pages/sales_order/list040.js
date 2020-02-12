define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "OrderDate",
                    display: "单据日期",
                    type: "string"
                },
                {
                    name: "DeliveryDate",
                    display: "交货日期",
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
        dataset: 'web/dataset?model=sales_order&viewname=list040'
    };
    exports.options.model = {
        name: 'sales_order',
        title: '销售订单'
    };

    return exports;
});