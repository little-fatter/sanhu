define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "客户ID",
                    label: "客户ID",
                    newline: 1,
                    editor: {},
                    type: "text",
                    width: "",
                    readonlyInEdit: 1
                },
                {
                    name: "公司名称",
                    label: "公司名称",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "联系人姓名",
                    label: "联系人姓名",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "联系人职务",
                    label: "联系人职务",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "城市",
                    label: "城市",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "地区",
                    label: "地区",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "邮政编码",
                    label: "邮政编码",
                    editor: {},
                    type: "text",
                    newline: 1,
                    width: ""
                },
                {
                    name: "国家",
                    label: "国家",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "传真",
                    label: "传真",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "电话",
                    label: "电话",
                    editor: {},
                    type: "text",
                    newline: 1,
                    width: ""
                },
                {
                    name: "地址",
                    label: "地址",
                    newline: 1,
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: "500"
                }],
                tab: null
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=客户&viewname=form'
    };
    exports.options.model = {
        name: '客户',
        title: 'Northwind_ZH客户'
    };

    exports.service = function service(page) {

};

    return exports;
});