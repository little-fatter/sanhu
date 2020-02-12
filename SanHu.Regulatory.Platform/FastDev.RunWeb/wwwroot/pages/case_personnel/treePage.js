define([],
function() {

    var exports = {
        type: 'treePage',
        options: {
            type: "treePage",
            treeFilter: {
                enabled: 1,
                showInLeft: 1,
                sourceModel: "case_personnel",
                pageUrl: "/pages/case_personnel/formpreview.w?id=#data.id#",
                header: "",
                rootText: "",
                sourceModel_textfield: "case_personnel",
                textField: "",
                parentField: "",
                sourceModel2: "",
                parentField2: "",
                refSourceField: "",
                textField2: ""
            },
            filterFields: [{
                display: "名称",
                name: "Name",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "头像",
                name: "Pic",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "电话",
                name: "Phone",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "微博",
                name: "Weibo",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "微信",
                name: "Weixin",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "地址",
                name: "Address",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "备注",
                name: "Remark",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "公司",
                name: "company",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            common: {
                showList: 0,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 1,
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
                formShowType: "",
                dialogWidth: "",
                dialogHeight: "",
                openParm: ""
            },
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_personnel&viewname=treePage'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    exports.service = function service(page) {

};

    return exports;
});