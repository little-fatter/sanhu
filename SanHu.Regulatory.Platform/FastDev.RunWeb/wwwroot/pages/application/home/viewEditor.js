define([''],
function() {

    function view() {
        return function run(e)
{

            var renderTo = e.renderTo;
            pbc.web.modules.current_load = {
                js: ['/Scripts/studio/jsl.format.js'],
                css: ['/Contents/portal/css/style.css']
            };

            var h = $(window).height() - $(renderTo).offset().top - 100;
            var w = $(window).width() - $(renderTo).offset().left - 10;
            var width1 = 180,
            width2 = 480;
            var view_width_diff = -80;
            var jtarget1 = $('<div></div>'),
            jtarget2 = $('<div></div>'),
            jtarget3 = $('<div class="ne-view"></div>');
            var codeMirror;
            var code_view = "",
            code_service = "",
            currentIsSerivce = false,
            currentView = null;

            jtarget1.height(h);
            jtarget2.height(h);
            jtarget3.height(h + 36);
            var panel_tree = {
                title: '视图结构',
                width: width1,
                showClose: false,
                showRefresh: false,
                showToggle: false,
                height: 'auto',
                target: jtarget1
            };
            var panel_code = {
                title: '代码',
                width: width2,
                showClose: false,
                showRefresh: false,
                showToggle: false,
                height: 'auto',
                target: jtarget2
            };
            var panel_view = {
                title: '',
                showClose: false,
                showRefresh: true,
                showToggle: false,
                width: w - panel_tree.width - panel_code.width + view_width_diff,
                height: 'auto',
                target: jtarget3
            };
            var panels = [panel_tree, panel_code, panel_view];

            var columns = [];
            $(panels).each(function() {
                columns.push({
                    width: this.width + 5,
                    panels: [this]
                });
            });

            pbc.web.loader('current_load,codemirror', init);

            function init_tree() {
                var arg = getArg();

                jtarget1.parent().css("overflow", "auto");

                var tree = jtarget1.ligerTree({
                    url: pbc.toUrl('web/ui_list'),
                    checkbox: false,
                    nodeWidth: 120,
                    isLeaf: function(data) {
                        if (!data) return true;

                        return data.type == "view" ? true: false;
                    },
                    isExpand: function(e) {
                        if (!arg) return false;
                        var data = e.data;

                        if (!data || !data.id) return false;
                        if (data.children && data.type == "module") {
                            for (var i = 0; i < data.children.length; i++) {
                                if (arg.indexOf(data.children[i].id) > -1) { (function(nodeModel) {
                                        setTimeout(function() {
                                            var maxIdLength = 1;
                                            var matchedNodes = [];

                                            for (var j = 0; j < nodeModel.children.length; j++) {
                                                if (nodeModel.children[j].id && arg.indexOf(nodeModel.children[j].id) > -1) {
                                                    matchedNodes.push(nodeModel.children[j]);
                                                    maxIdLength = Math.max(nodeModel.children[j].id.length, maxIdLength);
                                                }
                                            }
                                            for (var k = 0; k < matchedNodes.length; k++) {
                                                if (matchedNodes[k].id.length == maxIdLength) {
                                                    tree.selectNode(matchedNodes[k], true);
                                                    return;
                                                }
                                            }

                                        },
                                        100);
                                    })(data.children[i]);
                                    return true;
                                }
                            }
                            return false;
                        }
                        if (arg.indexOf(data.id) > -1) return true;
                        return false;
                    },
                    onSelect: function(e) {
                        var data = e.data;
                        if (data.type == "view") {
                            currentView = data;
                            load_code();
                        }
                    },
                    iconFieldName: 'iconcss'
                });

                function getArg() {
                    var arg = ($(renderTo).attr("data-url") || location.href).split("#");
                    if (!arg || !arg.length) return "";
                    return arg[1] || "";
                }
            }

            function init_code() {
                codeMirror = CodeMirror(jtarget2.get(0), {
                    lineNumbers: true,
                    matchBrackets: true,
                    lineWrapping: true,
                    width: '100%',
                    height: '100%',
                    continueComments: "Enter",
                    extraKeys: {
                        "Ctrl-Q": "toggleComment"
                    }
                });
                jtarget2.find(".CodeMirror:first").css("height", "100%");

                var jbtns = $('<div style="    position: absolute;top: 3px;right: 6px;"><a class="ne-btn btnsetwidth" style="padding: 0 6px; height: 22px;line-height: 22px;">全屏</a><a class="ne-btn btnswitch" style="padding: 0 6px; height: 22px;line-height: 22px;">切换</a><a style="padding: 0 6px;height: 22px;line-height: 22px;" class="ne-btn ne-btn-blue btnsaverun">运行</a></div>').appendTo($(".l-panel:eq(1) .l-panel-header", renderTo));

                jbtns.find(".btnsaverun").click(function() {
                    saveCodeAndRun();
                });
                jbtns.find(".btnswitch").click(function() {
                    currentIsSerivce = !currentIsSerivce;
                    setCode();
                });
                jbtns.find(".btnsetwidth").click(function() {
                    var is_full = $(this).attr("data-full") ? true: false;
                    if (!is_full) {
                        $(renderTo).find(".l-panel:eq(0)").hide();
                        $(renderTo).find(".l-panel:eq(2)").hide();
                        var w = $(window).width() - $(renderTo).offset().left - 30;
                        $(renderTo).find(".l-panel:eq(1)").width(w).parent().width(w + 5);
                        $(this).attr("data-full", "true").html("缩小");
                    } else {
                        $(renderTo).find(".l-panel:eq(0)").show();
                        $(renderTo).find(".l-panel:eq(2)").show();
                        var w = panel_code.width;
                        $(renderTo).find(".l-panel:eq(1)").width(w).parent().width(w + 5);
                        $(this).removeAttr("data-full").html("全屏");
                    }
                });

            }
            function init_view() {
                $(renderTo).find(".l-panel:eq(2)").css("background", "white").find(".l-panel-header").hide();
                jtarget3.get(0).panelReload = function() {
                    show_view();
                };
            }
            function setCode() {
                if (codeMirror) {
                    var code = currentIsSerivce ? code_service: code_view;
                    if (!code) code = getDefaultValue();
                    // codeMirror.setValue(jsl.format.formatJson(code));
                    codeMirror.setValue(code);
                }
            }
            function saveCodeAndRun() {
                if (codeMirror) {
                    var code = codeMirror.getValue();
                    if (!code) return;

                    if (currentIsSerivce) {
                        if (code == getDefaultValue()) return;
                        code_service = code;
                    } else {
                        code_view = code;
                    }
                    var treedata = currentView;
                    if (!treedata) return;

                    pbc.ajax({
                        url: pbc.toUrl('web/ui_save'),
                        data: {
                            module: treedata.module,
                            model: treedata.model,
                            viewname: treedata.id,
                            isService: currentIsSerivce ? "Y": "",
                            content: code
                        },
                        success: function(r) {
                            if (r.statusCode == "2") {
                                pbc.tips({
                                    type: 2,
                                    content: r.message
                                });
                                return;
                            } else if (r.statusCode == "3") {
                                pbc.showError(r.message);
                                return;
                            }
                            var data = r.data;

                            show_view();
                        }
                    });
                }
            }
            function getDefaultValue() {
                return 'function service(page)\n{\n    \n    \n    \n    \n    \n}\n';

            }
            function load_code() {
                var treedata = currentView;
                if (!treedata) return;
                pbc.ajax({
                    url: pbc.toUrl('web/ui_get'),
                    data: {
                        module: treedata.module,
                        model: treedata.model,
                        viewname: treedata.id
                    },
                    success: function(r) {
                        if (r.statusCode == "2") {
                            pbc.tips({
                                type: 2,
                                content: r.message
                            });
                            return;
                        } else if (r.statusCode == "3") {
                            pbc.showError(r.message);
                            return;
                        }
                        var data = r.data;

                        code_view = data.view;
                        code_service = data.service;
                        currentIsSerivce = false;

                        setCode();
                        show_view();
                    }
                });
            }
            function show_view() {
                if (!currentView) return;
                var model = currentView.model;
                var viewtype = "list";
                var viewname = currentView.id;
                if (viewname && viewname.indexOf("form") > -1) viewtype = "form";
                if (viewname && viewname.indexOf("report") > -1) viewtype = "report";
                if (viewname && viewname.indexOf("template") > -1) viewtype = "template";
                if (viewname && viewname.indexOf("calendar") > -1) viewtype = "calendar";
                if (viewname && viewname.indexOf("kanban") > -1) viewtype = "kanban";

                jtarget3.attr("data-url", "/web/main?model=" + model + "&viewtype=" + viewtype + "&viewname=" + viewname);
                jtarget3.html("");
                jtarget3.get(0).className = "ne-view";
                var od = jtarget3.width(),
                oh = jtarget3.height();
                jtarget3.removeAttr("style").width(od).height(oh);
                jtarget3.removeAttr("_echarts_instance_");
                jtarget3.removeAttr("id");

                var runner = new pbc.web.init({
                    model: model,
                    viewType: viewtype,
                    isView: false,
                    showInDialog: false,
                    viewName: viewname,
                    renderTo: jtarget3.get(0)
                });
                runner.run();

            }

            function onResize() {
                var h = $(window).height() - $(renderTo).offset().top - 100;
                jtarget1.height(h);
                jtarget2.height(h + 5);
                jtarget3.height(h + 36);
                var w = $(window).width() - $(renderTo).offset().left - 10;
                var view_panel_width = w - panel_tree.width - panel_code.width + view_width_diff;
                $(renderTo).find(".l-panel:eq(2)").width(view_panel_width).parent().width(view_panel_width + 5);
            }

            function init() {
                $(window).resize(onResize);
                onResize();

                var jportal = $("<div class='portal'></div>").appendTo(renderTo);

                jportal.ligerPortal({
                    columns: columns
                });
                init_tree();
                init_code();
                init_view();
            }
        };
    }

    var exports = {
        run: view()
    };

    return exports;
});