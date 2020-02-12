function view() {
    var options = {
        form: {
            fields: [{
                name: "EmpImage",
                type: "fileUploader",
                label: " 单行",
                editor: {
                    imgWidth: "100",
                    imgHeight: "100",
                    extensions: "jpg,png,gif"
                },
                newline: 1,
                width: "120",
                fieldExtend: "{\"style\":\"position: absolute;left:5px;top:5px;\"}",
                hideLabel: 1,
                hideSpace: 1,
                type_textfield: "文件上传",
                name_textfield: "员工图像"
            },
            {
                newline: 1,
                name: "EmpName",
                label: "名称",
                editor: {
                    type: "text"
                },
                type: "text",
                width: "",
                fieldExtend: "{\"style\":\"margin-left:120px;margin-top:10px;\"}",
                type_textfield: "单行",
                name_textfield: "名称"
            },
            {
                newline: 0,
                name: "Department",
                label: "部门",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_department"
                    },
                    valueField: "ID",
                    textField: "DeptName",
                    many2one: true,
                    type: "ref_select",
                    sourceFilter: null,
                    css: "combobox-selector",
                    popupselect_ismul: false,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_department&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 部门"
                },
                type: "ref_popupselect",
                width: "",
                fieldExtend: "{\"style\":\"margin-top:10px;\"}",
                type_textfield: "弹出&自动完成",
                name_textfield: "部门"
            },
            {
                name: "User",
                type: "ref_popupselect",
                label: "关联用户",
                editor: {
                    css: "combobox-selector",
                    url: "/web/listdata",
                    parms: {
                        model: "core_user"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "RealName",
                    popupselect_ismul: false,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=core_user&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 用户",
                    many2one: true
                },
                newline: 1,
                width: "",
                rightToken: "：",
                fieldExtend: "{\"style\":\"margin-left:120px;margin-bottom:40px;\"}",
                type_textfield: "弹出&自动完成",
                name_textfield: "关联用户"
            },
            {
                newline: false,
                name: "Telephone",
                label: "电话",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行"
            },
            {
                newline: true,
                name: "Email",
                label: "Email",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行"
            },
            {
                newline: false,
                name: "IDNo",
                label: "身份证号",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行"
            },
            {
                newline: 1,
                name: "Address",
                label: "住址",
                editor: {
                    type: "text"
                },
                type: "text",
                width: "500",
                type_textfield: "单行",
                name_textfield: "住址"
            },
            {
                newline: true,
                name: "DateOfAgreement",
                label: "合约签订日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: false,
                name: "ContractExpirationDate",
                label: "合同到期日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: 1,
                name: "Gender",
                label: "性别",
                editor: {
                    type: "text",
                    data: [{
                        id: "M",
                        text: "男"
                    },
                    {
                        id: "W",
                        text: "女"
                    }],
                    rowSize: "0",
                    value: "M",
                    textField: "",
                    url: "",
                    valueField: ""
                },
                type: "radiolist",
                width: "",
                type_textfield: "单选框列表",
                name_textfield: "性别"
            },
            {
                newline: true,
                name: "Position",
                label: "职务",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行"
            },
            {
                newline: false,
                name: "Birthdate",
                label: "出生日期",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker",
                type_textfield: "日期"
            },
            {
                newline: 1,
                name: "Remarks",
                label: "备注",
                editor: {
                    type: "text"
                },
                type: "textarea",
                width: "500",
                type_textfield: "多行",
                name_textfield: "备注"
            }]
        },
        link: {},
        common: {}
    };
    return options;
}