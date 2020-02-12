function server(page)
{ 
    var events = function ()
    {
       
    };
     
    $.extend(events,
    {
        getHandler: function (name)
        {
            if (name == "toolbarInit")
            {
                return this.toolbarInit;
            }
        },

        toolbarInit: function (e)
        {
            var page = e.page, viewType = e.viewType, toolbar = e.toolbar;
            var self = this;

            page.addEvent("approved", function ()
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
                $.ligerDialog.confirm('确定要审批吗?', function (yes)
                {
                    if (!yes) return;
                    pbc.ajax({
                        url: '/web/api/approved',
                        data: {
                            context: id,
                            model: 'dev_order'
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

            page.addEvent("void", function ()
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
                $.ligerDialog.confirm('确定要作废?', function (yes)
                {
                    if (!yes) return;
                    pbc.ajax({
                        url: '/web/api/void',
                        data: {
                            context: id,
                            model: 'dev_order'
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


    });

    for (var name in events)
    {
        var fn = events[name];
        if ($.isFunction(fn))
        {
            page.bind(name, fn);
        }
    }

};