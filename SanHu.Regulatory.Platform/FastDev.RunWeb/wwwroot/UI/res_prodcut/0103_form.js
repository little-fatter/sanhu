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