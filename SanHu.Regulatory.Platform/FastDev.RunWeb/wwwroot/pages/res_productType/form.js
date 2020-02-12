define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: true,
                    name: "TypeName",
                    label: "类型名",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    }
                },
                {
                    name: "Parent",
                    type: "ref_select",
                    label: "父类别",
                    editor: {
                        url: "web/namedata",
                        cancelable: true,
                        parms: {
                            model: "res_productType"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "res_productType"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "TypeName",
                        many2one: true
                    },
                    newline: 1,
                    width: ""
                },
                {
                    newline: 1,
                    name: "Remark",
                    label: "备注",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: ""
                }]
            },
            common: {
                saveCallbackType: "toAdd"
            },
            link: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=res_productType&viewname=form'
    };
    exports.options.model = {
        name: 'res_productType',
        title: '物品类别'
    };

    exports.service = function service(page) {

};

    return exports;
});