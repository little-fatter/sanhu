define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    label: "标题",
                    name: "Title",
                    type: "text",
                    width: "",
                    newline: 0,
                    readonlyInEdit: 0,
                    editor: {}
                },
                {
                    label: "代办内容",
                    name: "Remark",
                    type: "textarea",
                    width: "",
                    newline: 1,
                    readonlyInEdit: 0,
                    editor: {}
                }]
            },
            link: {
                scripts: "",
                links: "",
                controls: ""
            },
            type: "form",
            common: {},
            addins: {}
        },
        dataset: 'web/dataset?model=core_toDo&viewname=form'
    };
    exports.options.model = {
        name: 'core_toDo',
        title: '代办'
    };

    exports.service = function service(page) {

};

    return exports;
});