define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "IDcard",
                    display: "身份证号码",
                    type: "string"
                },
                {
                    name: "address",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "Contactnumber",
                    display: "联系电话",
                    type: "string"
                },
                {
                    name: "Name",
                    display: "当事人名称",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "当事人类型",
                name: "Typesofparties",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionary"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionary"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionary&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "案件id",
                name: "CaseId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "身份证号码",
                name: "IDcard",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "联系电话",
                name: "Contactnumber",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "法人名称",
                name: "Nameoflegalperson",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "事件id",
                name: "EventId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联对象id",
                name: "AssociationobjectID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人名称",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人性别",
                name: "Gender",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人民族",
                name: "Nationality",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "工作单位",
                name: "WorkUnit",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "关联对象",
                name: "Associatedobjecttype",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "当事人职业",
                name: "Occupation",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "TypesofpartiesID",
                name: "TypesofpartiesID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=law_party&viewname=list'
    };
    exports.options.model = {
        name: 'law_party',
        title: '当事人'
    };

    exports.service = function service(page) {

};

    return exports;
});