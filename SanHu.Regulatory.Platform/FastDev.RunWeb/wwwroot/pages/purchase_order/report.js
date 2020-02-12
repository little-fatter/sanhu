define([],
function() {

    var exports = {
        type: 'report',
        options: {
            list: {
                columns: [{
                    name: "OrderDate",
                    display: "单据日期",
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
                titleField: "OrderDate",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            report: {
                title: "供应商采购统计",
                subtitle: "",
                legendType: "bar",
                width: "",
                height: "",
                legendField: "Supplier",
                legendFieldType: "ref",
                legendIncludeDataOnly: 1,
                axisField: "OrderDate",
                axisFieldType: "month",
                valueFieldType: "sum",
                valueField: "Price",
                legendFieldFilter: {
                    rules: [],
                    op: "and"
                },
                dataFilter: {
                    rules: [{
                        field: "Status",
                        op: "equal",
                        value: "Approved",
                        type: "select"
                    }],
                    op: "and"
                }
            }
        },
        dataset: 'web/dataset?model=purchase_order&viewname=report'
    };
    exports.options.model = {
        name: 'purchase_order',
        title: '采购单'
    };

    return exports;
});