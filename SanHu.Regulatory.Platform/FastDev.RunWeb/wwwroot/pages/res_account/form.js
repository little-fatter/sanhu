define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
                    label: "标题",
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
                    name: "AccountType",
                    label: "账号类型",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_accountType"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    width: ""
                },
                {
                    newline: 1,
                    name: "SortNo",
                    label: "排序",
                    editor: {
                        type: "int"
                    },
                    type: "int",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Store",
                    label: "门店",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_store"
                        },
                        valueField: "ID",
                        textField: "WarehouseName",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    width: ""
                },
                {
                    newline: true,
                    name: "AccountNo",
                    label: "账号",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "AccountMan",
                    label: "开户人",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: ""
                },
                {
                    newline: true,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }],
                inputWidth: "250",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=res_account&viewname=form'
    };
    exports.options.model = {
        name: 'res_account',
        title: '资金账号'
    };

    exports.service = function service(page) {

};

    return exports;
});