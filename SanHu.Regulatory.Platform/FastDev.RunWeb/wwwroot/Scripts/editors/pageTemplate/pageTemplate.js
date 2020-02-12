(function ()
{ 
    $.ligerDefaults.Form.editors['pageTemplate'] = {
        create: function (container, editParm)
        {
            var field = editParm.field, editor = field.editor || {};
            var form = this;
            var creator = new pageTemplate({
                name: field.name,
                form: form,
                isListTemplate: editor.isListTemplate,
                isKanbanTemplate: editor.isKanbanTemplate,
                width: field.width - 2,
                renderTo: container
            });
            creator.render();
            return creator;
        },
        getValue: function (creator, editParm)
        {
            return creator.getValue();
        },
        setValue: function (creator, value, editParm)
        {
            creator.setValue(value);
        },
        resize: function (creator, width, height, editParm)
        {
        }
    };

    var pageTemplate = pbc.editors.pageTemplate = function (options)
    {
        var g = this;
        g.options = $.extend({
            renderTo: null,
            name: null,
            form: null,
            content: null,
            width: null,
            isKanbanTemplate: false,
            isListTemplate: false,
            modelName: null
        }, options);
    };

    $.extend(pageTemplate.prototype, {
        render: function ()
        {
            var g = this, p = this.options;
            g.field_loaded = false;
            g.init_loaded = false;
            var editorId = new Date().getTime() + p.name;
            $('<script type="text/plain" id="' + editorId + '"></script>').appendTo(p.renderTo);

            g.editorInit();

            var toolbars = [];

            if (!p.isKanbanTemplate)
            {
                toolbars.push(['fullscreen', 'source', 'undo', 'redo',
                  'bold',
                  'italic', //斜体
                  'underline', //下划线
                  'strikethrough', //删除线
                  'justifyleft', //居左对齐
                  'justifyright', //居右对齐
                  'justifycenter', //居中对齐
                  'justifyjustify', //两端对齐
                  'forecolor', //字体颜色
                  'backcolor', //背景色
                   'fontfamily', //字体
                  'fontsize', //字号
                  'paragraph', //段落格式
                   'lineheight',
                  '|',
                  'time', //时间
                  'date', //日期
                  'simpleupload', //单图上传
                   'insertimage', //多图上传
                   'attachment', //附件
                  'link', //超链接
                  'emotion', //表情
                  'spechars', //特殊字符

                ]);
            } else
            {
                toolbars.push(['fullscreen', 'source', 'undo', 'redo',
                  'bold',
                  'italic', //斜体
                  'underline', //下划线
                  'strikethrough', //删除线
                  'justifyleft', //居左对齐
                  'justifyright', //居右对齐
                  'justifycenter', //居中对齐
                  'justifyjustify', //两端对齐
                  'forecolor', //字体颜色
                  'backcolor', //背景色
                   'lineheight',
                  '|',
                  'time', //时间
                  'date', //日期
                  'simpleupload', //单图上传
                  'link', //超链接
                  'emotion', //表情
                  'spechars' //特殊字符
                ]);
            }
            if (!p.isKanbanTemplate)
            {
                toolbars.push([
                      'superscript', 'subscript', 'removeformat', 'formatmatch',
                      'autotypeset', 'blockquote', 'pasteplain', '|', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc',
                       '|',
                      'edittd',  //单元格属性
                      'inserttable', //插入表格
                      'insertrow', //前插入行
                      'insertcol', //前插入列
                      'mergeright', //右合并单元格
                      'mergedown', //下合并单元格
                      'deleterow', //删除行
                      'deletecol', //删除列
                      'splittorows', //拆分成行
                      'splittocols', //拆分成列
                      'splittocells', //完全拆分单元格
                      'deletecaption', //删除表格标题
                      'inserttitle', //插入标题
                      'mergecells', //合并多个单元格
                      '|',
                      'scrawl', //涂鸦
                      'music', //音乐 
                      '|',
                      'print', //打印 
                ]);
            } else
            {
                toolbars.push([
                      'superscript', 'subscript', 'removeformat', 'formatmatch',
                      'autotypeset', 'blockquote', 'pasteplain', '|', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc'
                ]);
            }
            //不做任何的过滤
            UE.plugins['defaultfilter'] = function () { };

            var ue = UE.getEditor(editorId, {
                //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
                toolbars: toolbars,
                //focus时自动清空初始化时的内容
                autoClearinitialContent: true,
                //关闭字数统计
                wordCount: false,
                //关闭elementPath
                elementPathEnabled: false,
                //默认的编辑区域高度
                initialFrameHeight: 480,
                //更多其他参数，请参考ueditor.config.js中的配置项
                serverUrl: '/Contents/UE/Controller.ashx'
            });
            ue.addListener('ready', function (editor)
            {
                p.renderTo.width('auto').addClass("uiedtior-li");
                g.ueReady = true;
                if (p.content)
                {
                    g.setValue(p.content);
                }
            });



            g.editor = ue;
        },
        editorInit: function ()
        {
            var g = this, p = this.options;
            g.lastConfig = {
                rowSize: 3
            };
            UE.registerUI('PrintInit AddField', function (editor, uiName)
            {
                var title = "";
                if (uiName == "AddField")
                {
                    title = "插入字段";
                }
                else if (uiName == "PrintInit")
                {
                    title = "自动设置模板";
                }
                //创建一个button
                var btn = new UE.ui.Button({
                    name: uiName,
                    title: title,
                    //点击时执行的命令
                    onclick: function ()
                    {
                        if (uiName == "AddField")
                        {
                            g.addField();
                        }
                        else if (uiName == "PrintInit")
                        {
                            g.printInit();
                        }
                    }
                });
                return btn;
            });

            $(document).bind('click', function (e)
            {
                if (!g.jmenu) return;
                var jthis = $((e.target || e.srcElement));
                if (jthis.closest(".addfield-menus,.cke_button__addfield").length == 0)
                {
                    g.jmenu.hide();
                }
            });
        },

        getFormModelName: function ()
        {
            var g = this, p = this.options;
            var editor = p.form.getEditor("ModelName");
            if (!editor) return null;
            return editor.getValue();
        },
 
        printInit: function ()
        {
            var g = this, p = this.options;

            var modelName = g.getFormModelName() || g.modelName;
            g.setModelName(modelName);


            if (!modelName) return; 
            g.fields_detail = g.fields_detail || [];

            if (!g.init_loaded)
            {
                pbc.ajax({
                    url: pbc.toUrl('web/ModelDataset/'),
                    data: {
                        modelName: modelName
                    },
                    success: function (r)
                    {
                        if (r.statusCode == "2") //应用级错误
                        {
                            pbc.tips({ type: 2, content: r.message });
                            return;
                        } else if (r.statusCode == "3") //系统级错误
                        {
                            pbc.showError(r.message);
                            return;
                        }
                        g.dataset = r.data;
                        var fields = [];
                        $(g.dataset.fields).each(function ()
                        {
                            fields.push(this);
                        });
                        $(pbc.web.sysFields).each(function ()
                        {
                            fields.push(this);
                        }); 
                        $(g.dataset.fields).each(function ()
                        {
                            if (this.type == "one2many")
                            {
                                g.fields_detail.push(this);
                            } 
                        });
                        
                        g.fields = fields;
                         
                        runShow();
                        g.init_loaded = true;
                    }
                });
            } else
            {
                runShow()
            }

            function runShow()
            {
                if (p.isKanbanTemplate)
                {
                    show_kanbanTemplate();
                } else
                {
                    pbc.web.loader(['grid'], function ()
                    {
                        show();
                    });
                }
            }
            function show_kanbanTemplate()
            {
                var jform = $("<div style='margin:9px;'></div>");
                var form;
                var win = $.ligerDialog.open({
                    target: jform,
                    isHidden: true,
                    title: '自动设置模板',
                    top: 100,
                    width: 450,
                    height: 'auto',
                    buttons: [
                        {
                            text: '确定', cls: 'l-dialog-btn-highlight',
                            onclick: function ()
                            {
                                g.lastConfig = form.getData();
                                g.createTempate_Kanban(g.lastConfig);
                                win.close();
                            }
                        },
                        {
                            text: '取消',
                            onclick: function ()
                            {
                                win.close();
                            }
                        }
                    ]
                });
                var fields_show = [];
                $(g.dataset.fields).each(function ()
                {
                    if (this.type != "one2many")
                    {
                        fields_show.push(this);
                    }
                });
                $(pbc.web.sysFields).each(function ()
                {
                    fields_show.push(this);
                });

                form = jform.ligerForm({
                    fields: [
                        {
                            name: 'imageField',
                            label: '图像字段',
                            type: 'select',
                            width: 280,
                            editor: {
                                data: fields_show,
                                cancelable: true,
                                valueField: 'name',
                                textField: 'title'
                            }
                        },
                        {
                            name: 'titleField',
                            label: '标题字段',
                            type: 'select',
                            width: 280,
                            editor: {
                                data: fields_show,
                                cancelable: true,
                                valueField: 'name',
                                textField: 'title'
                            }
                        },
                        {
                            name: 'textFields',
                            label: '显示字段',
                            type: 'select',
                            width: 280,
                            editor: {
                                data: fields_show,
                                isMultiSelect: true,
                                isShowCheckBox: true,
                                valueField: 'name',
                                textField: 'title'
                            }
                        },
                        {
                            name: 'emailFields',
                            label: 'Email字段',
                            type: 'select',
                            width: 280,
                            editor: {
                                isMultiSelect: true,
                                isShowCheckBox: true,
                                valueField: 'name',
                                textField: 'title'
                            }
                        },
                        {
                            name: 'linkFields',
                            label: '链接字段',
                            type: 'select',
                            width: 280,
                            editor: {
                                data: fields_show,
                                isMultiSelect: true,
                                isShowCheckBox: true,
                                valueField: 'name',
                                textField: 'title'
                            }
                        }
                    ]
                });
                form.setData(g.lastConfig);
            }
            function show()
            { 
                var currentContent = g.editor.getContent();
                var regResult = /data-config="(.*?)"/.exec(currentContent);
                var configCode = regResult ? regResult[1] : null;
                if (configCode)
                {
                    g.lastConfig = JSON.parse(new pbc.base64().decode(configCode));
                }
                 
                var jpanel = $("<div style='margin:9px;'></div>");
                var jform1 = $("<div></div>").appendTo(jpanel).show();
                var jform2 = $("<div></div>").appendTo(jpanel).hide();
                var jform3 = $("<div></div>").appendTo(jpanel).hide();
                var form1, form2, form3;
                var currentSetup = 1;
                var setupTitles = ["1,全局设置", "2,设置字段", "3,设置明细表格"];
                var win = $.ligerDialog.open({
                    target: jpanel,
                    isHidden: true,
                    title: '1,全局设置',
                    top: 100,
                    width: 900,
                    height: 400,
                    buttons: [
                        {
                            text: '下一步', cls: 'l-dialog-btn-highlight',
                            onclick: function ()
                            {
                                
                                function createConfig()
                                {
                                    var config = {
                                        title: g.lastConfig.title,
                                        rowSize: g.lastConfig.rowSize,
                                        rownumbers: g.lastConfig.rownumbers,
                                        isShowSign: g.lastConfig.isShowSign,
                                        showTotal1: g.lastConfig.showTotal1,
                                        showTotal2: g.lastConfig.showTotal2,
                                        showPage: g.lastConfig.showPage,
                                        showDetail: g.lastConfig.showDetail,
                                        pagePosLeft: g.lastConfig.pagePosLeft,
                                        pagePosRight: g.lastConfig.pagePosRight,
                                        pagePosTop: g.lastConfig.pagePosTop,
                                        pagePosBottom: g.lastConfig.pagePosBottom,
                                        fieldDetail : g.lastConfig.fieldDetail,
                                        signFields: g.lastConfig.signFields,
                                        fields: [], 
                                        detailFields: []
                                    };
                                    if (g.lastConfig.fields && g.lastConfig.fields.length)
                                    {
                                        for (var i = 0; i < g.lastConfig.fields.length; i++)
                                        {
                                            if (g.lastConfig.fields[i].name)
                                            {
                                                config.fields.push(g.lastConfig.fields[i]);
                                            }
                                        }
                                    }

                                    if (g.lastConfig.detailFields && g.lastConfig.detailFields.length)
                                    {
                                        for (var i = 0; i < g.lastConfig.detailFields.length; i++)
                                        {
                                            if (g.lastConfig.detailFields[i].name)
                                            {
                                                config.detailFields.push(g.lastConfig.detailFields[i]);
                                            }
                                        }
                                    }
                                    return config;
                                }

                                
                                if (currentSetup == 3)
                                { 
                                    var data = form3.getData();
                                    $.extend(g.lastConfig, data);

                                    var config = createConfig();
    
                                     
                                    if (p.isListTemplate)
                                    {
                                        g.createTempate_List(config);
                                    } else if (p.isKanbanTemplate)
                                    {
                                        g.createTempate_Kanban(config);
                                    } else
                                    {
                                        g.createTempate_Detail(config);
                                    }
                                    win.close();
                                    return;
                                } else if (currentSetup == 2)
                                {
                                     
                                    var data = form2.getData();
                                    $.extend(g.lastConfig, data);
                                    

                                    if (p.isListTemplate)
                                    {
                                        var config = createConfig();
                                        g.createTempate_List(config);
                                        win.close();
                                        return;
                                    } else if (p.isKanbanTemplate)
                                    {
                                        var config = createConfig();
                                        g.createTempate_Kanban(config);
                                        win.close();
                                        return;
                                    }

                                    //else if (!g.lastConfig.fieldDetail)
                                    //{
                                    //    var config = createConfig();
                                    //    g.createTempate_Kanban(config);
                                    //    win.close();
                                    //    return;
                                    //}
                             
                                    else
                                    {
                                        var config = createConfig();
                                        g.createTempate_Detail(config);
                                        win.close();
                                        return;
                                    }

                                    $(".l-dialog-btn-highlight", win.element).html("完成");

                                    jform2.hide();
                                    jform3.show();
                                } else if (currentSetup == 1)
                                {
                                    var data = form1.getData();
                                    
                                    $.extend(g.lastConfig, data);
                                    jform1.hide();
                                    jform2.show();

                                    if (p.isListTemplate || p.isKanbanTemplate)
                                    {
                                        $(".l-dialog-btn-highlight", win.element).html("完成");
                                    }
                                }

                                currentSetup++;
                                $(".l-dialog-title", win.element).html(setupTitles[currentSetup - 1]);
                            }
                        },
                        {
                            text: '取消',
                            onclick: function ()
                            {
                                win.close();
                            }
                        }
                    ]
                });

                if (g.lastConfig)
                {
                    setTimeout(function ()
                    {
                        form1.setData({
                            title: g.lastConfig.title,
                            rowSize: g.lastConfig.rowSize,
                            fieldDetail: g.lastConfig.fieldDetail,
                            signFields: g.lastConfig.signFields,
                            rownumbers: g.lastConfig.rownumbers,
                            isShowSign: g.lastConfig.isShowSign,
                            showTotal1: g.lastConfig.showTotal1,
                            showTotal2: g.lastConfig.showTotal2,
                            showPage: g.lastConfig.showPage,
                            showDetail: g.lastConfig.showDetail,
                            pagePosLeft: g.lastConfig.pagePosLeft,
                            pagePosRight: g.lastConfig.pagePosRight,
                            pagePosTop: g.lastConfig.pagePosTop,
                            pagePosBottom: g.lastConfig.pagePosBottom
                        });

                        if (g.lastConfig.fields && g.lastConfig.fields.length)
                        {
                            form2.setData({
                                fields: g.lastConfig.fields
                            });
                        }

                        if (g.lastConfig.detailFields && g.lastConfig.detailFields.length && g.lastConfig.detailFields[0].name)
                        {
                            form3.setData({
                                detailFields: g.lastConfig.detailFields
                            });
                        }
                    }, 100);
                }

                var fields_detail = [
                            {
                                name: 'title',
                                label: '标题',
                                labelWidth: 120,
                                width: 350,
                                type: 'text'
                            },
                            {
                                name: 'rowSize',
                                value: 3,
                                labelWidth: 120,
                                label: '每行显示元素数目',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'fieldDetail',
                                label: '明细字段',
                                newline: false,
                                type: 'select',
                                width: 140,
                                editor: {
                                    data: g.fields_detail,
                                    valueField: 'name',
                                    textField: 'title' 
                                }
                            },
                             {
                                 name: 'signFields',
                                 label: '签名字段',
                                 newline: true,
                                 type: 'select',
                                 width: 350,
                                 labelWidth: 120,
                                 editor: {
                                     data: g.dataset.fields,
                                     isMultiSelect : true,
                                     valueField: 'name',
                                     textField: 'title'
                                 }
                             },
                            {
                                name: 'rownumbers',
                                labelWidth: 120,
                                label: '显示序列',
                                type: 'checkbox'
                            },
                            {
                                name: 'isShowSign',
                                newline: false,
                                labelWidth: 120,
                                label: '显示签名',
                                type: 'checkbox'
                            },
                            {
                                name: 'showTotal1',
                                labelWidth: 120,
                                newline: false,
                                label: '显示统计行',
                                type: 'checkbox'
                            },
                            {
                                name: 'showTotal2',
                                labelWidth: 120,
                                newline: false,
                                label: '显示总统计行',
                                type: 'checkbox'
                            },
                            {
                                name: 'showDetail',
                                labelWidth: 120,
                                newline: false,
                                label: '显示网格',
                                type: 'checkbox'
                            },
                            {
                                name: 'showPage',
                                labelWidth: 120,
                                newline: false,
                                label: '显示页码',
                                type: 'checkbox'
                            },
                            {
                                name: 'pagePosLeft',
                                labelWidth: 120,
                                label: '页码靠左',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosRight',
                                labelWidth: 120,
                                newline: false,
                                label: '页码靠右',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosTop',
                                labelWidth: 120,
                                label: '页码靠上',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosBottom',
                                labelWidth: 120,
                                newline: false,
                                label: '页码靠下',
                                width: 80,
                                type: 'text'
                            }

                ];
                var fields_list = [
                            {
                                name: 'title',
                                label: '标题',
                                labelWidth: 120,
                                width: 350,
                                type: 'text'
                            },
                            {
                                name: 'showTotal1',
                                labelWidth: 120,
                                newline: true,
                                label: '显示统计行',
                                type: 'checkbox'
                            },
                            {
                                name: 'showTotal2',
                                labelWidth: 120,
                                newline: true,
                                label: '显示总统计行',
                                type: 'checkbox'
                            }, 
                            {
                                name: 'showPage',
                                labelWidth: 120,
                                newline: true,
                                label: '显示页码',
                                type: 'checkbox'
                            },
                            {
                                name: 'pagePosLeft', newline: true,
                                labelWidth: 120,
                                label: '页码靠左',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosRight',
                                labelWidth: 120,
                                newline: false,
                                label: '页码靠右',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosTop',
                                labelWidth: 120,
                                label: '页码靠上',
                                width: 80,
                                type: 'text'
                            },
                            {
                                name: 'pagePosBottom',
                                labelWidth: 120,
                                newline: false,
                                label: '页码靠下',
                                width: 80,
                                type: 'text'
                            }

                ];


                form1 = jform1.ligerForm({
                    fields: p.isListTemplate ? fields_list : fields_detail
                });
                
                var form2_options = {
                    fields: [
                            {
                                name: 'fields',
                                hideLabel: true,
                                width: 780,
                                editor: {
                                    addInAfter: true,
                                    modeType: 'editgrid',
                                    grid: {
                                        columns: [
                                            {
                                                display: '变量名', name: 'name', width: 120, align: 'left', editor: {
                                                    type: "ref_popupselect",
                                                    isTextBoxMode: true,
                                                    valueField: "ID",
                                                    sourceFilter: null,
                                                    textField: "FieldName",
                                                    css: "combobox-selector",
                                                    select_updatematch_source: 'FieldTitle',
                                                    select_updatematch_target: 'label',
                                                    popupselect_ismul: true,
                                                    popupselect_type: "popupselect",
                                                    popupselect_width: "900",
                                                    popupselect_height: "600",
                                                    popupselect_title: "选择： 模型字段",
                                                    popupselect_url: function ()
                                                    {
                                                        if (!modelName) return false;

                                                        var url = "/web/main/?model=core_modelfield&viewtype=list";
                                                        bindStr = new pbc.base64().encode(JSON.stringify({
                                                            filterData: {
                                                                groups: [],
                                                                op: 'and',
                                                                rules: [
                                                                    { field: 'ModelName', value: modelName, op: 'equal' }
                                                                ]
                                                            }
                                                        }));
                                                        return url + "&bind=" + bindStr;
                                                    }
                                                }
                                            },
                                            { display: '显示名', name: 'label', width: 120, align: 'left', editor: { type: 'text' } },
                                            {
                                                display: '格式化', name: 'format', textField: 'format_text', align: 'left', width: 120, editor: {
                                                    type: 'select',
                                                    valueField: 'format',
                                                    textField: 'format',
                                                    css: 'combobox-selector',
                                                    onButtonClick: function ()
                                                    {
                                                        showFormatDesigner(this, form2.getEditor("fields"));
                                                    }
                                                }
                                            },
                                           {
                                               display: '样式', name: 'style', textField: 'style_text', align: 'left', width: 120, editor: {
                                                   type: 'select',
                                                   valueField: 'style',
                                                   textField: 'style',
                                                   css: 'combobox-selector',
                                                   onButtonClick: function ()
                                                   {
                                                       showStyleDesigner(this, form2.getEditor("fields"));
                                                   }
                                               }
                                           }
                                        ],
                                        data: {
                                            Records: [{}]
                                        },
                                        enabledEdit: true,
                                    }
                                },
                                type: 'grid'
                            }
                    ]
                };
  
                if (p.isListTemplate || p.isKanbanTemplate)
                {
                    form2_options.fields[0].editor.grid.columns.push({
                        display: '合计1', name: 'total1', type: 'checkbox', width: 60, align: 'left', editor: {
                            type: 'checkbox'
                        }
                    });

                    form2_options.fields[0].editor.grid.columns.push({
                        display: '合计2', name: 'total2', type: 'checkbox', width: 60, align: 'left', editor: {
                            type: 'checkbox'
                        }
                    });
                }

                pbc.preEditor(form2_options.fields[0].editor.grid.columns, "columns");
                
                form2 = jform2.ligerForm(form2_options);

                var form3_options = {
                    fields: [
                            {
                                name: 'detailFields',
                                hideLabel: true,
                                width: 860,
                                editor: {
                                    addInAfter: true,
                                    modeType: 'editgrid',
                                    grid: {
                                        columns: [
                                            {
                                                display: '变量名', name: 'name', width: 120, align: 'left', editor: {
                                                    type: "ref_popupselect",
                                                    isTextBoxMode: true,
                                                    valueField: "ID",
                                                    sourceFilter: null,
                                                    textField: "FieldName",
                                                    css: "combobox-selector",
                                                    select_updatematch_source: 'FieldTitle',
                                                    select_updatematch_target: 'label',
                                                    popupselect_ismul: true,
                                                    popupselect_type: "popupselect",
                                                    popupselect_width: "900",
                                                    popupselect_height: "600",
                                                    popupselect_title: "选择： 模型字段",
                                                    popupselect_url: function ()
                                                    {
                                                        if (!g.lastConfig.fieldDetail) return false;
                                                        var modelName = null;
                                                        for (var i = 0; i < g.fields_detail.length; i++)
                                                        {
                                                            if (g.fields_detail[i].name == g.lastConfig.fieldDetail)
                                                            { 
                                                                modelName = g.fields_detail[i].relationModel;
                                                                break;
                                                            }
                                                        }
                                                        if (!modelName) return false;
                                                        var url = "/web/main/?model=core_modelfield&viewtype=list";
                                                        bindStr = new pbc.base64().encode(JSON.stringify({
                                                            filterData: {
                                                                groups: [],
                                                                op: 'and',
                                                                rules: [
                                                                    { field: 'ModelName', value: modelName, op: 'equal' }
                                                                ]
                                                            }
                                                        }));
                                                        return url + "&bind=" + bindStr;
                                                    }
                                                }
                                            },
                                            { display: '显示名', name: 'label', width: 100, align: 'left', editor: { type: 'text' } },
                                            {
                                                display: '格式化', name: 'format', textField: 'format_text', align: 'left', width: 120, editor: {
                                                    type: 'select',
                                                    valueField: 'format',
                                                    textField: 'format',
                                                    css: 'combobox-selector',
                                                    onButtonClick: function ()
                                                    {
                                                        showFormatDesigner(this, form3.getEditor("detailFields"));
                                                    }
                                                }
                                            },
                                             {
                                                 display: '对齐方式', name: 'align', textField: 'align_text', width: 90, align: 'left', editor: {
                                                     type: 'select',
                                                     data: [
                                                         { id: 'left', text: '左对齐' },
                                                         { id: 'center', text: '居中对齐' },
                                                         { id: 'right', text: '右对齐' }
                                                     ]
                                                 }
                                             },
                                            {
                                                display: '宽度', name: 'width', width: 90, align: 'left', editor: {
                                                    type: 'text'
                                                }
                                            },
                                           {
                                               display: '样式', name: 'style', textField: 'style_text', align: 'left', width: 120, editor: {
                                                   type: 'select',
                                                   valueField: 'style',
                                                   textField: 'style',
                                                   css: 'combobox-selector',
                                                   onButtonClick: function ()
                                                   {
                                                       showStyleDesigner(this, form3.getEditor("detailFields"));
                                                   }
                                               }
                                           },
                                           {
                                               display: '合计1', name: 'total1', type: 'checkbox', width: 60, align: 'left', editor: {
                                                   type: 'checkbox'
                                               }
                                           },
                                            {
                                                display: '合计2', name: 'total2', type: 'checkbox', width: 60, align: 'left', editor: {
                                                    type: 'checkbox'
                                                }
                                            }
                                        ],
                                        data: {
                                            Records: [{}]
                                        },
                                        enabledEdit: true
                                    }
                                },
                                type: 'grid'
                            }
                    ]
                };
                pbc.preEditor(form3_options.fields[0].editor.grid.columns, "columns");
                
                form3 = jform3.ligerForm(form3_options);

                setTimeout(function ()
                {
                    
                    var grid = form3.getEditor("detailFields"); 
                    //grid.set('data', { Records: [{}] });

                }, 100);

            } 

        },

        addField: function ()
        {
            var g = this, p = this.options;
  
            var modelName = g.getFormModelName() || g.modelName;

            var jform = $("<div style='margin:9px;'></div>");
            var form;
            var win = $.ligerDialog.open({
                target: jform,
                isHidden: true,
                title: '插入字段',
                top: 100,
                width: 430,
                height: 'auto',
                buttons: [
                    {
                        text: '确定', cls: 'l-dialog-btn-highlight',
                        onclick: function ()
                        {
                            var field = form.getData();

                            if (field.name)
                            {
                                var insertHtml = [];
                                if (field.isAbsolute)
                                {
                                    var abStyle = "position: absolute;";
                                    if (field.top) abStyle = abStyle + "top:" + field.top + "px;";
                                    if (field.bottom) abStyle = abStyle + "bottom:" + field.bottom + "px;";
                                    if (field.left) abStyle = abStyle + "left:" + field.left + "px;";
                                    if (field.right) abStyle = abStyle + "right:" + field.right + "px;";
                                    insertHtml.push('<div style="' + abStyle + '">');
                                }
                                if (field.style)
                                {
                                    insertHtml.push('<span style="' + field.style + '">');
                                }
                                insertHtml.push(g.getExp(field));
                                if (field.style)
                                {
                                    insertHtml.push('</span>');
                                }
                                if (field.isAbsolute)
                                {
                                    insertHtml.push('</div>');
                                }
                                g.editor.execCommand('insertHtml', insertHtml.join(''));
                            }
                            win.close();
                        }
                    }
                ]
            });

            var formOp = {
                fields: [
                    {
                        label: '变量名', name: 'name', width: 220, align: 'left', type: 'ref_popupselect', editor: {
                            type: "ref_popupselect",
                            isTextBoxMode: true,
                            valueField: "FieldName",
                            sourceFilter: null,
                            textField: "FieldName",
                            css: "combobox-selector",
                            select_updatematch_source: 'FieldTitle',
                            select_updatematch_target: 'label',
                            popupselect_ismul: true,
                            popupselect_type: "popupselect",
                            popupselect_width: "900",
                            popupselect_height: "600",
                            popupselect_title: "选择： 模型字段",
                            popupselect_url: function ()
                            {
                                if (!modelName) return false;
                                var url = "/web/main/?model=core_modelfield&viewtype=list";
                                bindStr = new pbc.base64().encode(JSON.stringify({
                                    filterData: {
                                        groups: [],
                                        op: 'and',
                                        rules: [
                                            { field: 'ModelName', value: modelName, op: 'equal' }
                                        ]
                                    }
                                }));
                                return url + "&bind=" + bindStr;
                            }
                        }
                    },
                    {
                        label: '格式化', name: 'format', textField: 'format_text', align: 'left', width: 120, type: 'select', editor: {

                            css: 'combobox-selector',
                            onButtonClick: function ()
                            {
                                showFormatDesigner(this);
                            }
                        }
                    },
                    {
                        label: '样式', name: 'style', textField: 'style_text', align: 'left', width: 220, type: 'select', editor: {
                            valueField: 'style',
                            textField: 'style',
                            css: 'combobox-selector',
                            onButtonClick: function ()
                            {
                                showStyleDesigner(this);
                            }
                        }
                    },
                    {
                        name: 'isAbsolute',
                        newline: false,
                        label: '绝对定位',
                        type: 'checkbox'
                    },
                    {
                        name: 'left',
                        label: '左',
                        width: 50,
                        type: 'text'
                    },
                    {
                        name: 'right',
                        newline: false,
                        label: '右',
                        width: 50,
                        type: 'text'
                    },
                    {
                        name: 'top',
                        label: '上',
                        width: 50,
                        type: 'text'
                    },
                    {
                        name: 'bottom',
                        newline: false,
                        label: '下',
                        width: 50,
                        type: 'text'
                    }
                ]
            };
            pbc.preEditor(formOp.fields, "fields");


            form = jform.ligerForm(formOp);
        },


        //getExp: function (field)
        //{
        //    var exp = "{";
        //    exp += field.name;
        //    var types = {
        //        boolean: "YN",
        //        datetime: "yyyy-MM-dd hh:mm",
        //        float: "N2",
        //        integer: "d"
        //    };
        //    if (types[field.type])
        //    {
        //        exp += ":" + types[field.type];
        //    }
        //    exp += "}";
        //    return exp;
        //},

        getExp: function (field)
        {
            var exp = "{";
            exp += field.name;
            if (field.format && field.format != " ")
            {
                exp += ":" + field.format;
            }
            exp += "}";

            if (field.format == "bar")
            {
                return '<img style="" src="/Contents/handler/BarCodeHandler.ashx?code=' + exp + '"/>';
            }
            if (field.format == "qr")
            {
                return '<img style="" src="/Contents/handler/QrCodeHandler.ashx?e=Medium&q=Two&s=4&t=' + exp + '"/>';
            }
            return exp;
        },


        createTempate_Kanban: function (config)
        {
            var g = this, p = this.options;
            var h = [];
            var rowSize = parseInt(config.rowSize || 3);
            var cellLength = rowSize * 2;
            var configCode = new pbc.base64().encode(JSON.stringify(config));



            var textFields = (config.textFields || "").split(';');
            var emailFields = (config.emailFields || "").split(';');
            var linkFields = (config.linkFields || "").split(';');

            h.push('<div class="kanban-item">');
            h.push('<input class="configcode" type="hidden" data-config="' + configCode + '" />');
            var detailsHtml = ['<div class="kanban-details">'];
            var field, j;
            if (config.imageField)
            {
                h.push('<div class="kanaban-imagepanel">');
                h.push('<a class="kanaban-action" data-id="{ID}">');
                h.push('<img class="kanaban-image" src="{' + config.imageField + '}" />');
                h.push('</a>');
                h.push('</div>');
            }
            if (config.titleField)
            {
                detailsHtml.push('<h4><a  data-id="{ID}">{' + config.titleField + '}<a></h4>');
            }
            if (textFields.length)
            {
                for (var j = 0; j < textFields.length; j++)
                {
                    var fieldName = textFields[j];
                    var field = pbc.web.helper.first(g.fields, function (a)
                    {
                        return a.name == fieldName;
                    });
                    if (!field) continue;
                    detailsHtml.push('<div style="{' + field.name + ':visual}">');
                    detailsHtml.push(field.title + "：");
                    detailsHtml.push(g.getExp(field));
                    detailsHtml.push('</div>');
                }
            }
            if (emailFields.length)
            {
                for (var j = 0; j < emailFields.length; j++)
                {
                    var fieldName = emailFields[j];
                    if (!fieldName) continue;
                    detailsHtml.push('<a href="mailto:{' + fieldName + '}">{' + fieldName + '}</a>');
                }
            }
            if (linkFields.length)
            {
                for (var j = 0; j < linkFields.length; j++)
                {
                    var fieldName = linkFields[j];
                    if (!fieldName) continue;
                    detailsHtml.push('<a href="{' + fieldName + '}">{' + fieldName + '}</a>');
                }
            }
            detailsHtml.push('</div>');
            h.push(detailsHtml.join(''));
            h.push('</div>'); 
            g.editor.setContent(h.join(''));
        },

        createTempate_List: function (config)
        {
            var g = this, p = this.options;
            var h = [];
            var rowSize = parseInt(config.rowSize || 3);
            var cellLength = rowSize * 2;
            var configCode = new pbc.base64().encode(JSON.stringify(config));

            h.push('<input type="hidden" data-config="' + configCode + '" />');

            if (config.showPage)
            {
                var pageStyle = "position: absolute;color: rgb(171, 168, 168);";
                if (config.pagePosTop) pageStyle = pageStyle + "top:" + config.pagePosTop + "px;";
                if (config.pagePosBottom) pageStyle = pageStyle + "bottom:" + config.pagePosBottom + "px;";
                if (config.pagePosLeft) pageStyle = pageStyle + "left:" + config.pagePosLeft + "px;";
                if (config.pagePosRight) pageStyle = pageStyle + "right:" + config.pagePosRight + "px;";
                h.push('<div style="' + pageStyle + '">{#page}/{#pagecount}</div>');
            }

            h.push('<h2 style="text-align: center;">' + config.title + '</h2>');

            h.push('<p style="line-height: 0.4em;"><br/></p>');


            h.push('<table class="ne-report-detail" cellpadding="3" cellspacing="0" border="0" >');

            var headerCellTemp = [], contentCellTemp = [];
            if (config.rownumbers)
            {
                headerCellTemp.push('<td  align="center"><span style="font-size: 14px;"><strong>序号</strong></span></td>');
                contentCellTemp.push('<td  align="center">{rownumbers}</td>');
            } 
            var fields = config.fields;
 
            for (var i = 0; i < config.fields.length; i++)
            { 
                var field = config.fields[i];
                if (!field) continue;
                headerCellTemp.push('<td  align="center">');
                headerCellTemp.push('<span style="font-size: 14px;"><strong>');
                headerCellTemp.push(field.label);
                headerCellTemp.push('</span></strong>');
                headerCellTemp.push('</td>');
                if (field.type == "integer" || field.type == "float")
                {
                    contentCellTemp.push('<td align="right">');
                } else
                {
                    contentCellTemp.push('<td align="left">');
                }
                contentCellTemp.push(g.getExp(field));
                contentCellTemp.push('</td>');
            }
            h.push('<tr class="header">');
            headerCellTemp[0] = '<td class="firstcell" ' + headerCellTemp[0].substr(3);
            h.push(headerCellTemp.join(''));
            h.push('</tr>');
           
            h.push(' <!--START-->');
            h.push('<tr class="row" data-field="' + config.fieldDetail + '">');
            contentCellTemp[0] = '<td class="firstcell" ' + contentCellTemp[0].substr(3);
            h.push(contentCellTemp.join(''));
            h.push('</tr>');
            h.push(' <!--END-->');
            //合计一：
            if (config.showTotal1)
            {
                h.push('<tr class="total">');
                contentCellTemp = [];
                if (config.rownumbers)
                {
                    contentCellTemp.push('<td align="right"></td>');
                } 
                for (var i = 0; i < config.fields.length; i++)
                {
                    var field = config.fields[i];
                    if (!field) continue;
                    contentCellTemp.push('<td');
                    if (i == 0)
                    {
                        contentCellTemp.push(' align="right"');
                    }
                    contentCellTemp.push('>');
                    if (i == 0)
                    {
                        contentCellTemp.push('<strong>合计：</strong>');
                    }
                    if (field.total1)
                    {
                        contentCellTemp.push('{sum,' + field.name + ':N2}');
                    }
                    contentCellTemp.push('</td>');
                }
                contentCellTemp[0] = '<td class="firstcell" ' + contentCellTemp[0].substr(3);
                h.push(contentCellTemp.join(''));
                h.push('</tr>');
            }
            //合计二：
            if (config.showTotal2)
            {
                var field = pbc.web.helper.first(config.fields, function (a)
                {
                    return a.total2 ? true : false;
                });
                if (field)
                {
                    h.push(' <tr class="total">');
                    h.push('   <td class="firstcell" colspan="' + (cellLength + (config.rownumbers ? 1 : 0)) + '" style="text-align:left">');
                    h.push('<strong>合计 金额大写：</strong>  {sum,' + field.name + ':rmb}');
                    h.push('   </td>');
                    h.push(' </tr>');
                }
            }
            h.push('</table>');
            h.push('<p style="line-height: 0.4em;"><br/></p>');
            g.editor.setContent(h.join(''));
        },

        createTempate_Detail: function (config)
        {
            var g = this, p = this.options;
            var h = [];
            var rowSize = parseInt(config.rowSize || 3);
            var cellLength = rowSize * 2;
            var configCode = new pbc.base64().encode(JSON.stringify(config));

            h.push('<input type="hidden" data-config="' + configCode + '" />');

            if (config.showPage)
            {
                var pageStyle = "position: absolute;color: rgb(171, 168, 168);";
                if (config.pagePosTop) pageStyle = pageStyle + "top:" + config.pagePosTop + "px;";
                if (config.pagePosBottom) pageStyle = pageStyle + "bottom:" + config.pagePosBottom + "px;";
                if (config.pagePosLeft) pageStyle = pageStyle + "left:" + config.pagePosLeft + "px;";
                if (config.pagePosRight) pageStyle = pageStyle + "right:" + config.pagePosRight + "px;";
                h.push('<div style="' + pageStyle + '">{#page}/{#pagecount}</div>');
            }

            var showFieldNames = [];
            for (var i = 0; i < config.fields.length; i++)
            {
                var field = config.fields[i];
                showFieldNames.push(field.name);
            }
            //头部
            h.push('<h2 style="text-align: center;">' + config.title + '</h2>');
            h.push('<table class="ne-report-table" cellpadding="5" cellspacing="0" border="0">');
            //主体
            h.push(g.createTemplateRows(config, showFieldNames));
            h.push('</table>');
            h.push('<p style="line-height: 0.4em;"><br/></p>');

            //明细
            if (config.detailFields && config.detailFields.length)
            {
                h.push('<table class="ne-report-detail" cellpadding="3" cellspacing="0" border="0" >');

                var headerCellTemp = [], contentCellTemp = [];
                if (config.rownumbers)
                {
                    headerCellTemp.push('<td  align="center"><span style="font-size: 14px;"><strong>序号</strong></span></td>');
                    contentCellTemp.push('<td  align="center">{rownumbers}</td>');
                }
 
                for (var i = 0; i < config.detailFields.length; i++)
                { 
                    var field = config.detailFields[i];
                    if (!field) continue;
                    var fieldName = field.name;
                    headerCellTemp.push('<td  align="center">');
                    headerCellTemp.push('<span style="font-size: 14px;"><strong>');
                    headerCellTemp.push(field.title || field.label);
                    headerCellTemp.push('</span></strong>');
                    headerCellTemp.push('</td>');
                    if (field.type == "integer" || field.type == "float")
                    {
                        contentCellTemp.push('<td align="right">');
                    } else
                    {
                        contentCellTemp.push('<td align="left">');
                    }
                    contentCellTemp.push(g.getExp(field));
                    contentCellTemp.push('</td>');
                }
                h.push('<tr class="header">');
                headerCellTemp[0] = '<td class="firstcell" ' + headerCellTemp[0].substr(3);
                h.push(headerCellTemp.join(''));
                h.push('</tr>');
                h.push('<!--START-->');
                h.push('<tr class="row"  data-field="' + config.fieldDetail + '">');
                contentCellTemp[0] = '<td class="firstcell" ' + contentCellTemp[0].substr(3);
                h.push(contentCellTemp.join(''));
                h.push('</tr>');
                h.push('<!--END-->');


                //合计一：
             
                h.push('<tr class="total">');
                contentCellTemp = [];
                if (config.rownumbers)
                {
                    contentCellTemp.push('<td align="right"></td>');
                }
                var totalFields = (config.detailTotalFields || "").split(';');
                for (var i = 0; i < config.detailFields.length; i++)
                {
                    var field = config.detailFields[i];
                    if (!field) continue;
                    var fieldName = field.name;
                    contentCellTemp.push('<td');
                    if (i == 0)
                    {
                        contentCellTemp.push(' align="right"');
                    }
                    contentCellTemp.push('>');
                    if (i == 0)
                    {
                        contentCellTemp.push('<strong>合计：</strong>');
                    }
                    if (field.total1)
                    {
                        contentCellTemp.push('{sum,' + field.name + ':N2}');
                    }
                    contentCellTemp.push('</td>');
                }
                contentCellTemp[0] = '<td class="firstcell" ' + contentCellTemp[0].substr(3);
                h.push(contentCellTemp.join(''));
                h.push('</tr>');

                var detailTotalField = null;
                for (var i = 0; i < config.detailFields.length; i++)
                {
                    var field = config.detailFields[i];
                    if (!field) continue;
                    if (field.total2) detailTotalField = field.name;
                }
                //合计二：
                if (detailTotalField)
                {
                    h.push(' <tr class="total">');
                    h.push('   <td class="firstcell" colspan="' + (cellLength + (config.rownumbers ? 1 : 0)) + '" style="text-align:left">');
                    h.push('<strong>合计 金额大写：</strong>  {sum,' + detailTotalField + ':rmb}');
                    h.push('   </td>');
                    h.push(' </tr>');
                }
                h.push('</table>');
                h.push('<p style="line-height: 0.4em;"><br/></p>');
            }
             
            var signFieldNames = config.signFields ? config.signFields.split(';') : [];

          
            //签名
            if (signFieldNames.length)
            {
                h.push('<table class="ne-report-sign" cellpadding="5" cellspacing="0" border="0">'); 
                h.push(g.createTemplateRows(config, signFieldNames, true));
                h.push('</table>');
            }
            g.editor.setContent(h.join(''));

        },

        createTemplateRows: function (config, fieldNames, isSign)
        {
            var g = this, p = this.options;
            var h = [];
            var rowSize = parseInt(config.rowSize || 3);
            var appendFieldCount = 0, appendTrStart = false;
            for (var i = 0; i < fieldNames.length; i++)
            {
                var fieldName = fieldNames[i];
                var field = pbc.web.helper.first(g.fields, function (a)
                {
                    return a.name == fieldName;
                });
                var isFirstCell = false;
                if (appendFieldCount == 0)
                {
                    if (appendTrStart)
                    {
                        h.push(' </tr>');
                    }
                    h.push(' <tr>');
                    appendTrStart = true;
                    isFirstCell = true;
                }
                appendFieldCount++;
                if (appendFieldCount == rowSize)
                {
                    appendFieldCount = 0;
                }

                if (isFirstCell)
                {
                    h.push('   <td class="firstcell"');
                } else
                {
                    h.push('   <td');
                }
                if (isSign)
                {
                    h.push(' align="right"');
                    if (isFirstCell)
                    {
                        h.push(' width="45"');
                    }
                }
                else if (i == fieldNames.length - 1 && appendFieldCount != 0) //最后一项
                {
                    h.push(' colspan="' + (rowSize - appendFieldCount + 1) + '"');
                }
                h.push('>');
                h.push(field.title + '：');
                if (!isSign)
                {
                    h.push(g.getExp(field));
                }
                h.push('</td>');
                if (isSign)
                {
                    h.push('<td class="line" width="120">');
                    h.push('&nbsp;');
                    h.push('</td>');
                }
            }
            if (appendTrStart)
            {
                h.push(' </tr>');
            }
            return h.join('');
        },
        setModelName: function (modelName)
        {
            var g = this, p = this.options;
            if (g.modelName != modelName)
            {
                g.modelName = modelName;
                g.field_loaded = false;
                g.init_loaded = false;
            }
        },
        setValue: function (value)
        {
            var g = this, p = this.options;
            set();

            function set()
            {
                setTimeout(function ()
                {
                    if (!g.ueReady) set();
                    setTimeout(function ()
                    {
                        g.editor.setContent(value);
                    }, 50);
                }, 50);
            }

        },
        getValue: function ()
        {
            var g = this, p = this.options;
            return g.editor.getContent();
        }

    });


    function showFormatDesigner(combobox, grid)
    {
        var jpanel = $("<div style='margin:9px;'></div>");
        var jform1 = $("<div></div>").appendTo(jpanel).show();
        var jform2 = $("<div></div>").appendTo(jpanel).hide();
        var form1, form2;
        var currentSetup = 1;
        var setupTitles = ["选择格式化选项", "格式化表达式"];
        var win = $.ligerDialog.open({
            target: jpanel,
            title: '选择格式化选项',
            top: 100,
            width: 800,
            isHidden: true,
            height: 400,
            buttons: [
                {
                    text: '下一步', cls: 'l-dialog-btn-highlight',
                    onclick: function ()
                    {
                        if (currentSetup == 2)
                        {
                            var data = form2.getData();

                            combobox._changeValue(data.formatresult, data.formatresult);
                            setTimeout(function ()
                            {
                                grid && grid.endEdit();

                                win.close();
                            }, 100);
                            return;
                        } else if (currentSetup == 1)
                        {
                            var data = form1.getData();
                            form2.setData({
                                formatresult: data.formatType
                            });
                            jform1.hide();
                            jform2.show();
                            $(".l-dialog-btn-highlight", win.element).html("完成");
                        }

                        currentSetup++;
                        $(".l-dialog-title", win.element).html(setupTitles[currentSetup - 1]);
                    }
                },
                {
                    text: '取消',
                    onclick: function ()
                    {
                        win.close();
                    }
                }
            ]
        });

        form1 = jform1.ligerForm({
            fields: [
                    {
                        name: 'formatType',
                        label: '格式化',
                        labelWidth: 120,
                        type: 'select',
                        width: 400,
                        editor: {
                            selectBoxHeight: 260,
                            data: [
                                { id: ' ', text: '无' },
                                { id: 'rmb', text: '人民币大写' },
                                { id: 'qr', text: '二维码' },
                                { id: 'bar', text: '条形码' },
                                    { id: 'img', text: '图像' },
                                { id: 'N1', text: '数字带逗号(保留1位小数点)' },
                                { id: 'N2', text: '数字带逗号(保留2位小数点)' },
                                { id: 'N3', text: '数字带逗号(保留3位小数点)' },
                                { id: 'F1', text: '浮点数(保留1位小数点)' },
                                { id: 'F2', text: '浮点数(保留2位小数点)' },
                                { id: 'F3', text: '浮点数(保留3位小数点)' },
                                { id: 'C1', text: '货币(保留1位小数点)' },
                                { id: 'C2', text: '货币(保留2位小数点)' },
                                { id: 'C3', text: '货币(保留3位小数点)' },
                                { id: 'D3', text: '十进制(固定3位)' },
                                { id: 'D4', text: '十进制(固定4位)' },
                                { id: 'X', text: '十六进制' },
                                { id: 'd', text: '日期 - 短日期' },
                                { id: 'D', text: '日期 - 长日期' },
                                { id: 't', text: '日期 - 短时间' },
                                { id: 'T', text: '日期 - 长时间' },
                                { id: 'f', text: '日期 - 完整日期' },
                                { id: 'F', text: '日期 - 完整日期(带秒)' },
                                { id: 'g', text: '日期 - 默认' },
                                { id: 'G', text: '日期 - 默认(带秒)' },
                                { id: 'M', text: '日期 - 月份' },
                                { id: 'yyyy-MM-dd', text: 'yyyy-MM-dd' },
                                { id: 'yyyy-MM-dd hh:mm', text: 'yyyy-MM-dd hh:mm' },
                                { id: 'yyyy-MM-dd hh:mm:ss', text: 'yyyy-MM-dd hh:mm:ss' }
                            ]
                        }
                    }
            ]
        });

        var oldValue = combobox.getValue();
        if (oldValue)
        {
            form1.setData({
                formatType: oldValue
            });
        }

        form2 = jform2.ligerForm({
            fields: [
                    {
                        name: 'formatresult',
                        width: 400,
                        hideLabel: true,
                        type: 'textarea'
                    }
            ]
        });
    }
     
    function showStyleDesigner(combobox, grid)
    {
        var jpanel = $("<div style='margin:9px;'></div>");
        var jform1 = $("<div></div>").appendTo(jpanel).show();
        var jform2 = $("<div></div>").appendTo(jpanel).hide();
        var form1, form2;
        var currentSetup = 1;
        var win = $.ligerDialog.open({
            target: jpanel,
            title: '样式编辑器',
            isHidden: true,
            top: 100,
            width: 800,
            height: 400,
            buttons: [
                {
                    text: '下一步', cls: 'l-dialog-btn-highlight',
                    onclick: function ()
                    {
                        if (currentSetup == 1)
                        {
                            var data = form1.getData();

                            var style = "";

                            if (data.fontFamily)
                            {
                                style = style + "font-family:" + data.fontFamily + ";";
                            }
                            if (data.fontSize)
                            {
                                var value = data.fontSize.indexOf("px") == -1 ? data.fontSize + "px" : data.fontSize;
                                style = style + "font-size:" + value + ";";
                            }
                            if (data.fontWeight)
                            {
                                style = style + "font-weight:" + data.fontWeight + ";";
                            }
                            if (data.fontStyle)
                            {
                                style = style + "font-style:" + data.fontStyle + ";";
                            }
                            if (data.lineHeight)
                            {
                                var value = data.lineHeight.indexOf("px") == -1 ? data.lineHeight + "px" : data.lineHeight;
                                style = style + "line-height:" + value + ";";
                            }

                            form2.setData({
                                styleresult: style
                            });
                            currentSetup++;
                            jform1.hide();
                            jform2.show();
                            $(".l-dialog-btn-highlight", win.element).html("完成");

                        } else if (currentSetup == 2)
                        {
                            var data = form2.getData();
                            combobox._changeValue(data.styleresult, data.styleresult);
                            setTimeout(function ()
                            {
                                grid && grid.endEdit();

                                win.close();
                            }, 50);
                            return;
                        }
                    }
                },
                {
                    text: '取消',
                    onclick: function ()
                    {
                        win.close();
                    }
                }
            ]
        });
        form1 = jform1.ligerForm({
            fields: [
                    {
                        name: 'fontFamily',
                        label: '文字字体',
                        labelWidth: 120,
                        type: 'select',
                        editor: {
                            data: [
                                { id: '宋体', text: '宋体' },
                                { id: '微软雅黑', text: '微软雅黑' },
                                { id: '楷体', text: '楷体' },
                                { id: '黑体', text: '黑体' },
                                { id: '隶书', text: '隶书' },
                                { id: 'andale mono', text: 'andale mono' },
                                { id: 'arial', text: 'arial' },
                                { id: 'arial black', text: 'arial black' },
                                { id: 'comic sans ms', text: 'comic sans ms' },
                                { id: 'impact', text: 'impact' },
                                { id: 'times new roman', text: 'times new roman' }
                            ],
                            renderItem: function (r)
                            {
                                var value = r.value;
                                return '<span style="font-family:' + value + '">' + value + '</span>';
                            }
                        }
                    },
                    {
                        name: 'fontSize',
                        value: 3,
                        labelWidth: 120,
                        label: '文字大小',
                        type: 'text'
                    },
                     {
                         name: 'fontWeight',
                         value: 3,
                         labelWidth: 120,
                         label: '文字粗细',
                         type: 'select',
                         editor: {
                             data: [
                                 { id: 'normal', text: 'normal' },
                                 { id: 'bold', text: 'bold' },
                                 { id: '100', text: '100' },
                                 { id: '300', text: '300' },
                                 { id: '600', text: '600' },
                                 { id: '700', text: '700' },
                                 { id: '800', text: '900' },
                                 { id: '900', text: '900' }
                             ],
                             renderItem: function (r)
                             {
                                 var value = r.value;
                                 return '<span style="font-weight:' + value + '">' + value + '</span>';
                             }
                         }
                     },
                    {
                        name: 'fontStyle',
                        labelWidth: 120,
                        label: '文字样式',
                        type: 'select',
                        editor: {
                            data: [
                                { id: 'normal', text: 'normal' },
                                { id: 'italic', text: 'italic' },
                                { id: 'oblique', text: 'oblique' }
                            ],
                            renderItem: function (r)
                            {
                                var value = r.value;
                                return '<span style="font-style:' + value + '">' + value + '</span>';
                            }
                        }
                    },
                    {
                        name: 'lineHeight',
                        labelWidth: 120,
                        label: '文字行高',
                        type: 'text'
                    }
            ]
        });

        form2 = jform2.ligerForm({
            fields: [
                    {
                        name: 'styleresult',
                        width: 400,
                        hideLabel: true,
                        type: 'textarea'
                    }
            ]
        });
    }
})();