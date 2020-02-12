
(function ()
{
    if (pbc.web.designer && pbc.web.designer.editors)
    {
        pbc.web.designer.editors.modelFilterBuilder = {
            propertyFields: [
                {
                    name: 'cls',
                    label: 'css类',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                },
                {
                    name: 'isJson',
                    label: 'json形式', 
                    group: '扩展',
                    type: 'checkbox'
                },
                {
                    name: 'includeMyself', 
                    label: '包括自身',
                    width: 142,
                    group: '扩展',
                    type: 'checkbox'
                },

                {
                    name: 'modelField',
                    label: '模型字段名',
                    width: 142,
                    group: '扩展',
                    type: 'text'
                } 
            ]
        };
    }

    $.ligerDefaults.Form.editors['modelFilterBuilder'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            var creator = $('<div class="modelFilterBuilder"></div>');
            container.append(creator);
            var o = new modelFilterBuilder($.extend({
                renderTo: creator, 
                form : form 
            },editor));
            o.render();
            return o;
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


    
    var modelFilterBuilder = pbc.modelFilterBuilder = function(options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,
            pageHelper: null, 
            modelField : null,
            form : null,
            modelName: null,
            onChange: null
        }, options);
    };
    $.extend(modelFilterBuilder.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            var jfilterpanel = $('<div class="filterpanel"></div>').appendTo(p.renderTo);
            var jfilter = $('<div class="filter"></div>').appendTo(jfilterpanel);
            if (p.cls) jfilterpanel.addClass(p.cls);
            var modelName = p.modelName; 
            if ($.isFunction(modelName)) modelName = modelName.call(g, { form: p.form });
            
            if (p.modelField)
            {
                setTimeout(function ()
                {
                    var modelEditor = p.form.getEditor(p.modelField);
                    if (modelEditor)
                    {
                        modelName = modelEditor.getValue();
                        modelEditor.bind('changeValue', function (v)
                        {
                             
                            if (!modelName || modelName != v)
                            {
                                modelName = v;
                                load();
                            }
                        });
                        if (modelName)
                        {
                            load();
                        }
                    }
                }, 100);
            }
            if (modelName)
            {
                load();
            }

            function load()
            {
                pbc.getFilterFields(modelName, function (data)
                {
                    show(data);
                });
            }

            function show(filterFields)
            { 
                var fields = filterFields;
                pbc.preEditor(fields, "fields");

                if (!pbc.web.helper.first(fields, function (a) { return a.name == "CreateUserID"; }))
                {
                    fields.push({
                        name: "CreateUserID",
                        display: '(创建人)'
                    });
                    fields.push({
                        name: "ModifyUserID",
                        display: '(最后修改人)'
                    });
                }

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
                if (!pbc.web.helper.first(fields, function (a) { return a.name == "Status"; }))
                {
                    fields.push({
                        name: "Status",
                        type: 'select',
                        editor: {
                            data: status_data
                        },
                        display: '(工作流状态)'
                    });
                }
                $(fields).each(function ()
                {
                    this.editor = this.editor || {};
                    this.editor.width = 150;
                    if (!this.type || this.type == "text" || this.type == "string")
                    {
                        $.extend(this, {
                            type: 'ref_popupselect',
                            width : 200,
                            editor: {
                                width: 200,
                                type: 'ref_popupselect',
                                css: 'combobox-selector', 
                                textField: 'VariableName',
                                valueField: 'exp:"{"+row.VariableName +"}"',
                                isTextBoxMode: true,
                                popupselect_type: 'popupselect',
                                popupselect_url: 'web/main/?model=core_variables&viewtype=list',
                                popupselect_width: '800',
                                popupselect_height: '600',
                                popupselect_title: '选择系统变量 '
                            }
                        });

                    }
                });

                pbc.preEditor(fields, "fields");
                  
                g.filter = jfilter.ligerFilter({
                    fields: fields,
                    buttonCls: 'ne-button',
                    addDefult: true
                });
                if (g.data)
                {
                    g.filter.setData(g.data);
                } else
                {
                    g.filter.addRule(jfilter.find("table:first"));
                }
            }
        },

        setValue: function (data)
        {
            var g = this, p = this.options;
             
            g.data = data;
        },
        getValue: function ()
        {
            var g = this, p = this.options; 
            if (g.filter)
            {
                var data = g.filter.getData();
                g.data = $.extend(g.data, data);
            }
            return g.data;
        }
    });

})();