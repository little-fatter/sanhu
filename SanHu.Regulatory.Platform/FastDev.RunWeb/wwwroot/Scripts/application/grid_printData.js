define([], function ()
{


    var $ = jQuery;



    $.extend($.ligerui.controls.Grid.prototype, {
        printData: function ()
        {
            var grid = this;
            var gd = liger.exportGrid(grid);

            var columns = gd.columns;
            top.selectPrintFields(columns, function (data)
            {
                grid.initPrintData = data;

                var parm = $.extend({
                    url: '/web/GetCommonPrint/',
                    title: '打印',
                    pageSize: 30
                }, liger.exportGrid(grid, function (column)
                {
                    if (data.fields.indexOf(column.name) == -1) return false;
                })); 

                top.printPage(parm);

            }, grid.initPrintData);
        }

    });

});
