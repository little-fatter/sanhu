define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: 1,
                    name: "Customercode",
                    label: "客户编码",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 1
                },
                {
                    newline: false,
                    name: "customername",
                    label: "客户名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "telephonenumber",
                    label: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    name: "address",
                    type: "text",
                    label: "地址",
                    editor: {},
                    newline: 1,
                    width: ""
                },
                {
                    name: "Province",
                    type: "ref_select",
                    label: "省份",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "base_area"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "base_area"
                        },
                        valueField: "ID",
                        sourceFilter: {
                            rules: [{
                                field: "Type",
                                op: "equal",
                                value: "province",
                                type: "select"
                            }],
                            op: "and"
                        },
                        textField: "Title",
                        many2one: true,
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    newline: 1,
                    width: ""
                },
                {
                    name: "city",
                    type: "ref_select",
                    label: "城市",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "base_area"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "base_area"
                        },
                        valueField: "ID",
                        sourceFilter: {
                            rules: [{
                                field: "Type",
                                op: "equal",
                                value: "none",
                                type: "select"
                            }],
                            op: "and"
                        },
                        textField: "Title",
                        many2one: true,
                        select_updatematch_source: "",
                        select_updatematch_target: ""
                    },
                    newline: 0,
                    width: ""
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
            },
            link: {},
            addins: {
                items: []
            }
        },
        dataset: 'web/dataset?model=case_saleCustomer&viewname=form'
    };
    exports.options.model = {
        name: 'case_saleCustomer',
        title: '实例销售客户'
    };

    exports.service = function service(page) {

};

    return exports;
});