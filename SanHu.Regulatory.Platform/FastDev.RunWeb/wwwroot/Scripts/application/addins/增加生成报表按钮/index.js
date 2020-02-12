define([], function ()
{
	var exports = {
		name: '增加生成报表按钮',
        run : run
    };
    function run(e)
    {
		
        var page = e.page, p = e.page.options;
        var v = e.options.value;
 
        page.bind('toolbarInit', function (ee)
        {
        	var toolbar = ee.toolbar;
			 
        	toolbar.items.push({
        		id: 'gridChart',
        		onClick: function ()
        		{

        			require(["grid_chart"], function ()
        			{
        				if (page.grid && page.grid.exportChart)
        				{
        					page.grid.exportChart();
        				}

        			});

        		},
        		text: v.buttonText || '生成报表'
        	});
        });
		 
    }

    return exports;

});