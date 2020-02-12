define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    newline: 1,
                    name: "WarehouseName",
                    label: "门店名",
                    editor: {},
                    type: "text",
                    validate: {
                        required: 1,
                        minlength: "0",
                        maxlength: "255",
                        regexRule: "",
                        equalTo: ""
                    },
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: true,
                    name: "SortNo",
                    label: "排序",
                    editor: {
                        type: "int"
                    },
                    type: "int"
                },
                {
                    name: "WarehouseManager",
                    type: "ref_popupselect",
                    label: "门店管理员",
                    editor: {
                        url: "/web/namedata",
                        parms: {
                            model: "res_employee"
                        },
                        detailEnabled: true,
                        detailUrl: "/web/detaildata",
                        detailParms: {
                            model: "res_employee"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "EmpName",
                        css: "combobox-selector",
                        popupselect_ismul: false,
                        popupselect_type: "popupselect",
                        popupselect_url: "/web/main/?model=res_employee&viewtype=list",
                        popupselect_width: "1000",
                        popupselect_height: "700",
                        popupselect_title: "选择： 员工",
                        many2one: true
                    },
                    newline: 1,
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "Address",
                    label: "地址",
                    editor: {
                        type: "text"
                    },
                    type: "text",
                    width: "",
                    readonlyInEdit: 0
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        height: "60"
                    },
                    type: "textarea",
                    width: ""
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            common: {
                saveCallbackType: "dialog"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=res_store&viewname=form'
    };
    exports.options.model = {
        name: 'res_store',
        title: '门店'
    };

    exports.service = function service(page) {

};

    return exports;
});