function view() {
    var options = {
        list: {
            sortName: "SortNo",
            columns: [{
                name: "MenuName",
                display: "菜单名",
                type: "string",
                name_text: "菜单名",
                width: "250",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "Menu",
                display: "链接",
                type: "ref",
                name_text: "菜单",
                width: "200",
                align: "left",
                align_textfield: "左对齐",
                type_text: "引用类型"
            },
            {
                name: "SortNo",
                display: "排序",
                type: "number",
                name_text: "排序",
                width: "80",
                align: "left",
                align_textfield: "左对齐"
            }]
        },
        common: {
            formShowType: "dialog",
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
            buttonsShowType: "",
            searchBoxShowType: "",
            searchAdShowType: "",
            openParm: ""
        },
        filterFields: [{
            display: "菜单",
            name: "Menu",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "core_menu"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "core_menu"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "MenuName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=core_menu&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 菜单",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "所属用户",
            name: "User",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "core_user"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "core_user"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "RealName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=core_user&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 用户",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "菜单名",
            name: "MenuName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "排序",
            name: "SortNo",
            editor: {
                type: "int"
            },
            type: "int"
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
            display: "MenuID",
            name: "MenuID",
            editor: {
                type: "text"
            },
            type: "text"
        },
        {
            display: "UserID",
            name: "UserID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {}
    };
    return options;
}