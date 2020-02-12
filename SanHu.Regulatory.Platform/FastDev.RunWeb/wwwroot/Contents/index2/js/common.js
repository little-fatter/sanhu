(function ()
{  
    var homepage = true;
    var tab;
    //tabid计数器，保证tabid不会重复
    var tabidcounter = 0;
    var actions = {
        getMenu: pbc.toUrl('web/user_menus')
    };
    window.freedesign = {
        appId: pbc.getQueryStringByName("appid")
    };
    var isDesign = (function ()
    {
        return true;

        var url = window.location.href;
        return url.toLowerCase().indexOf("creator.") != -1 || url.toLowerCase().indexOf("designmode=y") != -1;

    })();
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
        p.url = p.url + "&rndd=" + Math.random();
        tab.addTabItem(p);
    };
    
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

    function onResize()
    {
        var winH = $(window).height(), winW = $(window).width();
        var jsidebar = $("#sidebar"), jmaincontent = $("#maincontent"), jheader = $("#header");
        var headerHeight = jheader.outerHeight();
        jsidebar.height(winH );
        jmaincontent.height(winH - headerHeight);
        jmaincontent.width(winW - jsidebar.outerWidth());
        jheader.width(winW - jsidebar.outerWidth());
    }

    $(document).ready(function ()
    { 
        onResize();

        $(window).resize(onResize);

        //布局初始化 
        var bodyHeight = $(window).height() - 65;
        //Tab
        tab = $("#maincontent").ligerTab({
            height: bodyHeight,
            contextmenu: true
        });

 
 

        //预加载dialog的背景图片
        pbc.prevDialogImage();


        pbc.ajax({
            url: actions.getMenu, 
            success: function (r)
            {
                if (r.statusCode == "2") //应用级错误
                {
                    pbc.tips({ type: 2, content: r.Message || r.Data });
                    return;
                } else if (r.statusCode == "3") //系统级错误
                {
                    pbc.tips({ type: 1, content: r.Message || r.Data });
                    return;
                }
                initMenus(r);
                initMenuEvent();
                $("#pageloading").hide();
            },
            error: function ()
            {
                pbc.tip('用户菜单加载失败');
            }
        });
         
    });
    function initMenuEvent()
    {
        $("#sidebar a.link").click(function ()
        {
            var jlink = $(this);
            var tabid = jlink.attr("tabid");
            var url = jlink.attr("url");
            if (!url) return;
            if (!tabid)
            {
                tabidcounter++;
                tabid = "tabid" + tabidcounter;
                jlink.attr("tabid", tabid); 
                if (url.indexOf('?') > -1) url += "&";
                else url += "?";
                url += "MenuNo=" + jlink.attr("menuno");
                jlink.attr("url", url);
            }
            openTab({
                tabid: tabid,
                text: jlink.text(),
                url: url
            });
        });

        jQuery('#sidebar .sub-menu > a').click(function ()
        {
            var last = jQuery('.sub-menu.open', $('#sidebar'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
            var sub = jQuery(this).next();
            if (sub.is(":visible"))
            {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else
            {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
        });

        $(".dropdown-toggle").click(function ()
        {
            var isOpen = $(this).parent().hasClass("open");
            if (isOpen)
            {
                $(this).parent().removeClass("open");
            }
            else
            {
                $(this).parent().addClass("open");
            }
        });
    }
    function initMenus(allMenus)
    {
        var mainmenu = $("#mainmenu");
        var topMenus = [];
        for (var i = 0; i < allMenus.length; i++)
        {
            var menu = allMenus[i]; 
            menu.MenuNo = menu.MenuNo || ("menu" + ++tabidcounter);

            if (!menu.ParentID )
            {
                topMenus.push(menu);
            }
        }
        $(topMenus).each(function (i, menu)
        {
            var item_html = '<li class="menuitem"><img class="icon" src="" /><span class="name">{MenuName}</span></li>';
            item_html = pbc.templateRender(item_html, menu);
            var item = $(item_html); 
            mainmenu.append(item);
            item.find("img").attr("src", pbc.toUrl(menu.MenuIcon));
            var children = getChildren(menu.ID);
            var jitem_link = null;
            if (children && children.length)
            {
                var groups = getGroups(children);
                if (groups && groups.length)
                {
                    var subNav = $('<div class="sub" style="top:0px; display:none; "></div>');
                    subNav.width(152 * groups.length);
                    for (var gi = 0; gi < groups.length; gi++)
                    {
                        var items = groups[gi].items;
                        var title = groups[gi].title;
                        var groupPanel = $('<div class="group"></div>').appendTo(subNav);
                        var jGroupTitle = $('<h3>' + title + '</h3>').appendTo(groupPanel);
                        var jGroupUl = $('<ul class="sub-nav"></ul>').appendTo(groupPanel);
                        if (gi == groups.length - 1) groupPanel.addClass("group-last");
                        if (gi == 0) groupPanel.addClass("group-first");

                        $(items).each(function (i, submenu)
                        {
                            var url = pbc.toUrl(submenu.MenuUrl);
                            if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1)
                            {
                                url += "&bind=" + submenu.MenuUrlBind;
                            }
                            var subitem = $('<li><a class="menulink" href="javascript:void(0)" data-url="' + url + '" ></a></li>');
                            subitem.find("a").attr({
                                tabid: submenu.MenuNo
                            }).html(submenu.MenuName);

                            jGroupUl.append(subitem);
                        });
                    }
                    item.append(subNav);
                }
                else
                {
                    var subNav = $('<div class="sub" style="top: 0px; display:none; "><ul class="sub-nav"></ul></div>');

                    $(children).each(function (i, submenu)
                    {
                        var url = pbc.toUrl(submenu.MenuUrl);
                        if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1)
                        {
                            url += "&bind=" + submenu.MenuUrlBind;
                        }
                        var subitem = $('<li><a class="menulink" href="javascript:void(0)" data-url="' + url + '"></a></li>');
                        subitem.find("a").attr({
                            tabid: submenu.MenuNo
                        }).html(submenu.MenuName);

                        $("ul:first", subNav).append(subitem);
                    });
                    item.append(subNav);
                }
            }
            else
            {
                if (menu.MenuUrl)
                {
                    jitem_link = item;
                    item.attr({
                        tabid: menu.MenuNo
                    }).attr("data-url", menu.MenuUrl);
                }
            }
            var jlink = item.find("a.menulink");
            if (jitem_link)
            {
                jlink = jlink.add(jitem_link);
            }
            jlink.click(function ()
            {
                var tabid = $(this).attr('tabid'),
                   url = $(this).attr("data-url") || $(this).attr('href'),
                   showClose = $(this).attr('showClose'),
                   text = $(this).attr('tabTxt') || $(this).text(),
                   parentOpen = $(this).attr('parentOpen');  
                if (tab.isTabItemExist(tabid))
                {
                    var tabTitle = tab.getTabItemTitle(tabid),
                        tabSrc = tab.getTabItemSrc(tabid);
                    tab.selectTabItem(tabid);
                    if (tabTitle != text)
                    {
                        setTabTitle(tabid, text);
                    }
                    if (tabSrc != url)
                    {
                        setTabSrc(tabid, url);
                    }
                    return;
                } 
                openTab({ tabid: tabid, text: text, url: url, showClose: showClose });
            });
            mainmenu.append(item);
            var isShowd = false;
            item.bind('mouseover', function ()
            {
                var submenu = $(".sub:first", this);
                var top = 0;
                var index = parseInt($(this).attr("data-index"));
                if (index >= 4 && index <= 5) 
                {
                    top = -1 * submenu.outerHeight() / 2 + $(this).outerHeight() / 2;
                }
                else if(index >= 6)
                {
                    top = -1 * (submenu.outerHeight() - $(this).outerHeight()) - 1;
                }
                submenu.css({
                    top: top
                }).show();
                isShowd = true;
                $(this).addClass("menuitem-over");
            }).bind('mouseout', function ()
            {
                var submenu = $(".sub:first", this);
                isShowd = false;
                setTimeout(function ()
                {
                    if (!isShowd)
                    {
                        submenu.hide();
                    }
                }, 100); 
                $(this).removeClass("menuitem-over");
            });
        }); 

        function getGroups(items)
        {
            var groups = [];
            var groupTitles = [];
            for (var i = 0; i < items.length; i++)
            {
                var item = items[i];
                if (item.MenuGroup)
                {
                    if ($.inArray(item.MenuGroup, groupTitles) == -1)
                    {
                        groupTitles.push(item.MenuGroup);
                    }
                }
            }
            if (!groupTitles.length) return groups;

            groupTitles = groupTitles.sort(function (group1, group2)
            {
                var seqno1 = first(items, function (o)
                {
                    if (o.MenuGroup == group1 && o.MenuGroupSeqNo)
                    {
                        return true;
                    }
                    return false;
                });
                seqno1 = seqno1 ? seqno1.MenuGroupSeqNo : null;
                var seqno2 = first(items, function (o)
                {
                    if (o.MenuGroup == group2 && o.MenuGroupSeqNo)
                    {
                        return true;
                    }
                    return false;
                });
                seqno2 = seqno2 ? seqno2.MenuGroupSeqNo : null;
                if (seqno1 && !seqno2) return 1;
                if (!seqno1 && !seqno2) return 0;
                if (!seqno1 && seqno2) return -1;
                if (parseInt(seqno1) > parseInt(seqno2)) return 1;
                if (parseInt(seqno1) == parseInt(seqno2)) return 0;
                if (parseInt(seqno1) < parseInt(seqno2)) return -1;
                return 0;
            });
             
            for (var i = 0; i < groupTitles.length; i++)
            {
                var groupTitle = groupTitles[i];
                groups.push({
                    title: groupTitle,
                    items: getGroupItems(groupTitle)
                });
            }
            function getGroupItems(groupTitle)
            {
                var gitems = [];
                for (var i = 0; i < items.length; i++)
                {
                    var item = items[i];
                    if (item.MenuGroup == groupTitle)
                    {
                        gitems.push(item);
                    }
                }
                return gitems;
            }
            return groups;
        }

        function first(data, where)
        {
            if (!data || !data.length) return null; 
            for (var i = 0; i < data.length; i++)
            {
                if (where(data[i])) return data[i];
            }
            return null;
        };

        function getChildren(pid)
        {
            var data = [];
            for (var i = 0, l = allMenus.length; i < l; i++)
            {
                var menuitem = allMenus[i];
                if (isDesign || menuitem.ShowInDesign != 1)
                {
                    if (menuitem.ParentID == pid) data.push(menuitem);
                }
            }
            return data;
        }
    }
})();