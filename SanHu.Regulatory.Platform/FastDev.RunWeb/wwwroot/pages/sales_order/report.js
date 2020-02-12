define([],
function() {

    var exports = {
        type: 'report',
        options: {
            list: {
                columns: [{
                    name: "OrderNo",
                    display: "单据编号",
                    type: "string"
                }]
            },
            common: {
                viewType: "report",
                formShowType: "dialog",
                formShowPosition: "self",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                openParm: ""
            },
            link: {},
            kanban: {},
            calendar: {
                titleField: "Purchaser",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {
                title: "客户总欠款",
                subtitle: "",
                legendType: "bar",
                width: "",
                height: "",
                dataFilter: {
                    rules: [{
                        field: "Status",
                        op: "equal",
                        value: "approved",
                        type: "select"
                    }],
                    op: "and"
                },
                legendField: "Customer",
                legendFieldType: "ref",
                legendIncludeDataOnly: 0,
                axisField: "OrderDate",
                axisFieldType: "month",
                axisIncludeDataOnly: 0,
                valueFieldType: "sum",
                valueField: "Arrears"
            }
        },
        dataset: 'web/dataset?model=sales_order&viewname=report'
    };
    exports.options.model = {
        name: 'sales_order',
        title: '销售订单'
    };

    return exports;
});