define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "RefCase",
                    label: "案件",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "case_law_case"
                        },
                        valueField: "ID",
                        textField: "CaseType",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select"
                },
                {
                    newline: false,
                    name: "PersionName",
                    label: "姓名",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: true,
                    name: "CompanyName",
                    label: "单位名",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: false,
                    name: "IllegalCause",
                    label: "案由",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text"
                },
                {
                    newline: 1,
                    name: "BaseInfo",
                    label: "基本情况",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text",
                    width: "500",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "IllegalCauseInfo",
                    label: "案情",
                    editor: {
                        many2many: "ref_select_mul",
                        many2one: "ref_select",
                        one2many: "ref_grid_edit",
                        datetime: "datepicker",
                        integer: "int",
                        float: "float",
                        boolean: "checkbox",
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "LawDesc",
                    label: "法律描述",
                    editor: {},
                    type: "textarea",
                    width: "",
                    readonlyInEdit: 0
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_filing_report&viewname=form'
    };
    exports.options.model = {
        name: 'case_filing_report',
        title: '立案报告'
    };

    exports.service = function service(page) {

};

    return exports;
});