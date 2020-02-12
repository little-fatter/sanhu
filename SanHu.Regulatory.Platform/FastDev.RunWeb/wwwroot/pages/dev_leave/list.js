define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Title",
                    display: "标2题",
                    type: "string"
                },
                {
                    name: "Leavedays",
                    display: "请假天数",
                    type: "number"
                },
                {
                    name: "Endtime",
                    display: "结束时间",
                    type: "datetime"
                },
                {
                    name: "Starttime",
                    display: "开始时间",
                    type: "datetime"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            filterFields: [{
                display: "标题",
                name: "Title",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "内容",
                name: "Content",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "请假天数",
                name: "Leavedays",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "开始时间",
                name: "Starttime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "结束时间",
                name: "Endtime",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            }],
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=dev_leave&viewname=list'
    };
    exports.options.model = {
        name: 'dev_leave',
        title: 'dev_leave'
    };

    return exports;
});