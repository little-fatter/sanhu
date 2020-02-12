define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Customercode",
                    display: "客户编码",
                    type: "string"
                },
                {
                    name: "customername",
                    display: "客户名称",
                    type: "string"
                },
                {
                    name: "telephonenumber",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "order",
                    display: "订单",
                    type: "string"
                },
                {
                    name: "remark",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "省份",
                name: "Province",
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
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=base_area&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 地区",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "城市",
                name: "city",
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
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "web/main/?model=base_area&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 地区",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户编码",
                name: "Customercode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户名称",
                name: "customername",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "telephonenumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProvinceID",
                name: "ProvinceID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "cityID",
                name: "cityID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {
                items: [{
                    name: "列链接",
                    title: "列链接(可以将列表列 转换为 可链接的)",
                    value: {
                        title: "建客户列链接到客户联系人",
                        value: {
                            displayColumnName: "Customercode",
                            columnName: "order",
                            openPage: {
                                renderTo: "tab",
                                url: "/pages/case_saleOrder/list.w",
                                urlBind: {
                                    filterData: {
                                        customerNo: "#data.Customercode#"
                                    }
                                },
                                title: "客户#data.Customercode#的订单"
                            }
                        }
                    }
                },
                {
                    name: "表格嵌套明细表格",
                    title: "表格嵌套明细表格(表格嵌套明细表格)",
                    value: {
                        name: "表格展开明细表格",
                        title: "表格展开明细表格",
                        value: {
                            main_field: "Customercode",
                            detail_grid: {
                                usePager: false
                            },
                            detail_model: "case_saleOrder",
                            detail_field: "customerNo",
                            detail_columns: [{
                                name: "Ordernumber",
                                display: "订单号",
                                type: "string"
                            },
                            {
                                name: "Phone",
                                display: "联系电话",
                                type: "string"
                            },
                            {
                                name: "Address",
                                display: "地址",
                                type: "string"
                            }]
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=case_saleCustomer&viewname=list'
    };
    exports.options.model = {
        name: 'case_saleCustomer',
        title: '实例销售客户'
    };

    exports.service = function service(page) {

};

    return exports;
});