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
        var url = window.location.href;
        return url.toLowerCase().indexOf("creator.") != -1;

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

    window.openTab = function (options)
    {
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
    $(document).ready(function ()
    { 
        var headerHeight = $("#header").outerHeight();
        var winH = $(window).height(),winW = $(window).width();
        var jsidebar = $("#sidebar"), jmaincontent = $("#maincontent");
        jsidebar.height(winH - headerHeight);
        jmaincontent.height(winH - headerHeight);
        jmaincontent.width(winW - jsidebar.outerWidth());
          
        //布局初始化 
        var bodyHeight = $(window).height() - 65;
        //Tab
        tab = jmaincontent.ligerTab({
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
                text: jlink.html(),
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
      
        var jtopmenu = $("#header .topmenu ul");
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
            var jtopmenu_item = $('<li><img src="" /><span></span></li>').appendTo(jtopmenu);
            jtopmenu_item.find("img").attr("src", pbc.toUrl(menu.MenuIcon));
            jtopmenu_item.find("span").html(menu.MenuName);
            jtopmenu_item.attr("data-index", i);
            jtopmenu_item.click(function ()
            {
                var index = $(this).attr("data-index");
                $("#sidebar .sidebar-menu").hide();
                $("#sidebar .sidebar-menu[data-index=" + index + "]").show();
            });

            var mainmenu = $('<ul class="sidebar-menu"><li class="sub-menu active"><a class="" href="javascript:void()"><i class="icon-dashboard"></i><span class="currentmenu"></span></a></li> </ul>').appendTo("#sidebar");
            if (i != 0) mainmenu.hide();
            mainmenu.find(".currentmenu").html(menu.MenuName);
            mainmenu.attr("data-index", i);

            var children = getChildren(menu.ID); 
            var groups = getGroups(children);

            $(groups).each(function (gi, group) //包括分组的部分
            {
                var items = groups[gi].items;
                var title = groups[gi].title; 
                var item_html = '<li class="sub-menu"><a href="javascript:;" class=""><span>' + title + '</span><span class="arrow"></span></a><ul class="sub"></ul></li>';
                var item = $(item_html).appendTo(mainmenu);
                $(items).each(function (i, submenu)
                {
                    var subitem = $('<li><a class="link" href="javascript:;"></a></li>');
                    var tabid = submenu.MenuNo.toLowerCase();
                    var url = pbc.toUrl(submenu.MenuUrl);
                    if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1)
                    {
                        url += "&bind=" + submenu.MenuUrlBind;
                    }
                    subitem.find("a").attr({
                        url: url,
                        menuno: submenu.MenuNo,
                        tabid: tabid
                    }).html(submenu.MenuName || submenu.text); 
                    $("ul:first", item).append(subitem);
                }); 
            });
            $(children).each(function (j, submenu)  // 没有分组的部分，主菜单可以直接链接
            { 
                if (submenu.MenuGroup) return;
                var item_html = '<li class="sub-menu"><a href="javascript:;" class="link"><span>{MenuName}</span></a></li>';
                item_html = pbc.templateRender(item_html, submenu);
                var item = $(item_html).appendTo(mainmenu); 

                var tabid = submenu.MenuNo.toLowerCase();
                var url = pbc.toUrl(submenu.MenuUrl);
                if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1)
                {
                    url += "&bind=" + submenu.MenuUrlBind;
                }
                item.find("a").attr({
                    url: url,
                    menuno: submenu.MenuNo,
                    tabid: tabid
                });
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