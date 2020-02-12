define([], function ()
{
	var exports = {
		name: "表格扩展",
        run : run
    };
    function run(e)
    {
        var page = e.page, p = e.page.options;
        var v = e.options.value;

        page.bind('beforeShowList', function (e)
        {
            var page = e.page,
            gridOptions = e.options;
          

            $.extend(gridOptions, v);

        });
    }

    return exports;

});