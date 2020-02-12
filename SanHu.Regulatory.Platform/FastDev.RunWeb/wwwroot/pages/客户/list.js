define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "客户ID",
                    display: "客户ID",
                    type: "string"
                },
                {
                    name: "公司名称",
                    display: "公司名称",
                    type: "string"
                },
                {
                    name: "联系人姓名",
                    display: "联系人姓名",
                    type: "string"
                },
                {
                    name: "联系人职务",
                    display: "联系人职务",
                    type: "string"
                },
                {
                    name: "地址",
                    display: "地址",
                    type: "string"
                },
                {
                    name: "城市",
                    display: "城市",
                    type: "string"
                },
                {
                    name: "地区",
                    display: "地区",
                    type: "string"
                },
                {
                    name: "邮政编码",
                    display: "邮政编码",
                    type: "string"
                },
                {
                    name: "国家",
                    display: "国家",
                    type: "string"
                },
                {
                    name: "电话",
                    display: "电话",
                    type: "string"
                },
                {
                    name: "传真",
                    display: "传真",
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
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=客户&viewname=list'
    };
    exports.options.model = {
        name: '客户',
        title: 'Northwind_ZH客户'
    };

    return exports;
});