(function ()
{

    $.ligerDefaults.Form.editors.linkBuilder =
    {
        create: function (container, editParm, p)
        { 
            var text = $('<div class="l-text l-text-file"><textarea class="l-text-field valid"></textarea><div class="l-trigger">设置...</div></div>');
            var input = text.find("textarea");
            input.height(60);
            text.height(64);

            var id = (p.prefixID || "") + editParm.field.name;

            input.attr({
                id: id,
                name: id
            });
            container.append(text);
            text.find(".l-trigger").click(function ()
            {
                openEdit();
            });
            if (editParm.field && editParm.field.afterRender)
            {
                container.append(editParm.field.afterRender());
            }
            return text;



            function openEdit()
            { 
                var jtarget = $('<div class="ne-formindialog"><form class="form" style="margin:16px;margin-bottom:52px;"></form><div class="toolpanel"><a class="ne-btn ne-btn-blue btnsave left" style="margin-left:10px">保存</a><a class="ne-btn btncancel left">取消</a></div></div>');
                var dialog = $.ligerDialog.open({
                    title: '配置链接',
                    showMax: false,
                    showToggle: true,
                    showMin: false,
                    isResize: true,
                    slide: false,
                    target: jtarget,
                    top: 50,
                    width: 420,
                    height: 'auto',
                    data: {
                        callback: function (data)
                        {
                        }
                    }
                });
                jtarget.find(".btnsave").click(function ()
                {
                    var postData = form.getData();
                    saveLink(postData);
                    dialog.close();
                });
                jtarget.find(".btncancel").click(function ()
                {
                    dialog.close();
                });
                jtarget.parent().css({
                    margin: 0,
                    padding: 0
                });
                var formOp = {
                    validate: pbc.getDefaultValidate(),
                    showInvalid: function (message)
                    {
                        pbc.tips(2, message);
                    },
                    inputWidth: 240,
                    fields: [
                        {
                            label: '关联视图',
                            name: 'View',
                            type: 'ref_popupselect',
                            textField: 'View_textfield',
                            newline: true,
                            editor: {
                                many2one: true,
                                css: 'combobox-selector',
                                popupselect_ismul: false,
                                valueField: 'ID',
                                textField: 'ViewName',
                                popupselect_type: 'popupselect',
                                popupselect_url: pbc.toUrl("/web/main/?model=core_view&viewtype=list"),
                                popupselect_width: '1000',
                                popupselect_height: '700',
                                popupselect_title: '选择视图 '
                            }
                        },
                        {
                            name: 'filterData',
                            type: 'modelFilterCreator',
                            label: '数据过滤',
                            editor: {
                                onButtonClick: onOpenFilter
                            }
                        }
                    ]
                };
                 
                var form = null;
                pbc.web.loader(["qtip", "json", "validate", "form" ], function ()
                {
                    pbc.preOptions(formOp);
                     
                    form = jtarget.find(".form").ligerForm(formOp);

                    var link = input.val();
                    if (!link || link.indexOf("&bindvname=") == -1 || link.indexOf("&bindvid=") == -1) return;
                    var view = [getQueryValue(link, "bindvid"), getQueryValue(link, "bindvname")];
                    var bindStr = getQueryValue(link,"bind");
                     
                    var bind = JSON.parse(new pbc.base64().decode(bindStr));

                    form.setData({
                        View: view,
                        filterData: bind.filterData
                    });
                });

                function onOpenFilter(callback,filter)
                {
                    var view = form.getData().View;
                    if (!view || !view[0])
                    {
                        top.pbc.tips("2", "先选择视图");
                        return;
                    }
                    var viewId = view[0];

                    pbc.ajax({
                        url: pbc.toUrl('designer/getmode'),
                        data: {
                            viewId: viewId
                        },
                        success: function (result)
                        {
                            if (result.statusCode == "1")
                            {
                                var data = result.Data;
                                filter.setMode(data.ModelName);
                                callback();
                            } else
                            {
                                top.pbc.tips(result.statusCode, result.Message);
                            }

                        }
                    });
                }
            }

            function saveLink(postData)
            {   
                if (postData.View != null && postData.View.length && postData.View[0])
                {
                    var viewId = postData.View[0];
                    pbc.ajax({
                        url: pbc.toUrl('designer/GetViewInfo'),
                        data: {
                            viewId: viewId
                        },
                        success: function (result)
                        {
                            if (result.statusCode == "1")
                            {
                                var data = result.Data;
                                var dataMode = data.model;
                                var dataView = data.view;  
                                var viewtype = data.view.ViewType == "list" ? "main" : data.view.ViewType;
                                var link = 'web/main?model=' + dataMode.ModelName + "&viewtype=" + viewtype + "&viewindex=" + dataView.ViewIndex;
                                if (postData.filterData)
                                {
                                    link = link + "&bind=" + new pbc.base64().encode(JSON.stringify({
                                        filterData: postData.filterData
                                    }));
                                    link = link + "&bindvname=" + postData.View[1];
                                    link = link + "&bindvid=" + postData.View[0];
                                }
                                input.val(link);
                            } else
                            {
                                top.pbc.tips(result.statusCode, result.Message);
                            }
                        }
                    });
                }
            }

            function getQueryValue(url,name)
            {
                var result = url.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1)
                {
                    return "";
                }
                return result[1];
            }
        },
        getValue: function (control, editParm)
        {
            var input = control.find("textarea");
            return input.val();
        },
        setValue: function (control, value, editParm)
        {
            var input = control.find("textarea");
            input.val(value);
        },
        resize: function (control, width, height, editParm)
        { 
            control.css({
                width: width - 2
            }).find(".l-text-field").css({
                width: width - 70
            }).find(".fileinput").css({
                width: width - 2
            });
        }
    };


    
})();