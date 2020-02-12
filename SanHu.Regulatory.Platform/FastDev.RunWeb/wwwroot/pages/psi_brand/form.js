define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "image",
                    type: "image",
                    label: "图像",
                    editor: {},
                    newline: 1,
                    width: "",
                    readonly: 1,
                    readonlyInEdit: 1,
                    exp: ""
                },
                {
                    newline: 1,
                    name: "Name",
                    label: "品牌名",
                    editor: {},
                    type: "text",
                    width: "",
                    readonlyInEdit: 1,
                    readonly: 1
                },
                {
                    newline: 1,
                    name: "Description",
                    label: "描述",
                    editor: {},
                    type: "textarea",
                    width: "",
                    readonlyInEdit: 1,
                    readonly: 1
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=psi_brand&viewname=form'
    };
    exports.options.model = {
        name: 'psi_brand',
        title: '产品品牌'
    };

    exports.service = function service(page) {

};

    return exports;
});