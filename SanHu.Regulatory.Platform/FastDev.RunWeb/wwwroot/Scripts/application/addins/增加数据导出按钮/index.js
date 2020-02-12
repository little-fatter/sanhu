define([], function ()
{
	var exports = {
	    name: '增加数据导出按钮',
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
        		id: 'gridExport',
        		onClick: function ()
        		{

        			require(["grid_exportExcel"], function ()
        			{
        			    if (page.grid && page.grid.exportExcel)
        				{
        			        page.grid.exportExcel();
        				}

        			});

        		},
        		text: v.buttonText || '导出Excel'
        	});
        });
		 
    }

    return exports;

});