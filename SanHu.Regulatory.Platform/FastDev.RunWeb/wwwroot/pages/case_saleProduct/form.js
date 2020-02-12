define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Productname",
                    label: "产品名",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "ProNO",
                    label: "产品编码",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "price",
                    label: "价格",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "specification",
                    label: "规格",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "remark",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }]
            },
            common: {
                saveCallbackType: "toClose"
            }
        },
        dataset: 'web/dataset?model=case_saleProduct&viewname=form'
    };
    exports.options.model = {
        name: 'case_saleProduct',
        title: '实例销售产品'
    };

    return exports;
});