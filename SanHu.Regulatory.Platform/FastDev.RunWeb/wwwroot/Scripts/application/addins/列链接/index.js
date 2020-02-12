define([], function ()
{
	var exports = {
		name: '列链接',
        run : run
    };
    function run(e)
	{
		  
        var page = e.page, p = e.page.options;
        var v = e.options.value;
		  
        page.bind('beforeShowList', function (e)
        {
        	var page = e.page, gridOptions = e.options;
            var column = pbc.web.helper.first(gridOptions.columns, function (a)
            {
                return a.name == v.columnName;
            });
            if (column == null) return;
            var openpageId = new Date().getTime();

            pbc.openpage_options[openpageId] = v.openPage;

            column.render = function (r)
            {
            	return '<a href="javascript:void(0)" data-grid-id="' + this.id + '" data-gridrow-id="' + r['__id'] + '" data-openpage-id="' + openpageId + '" class="todolink link">' + r[v.displayColumnName || v.columnName] + '</a>';
            };
        });
    }

    return exports;

});