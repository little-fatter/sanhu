define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "公司名称",
                    label: "公司名称",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: false,
                    name: "联系人姓名",
                    label: "联系人姓名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: true,
                    name: "联系人职务",
                    label: "联系人职务",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    newline: true,
                    name: "国家",
                    label: "国家",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "城市",
                    label: "城市",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: false,
                    name: "地区",
                    label: "地区",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "邮政编码",
                    label: "邮政编码",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "电话",
                    label: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "传真",
                    label: "传真",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 0,
                    name: "主页",
                    label: "主页",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "地址",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=供应商&viewname=form'
    };
    exports.options.model = {
        name: '供应商',
        title: 'Northwind_ZH供应商'
    };

    exports.service = function service(page) {

};

    return exports;
});