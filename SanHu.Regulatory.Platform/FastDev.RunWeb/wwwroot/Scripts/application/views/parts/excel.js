define(["jquery"], function ($)
{
    //tool buttons 部件，传入 page
    return function (page)
    {
        $.extend(page,
        {
            exportExcel: function ()
            {
                var g = this, p = this.options;
                var templates = [];
                pbc.ajax({
                    url: pbc.toUrl('web/listdata/'),
                    data: {
                        model: 'core_exportTemplate',
                        filter: pbc.createFilter({
                            IsDefault: 1,
                            ModelName: p.model.name
                        })
                    },
                    success: function (data)
                    {
                        if (data.statusCode == "2")
                        {
                            pbc.tipsInTop(2, data.message);
                            return;
                        }
                        else if (data.statusCode == "3")
                        {
                            pbc.showError(data.message);
                            return;
                        }
                        templates = data;
                        if (!templates || !templates.length)
                        {
                            pbc.tipsInTop(2, "导出模板未定义！");
                        } else
                        {
                            show();
                        }
                    }
                });


                function show()
                {
                    pbc.openFile({
                        url: pbc.toUrl('web/exportexcel?rnd=') + new Date().getTime(),
                        parms: {
                            templateId: templates[0].ID,
                            filterCode: new pbc.base64().encode(JSON.stringify(g.getCurrentCondition()))
                        }
                    });
                }
            },


            importExcel: function ()
            {
                var g = this, p = this.options;
                var templates = [];
                pbc.ajax({
                    url: pbc.toUrl('web/listdata/'),
                    data: {
                        model: 'core_importTemplate',
                        filter: pbc.createFilter({
                            IsDefault: 1,
                            ModelName: p.model.name
                        })
                    },
                    success: function (data)
                    {
                        if (data.statusCode == "2")
                        {
                            pbc.tipsInTop(2, data.message);
                            return;
                        }
                        else if (data.statusCode == "3")
                        {
                            pbc.showError(data.message);
                            return;
                        }
                        templates = data;
                        if (!templates || !templates.length)
                        {
                            pbc.tipsInTop(2, "导入模板未定义！");
                        } else
                        {
                            pbc.web.loader(["qtip", "json", "validate", "form", "webuploader"], function ()
                            {
                                show();
                            });


                        }
                    }
                });


                function show()
                {
                    var jform = $("<form style='margin:9px;'></form>"), form;
                    var win = $.ligerDialog.open({
                        target: jform,
                        isHidden: true,
                        title: '选择导入文件',
                        top: 100,
                        width: 400,
                        height: 'auto',
                        buttons: [
                            {
                                text: '确定', cls: 'l-dialog-btn-highlight',
                                onclick: function ()
                                {
                                    var editor = form.getEditor("file");

                                    editor.upload(function (file, r)
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
                                        var success = r.data.success;
                                        var errors = r.data.errors;
                                        if (success)
                                        {
                                            var content = "成功得导入了" + success + "条数据";
                                            if (errors.length) content += (",有" + errors.length + "条数据导入失败");
                                            pbc.showSuccess(content);
                                        } else
                                        {
                                            var content = '没有导入任何数据';
                                            if (errors.length) content += (",有" + errors.length + "条数据导入失败");
                                            pbc.tips({ type: 2, content: content });
                                        }
                                        g.reload();
                                        win.close();
                                    });

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
                    pbc.web.loader(["fileUploader"], function ()
                    {
                        form = jform.ligerForm({
                            labelWidth: 'auto',
                            fields: [
                                 {
                                     name: 'file',
                                     label: '选择excel文件',
                                     hideLabel: true,
                                     type: 'fileUploader',
                                     labelWidth: 'auto',
                                     editor: {
                                         url: pbc.getAppUrl(pbc.toUrl('web/ImportExcel/?templateId=') + templates[0].ID),
                                         imgWidth: 80,
                                         imgHeight: 80,
                                         model: 'input',
                                         extensions: 'xls'
                                     },
                                     width: 190,
                                     afterContent: '<li style="clear:both"><a class="downloadlink link" style="margin: 5px; display: block;" href="javascript:void()">下载模板文件</a></li>'
                                 }
                            ]
                        });

                        $(".downloadlink", jform).click(function ()
                        {
                            pbc.openFile({
                                url: pbc.toUrl('web/ImportTemplate?rnd=') + new Date().getTime(),
                                parms: {
                                    templateId: templates[0].ID
                                }
                            });
                        });
                    });
                }
            },


        });

    };

});
