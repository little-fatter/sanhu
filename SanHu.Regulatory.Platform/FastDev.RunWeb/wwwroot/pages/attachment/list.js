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
                    name: "thumbnail",
                    display: "缩略图地址",
                    type: "string"
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                },
                {
                    name: "Associatedobjecttype",
                    display: "关联表单的类型",
                    type: "string"
                },
                {
                    name: "AssociationobjectID",
                    display: "关联对象的Id",
                    type: "string"
                },
                {
                    name: "CorrelationId",
                    display: "关联Id",
                    type: "string"
                },
                {
                    name: "spaceId",
                    display: "空间",
                    type: "string"
                },
                {
                    name: "fileName",
                    display: "文件名",
                    type: "string"
                },
                {
                    name: "fileSize",
                    display: "文件大小",
                    type: "string"
                },
                {
                    name: "fileType",
                    display: "文件类型",
                    type: "string"
                },
                {
                    name: "fileId",
                    display: "文件id",
                    type: "string"
                },
                {
                    name: "fileCode",
                    display: "fileCode",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
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
            addins: {}
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