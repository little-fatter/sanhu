define([],
function() {
    function view() {
        var options = {
            type: "form",
            form: {
                fields: [{
                    name: "Title",
                    label: "标题",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "Logtype",
                    label: "日志类型",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "Logtime",
                    label: "日期时间",
                    newline: 1,
                    editor: {},
                    type: "datepicker"
                }],
                tab: {
                    items: [{
                        fields: [{
                            name: "Logcontent",
                            label: "内容",
                            newline: 1,
                            tabTitle: "内容",
                            editor: {},
                            type: "textarea",
                            width: "",
                            hideLabel: 1
                        }],
                        title: "内容"
                    },
                    {
                        fields: [{
                            name: "StackTrace",
                            label: "StackTrace",
                            newline: 1,
                            tabTitle: "其他",
                            editor: {},
                            type: "text"
                        },
                        {
                            name: "OperatorIP",
                            label: "OperatorIP",
                            newline: 1,
                            tabTitle: "其他",
                            editor: {},
                            type: "text"
                        },
                        {
                            name: "Systempath",
                            label: "Systempath",
                            newline: 1,
                            tabTitle: "其他",
                            editor: {},
                            type: "text"
                        }],
                        title: "其他"
                    }]
                },
                inputWidth: "480",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_log&viewname=form'
    };
    exports.options.model = {
        name: 'core_log',
        title: '系统日志'
    };

    exports.service = function service(page) {

};

    return exports;
});