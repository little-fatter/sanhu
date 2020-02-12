define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    width: "150",
                    name: "RealName",
                    type: "",
                    display: "姓名",
                    syseditor: "#editor,RealName,#",
                    id: "",
                    totalSummary: "",
                    headerRender: "",
                    isAllowHide: 0,
                    isSort: 0,
                    format: "",
                    align: "left",
                    hide: 0,
                    editor: null,
                    render: "",
                    textField: "",
                    name_text: "姓名"
                },
                {
                    width: "150",
                    name: "LoginName",
                    type: "string",
                    display: "登录账户",
                    syseditor: "#editor,LoginName,#",
                    id: "",
                    totalSummary: "",
                    headerRender: "",
                    isAllowHide: 0,
                    isSort: 0,
                    format: "",
                    align: "left",
                    hide: 0,
                    editor: null,
                    render: "",
                    textField: "",
                    name_text: "登录账号",
                    type_text: "文本型"
                },
                {
                    width: "150",
                    display: "性别",
                    name: "Sex",
                    name_text: "性别",
                    align: "left",
                    type: "checkbox",
                    type_text: "是否类型"
                },
                {
                    width: "150",
                    display: "QQ",
                    name: "QQ",
                    align: "left"
                }]
            },
            search: {
                fields: [{
                    name: "RealName",
                    type: "text",
                    operator: "like",
                    label: "姓名",
                    newline: true,
                    name_text: "姓名",
                    type_text: "单行",
                    width: "160"
                },
                {
                    width: "160",
                    label: "部门",
                    type: "ref_select",
                    newline: true,
                    name: "Department",
                    name_text: "部门",
                    type_text: "下拉框",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_department"
                        },
                        valueField: "ID",
                        textField: "DeptName",
                        many2one: true
                    },
                    operator: "equal"
                }],
                labelWidth: "70",
                space: "",
                labelAlign: "left",
                search: {
                    fields: [{
                        name: "RealName",
                        type: "text",
                        operator: "like",
                        label: "姓名",
                        newline: true,
                        name_text: "姓名",
                        type_text: "单行",
                        width: "160"
                    },
                    {
                        width: "160",
                        label: "部门",
                        type: "ref_select",
                        newline: true,
                        name: "Department",
                        name_text: "部门",
                        type_text: "下拉框",
                        editor: {
                            url: "/web/listdata",
                            parms: {
                                model: "res_department"
                            },
                            valueField: "ID",
                            textField: "DeptName",
                            many2one: true
                        },
                        operator: "equal"
                    }]
                }
            },
            common: {
                showList: 1,
                showCalendar: 0,
                showKanban: 1,
                showReport: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "",
                searchAdShowType: "left",
                formShowType: "tab",
                formShowPosition: "",
                dialogWidth: "",
                dialogHeight: "",
                openParm: ""
            },
            kanban: {
                fields: [{
                    width: 100,
                    type: "image",
                    align: "left",
                    name: "MyPic",
                    name_text: "用户头像",
                    type_text: "图像",
                    label: ""
                },
                {
                    width: 100,
                    type: "",
                    align: "left",
                    name: "UserNo",
                    name_text: "用户名",
                    type_text: "普通文本",
                    label: ""
                },
                {
                    width: 100,
                    type: "text",
                    align: "left",
                    name: "Address",
                    name_text: "地址",
                    type_text: "普通文本",
                    label: "地址"
                },
                {
                    width: 150,
                    display: "",
                    name: "LoginName",
                    name_text: "登录账号",
                    type: "text",
                    label: "登录账户",
                    type_text: "普通文本"
                }],
                template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiTXlQaWMiLCJ0aXRsZUZpZWxkIjoiUmVhbE5hbWUiLCJ0ZXh0RmllbGRzIjoiRGVwYXJ0bWVudDtRUTtTZXgiLCJlbWFpbEZpZWxkcyI6IkVtYWlsIiwibGlua0ZpZWxkcyI6IiJ9\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{MyPic}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{RealName}</a><a></a></h4><div style=\"{Department:visual}\">{Department}</div><div style=\"{QQ:visual}\"><strong>QQ：</strong>{QQ}</div><div style=\"{Sex:visual}\">性别：{Sex:YN}</div><a href=\"mailto:{Email}\">{Email}</a></div></div>"
            },
            calendar: {
                titleField: "RealName",
                startField: "CreateDate",
                endField: "CreateDate"
            },
            treeFilter: {
                enabled: 1,
                rootText: "",
                filterField: "Department",
                filterField_textfield: "部门",
                sourceMode: "res_company",
                parentField: "",
                sourceMode2: "res_department",
                parentField2: "",
                textField: "",
                refSourceField: "CompanyID",
                textField2: "",
                sourceModel: "res_company",
                sourceModel_textfield: "res_company",
                sourceModel2: "res_department",
                sourceModel2_textfield: "res_department",
                showInLeft: 1,
                custom: 0,
                url: ""
            },
            report: {
                title: "各部门的用户数",
                subtitle: "",
                legendType: "pie",
                legendField: "Department",
                legendFieldType: "ref",
                legendFieldFilter: {
                    rules: [{
                        field: "Company",
                        op: "equal",
                        value: ["8be449e8-7cdb-4485-aa6e-f64617dc7c02", "北京创意公司"],
                        type: "select"
                    }],
                    op: "and"
                },
                categoryField: "",
                categoryFieldType: "",
                valueFieldType: "sum",
                valueField: "Age",
                width: "",
                height: "",
                legendIncludeDataOnly: 0,
                axisField: "",
                axisFieldType: ""
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
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=core_user&viewname=list'
    };
    exports.options.model = {
        name: 'core_user',
        title: '用户'
    };

    exports.service = function service(page)
    {
        page.bind('toolbarinit', function (e)
        {
            var toolbar = e.toolbar;
            toolbar.items.push({
                text: '恢复密码',
                id: 'resetPassword',
                onClick: function ()
                {
                    var rows = page.getSelecteds();
                    if (!rows || !rows.length)
                    {
                        pbc.showError('请选择行');
                        return;
                    }
                    var ids = [];
                    $(rows).each(function ()
                    {
                        ids.push(this.ID);
                    });
                    if (confirm('确定恢复密码为1吗?'))
                    {
                        pbc.ajax({
                            url: '/web/user_resetpassword',
                            data: {
                                args: ids
                            },
                            success: function (r)
                            {
                                if (r.statusCode == "2" || r.statusCode == "3")
                                {
                                    pbc.showError(r.message);
                                    return;
                                }
                                pbc.showSuccess("操作成功！");
                            }
                        });
                    }
                }
            });
        });
    };

    return exports;
});