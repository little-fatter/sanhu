define([''],
function() {
    function view() {
    	return function run(e, pagedata)
    	{
    		var renderTo = e.renderTo;
            $(renderTo).css({
                margin: 10,
                fontSize: '36px'
            });
            $(renderTo).append("hello word");
        };
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=home&viewname=hello'
    };
    exports.options.model = {
        name: 'home',
        title: 'home'
    };

    return exports;
});