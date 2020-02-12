define([],
function() {
    function view() {
        var options = {
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            report: {
                title: "统计报表",
                subtitle: "",
                legendType: "pie",
                width: "",
                height: "",
                legendField: "Ordertype",
                legendFieldType: "ref",
                legendIncludeDataOnly: 0,
                axisField: "",
                axisFieldType: "",
                axisIncludeDataOnly: 0,
                valueFieldType: "sum",
                valueField: "TotalPrice",
                legendFieldRefTextField: "Personincharge",
                axisFieldRefTextField: ""
            },
            filterFields: [{
                display: "订单类型",
                name: "Ordertype",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "dev_orderType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "dev_orderType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=dev_orderType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 实例_订单类型",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "参考价格",
                name: "Price",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户",
                name: "Customer",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remarks",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "订单编码",
                name: "OrderNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "价格",
                name: "TotalPrice",
                editor: {
                    type: "number"
                },
                type: "number"
            },
            {
                display: "OrdertypeID",
                name: "OrdertypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'report',
        options: view(),
        dataset: 'web/dataset?model=dev_order&viewname=report'
    };
    exports.options.model = {
        name: 'dev_order',
        title: 'dev_order'
    };

    return exports;
});