(function ()
{  
    var homepage = true;
    var tab;
    var isDesign = (function ()
    {
        return true;

        var url = window.location.href;
        return url.toLowerCase().indexOf("creator.") != -1 || url.toLowerCase().indexOf("designmode=y") != -1;

    })();

    function pageInit()
    {
        var updateContent = $("#hupdatecontent").val();
        if (updateContent)
        {
           var cf = layer.confirm(updateContent,
                {
                    area: ['500px', '400px'],
                    title: '检测到有系统更新，是否更新？',
                    btn: ['确定', '取消'] //按钮
                }, function ()
                {
                    layer.close(cf);

                    pbc.ajax({
                        loading: '系统正在更新中...',
                        url: '/home/updateSys',
                        success: function (r)
                        {
                            if (r.statusCode == "2") //应用级错误
                            {
                                layer.msg(r.message);
                                return;
                            } else if (r.statusCode == "3") //系统级错误
                            {
                                pbc.showError(r.message);
                                return;
                            }

                            layer.msg('更新完成');
                        }
                    });

                }, function ()
                {

                });

        } 
        
    }


    window.initTab = function (o)
    {
        tab = o;

        if (tab.menu)
        {
            var menuitem = {
                text: '编辑视图' ,
                click: function ()
                { 
                    var tabid = tab.actionTabid;
                    var contentitem = $(".l-tab-content-item[tabid=" + tabid + "]"); 
                    var iframe = $("iframe:first", contentitem);
                    var url = "";
                    if (iframe.length)
                    {
                        url = iframe.attr("src");
                    } else
                    {
                        url = contentitem.children(":eq(0)").attr("data-url") 
                    }
                    var model = pbc.getUrlParm(url, "model");
                    var viewtype = pbc.getUrlParm(url, "viewtype");
                    var viewname = pbc.getUrlParm(url, "viewname"); 

                    openTab({
                        url: 'web/main?model=home&viewname=viewEditor#'+model+'/' + (viewname || viewtype),
                        text: '编辑视图',
                        showClose: true,
                        tabid: 'vieweditor'
                    });
                }
            };
            tab.menu.addItem({ line: true });
            tab.menu.addItem(menuitem);

        }
    };
    window.setTabTitle = function (tabid, title)
    {
        tab.setTabItemTitle(tabid, title);
    };
    window.setTabSrc = function (tabid, url)
    {
        url = pbc.getAppUrl(url);
        tab.setTabItemSrc(tabid, url);
    };

    window["removeTab"] = pbc.removeTab = function (tabid)
    {
        tab.removeTabItem(tabid);
    };

    window["openTab"] = pbc.openTab = function (options, tabid, text)
    {
        if (typeof (options) == "string")
        {
            options = {
                url: options,
                tabid: tabid,
                text: text
            };
        }
        var p = options || {};
        if (FreeDesign && FreeDesign.config && FreeDesign.config.singlePage)
        {
            if (p.url && (p.url.indexOf('web/main?') > -1 || p.url.indexOf('web/main/?') > -1))
            {
                singlePage_open(options);
                return;
            }
        }
        p.url = pbc.getAppUrl(p.url);
        var tabid = p.tabid, text = p.text || p.title, url = p.url;
        if (tab.isTabItemExist(tabid))
        {
            var tabTitle = tab.getTabItemTitle(tabid),
                tabSrc = tab.getTabItemSrc(tabid);
            if (tabTitle != text)
            {
                tab.setTabItemTitle(tabid, text);
            }
            if (tabSrc != url)
            {
                tab.setTabItemSrc(tabid, url);
            }
            tab.selectTabItem(tabid);
            return;
        }
        tab.addTabItem(p);
    };
    
    function getRunnerOp(url,target)
    {
        var model = pbc.getUrlParm(url, "model");
        var viewtype = pbc.getUrlParm(url, "viewtype");
        var viewname = pbc.getUrlParm(url, "viewname");
        var isView = pbc.getUrlParm(url, "isView");
        var id = pbc.getUrlParm(url, "id");

        var initOp = {
            model: model,
            viewType: viewtype,
            isView: isView ? true : false,
            showInDialog: false,
            viewName: viewname,
            renderTo: target
        };
        if (id)
        {
            initOp.formContext = id;
        }
        return initOp;

    }

    function singlePage_open(options)
    { 
        var op = $.extend({}, options);


        var url = op.url;

        FreeDesign.traceTime("打开TAB:" + op.text + ",url:" + url);

        if (tab.isTabItemExist(op.tabid))
        {
            jtarget = $(".l-tab-content-item[tabid=" + op.tabid + "] .freedesignpage:first", tab.tab.content);
            var tabTitle = tab.getTabItemTitle(op.tabid),
            tabSrc = jtarget.attr("data-url");
            tab.selectTabItem(op.tabid);
            if (tabTitle != op.text)
            {
                tab.setTabItemTitle(op.tabid, op.text);
            }
            if (tabSrc != url)
            {
                jtarget.attr("data-url", url);
                jtarget.html(""); 
                var runner = new pbc.web.init(getRunnerOp(url,jtarget.get(0)));
                runner.run();
            }
            return;
        }

        var jtarget = $("<div class='ne-view freedesignpage'></div>");
        
        op.url = "";
        op.target = jtarget.get(0);
        op.target.tabOpener = tab;
     
     
        var initOp = getRunnerOp(url, jtarget.get(0));
         
        jtarget.attr("data-url", url);
        tab.addTabItem(op);
        var runner = new pbc.web.init(initOp);
        runner.run();

        jtarget.get(0).tabReload = function ()
        {
            jtarget.html("");
            var runner = new pbc.web.init($.extend({},initOp)); 
            runner.run();
        };
    }
     
    
    //刷新 iframe方法
    window.callFrame = function(frameName, fnName)
    {
        var ele = $("#" + frameName);
        if (!ele.length) return;
        ele = ele[0];
        if (!ele.contentWindow || !ele.contentWindow[fnName]) return;
        ele.contentWindow[fnName]();
    }

    window.openDialog = function(options)
    {
        var w = $(window).width(), h = $(window).height();
        var p = $.extend({
            height: h * 0.9,
            width: w * 0.9,
            showMax: false,
            showToggle: true,
            showMin: false,
            isResize: true,
            slide: false
        }, options);
        return $.ligerDialog.open(p);
    }

    $(function ()
    {
        $("#header .btneditpass").click(function ()
        { 
            showEditPassWin();

        });

        $("#header .btnviewedit").click(function ()
        { 
            var url = 'web/main?model=home&viewname=vieweditor&appid=' + pbc.getAppId() + "#welcome/hello";

            openTab({
                url: url,
                text: '编辑视图',
                tabid: 'myinfo'
            });
        });

        setTimeout(function ()
        {
            pageInit();
        }, 2000);
    });

    function showEditPassWin()
    {
        var jform = $("<div style='margin:9px;'></div>");
        var win = $.ligerDialog.open({
            target: jform,
            isHidden: true,
            title: '修改密码确认',
            top: 100,
            width: 420,
            height: 'auto',
            buttons: [ 
                {
                    text: '确定', cls: 'l-dialog-btn-highlight',
                    onclick: function ()
                    {
                        var data = form.getData();
                        if (!data.oldpassword || !data.password1 || !data.password2)
                        {
                            pbc.showError("密码不能为空");
                            return;
                        }
                        if (data.password1 != data.password2)
                        {
                            pbc.showError("两次密码输入不一致");
                            return;
                        }
                        pbc.ajax({ 
                            url: pbc.toUrl('web/user_changepassword'),
                            data: data,
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
                               
                                pbc.showSuccess("修改密码成功");
                                win.close();
                            }

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

        var form = jform.ligerForm({
            labelWidth: 'auto',
            fields: [
                {
                    name: 'oldpassword',
                    label: '密码',
                    type: 'password',
                    labelWidth: 80,
                    width: 255,
                    editor: {
                    }
                },
                 {
                     name: 'password1',
                     label: '密码',
                     type: 'password',
                     labelWidth: 80,
                     width: 255,
                     editor: {
                     }
                 },
                 {
                     name: 'password2',
                     label: '确认密码',
                     type: 'password',
                     labelWidth: 80,
                     width: 255,
                     editor: {
                     }
                 }
            ]
        });
    }



})();