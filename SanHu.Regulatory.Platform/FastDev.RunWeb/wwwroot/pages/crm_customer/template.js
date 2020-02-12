define([],
function() {

    var exports = {
        type: 'template',
        options: {
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            template: {},
            filterFields: [{
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
                    textField: "TypeName",
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
                display: "备注",
                name: "Remark",
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
                display: "客户名称",
                name: "CustomerName",
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
            link: {}
        },
        dataset: 'web/dataset?model=crm_customer&viewname=template'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    return exports;
});