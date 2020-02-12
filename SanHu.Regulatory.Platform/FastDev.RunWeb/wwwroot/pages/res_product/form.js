define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 0,
                    name: "ProName",
                    label: "产品名",
                    editor: {},
                    type: "text",
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "ProCode",
                    label: "产品编号",
                    editor: {},
                    type: "text",
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    readonlyInEdit: 0
                },
                {
                    name: "ProType",
                    type: "ref_popupselect",
                    label: "产品类别",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_productType"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_productType"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "TypeName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "/web/main/?model=res_productType&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 物品类别",
                        many2one: true
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "ProMode",
                    type: "text",
                    label: "规格型号",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "UnitName",
                    type: "select",
                    label: "单位",
                    editor: {
                        data: [],
                        freedesign_source: {
                            model: "res_productUnit",
                            url: "/web/listdata/",
                            filter: {
                                rules: [{
                                    field: "ID",
                                    op: "equal",
                                    value: [["", ""]],
                                    type: "select"
                                }],
                                op: "and"
                            },
                            valueField: "UnitName",
                            textField: "UnitName"
                        },
                        isTextBoxMode: 0,
                        value: ""
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "Warehouse",
                    type: "ref_select",
                    label: "默认仓库",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "stock_warehouse"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "stock_warehouse"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "WarehouseName",
                        many2one: true
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "ProPrice",
                    label: "参考单价",
                    editor: {},
                    type: "currency",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "ProBarCode",
                    type: "text",
                    label: "产品条码",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                }],
                tab: {
                    items: []
                },
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            link: {},
            common: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=res_product&viewname=form'
    };
    exports.options.model = {
        name: 'res_product',
        title: '产品'
    };

    exports.service = function service(page) {

};

    return exports;
});