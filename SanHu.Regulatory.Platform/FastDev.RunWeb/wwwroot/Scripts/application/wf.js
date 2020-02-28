'use strict';
(function ($) {
    var data = {
        advance: "advance",
        back: "back",
        reject: "reject",
        transfer: "transfer"
    };
    /**
	 * @param {?} req
	 * @return {undefined}
	 */
    pbc.web.workflow = function (req) {
        var module = this;
        module.options = $.extend({
            model: null,
            context: null,
            action: null,
            taskId: null,
            callback: null
        }, req);
    };
    $.extend(pbc.web.workflow.prototype, {
        run: function () {
            var canvasWorker = this;
            var options = this.options;
            canvasWorker.getContext(function () {
                canvasWorker.openFlowWin();
            });
        },
        log: function () {
            var Piwik = this;
            var options = this.options;
            Piwik.getLog(function () {
                Piwik.openLogWin();
            });
        },
        openLogWin: function () {
            var self = this;
            var options = this.options;
            if (!self.log) {
                return;
            } /** @type {!Array} */
            var J = [];
            var div = $('<div style="height:650px"></div>');
            var container = $('<div class="ne-flowlog"></div>').appendTo(div);
            var F = $.ligerDialog.open({
                title: "流程",
                width: 1000,
                height: "auto",
                target: div
            });
            var layers = self.log.tasks;
            var sp = new workflowBulider({
                renderTo: container,
                desginModel: false
            });
            sp.render();
            sp.show(self.log.view);
            var stage = $(".wfpanel", container);
            stage.width(630);
            var f = $('<div class="drawHeader"><h3>流程图</h3></div>').prependTo(stage);
            $('<div class="colors"><div class="color color1">已完成</div><div class="color color2">进行中</div><div class="color color3">回退</div></div>').appendTo(stage.find(".drawPanel"));
            if (!layers) {
                stage.width(960);
                return;
            }
            var headerTable = $('<div class="taskpanel"></div>').appendTo(container);
            var $taskList = $('<div class="tasks"></div>').appendTo(headerTable);
            $(layers).each(function (canCreateDiscussions, page) {
                var $warpEle = $('<div class="task"><div class="taskheader"><div class="handlertype"></div><h3></h3></div><div class="content"> </div></div>').appendTo($taskList);
                $warpEle.find("h3").html(canCreateDiscussions + 1 + "." + page.taskTitle);
                if (page.handlerType) {
                    $warpEle.find(".handlertype").html(page.handlerType);
                }
                $(page.items).each(function (canCreateDiscussions, data) { /** @type {string} */
                    var n = '<div class="item"><div class="status">{status}</div><div class="line1"><a class="user" data-id="{user.ID}" href="javascript:void(0)">{user.RealName}</a><span  class="date">{endDate}</span></div><div class="remark line2"><b>批注：</b>{remark}</div></div>';
                    data.endDate = data.endDate ? pbc.getFormatDate(data.endDate, "yyyy-MM-dd hh:mm") : "";
                    data.remark = data.remark || "无";
                    data.user = data.user || {};
                    var element = $(pbc.templateRender(n, data)).appendTo($warpEle.find(".content"));
                    if (data.user && data.user.MyPic) {
                        var _this = $('<img class="userimg" src="" />').prependTo(element);
                        _this.attr("src", pbc.toUrl(data.user.MyPic));
                        _this.attr("data-id", data.user.ID);
                        element.find(".line2,.line1").addClass("toleft");
                    }
                });
                $warpEle.find(".content").find(".item:last").addClass("item-last");
                $warpEle.find(".content").append('<div class="clear"></div>');
            });
            $taskList.find(".task:last").addClass("task-last");
            container.find("a.user,img.userimg").click(function () {
                var extPart = $(this).attr("data-id");
                if (!extPart) {
                    return;
                }
                var requestOrUrl = pbc.toUrl("/web/main?model=core_user&viewtype=form&isview=1&id=" + extPart);
                var torrent_title = "查看：" + $(this).html();
                $.ligerDialog.open({
                    title: torrent_title,
                    url: requestOrUrl,
                    width: 800,
                    height: 600
                });
            });
        },
        openSampleWin: function () {
            /**
			 * @return {undefined}
			 */

            function _wait() {
                tool.execute({
                    Remark: store_scrEncounter.getData().remark,
                    Waitting: tool.context.waitting,
                    SignMode: tool.context.signMode
                }, function () {
                    win.close();
                    if (opts.callback) {
                        opts.callback();
                    }
                });
            }
            var tool = this;
            var opts = this.options; /** @type {boolean} */
            var C = opts.action == data.back; /** @type {!Array} */
            var K = [];
            var s = $('<div style="height:250px"></div>');
            var individual = $('<div class="ne-flowwin"></div>').appendTo(s);
            var win = $.ligerDialog.open({
                title: tool.getTitle(),
                width: 500,
                height: "auto",
                target: s
            });
            $("<h3>批注信息</h3>").appendTo(individual);
            var indContent = $("<div></div>").appendTo(individual);
            var result = $('<div class="footerbtns"><a class="ne-btn ne-btn-blue btnOK">确定</a><a class="ne-btn btnClose">取消</a></div>').appendTo(individual);
            var store_scrEncounter = indContent.ligerForm({
                fields: [{
                    hideLabel: true,
                    hideSpace: true,
                    name: "remark",
                    newline: true,
                    width: 460,
                    editor: {
                        height: 100
                    },
                    type: "textarea"
                }]
            });
            result.find(".btnOK").click(function () {
                _wait();
            });
            result.find(".btnClose").click(function () {
                win.close();
            });
        },
        openFlowWin: function () {
            /**
			 * @return {undefined}
			 */

            function init() { /** @type {!Array} */
                var loadedAddons = [];
                $("input.selectnode", r).each(function () {
                    if (this.checked) {
                        var _td_h = $(this).attr("data-id");
                        if (isEnd) {
                            loadedAddons.push({
                                NodeID: _td_h
                            });
                        } else {
                            $(children).each(function (canCreateDiscussions, selItem) {
                                var nodeId = selItem.nodeId;
                                if (nodeId == _td_h) {
                                    var _ = selItem.getData().executorUser;
                                    loadedAddons.push({
                                        NodeID: _td_h,
                                        Executors: _
                                    });
                                }
                            });
                        }
                    }
                });
                if (!loadedAddons.length) {
                    pbc.tips({
                        type: 2,
                        content: "请选择流转节点"
                    });
                    return;
                }
                node.execute({
                    Remark: store_scrEncounter.getData().remark,
                    ExecuteNodes: loadedAddons
                }, function () {
                    win.close();
                    if (opts.callback) {
                        opts.callback();
                    }
                });
            }
            /**
			 * @param {!Object} $rootScope
			 * @return {?}
			 */

            function NavItemController($rootScope) {
                return '<input class="selectnode" data-id="' + $rootScope.node.id + '" type="checkbox" checked /> <span>' + $rootScope.node.nodeTitle + "</span>";
            }
            /**
			 * @param {!Object} _node
			 * @return {?}
			 */

            function addToCanvas(_node) {
                return '<div class="executorsform" data-id="' + _node.node.id + '"></div>';
            }
            /**
			 * @return {undefined}
			 */

            function render() {
                $(".executorsform", r).each(function () {
                    var node = $(this).attr("data-id");
                    var options = filter(node); /** @type {string} */
                    var ext = "";
                    if (options.userFilter) {
                        ext = (new pbc.base64).encode(JSON.stringify({
                            filterData: options.userFilter
                        }));
                    } /** @type {!Array} */
                    var toFetchFields = [{
                        hideLabel: true,
                        hideSpace: true,
                        name: "executorUser",
                        type: "ref_popupselect_mul",
                        textField: "executorUser_textfield",
                        newline: true,
                        width: 240,
                        editor: {
                            many2many: true,
                            css: "combobox-selector",
                            popupselect_ismul: true,
                            valueField: "Id",
                            textField: "Name",
                            popupselect_type: "popupselect",
                            popupselect_url: pbc.toUrl("/web/main/?model=user&viewtype=list&bind=" + ext),
                            popupselect_width: "930",
                            popupselect_height: "700",
                            popupselect_title: "选择参与者 "
                        }
                    }];
                    pbc.preEditor(toFetchFields, "fields");
                    var neighbor = $(this).ligerForm({
                        fields: toFetchFields,
                        width: 250
                    });
                    neighbor.nodeId = node;
                    if (options) {
                        neighbor.setData({
                            executorUser: options.users
                        });
                    }
                    children.push(neighbor);
                });
            }
            /**
			 * @param {?} morph
			 * @return {?}
			 */

            function filter(morph) { /** @type {number} */
                var i = 0;
                for (; i < node.context.nodes.length; i++) {
                    var f = node.context.nodes[i];
                    if (f.node.id == morph) {
                        return f;
                    }
                }
                return null;
            }
            var node = this;
            var opts = this.options;
            if (node.context.waitting) {
                node.openSampleWin();
                return;
            } else {
                if (!node.context.nodes || !node.context.nodes.length) {
                    pbc.tips({
                        type: 2,
                        content: "未找到环节可用"
                    });
                    return;
                }
            } /** @type {boolean} */
            var K = opts.action == data.back; /** @type {boolean} */
            var isEnd = node.context.nodes[0].node.nodeType == "end"; /** @type {!Array} */
            var children = [];
            var child = $('<div style="height:450px"></div>');
            var name = $('<div class="ne-flowwin"></div>').appendTo(child);
            var win = $.ligerDialog.open({
                title: node.getTitle(),
                width: 500,
                height: "auto",
                target: child
            });
            if (isEnd) {
                var source = node.context.nodes[0].node;
                child.height(240);
                $('<div class="header"><b>节点：</b> <input class="selectnode" data-id="' + source.id + '" type="checkbox" checked /> <span>' + source.nodeTitle + "</span></div>").appendTo(name);
            } else {
                var r = $('<div class="ne-flowwin-grid"></div>').appendTo(name);
                var P = r.ligerGrid({
                    usePager: false,
                    checkbox: false,
                    height: 250,
                    width: 460,
                    fixedCellHeight: false,
                    rowSelectable: false,
                    columns: [{
                        display: "环节",
                        width: 160,
                        render: NavItemController
                    }, {
                        display: "参与者",
                        width: 270,
                        render: addToCanvas
                    }],
                    onAfterShowData: render,
                    data: {
                        Records: node.context.nodes,
                        Total: node.context.nodes.length
                    }
                });
            }
            $("<h3>批注信息</h3>").appendTo(name);
            var field = $("<div></div>").appendTo(name);
            var elChild = $('<div class="footerbtns"><a class="ne-btn ne-btn-blue btnOK">确定</a><a class="ne-btn btnClose">取消</a></div>').appendTo(child);
            var store_scrEncounter = field.ligerForm({
                fields: [{
                    hideLabel: true,
                    hideSpace: true,
                    name: "remark",
                    newline: true,
                    width: 460,
                    editor: {
                        height: 100
                    },
                    type: "textarea"
                }]
            });
            elChild.find(".btnOK").click(function () {
                init();
            });
            elChild.find(".btnClose").click(function () {
                win.close();
            });
        },
        execute: function (parent, caseSub) {
            var _this5 = this;
            var opts = this.options;
            var taskId = opts.taskId;
            if (!taskId && _this5.context && _this5.context.taskId) {
                taskId = _this5.context.taskId;
            }
            pbc.ajax({
                url: pbc.toUrl("/web/workflow/execute"),
                data: {
                    context: $.extend({
                        Context: opts.context,
                        Action: opts.action,
                        TaskID: taskId,
                        Model: opts.model.name
                    }, parent)
                },
                loading: opts.hideLoading ? null : pbc.res.saving,
                success: function (res) {
                    if (res.statusCode == "2") {
                        pbc.tips({
                            type: 2,
                            content: res.message
                        });
                        return;
                    } else {
                        if (res.statusCode == "3") {
                            pbc.showError(res.message);
                            return;
                        }
                    }
                    if (caseSub) {
                        caseSub();
                    }
                }
            });
        },
        getTitle: function () {
            var A = this;
            var opts = this.options;
            if (opts.action == data.advance) {
                return "流转确认";
            }
            if (opts.action == data.back) {
                return "回退确认";
            }
        },
        getContext: function (line) {
            var stateParam = this;
            var opts = this.options;
            pbc.ajax({
                url: pbc.toUrl("/web/workflow/context"),
                data: {
                    context: {
                        Context: opts.context,
                        Action: opts.action,
                        TaskID: opts.taskId,
                        Model: opts.model.name
                    }
                },
                success: function (data) {
                    if (data.statusCode == "2") {
                        pbc.tips({
                            type: 2,
                            content: data.message
                        });
                        return;
                    } else {
                        if (data.statusCode == "3") {
                            pbc.showError(data.message);
                            return;
                        }
                    }
                    stateParam.context = data.data;
                    if (line) {
                        line(data.data);
                    }
                }
            });
        },
        getLog: function (resolve) {
            var objectCsv = this;
            var options = this.options;
            pbc.ajax({
                url: pbc.toUrl("/web/workflow/log"),
                data: {
                    context: {
                        Context: options.context,
                        Model: options.model.name
                    }
                },
                success: function (result) {
                    if (result.statusCode == "2") {
                        pbc.tips({
                            type: 2,
                            content: result.message
                        });
                        return;
                    } else {
                        if (result.statusCode == "3") {
                            pbc.showError(result.message);
                            return;
                        }
                    }
                    objectCsv.log = result.data;
                    if (resolve) {
                        resolve(result.data);
                    }
                }
            });
        },
        getNextNodes: function (suiteContainer) {
            var plugins = this;
            var options = this.options;
            var connections = plugins.wfData.connections; /** @type {!Array} */
            var newNodeLists = [];
            if (connections == null || !connections.length) {
                return newNodeLists;
            } /** @type {number} */
            var i = 0;
            for (; i < suiteContainer.endpointIds.length; i++) {
                var ins = suiteContainer.endpointIds[i];
                if (pbc.web.helper.any(connections, function (e) {
					return e.source == ins;
                })) {
                    var results = pbc.web.helper.filterArray(connections, function (e) {
                        return e.source == ins;
                    });
                    if (results.length > 0) {
                        var current_season = pbc.web.helper.filterArray(plugins.wfData.nodes, function (gnShareConstants) {
                            if (gnShareConstants == suiteContainer) {
                                return false;
                            } /** @type {number} */
                            var i = 0;
                            for (; i < results.Count; i++) {
                                var previousSelector = results[i].target;
                                if ($.inArray(previousSelector, gnShareConstants.endpointIds) != -1) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        $(current_season).each(function () {
                            newNodeLists.push(this);
                        });
                    }
                }
            }
            return newNodeLists;
        }
    });
    $.extend(pbc.web.view.prototype, {
        workflow_executed: function () {
            var toggleBanner = this;
            var options = this.options;
            if (toggleBanner.callback) {
                toggleBanner.callback();
            }
        },
        workflow_advance: function () {
            var m = this;
            var options = this.options;
            var taskId = m.getQueryStringByName("taskid");
            var B = new pbc.web.workflow({
                model: options.model,
                context: options.id,
                taskId: taskId,
                action: "advance",
                callback: function () {
                    m.workflow_executed();
                    m.form_load();
                }
            });
            B.run();
        },
        workflow_back: function () {
            var m = this;
            var options = this.options;
            var taskId = m.getQueryStringByName("taskid");
            var B = new pbc.web.workflow({
                model: options.model,
                context: options.id,
                taskId: taskId,
                action: "back",
                callback: function () {
                    m.workflow_executed();
                }
            });
            B.run();
        },
        workflow_log: function () {
            var _ = this;
            var options = this.options;
            var CloudCmd = new pbc.web.workflow({
                model: options.model,
                context: options.id
            });
            CloudCmd.log();
        }
    });
})(jQuery);