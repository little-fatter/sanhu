define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CustomerName",
                    display: "客户名称",
                    type: "string",
                    name_text: "客户名称",
                    width: "160",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "Telephone",
                    display: "电话",
                    type: "string",
                    name_text: "电话",
                    width: "160",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "CustomerLevel",
                    display: "客户等级",
                    type: "ref",
                    name_text: "客户等级",
                    width: "160",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型"
                },
                {
                    width: "150",
                    display: "客户地区",
                    name: "Clientarea",
                    name_text: "客户地区",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "ref",
                    type_text: "引用类型"
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
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
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
            link: {},
            treeFilter: {
                enabled: 1,
                showInLeft: 1,
                rootText: "",
                filterField: "Clientarea",
                custom: 0,
                url: "",
                sourceModel: "base_area",
                parentField: "ParentID",
                textField: "",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                filterField_textfield: "客户地区",
                sourceModel_textfield: "base_area"
            },
            type: "list",
            addins: {}
        },
        dataset: 'web/dataset?model=crm_customer&viewname=0108_list'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    exports.service = function service(page) {

        page.bind('beforeShowTree',
        function(e) {

            var page = e.page;
            var op = e.options;

            op.url = "/web/treedata";
            op.parms = {
                enabled: 1,
                sourceModel: "base_area",
                parentField: "",
                textField: "Title",
                filter: {
                    rules: [{
                        field: 'ParentID',
                        op: 'isnull'
                    }]
                },
                fields: "Type",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: ""
            };
            op.isLeaf = function(data) {
                if (!data) return false;
                return data.Type == "district";
            };
            op.delay = function(e) {
                var data = e.data;
                if (!data) return false;
                if (data.Type != "district") {
                    return {
                        url: '/web/treedata',
                        parms: {
                            enabled: 1,
                            sourceModel: "base_area",
                            parentField: "",
                            textField: "Title",
                            filter: pbc.createFilter({
                                ParentID: data.id
                            }),
                            fields: "Type",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    }
                }
                return false;
            };

        });

    };

    return exports;
});