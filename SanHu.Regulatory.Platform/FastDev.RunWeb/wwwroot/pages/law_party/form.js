define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "CaseId",
                    label: "案件id",
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
                    name: "IDcard",
                    label: "身份证号码",
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
                    name: "address",
                    label: "地址",
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
                    name: "Contactnumber",
                    label: "联系电话",
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
                    name: "Nameoflegalperson",
                    label: "法人名称",
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
                    name: "Typesofparties",
                    label: "当事人类型",
                    editor: {
                        url: "/web/listdata",
                        parms: {
                            model: "res_dictionary"
                        },
                        valueField: "ID",
                        textField: "Title",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select"
                },
                {
                    newline: true,
                    name: "EventId",
                    label: "事件id",
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
                    name: "AssociationobjectID",
                    label: "关联对象id",
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
                    name: "Name",
                    label: "当事人名称",
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
                    name: "Gender",
                    label: "当事人性别",
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
                    name: "Nationality",
                    label: "当事人民族",
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
                    name: "WorkUnit",
                    label: "工作单位",
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
                    name: "Associatedobjecttype",
                    label: "关联对象",
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
                    name: "Occupation",
                    label: "当事人职业",
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
                }]
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=law_party&viewname=form'
    };
    exports.options.model = {
        name: 'law_party',
        title: '当事人'
    };

    exports.service = function service(page) {

};

    return exports;
});