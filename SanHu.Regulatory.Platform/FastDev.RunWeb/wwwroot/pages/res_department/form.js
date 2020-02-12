define([],
function() {

    var exports = {
        type: 'form',
        options: {
            form: {
                fields: [{
                    newline: 0,
                    name: "DeptName",
                    label: "部门名称",
                    editor: {},
                    type: "text",
                    width: "",
                    exp: ""
                },
                {
                    newline: true,
                    name: "Company",
                    label: "公司",
                    editor: {
                        url: "web/listdata",
                        parms: {
                            model: "res_company"
                        },
                        valueField: "ID",
                        textField: "CompanyName",
                        many2one: true,
                        type: "ref_select"
                    },
                    type: "ref_select"
                },
                {
                    name: "Parent",
                    type: "ref_select",
                    label: "上级部门",
                    editor: {
                        url: "web/namedata",
                        parms: {
                            model: "res_department"
                        },
                        detailEnabled: true,
                        detailUrl: "web/detaildata",
                        detailParms: {
                            model: "res_department"
                        },
                        valueField: "ID",
                        sourceFilter: null,
                        textField: "DeptName",
                        many2one: true
                    },
                    newline: 1,
                    width: ""
                },
                {
                    newline: 1,
                    name: "Remarks",
                    label: "备注",
                    editor: {
                        height: "",
                        toolbarHeight: "",
                        toolbarType: "mini",
                        toolbarCustom: ""
                    },
                    type: "htmlEditor",
                    width: "950",
                    readonlyInEdit: 0
                }],
                inputWidth: "280",
                labelWidth: "90",
                space: "40",
                labelAlign: "left",
                align: "left",
                widescreen: 0
            },
            link: {},
            common: {},
            type: "form",
            addins: {}
        },
        dataset: 'web/dataset?model=res_department&viewname=form'
    };
    exports.options.model = {
        name: 'res_department',
        title: '部门'
    };

    exports.service = function service(page) {

};

    return exports;
});