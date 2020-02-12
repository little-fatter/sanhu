define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "buId",
                    type: "popupselect",
                    label: "供应商",
                    editor: {
                        css: "combobox-selector",
                        popupselect_width: "800",
                        popupselect_height: "600",
                        popupselect_title: "供应商选择",
                        isPopup: true,
                        isTextBoxMode: 1,
                        textField: "SupplierName",
                        valieField: "ID",
                        url: "",
                        popupselect_url: "pages/crm_supplier/list.w"
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    name: "billDate",
                    label: "单据日期",
                    editor: {},
                    type: "datepicker",
                    newline: false
                },
                {
                    name: "billNo",
                    label: "单据编号",
                    newline: false,
                    editor: {},
                    type: "text"
                },
                {
                    name: "product_infos",
                    label: "产品信息",
                    newline: 1,
                    width: "950",
                    tabTitle: "",
                    editor: {
                        grid: {
                            height: 230,
                            defaultRow: {},
                            defaultRowCount: 4,
                            columns: [{
                                width: "100",
                                type: "ref",
                                align: "left",
                                display: "商品名",
                                name: "Productinformation",
                                editorType: "ref_popupselect",
                                editor: {
                                    url: "/web/namedata",
                                    parms: {
                                        model: "psi_goods"
                                    },
                                    detailEnabled: true,
                                    detailUrl: "/web/detaildata",
                                    detailParms: {
                                        model: "psi_goods"
                                    },
                                    valueField: "ID",
                                    textField: "ProductName",
                                    css: "combobox-selector",
                                    popupselect_ismul: 1,
                                    popupselect_type: "popupselect",
                                    popupselect_url: "/web/main/?model=psi_goods&viewtype=list",
                                    popupselect_width: "1000",
                                    popupselect_height: "700",
                                    popupselect_title: "选择： 产品",
                                    many2one: true,
                                    type: "ref_popupselect",
                                    popupselect_Type: "popup",
                                    valieField: "ID",
                                    select_updatematch_source: "Id",
                                    select_updatematch_target: "invId;price;deduction;discountRate;unitId"
                                }
                            },
                            {
                                display: "单位",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    selectBoxWidth: 500,
                                    selectBoxHeight: 300,
                                    grid: {
                                        checkbox: false,
                                        usePager: false,
                                        columns: [{
                                            display: "电话",
                                            name: "Phone",
                                            width: 140
                                        },
                                        {
                                            display: "地址",
                                            name: "Address",
                                            width: 200
                                        }]
                                    },
                                    type: "gridselect",
                                    isTextBoxMode: 1,
                                    value: ""
                                },
                                name: "unitId",
                                editorType: "gridselect"
                            },
                            {
                                display: "仓库",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    selectBoxWidth: 500,
                                    selectBoxHeight: 300,
                                    grid: {
                                        checkbox: false,
                                        usePager: false,
                                        columns: [{
                                            display: "电话",
                                            name: "Phone",
                                            width: 140
                                        },
                                        {
                                            display: "地址",
                                            name: "Address",
                                            width: 200
                                        }]
                                    },
                                    type: "gridselect"
                                },
                                name: "locationId",
                                editorType: "gridselect"
                            },
                            {
                                display: "数量",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "number"
                                },
                                name: "qty",
                                editorType: "number"
                            },
                            {
                                display: "购货单价",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "currency"
                                },
                                name: "price",
                                editorType: "currency"
                            },
                            {
                                display: "折扣率",
                                width: "100",
                                type: "float",
                                align: "left",
                                name: "discountRate",
                                editorType: "number",
                                exp: "",
                                editor: {
                                    type: "number"
                                }
                            },
                            {
                                display: "折扣金额",
                                width: "100",
                                type: "curreny",
                                align: "left",
                                name: "deduction",
                                editorType: "currency",
                                editor: {
                                    type: "currency"
                                },
                                exp: ""
                            },
                            {
                                display: "购货金额",
                                width: "100",
                                type: "curreny",
                                align: "left",
                                editor: {
                                    type: "currency"
                                },
                                name: "amount",
                                editorType: "currency",
                                exp: "data.qty*data.price-data.deduction"
                            },
                            {
                                display: "序列号",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "serialno",
                                editorType: "text"
                            }]
                        },
                        detailUrl: "/web/main/?model=psi_inventory_info&viewtype=form",
                        titleEdit: "修改： 进销存单据详情",
                        titleAdd: "新增：进销存单据详情",
                        modeType: "editgrid",
                        one2many: true,
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    readonlyInEdit: 0,
                    hideLabel: 1
                },
                {
                    name: "rpAmount",
                    label: "rpAmount",
                    editor: {},
                    type: "float",
                    newline: true
                },
                {
                    name: "totalAmount",
                    label: "totalAmount",
                    editor: {},
                    type: "float",
                    newline: 0
                },
                {
                    name: "amount",
                    label: "amount",
                    editor: {},
                    type: "float",
                    newline: false
                },
                {
                    name: "discount",
                    label: "discount",
                    editor: {},
                    type: "float",
                    newline: 0
                },
                {
                    name: "payment",
                    label: "payment",
                    editor: {},
                    type: "float",
                    newline: 0
                },
                {
                    name: "hxAmount",
                    label: "hxAmount",
                    editor: {},
                    type: "float",
                    newline: 0
                }],
                tab: null
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=psi_inventory&viewname=form'
    };
    exports.options.model = {
        name: 'psi_inventory',
        title: '进销存单据'
    };

    exports.service = function service(page) {

};

    return exports;
});