define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "Name",
                    label: "名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 0,
                    name: "Pic",
                    label: "头像",
                    editor: {},
                    type: "fileSelector",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "Phone",
                    label: "电话",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "Weibo",
                    label: "微博",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "Weixin",
                    label: "微信",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "Address",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_personnel&viewname=form'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    exports.service = function service(page) {

};

    return exports;
});