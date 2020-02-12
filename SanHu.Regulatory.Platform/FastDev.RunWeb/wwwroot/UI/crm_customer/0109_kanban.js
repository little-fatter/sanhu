function view() {
    var options = {
        common: {
            formShowType: "tab",
            formShowPosition: "top",
            dialogWidth: "700",
            dialogHeight: "500",
            showList: 1,
            showCalendar: 0,
            showReport: 0,
            showKanban: 1,
            hideToolbar: 0,
            hideViewSwitch: 0,
            viewNameList: "0105_list",
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
        kanban: {
            template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiQ3VzdG9tZXJJbWFnZSIsInRpdGxlRmllbGQiOiJDdXN0b21lck5hbWUiLCJ0ZXh0RmllbGRzIjoiIiwiZW1haWxGaWVsZHMiOiIiLCJsaW5rRmllbGRzIjoiIn0=\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{CustomerImage}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{CustomerName}</a><a></a></h4></div></div>",
            usePager: 1,
            sortName: "",
            sortOrder: "",
            pageSize: "30"
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
    };
    return options;
}