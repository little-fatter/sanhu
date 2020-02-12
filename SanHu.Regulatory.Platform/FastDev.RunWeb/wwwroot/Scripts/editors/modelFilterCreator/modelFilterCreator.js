(function ()
{
    $.ligerDefaults.Form.editors['modelFilterCreator'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            var creator = $('<div class="modelFilterCreator"></div>');
            container.append(creator);
            var editor = new modelFilterCreator({
                renderTo: creator,
                form: form,
                model: editor.model,
                onButtonClick: editor.onButtonClick,
                onChange: editor.onChangeValue
            });
            editor.render();
            return editor;
        },
        getValue: function (o, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this; 

            var value = o.getValue();

            if (editor && editor.isJson && value)
            {
                value = JSON.stringify(value);
            }
            return value;
        },
        setValue: function (o, data, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            if (editor && editor.isJson && data)
            {
                o.setValue(JSON.parse(data));
            } else
            {
                o.setValue(data);
            }
            if (data && data.model)
            {
                o.setModel(data.model);
            }
        },
        resize: function (o, width, height, editParm)
        {
        }
    };

    var modelFilterCreator = pbc.editors.modelFilterCreator = function (options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,
            pageHelper: null,
            form: null,
            model: null,
            onChange: null
        }, options);
    };

    $.extend(modelFilterCreator.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            var jaddnew = $("<a class='addNewOption ne-button'>设置</a>");
            jaddnew.appendTo(p.renderTo);

            jaddnew.click(function ()
            {

                if (p.onButtonClick)
                {
                    p.onButtonClick(openSetting, g);
                } else
                {
                    openSetting();
                }
            });


            function openSetting()
            {
                if ($.isFunction(p.model))
                {
                    var model = p.model.call(g, {
                        form: p.form
                    });
                    g.setModel(model);
                }
                if (p.filterFields)
                {
                    g.openFilterCreator();
                }
                else if (p.model)
                {
                    pbc.getFilterFields(p.model, function (data)
                    {
                        p.filterFields = data;
                        g.openFilterCreator();
                    });
                }
            }

        },
        setModel: function (model)
        {
            var g = this, p = this.options;
            if (p.model != model)
            {
                p.filterFields = null;
            }
            p.model = model;
        },
        setValue: function (data)
        {
            var g = this, p = this.options;
            g.data = data;
        },
        getValue: function ()
        {
            var g = this, p = this.options;
            return g.data;
        },
        openFilterCreator: function ()
        {
            var g = this, p = this.options;
            var jfilterpanel = $('<div class="filterpanel"></div>');
            var jfilter = $('<div class="filter"></div>').appendTo(jfilterpanel);
            var d = $.ligerDialog.open({
                target: jfilterpanel,
                isHidden: true,
                title: '设置过滤器',
                width: 500,
                top: 80,
                height: 'auto',
                buttons: [
                  {
                      text: '确定', cls: 'l-dialog-btn-highlight',
                      onclick: function ()
                      {
                          var data = filter.getData();
                          g.data = $.extend(g.data, data);
                          if (p.onChange) p.onChange(g.data);
                          d.close();
                      }
                  },
                  {
                      text: '取消',
                      onclick: function ()
                      {
                          d.close();
                      }
                  }]
            });
            var fields = p.filterFields;
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
                    id: name.toLowerCase()
                });
            }
            fields.push({
                name: "Status",
                type: 'select',
                editor: {
                    type: 'select',
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
                addDefult: g.data ? false : true
            });
            if (g.data)
            {
                filter.setData(g.data);
            } else
            {
                filter.addRule(jfilter.find("table:first"));
            }
        }
    });


})();