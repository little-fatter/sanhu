define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: 1,
                    name: "customerNo",
                    label: "客户编码",
                    editor: {
                        css: "combobox-selector",
                        popupselect_width: "800",
                        popupselect_height: "600",
                        popupselect_title: "选择",
                        isPopup: true,
                        isTextBoxMode: 1,
                        textField: "Customercode",
                        valieField: "Customercode",
                        url: "",
                        popupselect_url: "pages/case_saleCustomer/list.w"
                    },
                    type: "popupselect",
                    validate: {
                        required: true,
                        minlength: "0",
                        maxlength: "255"
                    },
                    width: "",
                    textField: "customerNo_textfield"
                },
                {
                    newline: 0,
                    name: "Ordernumber",
                    label: "订单号",
                    editor: {},
                    type: "autoCode",
                    validate: {
                        minlength: "0",
                        maxlength: "255"
                    },
                    width: ""
                },
                {
                    newline: true,
                    name: "Phone",
                    label: "联系电话",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "Address",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        height: "40"
                    },
                    type: "textarea",
                    width: "500"
                },
                {
                    newline: 1,
                    name: "orderdetails",
                    label: "订单明细",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "120",
                                type: "string",
                                align: "left",
                                name: "ProNo",
                                editorType: "text",
                                display: "产品编号",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                width: "100",
                                type: "curreny",
                                align: "left",
                                display: "价格",
                                name: "price",
                                editorType: "currency",
                                editor: {
                                    type: "currency"
                                }
                            },
                            {
                                width: "120",
                                type: "string",
                                align: "left",
                                display: "规格",
                                name: "specification",
                                editorType: "text",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                display: "备注",
                                width: "140",
                                type: "string",
                                align: "left",
                                name: "remark",
                                editorType: "textarea",
                                editor: {
                                    type: "textarea"
                                }
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "/web/main/?model=case_saleOrderDetails&viewtype=form",
                        titleEdit: "修改： 实例销售订单明细",
                        titleAdd: "新增：实例销售订单明细",
                        one2many: true,
                        type: "grid",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "grid",
                    width: "600",
                    labelAlign: "top",
                    hideLabel: 1
                },
                {
                    name: "CreateUser",
                    type: "text",
                    label: "创建人",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonly: 1
                },
                {
                    name: "CreateDate",
                    type: "datepicker",
                    label: "创建时间",
                    editor: {},
                    newline: 0,
                    width: "",
                    readonly: 1,
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {
                items: [{
                    name: "表单默认值",
                    title: "表单默认值(新增表单)3",
                    value: {
                        title: "包括日期",
                        value: {
                            isNew: true,
                            data: {
                                CreateUser: "#user.CurrentUserLoginName#",
                                CreateDate: "now()" 
                            }
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=case_saleOrder&viewname=form'
    };
    exports.options.model = {
        name: 'case_saleOrder',
        title: '实例-销售订单'
    };

    exports.service = function service(page) {

};

    return exports;
});