define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 1,
                    name: "ProcessingNo",
                    label: "加工单编号",
                    editor: {},
                    type: "autoCode",
                    type_textfield: "自动编码",
                    name_textfield: "加工单编号",
                    width: ""
                },
                {
                    newline: 0,
                    name: "OrderDate",
                    label: "下单时间",
                    editor: {
                        type: "datepicker",
                        showHour: 1,
                        showMinute: 1,
                        showSecond: 0,
                        dateFormat: ""
                    },
                    type: "datepicker",
                    type_textfield: "日期",
                    name_textfield: "时间",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "OldProduct",
                    label: "原料产品",
                    editor: {
                        url: "web/listdata",
                        parms: {
                            model: "res_product"
                        },
                        valueField: "ID",
                        textField: "ProCode",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    type_textfield: "下拉框",
                    name_textfield: "原料产品",
                    group: "原产品",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: false,
                    name: "OldWeight",
                    label: "原重量",
                    editor: {
                        type: "float"
                    },
                    type: "float"
                },
                {
                    newline: false,
                    name: "OldMValue",
                    label: "原米数",
                    editor: {
                        type: "float"
                    },
                    type: "float"
                },
                {
                    newline: 0,
                    name: "NewProduct",
                    label: "成品",
                    editor: {
                        url: "web/listdata",
                        parms: {
                            model: "res_product"
                        },
                        valueField: "ID",
                        textField: "ProCode",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    type_textfield: "下拉框",
                    name_textfield: "成品",
                    group: "成品",
                    width: "",
                    validate: {
                        required: 1
                    }
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "备注",
                    width: "590",
                    group: "备注",
                    hideLabel: 1
                }]
            },
            common: {
                viewType: "form",
                saveCallbackType: "toView"
            },
            link: {}
        },
        dataset: 'web/dataset?model=erp_processing&viewname=form'
    };
    exports.options.model = {
        name: 'erp_processing',
        title: '外加工'
    };

    return exports;
});