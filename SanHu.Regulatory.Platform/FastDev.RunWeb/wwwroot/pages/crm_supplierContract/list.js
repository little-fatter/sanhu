define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "QQ",
                    display: " QQ",
                    type: "string"
                },
                {
                    name: "Contact",
                    display: "联系人",
                    type: "string"
                },
                {
                    name: "IsDefault",
                    display: "首要联系人",
                    type: "checkbox"
                },
                {
                    name: "Phone",
                    display: "手机",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "联系地址",
                    type: "string"
                }]
            },
            common: {
                viewType: "list"
            }
        },
        dataset: 'web/dataset?model=crm_supplierContract&viewname=list'
    };
    exports.options.model = {
        name: 'crm_supplierContract',
        title: '供应商联系人'
    };

    return exports;
});