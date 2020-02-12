define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Typename",
                    display: "类型名",
                    type: "string"
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
        dataset: 'web/dataset?model=dev_productType&viewname=list'
    };
    exports.options.model = {
        name: 'dev_productType',
        title: 'dev_productType'
    };

    return exports;
});