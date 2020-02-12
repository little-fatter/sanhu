define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: 0,
                    name: "Items",
                    label: "明细项",
                    editor: {
                        grid: {
                            height: "200",
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
                            }],
                            title: ""
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
                    width: "100%",
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

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=res_dictionary&viewname=form_list'
    };
    exports.options.model = {
        name: 'res_dictionary',
        title: '字典'
    };

    return exports;
});