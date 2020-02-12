define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "customerNo",
                    display: "客户编码",
                    type: "string"
                },
                {
                    name: "Ordernumber",
                    display: "订单号",
                    type: "string"
                },
                {
                    name: "Phone",
                    display: "联系电话",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "客户编码",
                name: "customerNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "订单号",
                name: "Ordernumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "联系电话",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {
                items: [{
                    name: "列链接",
                    title: "列链接(可以将列表列 转换为 可链接的(打开表单))",
                    value: {
                        name: "链接列",
                        title: "建客户列链接到客户表单",
                        value: {
                            columnName: "Ordernumber",
                            openPage: {
                                renderTo: "dialog",
                                url: "/pages/case_saleOrder/form.w?id=#data.ID#",
                                titlte: "订单信息",
                                width: 800,
                                height: 600
                            }
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=case_saleOrder&viewname=list'
    };
    exports.options.model = {
        name: 'case_saleOrder',
        title: '实例-销售订单'
    };

    exports.service = function service(page) {

};

    return exports;
});