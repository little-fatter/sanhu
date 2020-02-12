define([], function ()
{
	var exports = {
	    name: '增加数据打印按钮',
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
        		id: 'gridPrint',
        		onClick: function ()
        		{

        		    require(["grid_printData"], function ()
        			{
        			    if (page.grid && page.grid.printData)
        				{
        			        page.grid.printData();
        				}

        			});

        		},
        		text: v.buttonText || '打印数据'
        	});
        });
		 
    }

    return exports;

});