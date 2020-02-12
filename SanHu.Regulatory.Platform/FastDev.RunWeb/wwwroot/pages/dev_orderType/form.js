define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "Title",
                    label: "标题2",
                    editor: {
                        type: "text",
                        value: "xxx"
                    },
                    type: "text",
                    type_textfield: "单行"
                },
                {
                    name: "Personincharge",
                    type: "text",
                    label: "负责人",
                    editor: {},
                    newline: 1,
                    type_textfield: "单行",
                    name_textfield: "负责人",
                    width: ""
                },
                {
                    name: "Remarks",
                    type: "textarea",
                    label: "备注",
                    editor: {},
                    newline: 1,
                    type_textfield: "多行",
                    name_textfield: "备注",
                    width: ""
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toView"
            },
            link: {}
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=dev_orderType&viewname=form'
    };
    exports.options.model = {
        name: 'dev_orderType',
        title: 'dev_orderType'
    };

    return exports;
});