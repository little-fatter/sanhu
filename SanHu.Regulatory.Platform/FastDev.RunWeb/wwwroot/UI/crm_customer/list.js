function view() {
    var options = {
        list: {
            columns: [{
                name: "CustomerName",
                display: "客户名称",
                type: "string",
                name_text: "客户名称",
                width: "180",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "Telephone",
                display: "电话",
                type: "string",
                name_text: "电话",
                width: "180",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "CustomerType",
                display: "客户类别",
                type: "ref",
                name_text: "客户类别",
                width: "180",
                align: "left",
                align_textfield: "左对齐",
                type_text: "引用类型"
            },
            {
                name: "CustomerLevel",
                display: "客户等级",
                type: "ref",
                name_text: "客户等级",
                width: "180",
                align: "left",
                align_textfield: "左对齐",
                type_text: "引用类型"
            },
            {
                name: "Industry",
                display: "所属行业",
                type: "ref",
                name_text: "所属行业",
                width: "180",
                align: "left",
                align_textfield: "左对齐",
                type_text: "引用类型"
            }]
        },
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
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "left",
            openParm: ""
        },
        filterFields: [{
            display: "客户类别",
            name: "CustomerType",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "res_dictionary"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "res_dictionary"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "Title",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=res_dictionary&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 字典",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
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
        }],
        link: {}
    };
    return options;
}