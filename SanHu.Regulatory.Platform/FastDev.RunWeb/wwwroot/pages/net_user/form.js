define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    name: "NickName",
                    type: "text",
                    label: "微信昵称",
                    editor: {},
                    newline: 0,
                    type_textfield: "单行",
                    name_textfield: "微信昵称",
                    width: "",
                    readonly: 1
                },
                {
                    newline: 1,
                    name: "ValidatePhone",
                    label: "手机",
                    editor: {},
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "手机",
                    width: "",
                    readonly: 1
                },
                {
                    newline: 1,
                    name: "RealName",
                    label: "姓名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "姓名",
                    width: ""
                },
                {
                    newline: 1,
                    name: "Address",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "地址",
                    width: ""
                }],
                inputWidth: "250",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                viewType: "form",
                saveCallbackType: "toView"
            },
            link: {},
            actions: {
                get: "/net/detailData/",
                save: "/net/saveuser/",
                del: "net/delete/"
            }
        },
        dataset: 'web/dataset?model=net_user&viewname=form'
    };
    exports.options.model = {
        name: 'net_user',
        title: '跟单系统账号'
    };

    return exports;
});