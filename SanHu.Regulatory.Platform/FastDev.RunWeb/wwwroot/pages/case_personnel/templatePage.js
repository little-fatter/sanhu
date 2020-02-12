define([],
function() {

    var exports = {
        type: 'templatePage',
        options: {
            type: "templatePage",
            templateName: "联系人",
            templateData: {
                backgroundColor: "F1F1F3",
                fieldTitle: "",
                fieldName: "Name",
                fieldImg: "Pic",
                fieldAddress: "Address",
                fieldCompany: "",
                fieldPhone: "Phone",
                fieldWeixin: "Weixin",
                fieldWeibo: "Weibo",
                openUrl: "/pages/case_personnel/form.w?id=#data.id#",
                openTarget: "dialog"
            },
            templateBase: {
                dataSource: {
                    model: "case_personnel",
                    url: "/web/listdata/"
                },
                enabledDataSource: 1
            }
        },
        dataset: 'web/dataset?model=case_personnel&viewname=templatePage'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    return exports;
});