define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Department",
                    display: "部门",
                    type: "ref"
                },
                {
                    name: "EmpName",
                    display: "员工名称",
                    type: "string",
                    name_text: "名称",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型"
                },
                {
                    name: "Telephone",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "Position",
                    display: "职务",
                    type: "string"
                }]
            },
            common: {
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                formShowType: "tab",
                dialogWidth: "900",
                dialogHeight: "600",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "关联用户",
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
                display: "身份证号",
                name: "IDNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "住址",
                name: "Address",
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
                display: "合同到期日期",
                name: "ContractExpirationDate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
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
                display: "职务",
                name: "Position",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "员工图像",
                name: "EmpImage",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "出生日期",
                name: "Birthdate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
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
                display: "合约签订日期",
                name: "DateOfAgreement",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "性别",
                name: "Gender",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "名称",
                name: "EmpName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "GGE",
                name: "GGE",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "UserID",
                name: "UserID",
                editor: {
                    type: "text"
                },
                type: "text"
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
            addins: {},
            treeFilter: {
                header: "",
                enabled: 1,
                showInLeft: 1,
                rootText: "全部",
                filterField: "Department",
                filterField_textfield: "部门",
                custom: 0,
                url: "",
                sourceModel: "res_department",
                parentField: "ParentID",
                textField: "DeptName",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: "",
                sourceModel_textfield: "res_department"
            }
        },
        dataset: 'web/dataset?model=res_employee&viewname=list'
    };
    exports.options.model = {
        name: 'res_employee',
        title: '员工'
    };

    exports.service = function service(page) {

};

    return exports;
});