define([],
function() {
    function view() {
        var options = {
            form: {
                fields: [{
                    newline: 1,
                    name: "ModuleName",
                    label: "模块标示",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "ModuleName",
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        regexRule_textfield: "(无)",
                        equalTo: "",
                        equalTo_textfield: "(无)"
                    }
                },
                {
                    newline: true,
                    name: "ModuleTitle",
                    label: "模块标题",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    type_textfield: "单行",
                    name_textfield: "ModuleTitle",
                    width: "",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        regexRule_textfield: "(无)",
                        equalTo: "",
                        equalTo_textfield: "(无)"
                    }
                }]
            },
            common: {
                viewType: "form",
                depends: ["SalaryListStructure"],
                saveCallbackType: "toAdd"
            },
            link: {}
        };

        pbc.web.modules.SalaryListStructure = {
            js: ['Scripts/editors/SalaryListStructure.js']
        };

        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_module&viewname=form'
    };
    exports.options.model = {
        name: 'core_module',
        title: 'core_module'
    };

    return exports;
});