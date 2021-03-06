define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CaseType",
                    display: "案件类型",
                    type: "string"
                },
                {
                    name: "CaseTitle",
                    display: "标题",
                    type: "string"
                },
                {
                    name: "CaseStatus",
                    display: "案件状态",
                    type: "string"
                },
                {
                    name: "ApplicableProcedure",
                    display: "适用程序",
                    type: "ref"
                },
                {
                    name: "PenaltyType",
                    display: "处罚种类",
                    type: "ref"
                },
                {
                    name: "CaseCloseDay",
                    display: "结案日期",
                    type: "datetime"
                },
                {
                    name: "OnDocDay",
                    display: "归档日期",
                    type: "datetime"
                },
                {
                    name: "CaseSource",
                    display: "案件来源",
                    type: "ref"
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
                display: "适用程序",
                name: "ApplicableProcedure",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "处罚种类",
                name: "PenaltyType",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "案件来源",
                name: "CaseSource",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "res_dictionaryItems"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "res_dictionaryItems"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "Title",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=res_dictionaryItems&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 字典明细项",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "案件类型",
                name: "CaseType",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "标题",
                name: "CaseTitle",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案件状态",
                name: "CaseStatus",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案由",
                name: "CauseOfAction",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "处罚决定书文号",
                name: "PenaltyDecisionNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "立案日期",
                name: "CaseRegisterDay",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "结案日期",
                name: "CaseCloseDay",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "办案人员",
                name: "Investigators",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "归档日期",
                name: "OnDocDay",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "保存期限",
                name: "DocRetentionTimes",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "归档号",
                name: "DocNo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "归档人",
                name: "DocPeople",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ApplicableProcedureID",
                name: "ApplicableProcedureID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "PenaltyTypeID",
                name: "PenaltyTypeID",
                editor: {
                    type: "text"
                },
                type: "text"
            },
            {
                display: "CaseSourceID",
                name: "CaseSourceID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_law_case&viewname=list'
    };
    exports.options.model = {
        name: 'case_law_case',
        title: '案件'
    };

    exports.service = function service(page) {

};

    return exports;
});