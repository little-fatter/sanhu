define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: true,
                    name: "NewField1",
                    label: "字段1",
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
                    name: "NewField2",
                    label: "字段2",
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
                    name: "NewField3",
                    label: "字段3",
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
                    name: "AttachmentMultiple",
                    type: "ref_listbox_mul",
                    label: "附件多字段",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "attachment"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "attachment"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "url",
                        many2many: true
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "Enclosure",
                    label: "附件",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "attachment"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "attachment"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "url",
                        many2one: true
                    },
                    type: "ref_select",
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
        dataset: 'web/dataset?model=hasAttach&viewname=form'
    };
    exports.options.model = {
        name: 'hasAttach',
        title: '表测试有附件'
    };

    exports.service = function service(page) {

};

    return exports;
});