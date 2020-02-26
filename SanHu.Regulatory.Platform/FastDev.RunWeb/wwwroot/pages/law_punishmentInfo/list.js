define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "EventInfoId",
                    display: "事件id",
                    type: "string"
                },
                {
                    name: "CaseId",
                    display: "案件Id",
                    type: "string"
                },
                {
                    name: "PreviousformID",
                    display: "上一个表单id",
                    type: "string"
                },
                {
                    name: "Illegalfacts",
                    display: "违法事实",
                    type: "string"
                },
                {
                    name: "IllegalbasisID",
                    display: "违法依据Id",
                    type: "string"
                },
                {
                    name: "PunishmentbasisID",
                    display: "处罚依据id",
                    type: "string"
                },
                {
                    name: "Punishmentdecision",
                    display: "处罚决定",
                    type: "ref"
                },
                {
                    name: "Isfine",
                    display: "是否罚款",
                    type: "string"
                },
                {
                    name: "IsConfiscationgoods",
                    display: "是否没收物品",
                    type: "string"
                },
                {
                    name: "Amountofpenalty",
                    display: "罚款金额",
                    type: "string"
                },
                {
                    name: "Paymentmethod",
                    display: "缴纳方式",
                    type: "ref"
                },
                {
                    name: "  Assistants",
                    display: "协办人",
                    type: "string"
                },
                {
                    name: " AssistantsId",
                    display: "协办人Id",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            }
        },
        dataset: 'web/dataset?model=law_punishmentInfo&viewname=list'
    };
    exports.options.model = {
        name: 'law_punishmentInfo',
        title: '处罚当场决定书'
    };

    return exports;
});