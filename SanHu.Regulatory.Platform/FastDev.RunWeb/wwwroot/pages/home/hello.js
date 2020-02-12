define([],
function() {
 
    var exports = {
    	run: function run(e)
    	{
    		$(e.renderTo).css({
    			margin: 10,
    			fontSize: '36px'
    		});
    		$(e.renderTo).append("hello word");
    	}
    };

    return exports;
});