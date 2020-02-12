define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: 1,
                    name: "Contracts",
                    label: "联系人",
                    editor: {
                        grid: {
                            height: "240",
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
                            }],
                            title: ""
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
                    width: "700",
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
        dataset: 'web/dataset?model=crm_customer&viewname=list_form'
    };
    exports.options.model = {
        name: 'crm_customer',
        title: '客户'
    };

    return exports;
});