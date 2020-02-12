define([],
function() {
    function view() {
        var options = {
            type: "template",
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            template: {}
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=v_user&viewname=template'
    };
    exports.options.model = {
        name: 'v_user',
        title: '用户视图'
    };

    return exports;
});