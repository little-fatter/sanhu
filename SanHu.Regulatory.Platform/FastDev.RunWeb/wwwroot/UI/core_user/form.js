function view() {
    var options = {
        form: {
            fields: [{
                name: "MyPic",
                type: "fileUploader",
                label: " 图像",
                editor: {
                    isInputMode: 0,
                    imgWidth: "80",
                    imgHeight: "80",
                    extensions: "jpg,png,gif"
                },
                newline: 0,
                width: "auto",
                hideLabel: 1,
                hideSpace: 1
            },
            {
                newline: 0,
                name: "RealName",
                type: "text",
                label: "姓名",
                syseditor: "#editor,RealName,text#",
                width: "120",
                textField: ""
            },
            {
                newline: 0,
                name: "LoginName",
                type: "text",
                label: "登录账号",
                syseditor: "#editor,LoginName,text#",
                width: "120",
                fieldExtend: "{style:\"position: absolute;left: 100px;top: 50px;\"}"
            },
            {
                name: "LoginPassword",
                type: "password",
                label: "登录密码",
                editor: {},
                newline: 1,
                width: "120",
                fieldExtend: "{style:\"position: absolute;left: 340px;top: 50px;\"}"
            }],
            tab: {
                items: [{
                    title: "基本信息",
                    fields: [{
                        newline: true,
                        name: "NickName",
                        type: "text",
                        label: "昵称",
                        syseditor: "#editor,NickName,text#",
                        dictionary: "",
                        width: "",
                        textField: ""
                    },
                    {
                        newline: false,
                        name: "Sex",
                        type: "radiolist",
                        label: "性别",
                        syseditor: "#editor,Sex,dic_radiolist#",
                        dictionary: "0,男|1,女",
                        width: "",
                        textField: "",
                        editor: {
                            data: [{
                                id: "0",
                                text: "男"
                            },
                            {
                                id: "1",
                                text: "女"
                            }],
                            rowSize: "0",
                            value: "0"
                        }
                    },
                    {
                        newline: 1,
                        name: "Department",
                        type: "ref_select_tree",
                        label: "部门",
                        textField: "Department_text",
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
                            textField: "text",
                            valueField: "id",
                            tree: {
                                checkbox: false,
                                nodeWidth: 200,
                                url: "/web/treedata",
                                parms: {
                                    enabled: 1,
                                    sourceModel: "res_company",
                                    parentField: "",
                                    textField: "",
                                    sourceModel2: "res_department",
                                    parentField2: "",
                                    refSourceField: "CompanyID",
                                    textField2: "DeptName"
                                }
                            },
                            many2one: true,
                            triggerToLoad: 0
                        },
                        width: ""
                    },
                    {
                        newline: false,
                        name: "Phone",
                        type: "text",
                        label: "手机号",
                        syseditor: "#editor,Phone,text#",
                        width: "",
                        textField: "",
                        dictionary: ""
                    },
                    {
                        newline: 1,
                        name: "Address",
                        type: "text",
                        label: "地址",
                        width: "500",
                        textField: "",
                        editor: {}
                    }]
                },
                {
                    title: "角色分配",
                    fields: [{
                        newline: 1,
                        name: "Role",
                        type: "ref_listbox_mul",
                        label: "角色",
                        width: "580",
                        hideLabel: 1,
                        dictionary: "",
                        textField: "",
                        editor: {
                            isMultiSelect: true,
                            isShowCheckBox: true,
                            url: "/web/listdata",
                            many2many: true,
                            valueField: "ID",
                            textField: "RoleName",
                            parms: {
                                model: "core_role"
                            }
                        },
                        labelAlign: "top"
                    }]
                }]
            }
        },
        common: {
        	saveCallbackType: 'toEdit'
        },
        link: {},
        type: "form"
    };
    return options;
}