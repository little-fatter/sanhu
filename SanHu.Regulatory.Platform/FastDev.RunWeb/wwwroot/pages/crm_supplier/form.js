define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 1,
                    name: "SupplierImage",
                    label: "供应商图像",
                    editor: {
                        type: "text",
                        imgWidth: "100",
                        imgHeight: "100",
                        extensions: "png,jpg,gif"
                    },
                    type: "fileUploader",
                    width: "120",
                    fieldExtend: "{\"style\":\"position: absolute;left:5px;top:5px;\"}",
                    hideLabel: 1,
                    hideSpace: 1,
                    type_textfield: "文件上传",
                    name_textfield: "供应商图像"
                },
                {
                    newline: 0,
                    name: "SupplierName",
                    label: "供应商名称",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    rightToken: "：",
                    fieldExtend: "{\"style\":\"margin-left:120px;margin-top:10px;\"}",
                    type_textfield: "单行",
                    name_textfield: "供应商名称"
                },
                {
                    newline: 1,
                    name: "Address",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    rightToken: "：",
                    fieldExtend: "{\"style\":\"margin-left:120px;margin-bottom:46px;\"}",
                    type_textfield: "单行",
                    name_textfield: "地址"
                },
                {
                    newline: true,
                    name: "SupplierNo",
                    label: "供应商编号",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行"
                },
                {
                    newline: false,
                    name: "SupplierCategory",
                    label: "供应商类别",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "crm_supplierType"
                        },
                        valueField: "ID",
                        textField: "TypeName",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select",
                    type_textfield: "下拉框"
                },
                {
                    newline: 1,
                    name: "Phone",
                    label: "手机",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    rightToken: "：",
                    fieldExtend: "{containerCls:'clear-right'}",
                    type_textfield: "单行",
                    name_textfield: "手机"
                },
                {
                    newline: 0,
                    name: "QQ",
                    label: "QQ",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    rightToken: "：",
                    type_textfield: "单行",
                    name_textfield: "QQ"
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    rightToken: "：",
                    type_textfield: "单行",
                    name_textfield: "备注"
                },
                {
                    newline: 1,
                    name: "Contracts",
                    label: "供应商联系人",
                    editor: {
                        grid: {
                            height: 280,
                            columns: [{
                                width: "100",
                                type: "string",
                                align: "left",
                                display: " QQ",
                                editor: {
                                    type: "text"
                                },
                                name: "QQ",
                                name_text: " QQ",
                                align_textfield: "左对齐",
                                editorType: "text",
                                editorType_textfield: "单行",
                                type_text: "文本型"
                            },
                            {
                                width: "100",
                                type: "string",
                                align: "left",
                                display: "联系人",
                                name: "Contact",
                                name_text: "联系人",
                                align_textfield: "左对齐",
                                type_text: "文本型",
                                editorType: "text",
                                editorType_textfield: "单行",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                width: "100",
                                type: "string",
                                align: "left",
                                display: "手机",
                                name: "Phone",
                                name_text: "手机",
                                align_textfield: "左对齐",
                                type_text: "文本型",
                                editorType: "text",
                                editorType_textfield: "单行",
                                editor: {
                                    type: "text"
                                }
                            },
                            {
                                display: "联系地址",
                                width: "100",
                                type: "string",
                                align: "left",
                                editor: {
                                    type: "text"
                                },
                                name: "Address",
                                name_text: "联系地址",
                                align_textfield: "左对齐",
                                type_text: "文本型",
                                editorType: "text",
                                editorType_textfield: "单行"
                            },
                            {
                                display: "首要联系人",
                                width: "100",
                                type: "checkbox",
                                align: "left",
                                name: "IsDefault",
                                name_text: "首要联系人",
                                align_textfield: "左对齐",
                                type_text: "是否类型",
                                editorType: "checkbox",
                                editorType_textfield: "复选框",
                                editor: {
                                    type: "checkbox"
                                }
                            }]
                        },
                        modeType: "editgrid",
                        detailUrl: "/web/main/?mode=crm_supplierContract&viewtype=form",
                        titleEdit: "修改： 供应商联系人",
                        titleAdd: "新增：供应商联系人",
                        one2many: true,
                        type: "ref_grid_edit",
                        showEdit: 0,
                        detailWidth: "",
                        detailHeight: ""
                    },
                    type: "ref_grid_edit",
                    width: "650",
                    hideLabel: 1,
                    type_textfield: "编辑表格",
                    name_textfield: "供应商联系人"
                }]
            },
            link: {},
            common: {
                saveCallbackType: "dialog"
            }
        },
        dataset: 'web/dataset?model=crm_supplier&viewname=form'
    };
    exports.options.model = {
        name: 'crm_supplier',
        title: '供应商'
    };

    return exports;
});