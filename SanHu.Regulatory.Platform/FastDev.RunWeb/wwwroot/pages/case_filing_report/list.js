define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "RefCase",
                    display: "案件",
                    type: "ref"
                },
                {
                    name: "PersionName",
                    display: "姓名",
                    type: "string"
                },
                {
                    name: "CompanyName",
                    display: "单位名",
                    type: "string"
                },
                {
                    name: "IllegalCause",
                    display: "案由",
                    type: "string"
                },
                {
                    name: "BaseInfo",
                    display: "基本情况",
                    type: "string"
                },
                {
                    name: "IllegalCauseInfo",
                    display: "案情",
                    type: "string"
                },
                {
                    name: "LawDesc",
                    display: "法律描述",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            type: "list",
            filterFields: [{
                display: "案件",
                name: "RefCase",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "case_law_case"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "case_law_case"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "CaseType",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=case_law_case&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 案件",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "姓名",
                name: "PersionName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "单位名",
                name: "CompanyName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案由",
                name: "IllegalCause",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "基本情况",
                name: "BaseInfo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "案情",
                name: "IllegalCauseInfo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "法律描述",
                name: "LawDesc",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "RefCaseID",
                name: "RefCaseID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_filing_report&viewname=list'
    };
    exports.options.model = {
        name: 'case_filing_report',
        title: '立案报告'
    };

    exports.service = function service(page) {

};

    return exports;
});