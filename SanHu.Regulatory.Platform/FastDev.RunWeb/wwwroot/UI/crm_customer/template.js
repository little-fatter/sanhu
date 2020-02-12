function view() {
    var options = {
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: 700,
            dialogHeight: 500
        },
        template: {
            usePager: 1,
            sortName: "CreateDate",
            sortOrder: "",
            pageSize: ""
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
        }],
        link: {}
    };
    return options;
}