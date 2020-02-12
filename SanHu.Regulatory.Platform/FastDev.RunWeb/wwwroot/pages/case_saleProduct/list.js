define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Productname",
                    display: "产品名",
                    type: "string"
                },
                {
                    name: "ProNO",
                    display: "产品编码",
                    type: "string"
                },
                {
                    name: "price",
                    display: "价格",
                    type: "float",
                    name_text: "价格",
                    width: "100",
                    align: "right",
                    align_textfield: "右对齐",
                    type_text: "数值类型"
                },
                {
                    name: "specification",
                    display: "规格",
                    type: "string"
                },
                {
                    name: "remark",
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
                display: "产品名",
                name: "Productname",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "产品编码",
                name: "ProNO",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "规格",
                name: "specification",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "价格",
                name: "price",
                editor: {
                    type: "number"
                },
                type: "number"
            }],
            link: {},
            addins: {
                items: [{
                    name: "增加生成报表按钮",
                    title: "增加生成报表按钮(增加生成报表按钮)",
                    value: {
                        name: "增加生成报表按钮",
                        title: "增加生成报表按钮",
                        value: {
                            buttonText: "生成报表"
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=case_saleProduct&viewname=list'
    };
    exports.options.model = {
        name: 'case_saleProduct',
        title: '实例销售产品'
    };

    exports.service = function service(page) {

};

    return exports;
});