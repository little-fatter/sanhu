(function ()
{
    $.ligerDefaults.Form.editors['selectTreeCreator'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {}, form = this;
            var creator = $('<div class="selectTreeCreator"></div>');
            container.append(creator);
            var editor = new selectTreeCreator({
                renderTo: creator,
                form: form, 
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
        },
        resize: function (o, width, height, editParm)
        {
        }
    };

    var selectTreeCreator  = pbc.editors.selectTreeCreator = function (options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,  
            onChange: null
        }, options);
    };

    $.extend(selectTreeCreator.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            var jaddnew = $("<a class=' ne-button' style='padding: 3px;height: 20px; line-height: 20px;'>设置</a>");
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
                g.openSettingDialog();
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
            return g.data;
        },
        openSettingDialog: function ()
        {
            var g = this, p = this.options;
            var jform = $('<div style="margin:10px"></div>'), form;
            var d = $.ligerDialog.open({
                target: jform,
                isHidden: true,
                title: '配置树',
                width: 500,
                top: 80,
                height: 'auto',
                buttons: [
                  {
                      text: '确定', cls: 'l-dialog-btn-highlight',
                      onclick: function ()
                      {
                          var parms = form.getData();
                          g.data = g.data || {};
                          g.data.parms = g.data.parms || {};
                          $.extend(g.data.parms, parms);
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
            
            var formOptions = {
                fields: [ 
                    {
                        name: 'sourceModel',
                        type: 'string',
                        label: '数据源模型',
                        group: '一级数据源',
                        editor: {
                            onChangeValue: function (value)
                            {
                                form.getEditor("filter").setModel(value);
                            }
                        }
                    },
                    {
                        name: 'parentField',
                        type: 'string',
                        label: '父节点字段',
                        group: '一级数据源'
                    },
                    {
                        name: 'textField',
                        type: 'string',
                        label: '显示字段',
                        group: '一级数据源'
                    },
                    {
                        name: 'filter',
                        type: 'modelFilterCreator',
                        label: '过滤条件',
                        group: '一级数据源'
                    },
                    {
                        name: 'sourceModel2',
                        type: 'string',
                        label: '数据源模型',
                        group: '二级数据源',
                        editor: {
                            onChangeValue: function (value)
                            {
                                form.getEditor("filter2").setModel(value);
                            }
                        }
                    },
                    {
                        name: 'parentField2',
                        type: 'string',
                        label: '父节点字段',
                        group: '二级数据源'
                    },
                     {
                         name: 'refSourceField',
                         type: 'string',
                         label: '关联字段',
                         group: '二级数据源'
                     },
                    {
                        name: 'textField2',
                        type: 'string',
                        label: '显示字段',
                        group: '二级数据源'
                    },
                    {
                        name: 'filter2',
                        type: 'modelFilterCreator',
                        label: '过滤条件',
                        group: '二级数据源'
                    }
                ]
            };

            form = jform.ligerForm(formOptions);
             
            if (g.data && g.data.parms)
            {
                var parms = g.data.parms;
                form.setData(parms);

                if (parms.sourceModel)
                {
                    form.getEditor("filter").setModel(parms.sourceModel);
                }
                if (parms.sourceModel2)
                {
                    form.getEditor("filter2").setModel(parms.sourceModel2);
                }
            }
         
        }
    });


})();