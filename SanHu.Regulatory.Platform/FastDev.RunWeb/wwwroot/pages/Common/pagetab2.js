define([],
function() {

    var exports = {
        type: 'templatePage',
        options: {
            type: "templatePage",
            templateName: "左侧选项卡页",
            templateData: {
                tabItems: [{
                    title: "商品",
                    url: "/pages/res_prodcut/form.w"
                },
                {
                    title: "员工",
                    url: "/pages/case_employee/list.w"
                },
                {
                    title: "客户",
                    url: "/pages/crm_customer/form3.w"
                },
                {
                    title: "订单",
                    url: "/pages/case_order/form.w"
                }],
                nonpro: 1,
                leftItemHeight: "35",
                leftBackgroundColor: "",
                leftWidth: "240",
                title: "",
                swipeBack: 0
            },
            templateBase: {
                dataSource: {
                    model: "Common",
                    url: "/web/listdata/"
                },
                enabledDataSource: 0
            }
        },
        dataset: 'web/dataset?model=Common&viewname=pagetab2'
    };
    exports.options.model = {
        name: 'Common',
        title: '通用'
    };

    return exports;
});