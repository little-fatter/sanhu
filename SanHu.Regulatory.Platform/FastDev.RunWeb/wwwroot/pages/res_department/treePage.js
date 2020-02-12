define([],
function() {

    var exports = {
        type: 'treePage',
        options: {
            type: "treePage",
            treeFilter: {
                enabled: 1,
                showInLeft: 1,
                sourceModel: "res_department"
            }
        },
        dataset: 'web/dataset?model=res_department&viewname=treePage'
    };
    exports.options.model = {
        name: 'res_department',
        title: '部门'
    };

    return exports;
});