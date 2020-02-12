define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Name",
                    display: "名称",
                    type: "string",
                    editor: {
                        type: "text"
                    },
                    name_text: "名称",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: "text",
                    editorType_textfield: "单行"
                },
                {
                    name: "Pic",
                    display: "头像",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "Phone",
                    display: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "Weibo",
                    display: "微博",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "Weixin",
                    display: "微信",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "Remark",
                    display: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                },
                {
                    name: "company",
                    display: "公司",
                    editor: {
                        type: "text"
                    },
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            isEditList: 1,
            type: "list",
            filterFields: [{
                display: "名称",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "头像",
                name: "Pic",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "微博",
                name: "Weibo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "微信",
                name: "Weixin",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
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
                display: "公司",
                name: "company",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_personnel&viewname=editlist'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    exports.service = function service(page) {

};

    return exports;
});