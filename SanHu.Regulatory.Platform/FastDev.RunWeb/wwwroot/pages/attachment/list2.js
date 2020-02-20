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
                    name: "CorrelationID",
                    display: "关联id",
                    type: "string"
                },
                {
                    name: "Remark",
                    display: "备注",
                    type: "string"
                }]
            },
            common: {
                hideToolbar: 0,
                formShowType: "tab",
                formShowPosition: "top",
                formViewName: "form2",
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
                display: "关联id",
                name: "CorrelationID",
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
            }],
            link: {},
            addins: {}
        },
        //dataset: 'web/dataset?model=attachment&viewname=list',
        toolbar: {
            items: [
                { text: '转下一步', id: 'workflow_advance', cls: 'ne-btn-blue' },
                { text: '回退', id: 'workflow_back' },
                { text: '流程图', id: 'workflow_log' },
                { text: '打印报表', id: 'myprint', cls: 'ne-btn-blue' }
            ]
        }
    };
    exports.options.model = {
        name: 'attachment',
        title: '附件'
    };

    exports.service = function service(page) {

};

    return exports;
});