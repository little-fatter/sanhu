define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
                    label: "标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
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
                                        editorType: "text",
                                        editor: {
                                            type: "text"
                                        }
                                    },
                                    {
                                        width: "100",
                                        type: "string",
                                        align: "left",
                                        display: "代码",
                                        name: "ItemCode",
                                        editorType: "text",
                                        editor: {
                                            type: "text"
                                        }
                                    },
                                    {
                                        width: "100",
                                        type: "string",
                                        align: "left",
                                        display: "排序",
                                        name: "SortNo",
                                        editorType: "number",
                                        editor: {
                                            type: "number"
                                        }
                                    },
                                    {
                                        display: "备注",
                                        width: "200",
                                        type: "string",
                                        align: "left",
                                        name: "Remark",
                                        editorType: "text",
                                        editor: {
                                            type: "text"
                                        }
                                    }]
                                },
                                modeType: "editgrid",
                                detailUrl: "web/main/?model=res_dictionaryItems&viewtype=form",
                                titleEdit: "修改： 字典明细项",
                                titleAdd: "新增：字典明细项",
                                one2many: true,
                                type: "ref_grid_edit",
                                showEdit: 0,
                                detailWidth: "",
                                detailHeight: ""
                            },
                            type: "ref_grid_edit",
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
                            width: "600",
                            hideLabel: 1
                        }]
                    }]
                }
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {},
            type: "form",
            addins: {
                items: [{
                    name: "增加数据导出按钮",
                    title: "增加数据导出按钮(增加数据导出按钮)",
                    value: {
                        title: "增加数据导出按钮",
                        value: {
                            buttonText: "导出Excel"
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=res_dictionary&viewname=form'
    };
    exports.options.model = {
        name: 'res_dictionary',
        title: '字典'
    };

    exports.service = function service(page) {

};

    return exports;
});