define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "attach_type",
                    display: "附件类型",
                    type: "string"
                },
                {
                    name: "url",
                    display: "附件地址",
                    type: "string"
                },
                {
                    width: "150",
                    display: "关联对象的Id",
                    name: "AssociationobjectID",
                    name_text: "关联对象的Id",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "thumbnail",
                    display: "缩略图地址",
                    type: "string"
                },
                {
                    width: "150",
                    display: "fileCode",
                    name: "fileCode",
                    name_text: "fileCode",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "附件类型",
                name: "attach_type",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "附件地址",
                name: "url",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "缩略图地址",
                name: "thumbnail",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联表单的类型",
                name: "Associatedobjecttype",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联对象的Id",
                name: "AssociationobjectID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联Id",
                name: "CorrelationId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "空间",
                name: "spaceId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "文件名",
                name: "fileName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "文件大小",
                name: "fileSize",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "文件类型",
                name: "fileType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "文件id",
                name: "fileId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "fileCode",
                name: "fileCode",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
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
                },
                {
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
        dataset: 'web/dataset?model=attachment&viewname=list'
    };
    exports.options.model = {
        name: 'attachment',
        title: '附件'
    };

    exports.service = function service(page) {

};

    return exports;
});