function service(page)
{
    
    page.bind("approved", function ()
    {
        if (page.grid)
        {
            page.grid.exportChart();
            return;
        }
        var id = "";
        var selecteds = page.getSelecteds();
        if (selecteds && selecteds.length)
        {
            var ids = [];
            $(selecteds).each(function ()
            {
                ids.push(this.ID);
            });
            id = ids.join(';');
        } else
        {
            pbc.tips(2, "请选择数据再操作");
            return;
        }
        $.ligerDialog.confirm('确定要审批吗?', function (yes)
        {
            if (!yes) return;
            pbc.ajax({
                url: '/web/api/approved',
                data: {
                    context: id,
                    model: 'case_order'
                },
                success: function (r)
                {
                    if (r.statusCode == "1")
                    {
                        top.pbc.tips(1, '审批成功');
                        page.reload();
                    } else if (r.statusCode == "2")
                    {
                        top.pbc.tips(2, r.message);
                    }
                    else if (r.statusCode == "3")
                    {
                        pbc.showError(r.message);
                    }
                }
            });
        });

    });
    
    
    page.bind("unapproved", function ()
    {
        var id = "";
        var selecteds = page.getSelecteds();
        if (selecteds && selecteds.length)
        {
            var ids = [];
            $(selecteds).each(function ()
            {
                ids.push(this.ID);
            });
            id = ids.join(';');
        } else
        {
            pbc.tips(2, "请选择数据再操作");
            return;
        }
        $.ligerDialog.confirm('确定要反审批吗?', function (yes)
        {
            if (!yes) return;
            pbc.ajax({
                url: '/web/api/unapproved',
                data: {
                    context: id,
                    model: 'case_order'
                },
                success: function (r)
                {
                    if (r.statusCode == "1")
                    {
                        top.pbc.tips(1, '反审批成功');
                        page.reload();
                    } else if (r.statusCode == "2")
                    {
                        top.pbc.tips(2, r.message);
                    }
                    else if (r.statusCode == "3")
                    {
                        pbc.showError(r.message);
                    }
                }
            });
        });

    });
  
   page.bind("void", function ()
    {
        var id = "";
        var selecteds = page.getSelecteds();
        if (selecteds && selecteds.length)
        {
            var ids = [];
            $(selecteds).each(function ()
            {
                ids.push(this.ID);
            });
            id = ids.join(';');
        } else
        {
            pbc.tips(2, "请选择数据再操作");
            return;
        }
        $.ligerDialog.confirm('确定要作废吗?', function (yes)
        {
            if (!yes) return;
            pbc.ajax({
                url: '/web/api/unapproved',
                data: {
                    context: id,
                    model: 'case_order'
                },
                success: function (r)
                {
                    if (r.statusCode == "1")
                    {
                        top.pbc.tips(1, '作废成功');
                        page.reload();
                    } else if (r.statusCode == "2")
                    {
                        top.pbc.tips(2, r.message);
                    }
                    else if (r.statusCode == "3")
                    {
                        pbc.showError(r.message);
                    }
                }
            });
        });

    });
}
