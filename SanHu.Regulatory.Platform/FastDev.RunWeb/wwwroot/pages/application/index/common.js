define([
    "jquery"
],
    function ($)
    {
        var homepage = true;
        var tab;
        var FreeDesign = window.FreeDesign || {};

        var isDesign = (function ()
        {
            return true;

            var url = window.location.href;
            return url.toLowerCase().indexOf("creator.") != -1 || url.toLowerCase().indexOf("designmode=y") != -1;

        })();


        function main()
        {


            window.initTab = function (o)
            {
                tab = o;
                 
                pbc.tab = tab;

                if (tab.menu)
                {
                    var menuitem = {
                        text: '编辑视图',
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
                                url: 'web/main?model=home&viewname=viewEditor#' + model + '/' + (viewname || viewtype),
                                text: '编辑视图',
                                showClose: true,
                                tabid: 'vieweditor'
                            });
                        }
                    };
                    //tab.menu.addItem({ line: true });
                    //tab.menu.addItem(menuitem);

                }
            };
            window.setTabTitle = function (tabid, title)
            {
                tab.setTabItemTitle(tabid, title);
            };
            window.getTabTitle = function (tabid)
            {
                return tab.getTabItemTitle(tabid);
            };
            window.setTabSrc = function (tabid, url)
            {
                url = pbc.getAppUrl(url);
                tab.setTabItemSrc(tabid, url);
            };
            window.removeTab = pbc.removeTab = function (tabid)
            {
                tab.removeTabItem(tabid);
            };
            window.openTab = pbc.openTab = function (options, tabid, text)
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
                  
                pbc.openPage(options,"tab");
            };
            //刷新 iframe方法
            window.callFrame = function (frameName, fnName)
            {
                var ele = $("#" + frameName);
                if (!ele.length) return;
                ele = ele[0];
                if (!ele.contentWindow || !ele.contentWindow[fnName]) return;
                ele.contentWindow[fnName]();
            }

            window.openDialog = function (options)
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


            window.selectPrintFields = function (columns, callback, initData)
            {
                var jform = $("<div style='margin:9px;'></div>");
                var win = $.ligerDialog.open({
                    target: jform,
                    isHidden: true,
                    title: '请选择列',
                    top: 100,
                    width: 420,
                    height: 'auto',
                    buttons: [
                        {
                            text: '打印', cls: 'l-dialog-btn-highlight',
                            onclick: function ()
                            {
                                var data = form.getData();
                                var type = data.type;
                                if (type == "2" && !data.fields)
                                {
                                    toastr.error('', '请选择列');
                                    return;
                                }
                                if (callback) callback(data);

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
                var data = [];
                var opTypes = {
                    "1": "默认",
                    "2": "自定义"
                };
                for (var id in opTypes)
                {
                    data.push({ id: id, text: opTypes[id] });
                }
                var data2 = [];
                $(columns).each(function ()
                {
                    data2.push({ id: this.name, text: this.display });
                    // this.showDisplay = null;
                });

                var form = jform.ligerForm({
                    labelWidth: 'auto',
                    fields: [
                         {
                             name: 'type',
                             hideLabel: true,
                             type: 'select',
                             width: 380,
                             editor: {
                                 data: data,
                                 value: "1",
                                 onSelected: function (v)
                                 {
                                     form.setVisible("fields", v == "2");
                                 }
                             }
                         },
                          {
                              name: 'fields',
                              hideLabel: true,
                              type: 'listbox',
                              width: 380,
                              editor: {
                                  isMultiSelect: true,   //是否多选
                                  isShowCheckBox: true,  //是否选择复选框
                                  isShowSelectAll : true,
                                  height: 200,
                                  data: data2
                              }
                          }
                    ]
                });
                form.getEditor("fields").selectAll();
                form.setVisible("fields", false);

                if (initData)
                {
                    form.setData(initData);
                }
                return win;
            }
            function isIE()
            {
                if (!!window.ActiveXObject || "ActiveXObject" in window)
                    return true;
                else
                    return false;
            }
            window.printPage = function (e, callback)
            {
                var openParm = $.extend({}, e);

                var zoom = 1.2;

                var marginLeft, marginRight, marginTop, marginBottom, pageWidth, pageHeight;
                function updateParm(parm)
                {
                    marginLeft = parseInt(parm.marginLeft) * 3.78;
                    marginRight = parseInt(parm.marginRight) * 3.78;
                    marginTop = parseInt(parm.marginTop) * 3.78;
                    marginBottom = parseInt(parm.marginBottom) * 3.78;
                    pageWidth = (parseInt(parm.width) - parseInt(parm.marginLeft) - parseInt(parm.marginRight)) * 3.78;
                    pageHeight = (parseInt(parm.height) - parseInt(parm.marginTop) - parseInt(parm.marginBottom)) * 3.78;


                    if (isIE())
                    {
                        marginLeft = marginLeft * zoom;
                        marginRight = marginRight * zoom;
                        marginTop = marginTop * zoom;
                        marginBottom = marginBottom * zoom;
                        pageWidth = pageWidth * zoom;
                        pageHeight = pageHeight * zoom;
                    }
                }

                pbc.ajax({
                    url: e.url || pbc.toUrl('/web/GetTemplateConents'),
                    data: $.extend({
                        pageindex: 1
                    }, openParm),
                    success: function (r)
                    {
                        updateParm(r.templateParm);

                        currentIndex = 0;
                        var currentContents = r.contents;

                        var jwrap = $("<div class='view'   ></div>").css({
                            margin: 0, padding: 0,
                            width: pageWidth + "px",
                            background: "#FFFFFF",

                            position: "relative"
                        });


                        var useHeight = 0;
                        for (var i = 0; i < currentContents.length; i++)
                        {
                            var jpage = $("<div></div>").css({
                                margin: 0,
                                padding: 0,
                                //overflow: "hidden",
                                background: "#FFFFFF",
                                position: "absolute",
                                left: 0
                            }).html(currentContents[i]).appendTo(jwrap);

                            if (isIE())
                            {
                                jpage.find(".print").width(720 * zoom);

                                jpage.find(".sign").appendTo(jpage.find(".print"));

                                jpage.find(".print").css("zoom", zoom);
                            }
                            if (callback) callback(jpage);

                            //jpage.css("marginRight", marginRight + "px");
                            jpage.css("width", pageWidth + "px");
                            jpage.css("height", pageHeight + "px");

                            jpage.css("top", marginTop + useHeight + "px");
                            jpage.css("left", marginLeft + "px");

                            useHeight = useHeight + marginTop + pageHeight;
                        }
                        useHeight -= 150;



                        //如果不减去50会多出一页，原因未明
                        jwrap.height(useHeight);

                        jwrap.jqprint();

                    }

                });



            }
             
             
        }
         



        return {
            run: main
        };
    });