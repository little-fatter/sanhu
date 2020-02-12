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

    window.setTabTitle = function (tabid, title)
    {
        tab.setTabItemTitle(tabid, title);
    };
    window.setTabSrc = function (tabid, url)
    {
        url = pbc.getAppUrl(url);
        tab.setTabItemSrc(tabid, url);
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
                if (r.StatusCode == "2") //应用级错误
                {
                    pbc.tips({ type: 2, content: r.Message });
                    return;
                } else if (r.StatusCode == "3") //系统级错误
                {
                    pbc.tips({ type: 1, content: r.Message });
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

        pbc.ajax({
            url: actions.getUser,
            success: function (user)
            {
                $(".l-topmenu-username").html(user.Title + "，");
            },
            error: function ()
            {
                pbc.tip('用户信息加载失败');
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
                            if (submenu.MenuUrlBind)
                            {
                                url += ("&bind=" + new pbc.base64().decode(submenu.MenuUrlBind));
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
                        if (submenu.MenuUrlBind)
                        {
                            url += ("&bind=" + new pbc.base64().decode(submenu.MenuUrlBind));
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
            item.find("a.menulink").click(function ()
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
                $(this).addClass("menuitem-over");
            }).bind('mouseout', function ()
            {
                var submenu = $(".sub:first", this);
                submenu.hide();
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

        function getChildren(pid)
        {
            var data = [];
            for (var i = 0, l = allMenus.length; i < l; i++)
            {
                if (allMenus[i].ParentID == pid) data.push(allMenus[i]);
            }
            return data;
        }
    }
})();