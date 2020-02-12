function service(page)
{
    
    page.bind('afterShowForm', function (e)
{
    var page = e.page;
    var form = page.form;
 
  
    var jpanel = $('<div></div>').insertBefore($(".l-panel-bwarp", form.element).parent());

    var jbtn = $('<a class="ne-btn ne-btn-blue">选择数据</a>').appendTo(jpanel);

    jbtn.click(function ()
    {
        var dialog = null;

        var fieldName = "orderdetails";//子模型字段名
        var modelName = "res_prodcut"; //目标模型
        var textField = "ProductnNme";//目标模型标题字段名
        var viewname = "list"; //视图名
        var dialogTitle = "选择窗口标题"; //选择窗口标题


        var options = {
            url: "/web/main/?model=" + modelName + "&viewtype=list&viewname=" + viewname,
            top: 100,
            width: 800,
            height: 500,
            title: dialogTitle,
            data: {
                selectorType: true,
                singleMode: false,
                isGridEditor: true, //是否属于表格编辑器
                filter: [
                ],
                valueField: "ID",
                textField: textField,
                callback: function (selecteds)
                {
                    var data = [];
                    for (var i = 0; i < selecteds.length; i++)
                    {
                        data.push({
                            product: [selecteds[i]["ID"], selecteds[i][textField]]
                        });
                    }

                    page.form.getEditor(fieldName).addRows(data);

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
