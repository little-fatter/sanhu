define([],
function() {

    var exports = {
        type: 'iframePage',
        options: {
            type: "iframePage",
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
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            iframePage: {
                url: "extend/jlist"
            },
            filterFields: [{
                display: "客户等级",
                name: "CustomerLevel",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "所属行业",
                name: "Industry",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户地区",
                name: "Clientarea",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=base_area&viewtype=list",
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
                display: "客户省份",
                name: "Province",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=base_area&viewtype=list",
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
                display: "客户城市",
                name: "City",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=base_area&viewtype=list",
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
                display: "客户类别",
                name: "CustomerType",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customerType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customerType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_customerType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户等级",
                name: "Customerlevel",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customerlevel"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customerlevel"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Classname",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_customerlevel&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户等级",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户类别",
                name: "CustomerCategory",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "crm_customerType"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "crm_customerType"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=crm_customerType&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 客户类别",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "客户名称",
                name: "CustomerName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "Telephone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "是否公司",
                name: "IsCompany",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户地址",
                name: "Customeraddress",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户图像",
                name: "CustomerImage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "客户编号",
                name: "CustomerNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "QQ",
                name: "QQ",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "手机",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "收货人",
                name: "Consignee",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CustomerLevelID",
                name: "CustomerLevelID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "IndustryID",
                name: "IndustryID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "ClientareaID",
                name: "ClientareaID",
                editor: {
                    type: "text"
                },
                type: "text"
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
                display: "CityID",
                name: "CityID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CustomerTypeID",
                name: "CustomerTypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CustomerLevelID",
                name: "CustomerLevelID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CustomerCategoryID",
                name: "CustomerCategoryID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {},
            search: {
                fields: [{
                    label: "客户名称",
                    type: "text",
                    editor: {},
                    name: "CustomerName",
                    name_text: "客户名称",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=crm_customer&viewname=jlist1'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    exports.service = function service(page) {

};

    return exports;
});