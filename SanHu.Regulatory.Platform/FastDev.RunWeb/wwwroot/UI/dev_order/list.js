function view() {
    var options = {
        list: {
            columns: [{
                name: "OrderNo",
                display: "订单编码",
                type: "string",
                name_text: "订单编码",
                width: "150",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                width: "160",
                display: "价格",
                name: "TotalPrice",
                name_text: "价格",
                align: "left",
                align_textfield: "左对齐",
                type: "string",
                type_text: "文本型"
            },
            {
                name: "Customer",
                display: "客户",
                type: "string",
                name_text: "客户",
                width: "200",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "Remarks",
                display: "备注",
                type: "string",
                name_text: "备注",
                width: "300",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                width: "150",
                display: "状态",
                name: "Status",
                name_text: " - 状态 - ",
                align: "left",
                align_textfield: "左对齐",
                type: "wfstatus",
                type_text: "工作流状态"
            }]
        },
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: 700,
            dialogHeight: 500
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