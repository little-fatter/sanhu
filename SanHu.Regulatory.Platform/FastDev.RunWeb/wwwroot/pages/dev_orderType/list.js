define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Title",
                    display: "标题",
                    type: "string"
                },
                {
                    name: "Personincharge",
                    display: "负责人",
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
        dataset: 'web/dataset?model=dev_orderType&viewname=list'
    };
    exports.options.model = {
        name: 'dev_orderType',
        title: 'dev_orderType'
    };

    return exports;
});