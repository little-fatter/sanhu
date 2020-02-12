function view() {
    var options = {
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: "700",
            dialogHeight: "500",
            showList: 0,
            showCalendar: 0,
            showReport: 0,
            showKanban: 0,
            hideToolbar: 1,
            hideViewSwitch: 0,
            viewNameList: "",
            viewNameCalendar: "",
            viewNameReport: "",
            viewNameKanban: "",
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "hide",
            formViewName: "",
            openParm: ""
        },
        report: {
            title: "订单统计报表",
            subtitle: "",
            legendType: "pie",
            width: "",
            height: "",
            legendField: "Orderdate",
            legendFieldType: "month",
            legendFieldRefTextField: "",
            legendIncludeDataOnly: 0,
            axisField: "Orderdate",
            axisFieldType: "month",
            axisFieldRefTextField: "",
            axisIncludeDataOnly: 0,
            valueFieldType: "sum",
            valueField: "Amount"
        },
        filterFields: [{
            display: "客户",
            name: "customer",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "crm_customer"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "crm_customer"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "CustomerName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=crm_customer&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 客户",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "订单标题",
            name: "Ordertitle",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "金额",
            name: "Amount",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "本期还款",
            name: "Payment",
            editor: {
                type: "number"
            },
            type: "number"
        },
        {
            display: "备注",
            name: "remarks",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "订单日期",
            name: "Orderdate",
            editor: {
                type: "datepicker"
            },
            type: "datepicker"
        },
        {
            display: "customerID",
            name: "customerID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {}
    };
    return options;
}