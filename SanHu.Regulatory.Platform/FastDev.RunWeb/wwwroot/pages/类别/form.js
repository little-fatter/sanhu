define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "类别名称",
                    label: "类别名称",
                    editor: {
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "说明",
                    label: "说明",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                }],
                inputWidth: "180",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=类别&viewname=form'
    };
    exports.options.model = {
        name: '类别',
        title: 'Northwind_ZH类别'
    };

    exports.service = function service(page) {

};

    return exports;
});