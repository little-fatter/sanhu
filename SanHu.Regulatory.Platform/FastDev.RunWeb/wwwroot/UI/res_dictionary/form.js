function view() {
    var options = {
        form: {
            fields: [{
                newline: true,
                name: "Title",
                label: "标题",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            },
            {
                newline: 0,
                name: "DicCode",
                label: "代码标示",
                editor: {
                    type: "text"
                },
                type: "text",
                type_textfield: "单行",
                name_textfield: "代码标示",
                width: "",
                validate: {
                    required: 1,
                    minlength: "0",
                    maxlength: "255",
                    regexRule: "",
                    equalTo: ""
                }
            }],
            tab: {
                items: [{
                    title: "明细",
                    fields: [{
                        newline: 0,
                        name: "Items",
                        label: "明细项",
                        editor: {
                            grid: {
                                height: 280,
                                columns: [{
                                    width: "200",
                                    type: "string",
                                    align: "left",
                                    display: "标题",
                                    name: "Title",
                                    name_textfield: "标题",
                                    align_textfield: "左对齐",
                                    type_textfield: "文本型",
                                    editorType: "text",
                                    editor: {
                                        type: "text"
                                    },
                                    editorType_textfield: "单行"
                                },
                                {
                                    width: "100",
                                    type: "string",
                                    align: "left",
                                    display: "代码",
                                    name: "ItemCode",
                                    name_textfield: "代码",
                                    align_textfield: "左对齐",
                                    type_textfield: "文本型",
                                    editorType: "text",
                                    editor: {
                                        type: "text"
                                    },
                                    editorType_textfield: "单行"
                                },
                                {
                                    width: "100",
                                    type: "string",
                                    align: "left",
                                    display: "排序",
                                    name: "SortNo",
                                    name_textfield: "排序",
                                    align_textfield: "左对齐",
                                    type_textfield: "文本型",
                                    editorType: "number",
                                    editor: {
                                        type: "number"
                                    },
                                    editorType_textfield: "数值"
                                },
                                {
                                    display: "备注",
                                    width: "200",
                                    type: "string",
                                    align: "left",
                                    name: "Remark",
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
                            detailUrl: "/web/main/?model=res_dictionaryItems&viewtype=form",
                            titleEdit: "修改： 字典明细项",
                            titleAdd: "新增：字典明细项",
                            one2many: true,
                            type: "ref_grid_edit",
                            showEdit: 0,
                            detailWidth: "",
                            detailHeight: ""
                        },
                        type: "ref_grid_edit",
                        type_textfield: "编辑表格",
                        name_textfield: "明细项",
                        width: "800",
                        hideLabel: 1
                    }]
                },
                {
                    title: "备注",
                    fields: [{
                        newline: 0,
                        name: "Remarks",
                        label: "备注",
                        editor: {},
                        type: "textarea",
                        type_textfield: "多行",
                        name_textfield: "备注",
                        width: "600",
                        hideLabel: 1
                    }]
                }]
            }
        },
        common: {
            saveCallbackType: "toView"
        },
        link: {}
    };
    return options;
}