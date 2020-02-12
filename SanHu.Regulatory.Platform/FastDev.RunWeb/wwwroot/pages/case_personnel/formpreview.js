define([],
function() {

    var exports = {
        type: 'templatePage',
        options: {
            type: "templatePage",
            templateName: "联系人单页",
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
                    url: "/web/detaildata/#q.id#",
                    filter: {
                        op: "and"
                    }
                },
                enabledDataSource: 1
            }
        },
        dataset: 'web/dataset?model=case_personnel&viewname=formpreview'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    return exports;
});