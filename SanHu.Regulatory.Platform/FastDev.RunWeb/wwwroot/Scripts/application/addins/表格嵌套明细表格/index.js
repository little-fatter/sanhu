define([], function ()
{
	var exports = {
		name : '表格嵌套明细表格',
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
           
            gridOptions.detail = {

                onShowDetail: function (row, detailPanel, callback)
                {
                    var grid = document.createElement('div');
                    $(detailPanel).append(grid);
                    $(detailPanel).width('90%');
                    var gridOptions = {
                        columns: v.detail_columns,
                        isScroll: false,
                        showToggleColBtn: false,
                        width: '90%',
                        url: '/web/PagedData/',
                        parms: {
                            model: v.detail_model,
                            Condition: {
                                rules: [{
                                    field: v.detail_field,
                                    op: "equal",
                                    value: row[v.main_field]
                                }]
                            }
                        },
                        showTitle: false,
                        columnWidth: 100,
                        onAfterShowData: callback,
                        frozen: false,
                        usePager: false,
                        checkbox: false
                    };
                    if (v.detail_grid)
                    {
                        $.extend(gridOptions, v.detail_grid);
                    }
                    $(grid).css('margin', 10).ligerGrid(gridOptions);
                }
            };
        });
    }

    return exports;

});