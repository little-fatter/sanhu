define([],
function() {

    var exports = {
        type: 'form',
        options: {
            type: "form",
            form: {
                fields: [{
                    name: "EventInfoId",
                    label: "事件id",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "CaseId",
                    label: "案件Id",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "PreviousformID",
                    label: "上一个表单id",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "Illegalfacts",
                    label: "违法事实",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "IllegalbasisID",
                    label: "违法依据Id",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "PunishmentbasisID",
                    label: "处罚依据id",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "Punishmentdecision",
                    label: "处罚决定",
                    newline: 1,
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
                        many2one: true
                    },
                    type: "ref_select"
                },
                {
                    name: "Isfine",
                    label: "是否罚款",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "IsConfiscationgoods",
                    label: "是否没收物品",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "Amountofpenalty",
                    label: "罚款金额",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: "Paymentmethod",
                    label: "缴纳方式",
                    newline: 1,
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
                        many2one: true
                    },
                    type: "ref_select"
                },
                {
                    name: "  Assistants",
                    label: "协办人",
                    editor: {},
                    type: "text",
                    newline: 0
                },
                {
                    name: " AssistantsId",
                    label: "协办人Id",
                    newline: 1,
                    editor: {},
                    type: "text"
                },
                {
                    name: "FormName",
                    label: "表单名称",
                    editor: {},
                    type: "text",
                    newline: 0
                }],
                tab: null
            },
            common: {
                saveCallbackType: "toClose"
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=law_punishmentInfo&viewname=form'
    };
    exports.options.model = {
        name: 'law_punishmentInfo',
        title: '处罚当场决定书'
    };

    exports.service = function service(page) {

};

    return exports;
});