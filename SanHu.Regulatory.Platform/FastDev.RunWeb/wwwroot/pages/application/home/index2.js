define([],
function ()
{
	function view()
	{
		return function run(e, pagedata)
		{
			var renderTo = e.renderTo;
			$(renderTo).css("margin", "10px");

			$(renderTo).load('/contents/todolist.html',
            function ()
            {

            });
		};
	}

	var exports = {
		run: view()
	};

	return exports;
});