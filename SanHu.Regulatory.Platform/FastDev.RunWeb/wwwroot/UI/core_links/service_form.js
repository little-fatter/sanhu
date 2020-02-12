function server(page)
{
    function getUrlParm(url, name)
    {
        var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1)
        {
            return "";
        }
        return result[1];
    }

    page.bind('beforeShowForm', function (e)
    {
     
        var page = e.page;
        var op = e.options;  
        var field1 = pbc.web.helper.first(op.fields, function (a) { return a.name == "Url"; });
        var field2 = pbc.web.helper.first(op.fields, function (a) { return a.name == "LinkBind"; });

        if (field1 != null && field1.editor)
        {
            field1.editor.onButtonClick = function ()
            {
                var dialog, combobox = this;
                var formData = {
                    ModelName: getUrlParm(combobox.getValue(), "model"),
                    ViewType: getUrlParm(combobox.getValue(), "viewtype"),
                    ViewName: getUrlParm(combobox.getValue(), "viewname")
                };
                if (formData.ViewType == "main") formData.ViewType = "list";
                var options = {
                    url: pbc.toUrl('web/main?model=core_menu&viewtype=form&viewname=form_geturl'),
                    top: 100,
                    width: 600,
                    height: 400,
                    title: '链接自动生成',
                    data: {
                        formData: formData,
                        localType: true,
                        callback: function (data)
                        {
                            combobox.setValue('web/main?model=' + data.ModelName + '&viewtype=' + data.ViewType + '&viewname=' + data.ViewName);


                            setTimeout(function ()
                            {
                                dialog.close();
                            }, 50);
                        }
                    }
                };
                try
                {
                    var open = top.openDialog ? top.openDialog : $.ligerDialog.open;
                    dialog = open(options);
                } catch (e)
                {
                    dialog = $.ligerDialog.open(options);
                }

            };
        }
        if (field2 != null && field2.editor)
        {
            field2.editor.onButtonClick = function ()
            {
                var dialog, combobox = this; 
                var combobox_url = this.get('host_form').getEditor("Url");
                var model = getUrlParm(combobox_url.getValue(), "model");
                if (!model) return;

                pbc.getFilterFields(model, function (filterFields)
                { 
                    var filterData;
                    var binStr = combobox.getValue();
                    if (binStr)
                    {
                        filterData = JSON.parse(new pbc.base64().decode(binStr));
                        if (filterData) filterData = filterData.filterData;
                    }
                    var jfilterpanel = $('<div class="filterpanel"></div>');
                    var jfilter = $('<div class="filter"></div>').appendTo(jfilterpanel);
                    dialog = $.ligerDialog.open({
                        target: jfilterpanel,
                        isHidden: true,
                        title: '设置过滤条件',
                        width: 500,
                        top: 80,
                        height: 'auto',
                        buttons: [
                          {
                              text: '确定', cls: 'l-dialog-btn-highlight',
                              onclick: function ()
                              {
                                  var data = filter.getData(); 

                                  combobox.setValue(new pbc.base64().encode(JSON.stringify({
                                      filterData: data
                                  })));
                                  dialog.close();
                              }
                          },
                          {
                              text: '取消',
                              onclick: function ()
                              {
                                  dialog.close();
                              }
                          }]
                    });

                    var fields = filterFields;
                    pbc.preEditor(fields, "fields");

                    fields.push({
                        name: "CreateUserID",
                        display: '(创建人)'
                    });
                    fields.push({
                        name: "ModifyUserID",
                        display: '(最后修改人)'
                    });
                    var status = pbc.web.status_items;

                    var status_data = [];
                    for (name in status)
                    {
                        var id = name;
                        id = id.substring(0, 1).toUpperCase() + id.substring(1).toLowerCase();

                        status_data.push({
                            text: status[name],
                            id: id
                        });
                    }
                    fields.push({
                        name: "Status",
                        type: 'select',
                        editor: {
                            data: status_data
                        },
                        display: '(工作流状态)'
                    });

                    $(fields).each(function ()
                    {
                        this.editor = this.editor || {};
                        this.editor.width = 150;
                    });
                    var filter = jfilter.ligerFilter({
                        fields: fields,
                        buttonCls: 'ne-button',
                        addDefult: true
                    });
                    if (filterData)
                    {
                        filter.setData(filterData);
                    } else
                    {
                        filter.addRule(jfilter.find("table:first"));
                    }
                });
                 

            };
        }
    });

}
