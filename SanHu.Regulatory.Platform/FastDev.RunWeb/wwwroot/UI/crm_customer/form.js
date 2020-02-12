function view() {
    var options = {
        form: {
            fields: [{
                name: "CustomerImage",
                type: "fileUploader",
                label: " 文件上传",
                editor: {
                    isInputMode: 0,
                    imgWidth: "100",
                    imgHeight: "100",
                    extensions: "jpg,png,gif"
                },
                newline: 1,
                type_textfield: "文件上传",
                name_textfield: "客户图像",
                width: "",
                hideLabel: 1,
                hideSpace: 1
            },
            {
                newline: 0,
                name: "CustomerName",
                label: "客户名称",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                validate: {
                    required: 1,
                    minlength: "2",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                },
                name_textfield: "客户名称",
                width: "",
                fieldExtend: "{style:\"position: absolute;left: 150px; top:10px;\"}"
            },
            {
                newline: 1,
                name: "Telephone",
                label: "电话",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "电话",
                width: "",
                fieldExtend: "{style:\"position: absolute;left: 150px; top:60px;\"}"
            },
            {
                newline: 1,
                name: "CustomerLevel",
                label: "客户等级",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    textField: "Title",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select",
                type_textfield: "下拉框",
                name_textfield: "客户等级",
                width: ""
            },
            {
                name: "Clientarea",
                type: "ref_select_tree",
                label: "客户地区",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "base_area"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "base_area"
                    },
                    textField: "text",
                    valueField: "id",
                    tree: {
                        checkbox: false,
                        nodeWidth: 200,
                        url: "/web/treedata",
                        parms: {
                            enabled: 1,
                            sourceModel: "base_area",
                            parentField: "ParentID",
                            textField: "Title",
                            sourceModel2: "",
                            parentField2: "",
                            refSourceField: "",
                            textField2: ""
                        }
                    },
                    many2one: true,
                    triggerToLoad: 0
                },
                newline: 1,
                type_textfield: "下拉框-树",
                name_textfield: "客户地区",
                width: ""
            },
            {
                newline: true,
                name: "Industry",
                label: "所属行业",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    textField: "Title",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select",
                type_textfield: "下拉框"
            },
            {
                newline: 0,
                name: "CustomerType",
                label: "客户类别",
                editor: {
                    url: "/web/listdata",
                    parms: {
                        model: "crm_customerType"
                    },
                    valueField: "ID",
                    textField: "Title",
                    many2one: true,
                    type: "ref_select"
                },
                type: "ref_select",
                type_textfield: "下拉框",
                name_textfield: "客户类别",
                width: ""
            },
            {
                newline: 1,
                name: "Customeraddress",
                label: "客户地址",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "客户地址",
                width: "500"
            },
            {
                newline: 1,
                name: "Remark",
                label: "备注",
                editor: {
                    height: "60"
                },
                type: "textarea",
                type_textfield: "多行",
                name_textfield: "备注",
                width: "500"
            },
            {
                newline: 1,
                name: "Contracts",
                label: "联系人",
                editor: {
                    grid: {
                        height: 280,
                        columns: [{
                            width: "150",
                            type: "string",
                            align: "left",
                            display: "联系人名称",
                            name: "Contactname",
                            name_textfield: "联系人名称",
                            align_textfield: "左对齐",
                            editorType: "text",
                            type_textfield: "文本型",
                            editor: {
                                type: "text"
                            },
                            editorType_textfield: "单行"
                        },
                        {
                            width: "150",
                            type: "string",
                            align: "left",
                            display: "电话",
                            name: "phone",
                            name_textfield: "电话",
                            align_textfield: "左对齐",
                            type_textfield: "文本型",
                            editorType: "text",
                            editor: {
                                type: "text"
                            },
                            editorType_textfield: "单行"
                        },
                        {
                            width: "160",
                            type: "string",
                            align: "left",
                            display: "备注",
                            name: "remark",
                            name_textfield: "备注",
                            align_textfield: "左对齐",
                            type_textfield: "文本型",
                            editorType: "text",
                            editor: {
                                type: "text"
                            },
                            editorType_textfield: "单行"
                        }]
                    },
                    modeType: "editgrid",
                    detailUrl: "/web/main/?model=crm_customerContract&viewtype=form",
                    titleEdit: "修改： 客户联系人",
                    titleAdd: "新增：客户联系人",
                    one2many: true,
                    type: "ref_grid_edit",
                    showEdit: 0,
                    detailWidth: "",
                    detailHeight: ""
                },
                type: "ref_grid_edit",
                type_textfield: "编辑表格",
                name_textfield: "联系人",
                width: "600",
                hideLabel: 1
            }]
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}