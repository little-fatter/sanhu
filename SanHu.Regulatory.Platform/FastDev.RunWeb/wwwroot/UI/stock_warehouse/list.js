function view() {
    var options = {
        list: {
            columns: [{
                name: "WarehouseName",
                display: "仓库名称",
                type: "string",
                name_text: "仓库名称",
                width: "150",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                name: "WarehouseNo",
                display: "仓库编号",
                type: "string",
                name_text: "仓库编号",
                width: "150",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型"
            },
            {
                width: "150",
                display: "仓库管理员",
                name: "Manager",
                name_text: "仓库管理员",
                align: "left",
                align_textfield: "左对齐",
                type: "ref",
                type_text: "引用类型"
            },
            {
                name: "IsEnabled",
                display: "是否启用",
                type: "checkbox",
                name_text: "是否启用",
                width: "80",
                align: "left",
                align_textfield: "左对齐",
                type_text: "复选框"
            }]
        },
        common: {
            showList: 1,
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
            formShowType: "",
            formShowPosition: "",
            dialogWidth: "600",
            dialogHeight: "400",
            openParm: ""
        },
        link: {},
        kanban: {},
        calendar: {
            titleField: "WarehouseName",
            startField: "CreateDate",
            endField: "CreateDate"
        },
        report: {},
        filterFields: [{
            display: "仓库管理员",
            name: "Manager",
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
            display: "是否启用",
            name: "IsEnabled",
            editor: {
                type: "checkbox"
            },
            type: "checkbox"
        },
        {
            display: "仓库名称",
            name: "WarehouseName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "仓库编号",
            name: "WarehouseNo",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "ManagerID",
            name: "ManagerID",
            editor: {
                type: "text"
            },
            type: "text"
        }]
    };
    return options;
}