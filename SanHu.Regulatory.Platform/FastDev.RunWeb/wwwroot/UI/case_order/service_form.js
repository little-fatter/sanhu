function service(page)
{
    
    page.bind('afterShowForm', function (e)
    {
        var page = e.page;
        var form = page.form;

        console.log( page );

        if (page.formData && page.formData.Status == "approved")
        {
            var bg = $('<div class="approvedbg"></div>').appendTo($(".formpanel:first"));

        }
        if (page.formData && page.formData.Status == "void")
        {
            var bg = $('<div class="voidbg"></div>').appendTo($(".formpanel:first"));

        }

        var jpanel = $('<div></div>').insertBefore($(".l-panel-bwarp", form.element).parent());

        var jbtn = $('<a class="ne-btn ne-btn-blue">选择数据</a>').appendTo(jpanel);
      
        jbtn.click(function ()
        {
            var dialog = null;

            var textField = "ProductnNme"; //标题类型字段名
            var options = {
                url: "/web/main/?model=res_prodcut&viewtype=list&viewname=0102_list",
                top: 100,
                width: 800,
                height:500,
                title: "选择窗口标题",
                data: {
                    selectorType: true,
                    singleMode: false,
                    isGridEditor: true, //是否属于表格编辑器
                    filter: [ 
                    ], 
                    valueField:  "ID",
                    textField: textField,
                    callback: function (selecteds)
                    {
                        var data = [];
                        for (var i = 0; i < selecteds.length; i++)
                        {
                            data.push({
                                product : [selecteds[i]["ID"],selecteds[i][textField]]
                            }); 
                        }
                        
                        page.form.getEditor("orderdetails").addRows(data);

                        setTimeout(function ()
                        {
                            dialog && dialog.close();
                        }, 50);
                    }
                }
            };
            pbc.preOptions(options, function ()
            {
                dialog = $.ligerDialog.open(options);
            });
        }); 

    });

    
    
    
}
