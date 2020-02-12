define([], function ()
{


    var $ = jQuery;



    $.extend($.ligerui.controls.Grid.prototype, {

        exportExcel: function (filterColumn)
        {
            var grid = this;
            var gd = liger.exportGrid(grid);

            var columns = gd.columns;
            top.selectPrintFields(columns, function (data)
            {
                grid.initPrintData = data;
                 
                var parm = liger.exportGrid(grid, function (column)
                {
                    if (data.fields.indexOf(column.name) == -1) return false;
                });
                var post = {
                    title: "下载数据"
                };
                for (var name in parm)
                {
                    post[name + "JSON"] = JSON.stringify(parm[name]);
                }
                pbc.openFile({
                    url: pbc.toUrl('web/exportgrid?rnd=') + new Date().getTime(),
                    parms: post
                });

            }, grid.initPrintData);

             
         
        } 
    });


});
