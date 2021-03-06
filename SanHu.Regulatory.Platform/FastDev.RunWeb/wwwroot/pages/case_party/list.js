define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "CaseId",
                    display: "案件id",
                    type: "string"
                },
                {
                    name: "Typesofparties",
                    display: "当事人类型",
                    type: "string"
                },
                {
                    name: "Nameofparties",
                    display: "当事人名称",
                    type: "string"
                },
                {
                    name: "Genderofparties",
                    display: "当事人性别",
                    type: "string"
                },
                {
                    name: "Occupationofparties",
                    display: "当事人职业",
                    type: "string"
                },
                {
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
                    name: "EventID",
                    display: "事件id",
                    type: "string"
                },
                {
                    name: "Nameoflegalperson",
                    display: "法人名称",
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
        dataset: 'web/dataset?model=case_party&viewname=list'
    };
    exports.options.model = {
        name: 'case_party',
        title: '案件当事人'
    };

    return exports;
});