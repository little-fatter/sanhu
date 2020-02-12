define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "QQ",
                    label: " QQ",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "Contact",
                    label: "联系人",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "IsDefault",
                    label: "首要联系人",
                    editor: {
                        type: "checkbox"
                    },
                    type: "checkbox"
                },
                {
                    newline: false,
                    name: "Phone",
                    label: "手机",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "Address",
                    label: "联系地址",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }]
            }
        },
        dataset: 'web/dataset?model=crm_supplierContract&viewname=form'
    };
    exports.options.model = {
        name: 'crm_supplierContract',
        title: '供应商联系人'
    };

    return exports;
});