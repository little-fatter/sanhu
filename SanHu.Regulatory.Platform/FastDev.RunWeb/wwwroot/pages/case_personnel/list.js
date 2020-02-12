define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "Name",
                    display: "名称",
                    type: "string"
                },
                {
                    name: "Phone",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "Weibo",
                    display: "微博",
                    type: "string"
                },
                {
                    name: "Weixin",
                    display: "微信",
                    type: "string"
                },
                {
                    name: "Address",
                    display: "地址",
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
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "left",
                searchAdShowType: "left",
                formViewName: "",
                openParm: ""
            },
            type: "list",
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
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=case_personnel&viewname=list'
    };
    exports.options.model = {
        name: 'case_personnel',
        title: '实例人员管理'
    };

    exports.service = function service(page) {

};

    return exports;
});