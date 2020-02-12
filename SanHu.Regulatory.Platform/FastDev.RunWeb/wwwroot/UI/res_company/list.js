function view() {
    var options = {
        list: {
            columns: [{
                name: "CompanyName",
                display: "公司名",
                type: "string",
                name_text: "公司名",
                width: "240",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "CompanyNo",
                display: "公司编码",
                type: "string",
                name_text: "公司编码",
                width: "120",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                width: "150",
                display: "Parent",
                name: "Parent",
                name_text: "Parent",
                align: "left",
                align_textfield: "左对齐",
                type: "ref",
                type_text: "引用类型"
            }],
            tree: {
                idField: "ID",
                parentIDField: "ParentID",
                columnName: "CompanyName"
            }
        },
        common: {
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
            searchAdShowType: "hide",
            formViewName: "",
            formShowType: "tab",
            formShowPosition: "",
            dialogWidth: "",
            dialogHeight: "",
            openParm: ""
        },
        type: "list",
        filterFields: [{
            display: "Parent",
            name: "Parent",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "res_company"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "res_company"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "CompanyName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=res_company&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 公司",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "公司名",
            name: "CompanyName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "执照号",
            name: "IdentiyNo",
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
            display: "网址",
            name: "WebSite",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "排序",
            name: "SeqNo",
            editor: {
                type: "int"
            },
            type: "int"
        },
        {
            display: "公司编码",
            name: "CompanyNo",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "Email",
            name: "Email",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "手机号",
            name: "Phone",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "传真",
            name: "Fax",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "公司类型",
            name: "CompanyType",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "公司地址",
            name: "CompanyAddress",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "ParentID",
            name: "ParentID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {}
    };
    return options;
}