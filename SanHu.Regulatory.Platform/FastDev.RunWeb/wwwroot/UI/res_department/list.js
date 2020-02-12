function view() {
    var options = {
        list: {
            columns: [{
                name: "DeptName",
                display: "部门名称",
                type: "string",
                name_text: "部门名称",
                width: "100",
                align: "left",
                align_textfield: "左对齐",
                type_text: "文本型",
                exp: ""
            },
            {
                name: "Company",
                display: "",
                type: "ref"
            },
            {
                name: "Remarks",
                display: "备注",
                type: "string"
            }],
            title: "部门",
            url: "",
            usePager: 1,
            checkbox: 0,
            height: "100%",
            sortName: "",
            sortOrder: "",
            downViewEnabled: 0,
            downViewHeight: "",
            downViewReadonly: 0,
            downViewName: ""
        },
        common: {
            showCalendar: true
        },
        link: {},
        kanban: {},
        calendar: {
            titleField: "Remarks",
            startField: "CreateDate",
            endField: "CreateDate"
        },
        report: {},
        treeFilter: {
            enabled: 1,
            rootText: "全部",
            filterField: "Company",
            sourceMode: "res_company",
            parentField: "ParentID",
            textField: "CompanyName",
            sourceMode2: "",
            parentField2: "",
            refSourceField: "",
            textField2: "",
            filterField_textfield: "公司",
            showInLeft: 1,
            custom: 0,
            url: "",
            sourceModel: "res_company",
            sourceModel2: "",
            sourceModel_textfield: "res_company"
        },
        filterFields: [{
            display: "公司",
            name: "Company",
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
            display: "上级部门",
            name: "Parent",
            editor: {
                url: "/web/namedata",
                parms: {
                    model: "res_department"
                },
                detailEnabled: true,
                detailUrl: "/web/detaildata",
                detailParms: {
                    model: "res_department"
                },
                valueField: "ID",
                sourceFilter: null,
                textField: "DeptName",
                css: "combobox-selector",
                popupselect_ismul: true,
                popupselect_type: "popupselect",
                popupselect_url: "/web/main/?model=res_department&viewtype=list",
                popupselect_width: "1000",
                popupselect_height: "700",
                popupselect_title: "选择： 部门",
                many2one: false,
                one2many: false,
                many2many: true,
                type: "ref_popupselect_mul"
            },
            type: "ref_popupselect_mul"
        },
        {
            display: "备注",
            name: "Remarks",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "部门名称",
            name: "DeptName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "CompanyID",
            name: "CompanyID",
            editor: {
                type: "text"
            },
            type: "text"
        },
        {
            display: "ParentID",
            name: "ParentID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        type: "list"
    };
    return options;
}