'use strict';
(function ($) {
    /**
	 * @return {undefined}
	 */

    function f_switchMode() {
        $(".flownode-selected").removeClass("flownode-selected");
        if ($("#drawPanel").hasClass("selectMode")) {
            $("#drawPanel").addClass("connectMode").removeClass("selectMode");
        } else {
            $("#drawPanel").addClass("selectMode").removeClass("connectMode");
        }
    }
    /**
	 * @return {undefined}
	 */

    function f_save() {
        wf.save();
    }
    /**
	 * @return {undefined}
	 */

    function f_check() {
        if (wf.check() != false) {
            alert("检查通过");
        }
    }
    /**
	 * @return {undefined}
	 */

    function f_pro() {
        wf.showFlowNodePro();
    }
    /**
	 * @return {undefined}
	 */

    function f_delline() {
        /**
		 * @param {?} id
		 * @return {?}
		 */

        function send(id) { /** @type {number} */
            var i = 0;
            for (; i < connections.length; i++) {
                var _dd = connections[i].endpoints; /** @type {number} */
                var j = 0;
                for (; j < _dd.length; j++) {
                    if (_dd[j].uuid == id) {
                        return true;
                    }
                }
            }
            return false;
        } /** @type {!Array} */
        var connections = []; /** @type {!Array} */
        var G = [];
        var _webStorage = jsPlumb.getEndpoints(window); /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var msg = wf.flowNodes[i];
            var $realtime = $(msg.element);
            var connection = {};
            $(msg.endPoints).each(function (canCreateDiscussions, endpoint) {
                var serviceOut = {
                    anchor: endpoint.anchor.type,
                    uuid: endpoint.getUuid()
                };
                connection.endpoints.push(serviceOut);
            });
            connections.push(connection);
        }
        var current_season = jsPlumb.getConnections();
        $(current_season).each(function () {
            var foo = this.endpoints[0].getUuid();
            var m = this.endpoints[1].getUuid();
            if (!send(foo)) {
                alert(foo);
                return;
            }
            if (!send(m)) {
                alert(m);
                return;
            }
        });
    }
    /**
	 * @return {undefined}
	 */

    function showAll() { /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var msg = wf.flowNodes[i];
            $(msg.endPoints).each(function () { });
        }
    }
    /**
	 * @return {undefined}
	 */

    function keyInit() {
        $(document).keydown(function (event) {
            if (event.keyCode == 46) {
                delSelectedFlowNode();
            }
            if (wf.selectedFlowNode) {
                var characterLookShadow = $(wf.selectedFlowNode.element);
                if (event.keyCode == 37) {
                    characterLookShadow.css("left", parseInt(characterLookShadow.css("left"), 10) - 1);
                    jsPlumb.repaintEverything();
                }
                if (event.keyCode == 38) {
                    characterLookShadow.css("top", parseInt(characterLookShadow.css("top"), 10) - 1);
                    jsPlumb.repaintEverything();
                }
                if (event.keyCode == 39) {
                    characterLookShadow.css("left", parseInt(characterLookShadow.css("left"), 10) + 1);
                    jsPlumb.repaintEverything();
                }
                if (event.keyCode == 40) {
                    characterLookShadow.css("top", parseInt(characterLookShadow.css("top"), 10) + 1);
                    jsPlumb.repaintEverything();
                }
            }
        });
    }
    /**
	 * @return {undefined}
	 */

    function contextMenuInit() {
        /**
		 * @param {string} type
		 * @return {undefined}
		 */

        function init(type) {
            if (!C) {
                if (!$label.offset()) {
                    return;
                }
                wf.addFlowNode({
                    nodeType: type,
                    x: posX - $label.offset().left,
                    y: y - $label.offset().top
                });
            } else {
                if (wf.selectedFlowNode) {
                    var yearOffset = $(wf.selectedFlowNode.element).css("left");
                    var languageOffsetY = parseFloat($(wf.selectedFlowNode.element).css("top")) + $(wf.selectedFlowNode.element).height() + 50;
                    var $scope = wf.addFlowNode({
                        nodeType: type,
                        x: yearOffset,
                        y: languageOffsetY
                    });
                    var srcEndpointUuid = wf.selectedFlowNode.endPoints[wf.selectedFlowNode.endPoints.length - 1].getUuid();
                    var dstEndpointUuid = $scope.endPoints[0].getUuid();
                    jsPlumb.connect({
                        uuids: [srcEndpointUuid, dstEndpointUuid]
                    });
                }
            }
        }
        var self = currentWorkflowBulider;
        var uploadOptions = self.options;
        var $label = $(".drawPanel .drawPanelinner", self.jelement);
        var posX;
        var y;
        var box_clone_next2 = $.ligerMenu({
            top: 100,
            left: 100,
            width: 120,
            items: [{
                text: "新增",
                children: [{
                    text: "开始节点",
                    img: nodeRules.start.src,
                    click: function () {
                        init("start");
                    }
                }, {
                    text: "结束节点",
                    img: nodeRules.end.src,
                    click: function () {
                        init("end");
                    }
                }, {
                    text: "活动节点",
                    img: nodeRules.active.src,
                    click: function () {
                        init("active");
                    }
                }, {
                    text: "条件分支",
                    img: nodeRules.branch.src,
                    click: function () {
                        init("branch");
                    }
                }]
            }, {
                line: true
            }, {
                text: "属性",
                click: function () {
                    f_pro();
                }
            }, {
                line: true
            }, {
                text: "垂直对齐",
                click: function () {
                    setFlowNodeCss("left");
                }
            }, {
                text: "水平对齐",
                click: function () {
                    setFlowNodeCss("top");
                }
            }, {
                line: true
            }, {
                text: "删除选择",
                click: delSelectedFlowNode
            }, {
                text: "全反选",
                click: function () {
                    $(wf.flowNodes).each(function () {
                        $(this.element).removeClass("flownode-selected");
                    });
                }
            }, {
                text: "全选",
                click: function () {
                    $(wf.flowNodes).each(function () {
                        $(this.element).addClass("flownode-selected");
                    });
                }
            }]
        }); /** @type {boolean} */
        var C = false;
        $label.bind("contextmenu", function (event) {
            var _btn = event.target || event.srcElement; /** @type {boolean} */
            C = false;
            if (_btn.className == "handle") {
                var data = wf.findFlowNodeByElement($(_btn).parent()[0]);
                if (data) {
                    wf.selectFlowNode(data); /** @type {boolean} */
                    C = true;
                }
            }
            posX = event.pageX;
            y = event.pageY;
            box_clone_next2.show({
                top: y,
                left: posX
            });
            return false;
        });
    }
    /**
	 * @param {string} side
	 * @return {undefined}
	 */

    function setFlowNodeCss(side) { /** @type {null} */
        var margine = null; /** @type {number} */
        var i = wf.flowNodes.length - 1;
        for (; i >= 0; i--) {
            var mouseEventData = wf.flowNodes[i];
            if ($(mouseEventData.element).hasClass("flownode-selected")) {
                margine = margine || $(mouseEventData.element).css(side);
                $(mouseEventData.element).css(side, margine);
            }
        }
        jsPlumb.repaintEverything();
    }
    /**
	 * @return {undefined}
	 */

    function delSelectedFlowNode() { /** @type {number} */
        var i = wf.flowNodes.length - 1;
        for (; i >= 0; i--) {
            var msg = wf.flowNodes[i];
            if ($(msg.element).hasClass("flownode-selected")) {
                $(msg.endPoints).each(function () {
                    try {
                        jsPlumb.deleteEndpoint(this);
                    } catch ($) { }
                });
                $(msg.element).remove();
                wf.flowNodes.splice(i, 1);
            }
        }
    }
    /**
	 * @param {string} code
	 * @return {?}
	 */

    function parse(code) {
        try { /** @type {null} */
            var v = null;
            eval("v = " + code + ";");
            return v;
        } catch (e) {
            return null;
        }
    }
    /**
	 * @param {string} aShortcut
	 * @return {?}
	 */

    function converNumber(aShortcut) {
        var p = aShortcut.replace(/[a-zA-Z]+/g, "");
        return parseInt(p || "0");
    }
    /**
	 * @return {undefined}
	 */

    function dataInit() {
        /**
		 * @param {?} source
		 * @param {?} target
		 * @return {?}
		 */

        function remove(source, target) { /** @type {number} */
            var i = 0;
            for (; i < links.length; i++) {
                if (links[i].source == source && links[i].target == target) {
                    return true;
                }
            }
            return false;
        }
        var obj = wf.data;
        if (!obj) {
            return;
        }
        if (typeof obj == "string") {
            obj = parse(obj);
        }
        $(obj.nodes).each(function (canCreateDiscussions, data) {
            var B = nodeRules[data.nodeType];
            var search = $.extend(true, {}, data);
            wf.addFlowNode(search); /** @type {number} */
            uuidTag = Math.max(converNumber(search.id), uuidTag);
        }); /** @type {!Array} */
        var links = []; /** @type {number} */
        var i = 0;
        for (; i < obj.connections.length; i++) {
            var e = obj.connections[i];
            try {
                if (remove(e.source, e.target)) {
                    continue;
                }
                links.push({
                    source: e.source,
                    target: e.target
                });
                jsPlumb.connect({
                    uuids: [e.source, e.target]
                });
            } catch (C) { }
        } /** @type {number} */
        i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var msg = wf.flowNodes[i];
            $(msg.endPoints).each(function () {
                if (this.connections) {
                    $(this.connections).each(function () { });
                }
            });
        }
    }
    /**
	 * @param {!NodeList} args
	 * @return {?}
	 */

    function getConnectionCount(args) { /** @type {number} */
        var shtStart = 0; /** @type {number} */
        var i = 0;
        var arg_count = args.length;
        for (; i < arg_count; i++) {
            var obj = args[i];
            if (obj.connections && obj.connections.length) {
                shtStart = shtStart + obj.connections.length;
            }
        }
        return shtStart;
    }
    /**
	 * @return {?}
	 */

    function getFlowNodesData() { /** @type {!Array} */
        var s2_options = []; /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var sectionDescription = wf.flowNodes[i];
            s2_options.push({
                id: sectionDescription.id,
                text: sectionDescription.properties.text
            });
        }
        return {
            data: s2_options
        };
    }
    /**
	 * @return {?}
	 */

    function getConnectedFlowNodesData() { /** @type {!Array} */
        var s2_options = []; /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var msg = wf.flowNodes[i];
            if (msg == wf.selectedFlowNode) {
                $(msg.endPoints).each(function () {
                    if (this.connections) {
                        $(this.connections).each(function () {
                            if ($(this.target).attr("data-id") == msg.id) {
                                return;
                            }
                            s2_options.push({
                                id: $(this.target).attr("data-id"),
                                text: $(this.target).find(".nodename").text()
                            });
                        });
                    }
                });
            }
        }
        return {
            data: s2_options
        };
    }
    /**
	 * @return {?}
	 */

    function getGuidGenerator() {
        /**
		 * @return {?}
		 */
        var s4 = function () {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1);
        };
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }
    /**
	 * @param {string} callback
	 * @param {?} scopeIn
	 * @return {?}
	 */

    function createUuid(callback, scopeIn) {
        var clojIsReversed = callback.substring(0, 1).toUpperCase() + ++uuidTag;
        for (; existUuid(clojIsReversed) ;) {
            clojIsReversed = callback.substring(0, 1).toUpperCase() + ++uuidTag;
        }
        return clojIsReversed;
    }
    /**
	 * @param {string} s
	 * @param {string} hash
	 * @return {?}
	 */

    function createAnchorId(s, hash) { /** @type {string} */
        var id = hash ? "-" + hash : "";
        return s + id;
    }
    /**
	 * @param {?} isSlidingUp
	 * @return {?}
	 */

    function existUuid(isSlidingUp) { /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var msg = wf.flowNodes[i]; /** @type {number} */
            var id = 0;
            for (; id < msg.endPoints.length; id++) {
                var proxy = msg.endPoints[id];
                if (proxy.getUuid() == isSlidingUp) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
	 * @return {?}
	 */

    function createEndPointName() {
        for (; existEndPointName(++endPointCount) ;) { }
        return "endpoint" + endPointCount;
    }
    /**
	 * @param {number} collectionName
	 * @return {?}
	 */

    function existEndPointName(collectionName) { /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var collection = wf.flowNodes[i];
            if (collection.name == "endpoint" + collectionName) {
                return true;
            }
        }
        return false;
    }
    var id = pbc.getQueryStringByName("id"); /** @type {boolean} */
    var isViewType = pbc.getQueryStringByName("view") ? true : false; /** @type {null} */
    var pageForm = null; /** @type {null} */
    var currentWorkflowBulider = null;
    window.wf = window.wf || {};
    /**
	 * @param {?} customOptions
	 * @return {undefined}
	 */
    window.workflowBulider = function (customOptions) {
        currentWorkflowBulider = this;
        this.options = $.extend({
            desginModel: true
        }, customOptions);
    };
    /**
	 * @return {undefined}
	 */
    workflowBulider.prototype.render = function () {
        /**
		 * @return {undefined}
		 */

        function autoFitWindowHeight() {
            if (self.options.desginModel) {
                self.jelement.height($(window).height() - 80 - self.jelement.offset().top);
            }
        }
        var self = this;
        var o = this.options; /** @type {!Array} */
        var outChance = [];
        outChance.push('<div class="wfpanel">');
        outChance.push('    <div id="drawToolbar" class="drawToolbar" >');
        outChance.push('        <div class="ne-btn btnSwitchMode left">显示/隐藏 连接点</div>');
        outChance.push('        <img src="Contents/workflow/images/circle.png" title="开始" data-nodetype="start" />');
        outChance.push('        <img src="Contents/workflow/images/square.png" title="活动环节"  data-nodetype="active" />');
        outChance.push('        <img src="Contents/workflow/images/ling.png" title="条件分支" data-nodetype="branch" />  ');
        outChance.push('        <img src="Contents/workflow/images/circle2.png" title="结束" data-nodetype="end" />');
        outChance.push('         <div class="ne-btn btnCheck left" style="margin-left:20px;">检查</div> ');
        outChance.push('         <div class="ne-btn btnPro left">节点属性</div> ');
        outChance.push("   </div>");
        outChance.push('<div id="drawPanel" style="overflow-y:auto" class="drawPanel selectMode">');
        outChance.push('<div class="drawPanelinner">');
        outChance.push('   <div class="l-clear"></div>');
        outChance.push("   </div>");
        outChance.push("</div>");
        outChance.push("</div>");
        self.jelement = $(outChance.join(""));
        self.jelement.find("img").each(function () {
            $(this).attr("src", pbc.toUrl($(this).attr("src")));
        });
        self.jelement.appendTo(o.renderTo);
        var D = self.jelement.find("#drawPanel");
        self.jelement.find(".btnSwitchMode").click(f_switchMode);
        self.jelement.find(".btnCheck").click(f_check);
        self.jelement.find(".btnSave").click(f_save);
        self.jelement.find(".btnPro").click(f_pro);
        self.jelement.find(".btnDelLine").click(f_delline);
        self.jelement.parents(".ui-tabs-panel:first").css("padding", 0);
        self.jelement.parents("li:first").css("padding", 0);
        if (o.desginModel) {
            D.width($(window).width() * 1 - 40);
            D.height($(window).height() - D.offset().top - 10);
            D.find(".drawPanelinner").height(8888);
            jsPlumb.bind("click", function (conn, canCreateDiscussions) {
                if (confirm("是否删除连线?")) {
                    jsPlumb.detach(conn);
                }
            });
        } else {
            self.jelement.find(".drawToolbar").remove();
        }
        $("body").addClass("connectMode");
        $(window).resize(autoFitWindowHeight);
        autoFitWindowHeight();
        wf.init();
    };
    /**
	 * @param {!Object} project
	 * @return {undefined}
	 */
    workflowBulider.prototype.show = function (project) {
        var A = this;
        var options = this.options; /** @type {!Object} */
        wf.data = project;
        wf.show();
    };
    /**
	 * @return {?}
	 */
    workflowBulider.prototype.getValue = function () {
        var _ = this;
        var options = this.options;
        wf.save();
        return wf.data;
    };
    jsPlumb.importDefaults({
        DragOptions: {
            cursor: "pointer",
            zIndex: 2000
        },
        EndpointStyles: [{
            fillStyle: "#225588"
        }, {
            fillStyle: "#558822"
        }],
        Endpoints: [
			["Dot",
			{
			    radius: 7
			}],
			["Dot",
			{
			    radius: 11
			}]
        ],
        ConnectionOverlays: [
			["Arrow",
			{
			    location: 0.99,
			    length: 10,
			    width: 15
			}],
			["Label",
			{
			    location: 0.1,
			    id: "label",
			    cssClass: "aLabel"
			}]
        ]
    });
    var connectorPaintStyle = {
        lineWidth: 1,
        strokeStyle: "#000000",
        joinstyle: "round"
    };
    var connectorHoverStyle = {
        lineWidth: 1,
        strokeStyle: "red"
    };
    var sourceEndpoint = {
        endpoint: "Dot",
        paintStyle: {
            fillStyle: "#225588",
            radius: 5
        },
        isSource: true,
        connector: ["Flowchart",
		{
		    stub: 40
		}],
        connectorStyle: connectorPaintStyle,
        hoverPaintStyle: {
            fillStyle: "#225588",
            radius: 7
        },
        maxConnections: -1,
        connectorHoverStyle: connectorHoverStyle
    };
    var targetEndpoint = {
        endpoint: "Dot",
        paintStyle: {
            fillStyle: "#225588",
            radius: 5
        },
        hoverPaintStyle: {
            fillStyle: "#225588",
            radius: 7
        },
        maxConnections: -1,
        dropOptions: {
            hoverClass: "hover",
            activeClass: "active"
        },
        isTarget: true
    };
    jsPlumb.bind("jsPlumbConnection", function (canCreateDiscussions, isSlidingUp) { }); /** @type {!Array} */
    var executorTypes = [{
        id: "1",
        text: "所有人"
    }, {
        id: "2",
        text: "指定人"
    }, {
        id: "3",
        text: "发起人"
    }, {
        id: "4",
        text: "发起人领导"
    }, {
        id: "5",
        text: "上一步骤处理人"
    }]; /** @type {!Array} */
    var handlerType = [{
        id: "1",
        text: "抢占"
    }, {
        id: "3",
        text: "同时"
    }, {
        id: "4",
        text: "会签"
    }]; /** @type {!Array} */
    var backType = [{
        id: "1",
        text: "退回前一个步骤"
    }, {
        id: "2",
        text: "退回第一个步骤"
    }, {
        id: "3",
        text: "前序环节"
    }, {
        id: "4",
        text: "所有前序环节"
    }, {
        id: "5",
        text: "指定环节"
    }];
    connectorPaintStyle = {
        lineWidth: 1,
        strokeStyle: "#000000",
        joinstyle: "round"
    };
    connectorHoverStyle = {
        lineWidth: 1,
        strokeStyle: "red"
    };
    var endpoint = {
        endpoint: "Dot",
        paintStyle: {
            fillStyle: "#225588",
            radius: 5
        },
        connectorStyle: connectorPaintStyle,
        connector: ["Flowchart",
		{
		    stub: 40
		}],
        hoverPaintStyle: {
            fillStyle: "#225588",
            radius: 7
        },
        maxConnections: -1,
        connectorHoverStyle: connectorHoverStyle
    };
    var nodeRules = {
        start: {
            src: pbc.toUrl("Contents/workflow/images/circle.png"),
            srcComplete: pbc.toUrl("Contents/workflow/images/circle3.png"),
            srcRunning: pbc.toUrl("Contents/workflow/images/circle4.png"),
            text: "开始节点",
            anchor: ["TopCenter", "LeftMiddle", "RightMiddle", "BottomCenter"],
            options: {
                maxConnections: -1,
                isSource: true,
                isTarget: false
            },
            properties: {
                fields: [{
                    label: "显示名",
                    name: "text",
                    width: 400,
                    type: "text"
                }, {
                    newline: true,
                    label: "回退代办标题",
                    name: "backToDoTitleRule",
                    type: "text",
                    width: 400
                }, {
                    newline: true,
                    label: "表单视图名",
                    name: "formName",
                    type: "text",
                    width: 400
                }, {
                    label: "备注",
                    name: "remark",
                    type: "text",
                    width: 400,
                    editor: {
                        height: 50
                    }
                }]
            }
        },
        end: {
            src: pbc.toUrl("Contents/workflow/images/circle2.png"),
            srcComplete: pbc.toUrl("Contents/workflow/images/circle3.png"),
            text: "结束节点",
            anchor: ["TopCenter", "LeftMiddle", "RightMiddle", "BottomCenter"],
            properties: {
                fields: [{
                    label: "显示名",
                    name: "text",
                    width: 400,
                    type: "text"
                }, {
                    newline: true,
                    label: "表单视图名",
                    name: "formName",
                    type: "text",
                    width: 400
                }, {
                    label: "备注",
                    name: "remark",
                    type: "text",
                    width: 400,
                    editor: {
                        height: 50
                    }
                }]
            },
            options: {
                maxConnections: -1,
                isTarget: true,
                isSource: false
            }
        },
        active: {
            src: pbc.toUrl("Contents/workflow/images/square.png"),
            srcComplete: pbc.toUrl("Contents/workflow/images/square3.png"),
            srcRunning: pbc.toUrl("Contents/workflow/images/square4.png"),
            srcBack: pbc.toUrl("Contents/workflow/images/square5.png"),
            text: "活动环节",
            anchor: ["TopCenter", "LeftMiddle", "RightMiddle", "BottomCenter"],
            defaultValue: {
                handlerType: "1",
                backType: "1",
                backIsReturn: "0",
                nextConfirm: "1",
                allowSetExecutor: "1"
            },
            properties: {
                tab: {
                    items: [{
                        title: "基本",
                        fields: [{
                            label: "显示名",
                            name: "text",
                            width: 400,
                            type: "text"
                        }, {
                            newline: false,
                            label: "协同策略",
                            name: "handlerType",
                            type: "select",
                            editor: {
                                data: handlerType
                            }
                        }, {
                            newline: true,
                            label: "退回策略",
                            name: "backType",
                            type: "select",
                            editor: {
                                data: backType
                            }
                        }, {
                            newline: false,
                            width: 20,
                            label: "原路返回",
                            name: "backIsReturn",
                            type: "checkbox"
                        }, {
                            newline: true,
                            label: "代办标题规则",
                            name: "toDoTitleRule",
                            type: "text",
                            width: 400
                        }, {
                            newline: true,
                            label: "回退代办标题",
                            name: "backToDoTitleRule",
                            type: "text",
                            width: 400
                        }, {
                            newline: true,
                            label: "表单视图名",
                            name: "formName",
                            type: "text",
                            width: 400
                        }, {
                            label: "备注",
                            name: "remark",
                            type: "text",
                            width: 400,
                            editor: {
                                height: 50
                            }
                        }]
                    }, {
                        title: "参与者",
                        fields: [{
                            label: "部门",
                            name: "executorDepartment",
                            type: "ref_popupselect_mul",
                            textField: "executorDepartment_textfield",
                            newline: true,
                            width: 400,
                            editor: {
                                many2many: true,
                                css: "combobox-selector",
                                popupselect_ismul: true,
                                valueField: "Id",
                                textField: "Name",
                                popupselect_type: "popupselect",
                                popupselect_url: "/web/main/?model=organization&viewtype=list",
                                popupselect_width: "1000",
                                popupselect_height: "700",
                                popupselect_title: "选择部门 "
                            }
                        }, {
                            label: "角色",
                            name: "executorRole",
                            type: "ref_popupselect_mul",
                            textField: "executorRole_textfield",
                            newline: true,
                            width: 400,
                            editor: {
                                many2many: true,
                                css: "combobox-selector",
                                popupselect_ismul: true,
                                valueField: "Id",
                                textField: "Name",
                                popupselect_type: "popupselect",
                                popupselect_url: "/web/main/?model=role&viewtype=list",
                                popupselect_width: "1000",
                                popupselect_height: "700",
                                popupselect_title: "选择角色 "
                            }
                        }, {
                            label: "用户",
                            name: "executorUser",
                            type: "ref_popupselect_mul",
                            textField: "executorUser_textfield",
                            newline: true,
                            width: 400,
                            editor: {
                                many2many: true,
                                css: "combobox-selector",
                                popupselect_ismul: true,
                                valueField: "Id",
                                textField: "Name",
                                popupselect_type: "popupselect",
                                popupselect_url: "/web/main/?model=user&viewname=list",
                                popupselect_width: "1000",
                                popupselect_height: "700",
                                popupselect_title: "选择用户 "
                            }
                        }, {
                            label: "与当前用户同角色",
                            labelWidth: "auto",
                            width: 20,
                            name: "sampleRole",
                            type: "checkbox",
                            width: 30,
                            group: "过滤规则",
                            newline: true
                        }, {
                            label: "与当前用户同部门",
                            labelWidth: "auto",
                            width: 20,
                            labelWidth: "auto",
                            name: "sampleDepartment",
                            type: "checkbox",
                            group: "过滤规则",
                            newline: false
                        }]
                    }]
                }
            },
            options: {
                maxConnections: -1,
                isSource: true,
                isTarget: true
            }
        },
        branch: {
            src: pbc.toUrl("Contents/workflow/images/ling.png"),
            srcComplete: pbc.toUrl("Contents/workflow/images/ling3.png"),
            text: "条件分支环节",
            nodeImgStyle: {
                width: 100
            },
            anchor: ["TopCenter", "LeftMiddle", "RightMiddle", "BottomCenter"],
            properties: {
                fields: [{
                    label: "显示名",
                    name: "text",
                    type: "text",
                    width: 420
                }, {
                    label: "判断规则",
                    name: "conditionRule",
                    type: "conditionRule",
                    width: 420
                }, {
                    label: "值为真",
                    name: "trueFlowNode",
                    type: "select",
                    editor: {
                        many2one: true,
                        ext: getConnectedFlowNodesData
                    }
                }, {
                    label: "值为假",
                    name: "falseFlowNode",
                    type: "select",
                    editor: {
                        many2one: true,
                        ext: getConnectedFlowNodesData
                    }
                }, {
                    label: "备注",
                    name: "remark",
                    type: "text",
                    width: 420,
                    editor: {
                        height: 50
                    }
                }]
            },
            options: {
                maxConnections: -1,
                isSource: true,
                isTarget: true
            }
        }
    };
    /**
	 * @return {undefined}
	 */
    wf.init = function () {
        var self = currentWorkflowBulider;
        var uploadOptions = self.options; /** @type {null} */
        wf.selectedFlowNode = null; /** @type {!Array} */
        wf.flowNodes = [];
        $(".drawToolbar img", self.jelement).click(function () {
            var nodetype = $(this).attr("data-nodetype");
            if (wf.selectedFlowNode) {
                var yearOffset = $(wf.selectedFlowNode.element).css("left");
                var languageOffsetY = parseFloat($(wf.selectedFlowNode.element).css("top")) + $(wf.selectedFlowNode.element).height() + 50;
                var $scope = wf.addFlowNode({
                    nodeType: nodetype,
                    x: yearOffset,
                    y: languageOffsetY
                });
                var srcEndpointUuid = wf.selectedFlowNode.endPoints[wf.selectedFlowNode.endPoints.length - 1].getUuid();
                var dstEndpointUuid = $scope.endPoints[0].getUuid();
                jsPlumb.connect({
                    uuids: [srcEndpointUuid, dstEndpointUuid]
                });
            } else { /** @type {number} */
                var audioOffsetX = 400; /** @type {number} */
                var languageOffsetY = 100;
                wf.addFlowNode({
                    nodeType: nodetype,
                    x: audioOffsetX,
                    y: languageOffsetY
                });
            }
        });
        contextMenuInit();
        keyInit();
    };
    /**
	 * @return {undefined}
	 */
    wf.show = function () {
        dataInit();
    };
    /**
	 * @param {string} xhr
	 * @return {undefined}
	 */
    wf.showError = function (xhr) {
        $.ligerDialog.error(xhr);
    };
    /**
	 * @return {?}
	 */
    wf.check = function () { /** @type {number} */
        var i = wf.flowNodes.length - 1;
        for (; i >= 0; i--) {
            var msg = wf.flowNodes[i];
            var $ = getConnectionCount(msg.endPoints);
            var A = nodeRules[msg.nodeType];
            if ($ == 0) {
                wf.showError("存在孤立节点");
                return false;
            }
        }
    }; /** @type {null} */
    var currentDragNode = null;
    /**
	 * @param {!Object} p
	 * @return {?}
	 */
    wf.addFlowNode = function (p) {
        var self = currentWorkflowBulider;
        var uploadOptions = self.options;
        if (!nodeRules[p.nodeType]) {
            return;
        }
        var flowRow = $(".drawPanel .drawPanelinner", self.jelement);
        var type = p.nodeType;
        var options = nodeRules[p.nodeType];
        var X = p.x;
        var Y = p.y;
        if (!type) {
            return;
        }
        var element = $('<div class="flownode" style="position:absolute;"><div class="nodename"></div><img src="" /></div>');
        if (uploadOptions.desginModel) {
            element.append('<div class="handle"></div><div class="corner topLeft"></div><div class="corner topMiddle"></div><div class="corner topRight"></div><div class="corner bottomLeft"></div><div class="corner bottomMiddle"></div><div class="corner bottomRight"></div><div class="corner middleLeft"></div><div class="corner middleRight"></div>');
        }
        if (options.nodeStyle) {
            element.css(options.nodeStyle);
        }
        if (options.nodeImgStyle) {
            element.find("img").css(options.nodeImgStyle);
        }
        if (p.width) {
            element.find("img").css({
                width: p.width
            });
        }
        if (p.height) {
            element.find("img").css({
                height: p.height
            });
        }
        element.css({
            left: X,
            top: Y
        });
        var url = options.src;
        if (p.status && p.status.toUpperCase() == "COMPLETED") {
            url = options.srcComplete;
        } else {
            if (p.status && p.status.toUpperCase() == "RUNNING") {
                url = options.srcRunning;
            } else {
                if (p.status && p.status == "BACK") {
                    url = options.srcBack;
                }
            }
        }
        element.find("img").attr("src", url);
        element.appendTo(flowRow);
        element.height(element.find("img").height());
        $(".handle", element).height($(element).height() - 5);
        if (uploadOptions.desginModel) { /** @type {boolean} */
            var H = false; /** @type {boolean} */
            var F = false;
            element.bind("click", function () {
                if (F) {
                    flash._stop();
                }
                if ($(this).hasClass("flownode-selected")) {
                    wf.unSelectFlowNode(data);
                } else {
                    wf.selectFlowNode(data);
                    if (H) {
                        element.draggable("cancel"); /** @type {boolean} */
                        H = false;
                    }
                }
            });
            var flash = element.ligerResizable({
                scope: 5,
                minWidth: 40,
                minHeight: 40,
                onstartResize: function () { /** @type {boolean} */
                    F = true;
                },
                onstopResize: function () { /** @type {boolean} */
                    F = false;
                    var trooper = $(this.target).find("img");
                    this._applyResize(trooper);
                    element.height(trooper.height());
                },
                onEndResize: function () {
                    $(this.target).css({
                        width: "auto"
                    });
                    $(this.target).find("img").css({
                        top: 0,
                        left: 0
                    });
                    $(".handle", element).height($(element).height() - 5);
                    jsPlumb.repaintEverything();
                }
            });
            jsPlumb.draggable(element, {
                start: function () { /** @type {boolean} */
                    H = true;
                    currentDragNode = element;
                    wf.unSelectFlowNode(data);
                },
                end: function () { /** @type {boolean} */
                    H = false;
                },
                grid: [20, 20],
                handle: ".handle"
            });
        }
        var data = {
            element: element[0],
            nodeType: type,
            endPoints: [],
            id: p.id || createUuid(p.nodeType),
            name: p.name || createEndPointName()
        };
        data.properties = p.properties || $.extend({}, options.defaultValue, {
            text: p.text || options.text
        });
        element.attr("data-name", data.name);
        element.attr("data-id", data.id);
        element.find(".nodename").html(data.properties.text);
        if (p.endpoints) {
            $(p.endpoints).each(function (canCreateDiscussions, json) {
                try {
                    data.endPoints.push(jsPlumb.addEndpoint(element, $.extend({}, endpoint, options.options), {
                        anchor: json.anchor,
                        uuid: json.uuid
                    }));
                } catch (A) { }
            });
        } else {
            $(options.anchor).each(function (canCreateDiscussions, position) {
                try {
                    data.endPoints.push(jsPlumb.addEndpoint(element, $.extend({}, endpoint, options.options), {
                        anchor: position,
                        uuid: createAnchorId(data.id, position)
                    }));
                } catch (A) { }
            });
        }
        wf.flowNodes.push(data);
        return data;
    };
    /**
	 * @param {!Object} _
	 * @return {undefined}
	 */
    wf.unSelectFlowNode = function (_) {
        $(_.element).removeClass("flownode-selected"); /** @type {null} */
        wf.selectedFlowNode = null;
    };
    /**
	 * @param {!Object} _
	 * @return {undefined}
	 */
    wf.selectFlowNode = function (_) {
        $("div.flownode-selected").removeClass("flownode-selected");
        $(_.element).addClass("flownode-selected"); /** @type {!Object} */
        wf.selectedFlowNode = _;
    };
    /**
	 * @return {undefined}
	 */
    wf.showFlowNodePro = function () {
        /**
		 * @param {?} depend_offs
		 * @return {undefined}
		 */

        function fn(depend_offs) {
            $(depend_offs).each(function () {
                if (this.name == "handlerType") {
                    this.editor = this.editor || {};
                    /**
					 * @param {?} event
					 * @return {undefined}
					 */
                    this.editor.onSelected = function (event) { };
                }
            });
        }
        if (wf.currentPropertyForm) {
            wf.currentPropertyForm.destroy();
        }
        if (wf.flowNodeWin) {
            wf.flowNodeWin.close();
        }
        var context = wf.selectedFlowNode;
        if (!context) {
            return;
        }
        var HighchartBetweenPoints = nodeRules[context.nodeType];
        var $quantity = $('<div style="margin:3px;height:340px;margin-bottom:45px;overflow:auto;"><div class="form"></div><div class="footerbtns"><a class="ne-btn ne-btn-blue btnSave">确定</a><a class="ne-btn btnClose">取消</a></div></div>');
        var serializerManager = $quantity.find(".form");
        wf.flowNodeWin = $.ligerDialog.open({
            title: "编辑 节点属性",
            target: $quantity,
            width: 710,
            height: "auto",
            top: 100
        });
        $quantity.parents(".l-dialog-content").css("padding", 0);
        var options = $.extend(true, {
            labelWidth: 100,
            inputWidth: 140
        }, HighchartBetweenPoints.properties);
        pbc.preOptions(options);
        fn(options.fields);
        if (options.tab && options.tab.items) {
            $(options.tab.items).each(function () {
                fn(this.fields);
            });
        }
        wf.currentPropertyForm = serializerManager.ligerForm(options);
        $quantity.find(".btnSave").click(function () {
            wf.proSave();
            wf.currentPropertyForm.destroy();
            wf.flowNodeWin.close();
        });
        $quantity.find(".btnClose").click(function () {
            wf.currentPropertyForm.destroy();
            wf.flowNodeWin.close();
        });
        wf.currentPropertyForm.setData(context.properties);
        serializerManager.find(".l-text-focus").removeClass("l-text-focus");
    };
    /**
	 * @return {undefined}
	 */
    wf.proSave = function () {
        var mouseEventData = wf.selectedFlowNode;
        var store_scrEncounter = wf.currentPropertyForm;
        if (!store_scrEncounter) {
            return;
        }
        mouseEventData.properties = store_scrEncounter.getData();
        $(mouseEventData.element).find(".nodename").html(mouseEventData.properties.text);
    };
    /**
	 * @param {?} elem
	 * @return {?}
	 */
    wf.findFlowNodeByElement = function (elem) { /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var cell = wf.flowNodes[i];
            if (cell.element == elem) {
                return cell;
            }
        }
        return null;
    };
    /**
	 * @return {undefined}
	 */
    wf.save = function () {
        /**
		 * @param {?} uuid
		 * @return {?}
		 */

        function get(uuid) { /** @type {number} */
            var i = 0;
            for (; i < tempArray.length; i++) {
                var _dd = tempArray[i].endpoints; /** @type {number} */
                var j = 0;
                for (; j < _dd.length; j++) {
                    if (_dd[j].uuid == uuid) {
                        return true;
                    }
                }
            }
            return false;
        } /** @type {!Array} */
        var tempArray = []; /** @type {!Array} */
        var c = []; /** @type {number} */
        var i = 0;
        var patchLen = wf.flowNodes.length;
        for (; i < patchLen; i++) {
            var node = wf.flowNodes[i];
            var stubobject = $(node.element);
            var data = {
                nodeType: node.nodeType,
                x: stubobject.css("left"),
                y: stubobject.css("top"),
                width: stubobject.width(),
                id: node.id,
                height: stubobject.height(),
                properties: node.properties,
                endpoints: []
            };
            $(node.endPoints).each(function (canCreateDiscussions, endpoint) {
                var serviceOut = {
                    anchor: endpoint.anchor.type,
                    uuid: endpoint.getUuid()
                };
                data.endpoints.push(serviceOut);
            });
            tempArray.push(data);
        }
        var current_season = jsPlumb.getConnections();
        $(current_season).each(function () {
            var error = this.endpoints[0].getUuid();
            var uuid = this.endpoints[1].getUuid();
            if (!get(error) || !get(uuid)) {
                return;
            }
            c.push({
                source: error,
                target: uuid
            });
        });
        var tmpData2 = liger.toJSON({
            nodes: tempArray,
            connections: c
        });
        wf.data = tmpData2;
    }; /** @type {number} */
    var uuidTag = 10000; /** @type {number} */
    var endPointCount = 0;
    $.ligerDefaults.Form.editors["conditionRule"] = {
        create: function (placeholder, delegate) {
            var exportedP1 = pageForm.getEditor("ModelName");
            var child_name = exportedP1.getValue();
            if (!child_name) {
                return null;
            }
            var aPanel = new pbc.modelFilterBuilder({
                renderTo: placeholder,
                modelName: child_name
            });
            aPanel.render();
            placeholder.find(".filterpanel,.filter").css("margin", 0);
            return aPanel;
        },
        getValue: function (code, material) {
            if (!code) {
                return null;
            }
            return code.getValue();
        },
        setValue: function (val, num, digits) {
            if (!val) {
                return;
            }
            val.setValue(num);
        },
        resize: function (byHeight, options, callback, type) { }
    };
    $.ligerDefaults.Form.editors["wfDesgin"] = {
        create: function (placeholder, delegate) {
            pageForm = this;
            var aPanel = new workflowBulider({
                renderTo: placeholder
            });
            aPanel.render();
            return aPanel;
        },
        getValue: function (code, material) {
            return code.getValue();
        },
        setValue: function (left, _, text) {
            left.show(_);
        },
        resize: function (byHeight, options, callback, type) { }
    };
})(jQuery);