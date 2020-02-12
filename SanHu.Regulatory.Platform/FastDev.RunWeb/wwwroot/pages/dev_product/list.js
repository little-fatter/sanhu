define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Productname",
                    display: "产品名",
                    type: "string"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
                    type: "number"
                },
                {
                    name: "Specifications",
                    display: "规格",
                    type: "string"
                },
                {
                    name: "Producttype",
                    display: "产品类型",
                    type: "ref"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=dev_product&viewname=list'
    };
    exports.options.model = {
        name: 'dev_product',
        title: 'dev_product'
    };

    return exports;
});