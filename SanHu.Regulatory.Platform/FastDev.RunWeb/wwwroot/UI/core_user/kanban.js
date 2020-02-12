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
            searchInputShowType: "hide",
            buttonsShowType: "left",
            searchBoxShowType: "",
            searchAdShowType: "left",
            openParm: ""
        },
        kanban: {
            template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiTXlQaWMiLCJ0aXRsZUZpZWxkIjoiUmVhbE5hbWUiLCJ0ZXh0RmllbGRzIjoiRGVwYXJ0bWVudDtQaG9uZSIsImVtYWlsRmllbGRzIjoiIiwibGlua0ZpZWxkcyI6IiJ9\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{MyPic}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{RealName}</a><a></a></h4><p style=\"{Phone:visual}\"><br/></p></div></div>"
        },
        filterFields: [{
            display: "部门",
            name: "Department",
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
            display: "QQ",
            name: "QQ",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "性别",
            name: "Sex",
            editor: {
                type: "checkbox"
            },
            type: "checkbox"
        },
        {
            display: "年龄",
            name: "Age",
            editor: {
                type: "int"
            },
            type: "int"
        },
        {
            display: "姓名",
            name: "RealName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "用户名",
            name: "UserNo",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "昵称",
            name: "NickName",
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
            display: "银行账号",
            name: "BankCode",
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
            display: "最后登录时间",
            name: "LastLoginTime",
            editor: {
                type: "datepicker"
            },
            type: "datepicker"
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
            display: "登录账号",
            name: "LoginName",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "称呼",
            name: "Title",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "用户头像",
            name: "MyPic",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "登录密码",
            name: "LoginPassword",
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
            display: "首页样式",
            name: "HomeStyle",
            editor: {
                type: "string"
            },
            type: "string"
        },
        {
            display: "DepartmentID",
            name: "DepartmentID",
            editor: {
                type: "text"
            },
            type: "text"
        }],
        link: {},
        treeFilter: {
            enabled: 0,
            rootText: "全部",
            filterField: "QQ",
            filterField_textfield: "QQ",
            sourceModel: "",
            parentField: "",
            textField: "",
            sourceModel2: "",
            parentField2: "",
            refSourceField: "",
            textField2: ""
        }
    };
    return options;
}