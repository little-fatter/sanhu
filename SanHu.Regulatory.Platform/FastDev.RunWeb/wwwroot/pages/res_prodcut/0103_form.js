define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: true,
                    name: "ProductnNme",
                    label: "产品名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "ProductPic",
                    label: "产品图片",
                    editor: {
                        isInputMode: 0,
                        imgWidth: "",
                        imgHeight: "",
                        extensions: "jpg,png,gif"
                    },
                    type: "fileUploader",
                    type_textfield: "文件上传",
                    name_textfield: "产品图片",
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
        dataset: 'web/dataset?model=res_prodcut&viewname=0103_form'
    };
    exports.options.model = {
        name: 'res_prodcut',
        title: '产品'
    };

    return exports;
});