define([],
function() {

    var exports = {
        type: 'form',
        options: {
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
                            }],
                            title: ""
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
                    width: "100%",
                    hideLabel: 1
                }]
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {},
            type: "form",
            addins: {
                items: [{
                    name: "增加数据打印按钮",
                    title: "增加数据打印按钮(增加数据打印按钮)",
                    value: {
                        title: "增加数据打印按钮",
                        value: {
                            buttonText: "打印数据"
                        }
                    }
                }]
            }
        },
        dataset: 'web/dataset?model=res_dictionary&viewname=form_list'
    };
    exports.options.model = {
        name: 'res_dictionary',
        title: '字典'
    };

    exports.service = function service(page) {

};

    return exports;
});