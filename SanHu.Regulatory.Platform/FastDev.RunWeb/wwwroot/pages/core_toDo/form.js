define([],
function() {
    function view() {
        var options = {
            form: {
                fields: []
            },
            link: {
                scripts: "",
                links: "",
                controls: ""
            }
        };
        return options;
    }

    var exports = {
        type: 'form',
        options: view(),
        dataset: 'web/dataset?model=core_toDo&viewname=form'
    };
    exports.options.model = {
        name: 'core_toDo',
        title: '代办'
    };

    return exports;
});