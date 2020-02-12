define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    name: "OrderNo",
                    type: "text",
                    label: "订单编码2",
                    editor: {},
                    newline: 1,
                    type_textfield: "单行",
                    name_textfield: "订单编码",
                    width: ""
                },
                {
                    newline: 0,
                    name: "TotalPrice",
                    label: "价格",
                    editor: {},
                    type: "number",
                    type_textfield: "数值",
                    name_textfield: "价格",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Customer",
                    label: "客户",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "客户",
                    width: ""
                },
                {
                    name: "Ordertype",
                    type: "ref_select",
                    label: "订单类型",
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
                        many2one: true
                    },
                    newline: 0,
                    type_textfield: "下拉框",
                    name_textfield: "订单类型",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Detailed",
                    label: "明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "100",
                                type: "ref",
                                align: "left",
                                name: "Product",
                                name_textfield: "产品",
                                align_textfield: "左对齐",
                                type_textfield: "引用类型",
                                editorType: "ref_select",
                                editorType_textfield: "下拉框",
                                display: "产品",
                                editor: {
                                    url: "/web/namedata",
                                    parms: {
                                        model: "dev_product"
                                    },
                                    detailEnabled: true,
                                    detailUrl: "/web/detaildata",
                                    detailParms: {
                                        model: "dev_product"
                                    },
                                    valueField: "ID",
                                    textField: "Productname",
                                    many2one: true,
                                    type: "ref_select"
                                }
                            },
                            {
                                width: "100",
                                type: "curreny",
                                align: "left",
                                name: "UnitPrice",
                                name_textfield: "单价",
                                align_textfield: "左对齐",
                                type_textfield: "货币",
                                editorType: "currency",
                                editorType_textfield: "货币",
                                editor: {
                                    type: "currency"
                                },
                                display: "单价"
                            },
                            {
                                width: "100",
                                type: "float",
                                align: "left",
                                display: "数量",
                                name: "Number",
                                name_textfield: "数量",
                                align_textfield: "左对齐",
                                type_textfield: "数值类型",
                                editorType: "int",
                                editorType_textfield: "整数",
                                editor: {
                                    type: "int"
                                }
                            },
                            {
                                display: "总价",
                                width: "100",
                                type: "float",
                                align: "left",
                                name: "Total",
                                name_textfield: "总价",
                                align_textfield: "左对齐",
                                type_textfield: "数值类型",
                                editorType: "currency",
                                editorType_textfield: "货币",
                                editor: {
                                    type: "currency"
                                }
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "/web/main/?model=dev_orderdetail&viewtype=form",
                        titleEdit: "修改： 实例_订单明细",
                        titleAdd: "新增：实例_订单明细",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    type_textfield: "编辑表格",
                    name_textfield: "明细",
                    width: "600",
                    hideLabel: 1
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        type: "text",
                        nullText: "备注"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "备注",
                    width: "600",
                    hideLabel: 1
                }]
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=dev_order&viewname=form'
    };
    exports.options.model = {
        name: 'dev_order',
        title: 'dev_order'
    };

    return exports;
});