define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "Receiver",
                    label: "收货人",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行"
                },
                {
                    newline: 0,
                    name: "OrderNo",
                    label: "订单号",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "订单号",
                    width: "",
                    readonly: 1
                },
                {
                    name: "OrderStatus",
                    type: "select",
                    label: "状态",
                    editor: {
                        data: [{
                            id: "active",
                            text: "已接单"
                        },
                        {
                            id: "running",
                            text: "进行中"
                        },
                        {
                            id: "completed",
                            text: "完成"
                        }]
                    },
                    newline: 1,
                    type_textfield: "单选下拉框",
                    name_textfield: " - 状态 - ",
                    width: ""
                }],
                tab: {
                    items: [{
                        title: "基本信息",
                        fields: [{
                            newline: false,
                            name: "Product",
                            label: "订购产品",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行",
                            name_textfield: "订购产品",
                            width: ""
                        },
                        {
                            newline: false,
                            name: "UnitPrice",
                            label: "单价",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行"
                        },
                        {
                            newline: 1,
                            name: "Weight",
                            label: "数量",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行",
                            name_textfield: "重量",
                            width: ""
                        },
                        {
                            newline: 0,
                            name: "OrderTime",
                            label: "订单时间",
                            editor: {
                                type: "datepicker"
                            },
                            type: "datepicker",
                            type_textfield: "日期",
                            name_textfield: "订单时间",
                            width: ""
                        }]
                    },
                    {
                        title: "收货",
                        fields: [{
                            newline: false,
                            name: "Phone",
                            label: "电话",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行"
                        },
                        {
                            newline: 1,
                            name: "Address",
                            label: "地址",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行",
                            name_textfield: "地址",
                            width: "500"
                        }]
                    },
                    {
                        title: "财务",
                        fields: [{
                            newline: false,
                            name: "Price",
                            label: "总金额",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行"
                        },
                        {
                            newline: 1,
                            name: "Payment",
                            label: "付款",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行",
                            name_textfield: "付款",
                            width: ""
                        },
                        {
                            newline: 1,
                            name: "Arrears",
                            label: "欠款",
                            editor: {
                                type: "text"
                            },
                            type: "text",
                            type_textfield: "单行",
                            name_textfield: "欠款",
                            width: ""
                        }]
                    },
                    {
                        title: "备注",
                        fields: [{
                            newline: 1,
                            name: "Remark",
                            label: "备注",
                            editor: {
                                height: "100"
                            },
                            type: "textarea",
                            type_textfield: "多行",
                            name_textfield: "备注",
                            width: "600",
                            hideLabel: 1
                        }]
                    }]
                }
            },
            common: {
                viewType: "form",
                saveCallbackType: "toEdit"
            },
            link: {},
            actions: {
                get: "/net/detailData/",
                save: "/net/saveorder/",
                del: "net/delete/"
            }
        },
        dataset: 'web/dataset?model=net_order&viewname=form'
    };
    exports.options.model = {
        name: 'net_order',
        title: '跟单管理'
    };

    return exports;
});