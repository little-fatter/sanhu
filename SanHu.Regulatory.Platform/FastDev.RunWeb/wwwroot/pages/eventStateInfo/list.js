define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "EventInfoId",
                    display: "事件",
                    type: "string"
                },
                {
                    name: "State",
                    display: "状态",
                    type: "string"
                },
                {
                    name: "ImgPath",
                    display: "图片地址集合",
                    type: "string"
                },
                {
                    name: "FilePath",
                    display: "文件地址集合",
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
                display: "事件",
                name: "EventInfoId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "状态",
                name: "State",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "图片地址集合",
                name: "ImgPath",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "文件地址集合",
                name: "FilePath",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=eventStateInfo&viewname=list'
    };
    exports.options.model = {
        name: 'eventStateInfo',
        title: '事件状态'
    };

    exports.service = function service(page) {

};

    return exports;
});