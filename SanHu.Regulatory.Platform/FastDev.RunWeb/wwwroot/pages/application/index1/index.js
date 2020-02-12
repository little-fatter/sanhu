define([
    "jquery",
    "text!pages/application/index1/index.html",
    "home",
    "nicescroll",
], function ($, html, common) {
    var tab, pageloading;
    var tabidcounter = 0;
    var actions = {
        getMenu: pbc.toUrl('web/user_menus')
    };


    function main(homeData) {
        $('body').html(html);

        common.run();

        var headerHeight = $("#header").outerHeight();
        var winH = $(window).height(), winW = $(window).width();
        var jsidebar = $("#sidebar"), jmaincontent = $("#maincontent");
        jsidebar.height(winH - headerHeight);
        jmaincontent.height(winH - headerHeight);
        jmaincontent.width(winW - jsidebar.outerWidth());
        jsidebar.niceScroll({
            railoffset: true,
            autohidemode: true
        });
        //布局初始化 
        var bodyHeight = $(window).height() - 65;
        //Tab
        tab = jmaincontent.ligerTab({
            height: bodyHeight,
            ontabClick: function (tabid) {
                if (tabid) {
                    //tab.reload(tabid);
                }
            },
            contextmenu: true
        });

        initTab(tab);


        openTab({
            url: 'pages/application/home/index.w',
            text: '我的主页',
            showClose: false,
            tabid: 'home'
        });
        new Vue({
            el: '#header',
            data: homeData || {
                appName: '开发系统',
                realName: '超级管理员',
                myPic: 'styles/img/default.png'
            },
            methods: {
                showUserMenus: function (e) {
                    $("#usermenus").toggle();
                    //给document绑定一个一次性的click事件，点击关闭菜单
                    $(document).one("click", function () {
                        $("#usermenus").hide();
                    });
                    e.stopPropagation();
                }
            }
        });
        $("#usermenus").mouseleave(function () {
            $("#usermenus").slideUp();
        });

        $("#header .editpass").click(function () {
            showEditPassWin();
        });

        function showEditPassWin() {
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
                        onclick: function () {
                            var data = form.getData();
                            pbc.ajax({

                                url: 'xxx',
                                data: data,
                                success: function () {

                                }

                            });
                            win.close();
                        }
                    },
                    {
                        text: '取消',
                        onclick: function () {
                            win.close();
                        }
                    }
                ]
            });

            var form = jform.ligerForm({
                labelWidth: 'auto',
                fields: [
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

        showPageLoading();
        pbc.ajax({
            url: actions.getMenu,
            success: function (r) {
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

                if (window.f_init) {
                    window.f_init();
                }

                removePageLoading();
            },
            error: function () {
                pbc.tip('用户菜单加载失败');
            }
        });


    }
    return {
        run: main

    };
    function showPageLoading() {
        if (!pageloading || !pageloading.length) {
            pageloading = $("#toppageloading");
            if (!pageloading.length) {
                pageloading = $('<div id="toppageloading"></div>').appendTo('body').show();
            } else {
                pageloading.show();
            }
        }
    }
    function removePageLoading() {
        if (pageloading) {
            if (pageloading.remove) {
                pageloading.remove();
            }
            pageloading = null;
        }
    }
    function initMenuEvent() {

        jQuery('#sidebar .sub-menu > a').click(function () {

            var last = jQuery('.sub-menu.open', $('#sidebar'));
            last.removeClass("open");
            jQuery('.arrow', last).removeClass("open");
            jQuery('.sub', last).slideUp(200);
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("open");
                sub.slideUp(200);
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200);
            }
            ShowScrool();
        });

        $(".dropdown-toggle").click(function () {
            var isOpen = $(this).parent().hasClass("open");
            if (isOpen) {
                $(this).parent().removeClass("open");
            }
            else {
                $(this).parent().addClass("open");
            }
            ShowScrool();
        });
    }
    function ShowScrool() {
        setTimeout(function () {
            var jsidebar = $("#sidebar");
            jsidebar.getNiceScroll().show();
            jsidebar.getNiceScroll().resize();
        }, 380);
    }
    function initMenus(allMenus) {
        var jtopmenu = $("#header .topmenu ul");
        var topMenus = [];
        for (var i = 0; i < allMenus.length; i++) {
            var menu = allMenus[i];
            menu.MenuNo = menu.MenuNo || ("menu" + ++tabidcounter);

            if (!menu.ParentID) {
                topMenus.push(menu);
            }
        }

        $(topMenus).each(function (i, menu) {
            var jtopmenu_item = $('<li><img src="" /><span></span></li>').appendTo(jtopmenu);
            jtopmenu_item.find("img").attr("src", pbc.toUrl(menu.MenuIcon));
            jtopmenu_item.find("span").html(menu.MenuName);
            jtopmenu_item.attr("data-index", i);
            jtopmenu_item.click(function () {
                var index = $(this).attr("data-index");
                $("#sidebar .sidebar-menu").hide();
                $("#sidebar .sidebar-menu[data-index=" + index + "]").show();
            });

            var mainmenu = $('<ul class="sidebar-menu"><li class="sub-menu"><div class="currentmenu"></div></li> </ul>').appendTo("#sidebar");
            if (i != 0) mainmenu.hide();
            mainmenu.find(".currentmenu").html(menu.MenuName + "<span class=\"right-icon fa fa-sort-desc\"></span>");
            mainmenu.attr("data-index", i);

            var children = getChildren(menu.ID);
            var groups = getGroups(children);

            $(groups).each(function (gi, group) //包括分组的部分
            {
                var items = groups[gi].items;
                var title = groups[gi].title;
                var item_html = '<li class="sub-menu"><a href="javascript:;" class=""><span>' + title + '</span><span class="arrow"></span></a><ul class="sub"></ul></li>';
                var item = $(item_html).appendTo(mainmenu);
                $(items).each(function (i, submenu) {
                    var subitem = $('<li><a class="link" href="javascript:;"></a></li>');
                    var tabid = submenu.MenuNo.toLowerCase();
                    var url = pbc.toUrl(submenu.MenuUrl);
                    if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1) {
                        url += "&bind=" + submenu.MenuUrlBind;
                    }
                    subitem.find("a").attr("data-url", url);
                    subitem.find("a").attr({
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
                if (submenu.MenuUrlBind && url.indexOf("&bind=") == -1) {
                    url += "&bind=" + submenu.MenuUrlBind;
                }
                item.find("a").attr("data-url", url);
                item.find("a").attr({
                    menuno: submenu.MenuNo,
                    tabid: tabid
                });
            });
        });

        function getGroups(items) {
            var groups = [];
            var groupTitles = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.MenuGroup) {
                    if ($.inArray(item.MenuGroup, groupTitles) == -1) {
                        groupTitles.push(item.MenuGroup);
                    }
                }
            }
            if (!groupTitles.length) return groups;

            groupTitles = groupTitles.sort(function (group1, group2) {
                var seqno1 = first(items, function (o) {
                    if (o.MenuGroup == group1 && o.MenuGroupSeqNo) {
                        return true;
                    }
                    return false;
                });
                seqno1 = seqno1 ? seqno1.MenuGroupSeqNo : null;
                var seqno2 = first(items, function (o) {
                    if (o.MenuGroup == group2 && o.MenuGroupSeqNo) {
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

            for (var i = 0; i < groupTitles.length; i++) {
                var groupTitle = groupTitles[i];
                groups.push({
                    title: groupTitle,
                    items: getGroupItems(groupTitle)
                });
            }
            function getGroupItems(groupTitle) {
                var gitems = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.MenuGroup == groupTitle) {
                        gitems.push(item);
                    }
                }
                return gitems;
            }
            return groups;
        }

        function first(data, where) {
            if (!data || !data.length) return null;
            for (var i = 0; i < data.length; i++) {
                if (where(data[i])) return data[i];
            }
            return null;
        };

        function getChildren(pid) {
            var data = [];
            for (var i = 0, l = allMenus.length; i < l; i++) {
                var menuitem = allMenus[i];
                if (menuitem.ParentID == pid) data.push(menuitem);
            }
            return data;
        }
    }
});