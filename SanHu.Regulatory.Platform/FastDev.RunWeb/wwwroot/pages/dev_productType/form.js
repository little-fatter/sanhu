define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "Typename",
                    label: "类型名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行"
                },
                {
                    newline: 1,
                    name: "Description",
                    label: "描述",
                    editor: {
                        height: "80"
                    },
                    type: "textarea",
                    type_textfield: "多行",
                    name_textfield: "描述",
                    width: ""
                }]
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
        dataset: 'web/dataset?model=dev_productType&viewname=form'
    };
    exports.options.model = {
        name: 'dev_productType',
        title: 'dev_productType'
    };

    return exports;
});