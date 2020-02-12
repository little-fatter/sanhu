function view() {
    var options = {
        list: {
            columns: [{
                name: "WarehouseName",
                display: "仓库名2",
                type: "string",
                name_text: "仓库名",
                width: "260",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "WarehouseManager",
                display: "仓库管理员",
                type: "ref",
                name_text: "仓库管理员",
                width: "150",
                align: "left",
                align_textfield: "左对齐",
                type_text: "引用类型"
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
            buttonsShowType: "left",
            searchBoxShowType: "left",
            searchAdShowType: "",
            formViewName: "",
            openParm: ""
        },
        filterFields: [{
            display: "仓库管理员",
            name: "WarehouseManager",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "res_employee"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "res_employee"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "EmpName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=res_employee&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 员工",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "仓库名",
            name: "WarehouseName",
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
            display: "WarehouseManagerID",
            name: "WarehouseManagerID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {},
        type: "list"
    };
    return options;
}