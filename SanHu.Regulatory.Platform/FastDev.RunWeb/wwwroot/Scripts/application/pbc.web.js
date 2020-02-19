'use strict';
(function ($) {
    /**
	 * @param {string} url
	 * @return {?}
	 */

    function urlToObject(url) {
        var urlObject = {};
        if (/\?/.test(url)) {
            var componentsStr = url.substring(url.indexOf("?") + 1);
            var input = componentsStr.split("&"); /** @type {number} */
            var a = 0;
            var Del = input.length;
            for (; a < Del; a++) {
                var value = input[a];
                var item = value.split("=");
                urlObject[item[0]] = value.substr(value.indexOf("=") + 1);
            }
        }
        return urlObject;
    }
    var current = {}; /** @type {boolean} */
    var enabledFrameElement = false;
    pbc.web = pbc.web || {};
    pbc.web.current = current;
    /**
	 * @param {?} module
	 * @return {undefined}
	 */
    pbc.web.setCurrent = function (module) {
        $.extend(current, module);
    };
    window.UEDITOR_HOME_URL = pbc.toUrl("Scripts/ueditor1_4_3/");
    /**
	 * @return {undefined}
	 */
    pbc.web.clearCurrentFilter = function () {
        $.extend(current, {
            filter: {
                rules: [],
                groups: [],
                op: "and"
            },
            filterIds: [],
            filterSearch: null,
            filterAdvanced: null
        });
    };
    pbc.web.status = {
        active: "Active",
        submitted: "Submitted",
        completed: "Completed"
    }; /** @type {!Array} */
    pbc.web.wfstatus = [{
        id: pbc.web.status.active,
        text: "草稿"
    }, {
        id: pbc.web.status.submitted,
        text: "已提交"
    }, {
        id: pbc.web.status.completed,
        text: "已完成"
    }];
    pbc.web.status_items = {
        active: "草稿",
        closed: "关闭",
        submitted: "已提交",
        completed: "已完成",
        rejected: "已拒绝",
        running: "进行中",
        canceled: "已取消",
        back: "已退回",
        approved: "已审批"
    }; /** @type {string} */
    pbc.web.status_items["void"] = "已作废";
    pbc.web.modeApi = {};
    pbc.web.helper = {};
    /**
	 * @param {!Object} id
	 * @param {(Node|NodeList|string)} path
	 * @return {?}
	 */
    pbc.web.helper.getTreeNode = function (id, path) {
        /**
		 * @param {!NodeList} obj
		 * @return {?}
		 */

        function replacer(obj) { /** @type {number} */
            var i = 0;
            for (; i < obj.length; i++) {
                if (id == undefined) {
                    return obj[i];
                }
                if (obj[i].id == id) {
                    return obj[i];
                }
                var all = obj[i].children;
                if (all && all.length) {
                    var replaced = replacer(all);
                    if (replaced) {
                        return replaced;
                    }
                }
            }
            return null;
        }
        return replacer(path);
    };
    /**
	 * @param {!Object} name
	 * @param {(Node|string)} groups
	 * @return {?}
	 */
    pbc.web.helper.getTreeChildren = function (name, groups) {
        /**
		 * @param {!NodeList} arr
		 * @return {undefined}
		 */

        function filter(arr) {
            if (!arr || !arr.length) {
                return;
            } /** @type {number} */
            var i = 0;
            for (; i < arr.length; i++) {
                doneFuncs.push(arr[i]);
                var sort = arr[i].children;
                if (sort && sort.length) {
                    filter(sort);
                }
            }
        }
        var options = pbc.web.helper.getTreeNode(name, groups);
        if (!options) {
            return null;
        } /** @type {!Array} */
        var doneFuncs = [];
        filter(options.children);
        return doneFuncs;
    };
    /**
	 * @param {!NodeList} array
	 * @param {?} func
	 * @return {?}
	 */
    pbc.web.helper.filterArray = function (array, func) {
        if (!array || !array.length) {
            return null;
        } /** @type {!Array} */
        var result = []; /** @type {number} */
        var i = 0;
        for (; i < array.length; i++) {
            if (func(array[i])) {
                result.push(array[i]);
            }
        }
        return result;
    };
    /**
	 * @param {!NodeList} r
	 * @param {?} $
	 * @return {?}
	 */
    pbc.web.helper.first = function (r, $) {
        if (!r || !r.length) {
            return null;
        } /** @type {number} */
        var i = 0;
        for (; i < r.length; i++) {
            if ($(r[i])) {
                return r[i];
            }
        }
        return null;
    };
    /**
	 * @param {!NodeList} array
	 * @param {?} iterator
	 * @return {?}
	 */
    pbc.web.helper.any = function (array, iterator) {
        if (!array || !array.length) {
            return false;
        } /** @type {number} */
        var i = 0;
        for (; i < array.length; i++) {
            if (iterator(array[i])) {
                return true;
            }
        }
        return false;
    };
    /**
	 * @param {string} mixed
	 * @return {?}
	 */
    pbc.web.helper.getFileIconName = function (mixed) {
        if (mixed == "7z") {
            return "rar";
        }
        if ($.inArray(mixed, ["apk", "dir", "dir2", "doc", "exe", "file", "filelist", "ipa", "music", "ppt", "rar", "txt", "videio", "vsd", "xls", "pdf"]) != -1) {
            return mixed;
        }
        var methods = {
            zip: "rar",
            tar: "rar",
            gz: "rar",
            bz2: "rar",
            xlsx: "xls",
            docx: "doc",
            pptx: "ppt",
            md: "txt",
            json: "txt",
            htm: "txt",
            xml: "txt",
            html: "txt",
            js: "txt",
            css: "txt",
            php: "txt",
            jsp: "txt",
            asp: "txt",
            mp4: "video",
            swf: "video",
            mkv: "video",
            avi: "video",
            flv: "video",
            mov: "video",
            mpg: "video",
            mpeg: "video",
            ogv: "video",
            webm: "video",
            rm: "video",
            rmvb: "video",
            ogg: "music",
            wav: "music",
            wmv: "music",
            mid: "music",
            mp3: "music",
            jpg: "jpg",
            jpeg: "jpg",
            gif: "jpg",
            bmp: "jpg",
            png: "jpg",
            psd: "file"
        };
        if (methods[mixed]) {
            return methods[mixed];
        }
        return "file";
    };
    /**
	 * @return {undefined}
	 */
    pbc.web.log = function () { /** @type {string} */
        var msg = "[freedesign] " + Array.prototype.join.call(arguments, "");
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else {
            if (window.opera && window.opera.postError) {
                window.opera.postError(msg);
            }
        }
    };
    /**
	 * @param {!Object} options
	 * @param {string} sdkVersion
	 * @return {?}
	 */
    pbc.web.getViewDepends = function (options, sdkVersion) {
        var _ = this;
        var o = this.options; /** @type {!Array} */
        var tmpArray = ["qtip", "views_parts_excel"];
        if (options.form) {
            var arrayTarget = pbc.web.getFormDepends(options.form); /** @type {number} */
            var i = 0;
            for (; i < arrayTarget.length; i++) {
                if ($.inArray(arrayTarget[i], tmpArray) == -1) {
                    tmpArray.push(arrayTarget[i]);
                }
            }
        }
        var keyReads = options.search || options.condition;
        if (keyReads) {
            arrayTarget = pbc.web.getFormDepends(keyReads); /** @type {number} */
            i = 0;
            for (; i < arrayTarget.length; i++) {
                if ($.inArray(arrayTarget[i], tmpArray) == -1) {
                    tmpArray.push(arrayTarget[i]);
                }
            }
        }
        if (options.common && options.common.depends) {
            arrayTarget = options.common.depends; /** @type {number} */
            i = 0;
            for (; i < arrayTarget.length; i++) {
                if ($.inArray(arrayTarget[i], tmpArray) == -1) {
                    tmpArray.push(arrayTarget[i]);
                }
            }
        } /** @type {string} */
        var value = "link_" + (new Date).getTime();
        if (sdkVersion) {
            value = sdkVersion.replace(/\./g, "_").replace(/\//g, "_");
        }
        if (options.link && (options.link.scripts || options.link.links)) { /** @type {!Array} */
            var uri = [];
            var plugin = options.link;
            if (plugin.scripts) {
                $(plugin.scripts.split(",")).each(function (canCreateDiscussions, baseUri) {
                    baseUri = baseUri.replace(/\.js$/, "");
                    uri.push(baseUri);
                });
            }
            if (plugin.styles) {
                $(plugin.styles.split(",")).each(function () {
                    uri.push("css!" + value);
                });
            }
            tmpArray.push(value);
            var paths = {}; /** @type {!Array} */
            paths[value] = uri;
            require.config({
                paths: paths
            });
        }
        if (options.addins && options.addins.items) {
            $(options.addins.items).each(function (canCreateDiscussions, engineDiscovery) {
                tmpArray.push("addin_" + engineDiscovery.name);
            });
        }
        return tmpArray;
    };
    /**
	 * @param {!Object} options
	 * @return {?}
	 */
    pbc.web.getFormDepends = function (options) {
        /**
		 * @param {!Object} options
		 * @return {undefined}
		 */

        function initialize(options) {
            var key = pbc.type_equals[options.type] ? pbc.type_equals[options.type] : options.type;
            if (!key) {
                return;
            }
            if (options.grid && options.grid.columns) {
                $(options.grid.columns).each(function () {
                    if (this.editor && this.editor.type) {
                        var key = pbc.type_equals[this.editor.type] ? pbc.type_equals[this.editor.type] : this.editor.type;
                        if (!key) {
                            return;
                        }
                        if (pbc.web.modules[key]) {
                            sqlArgs.push(key);
                        }
                    }
                });
            }
            if (pbc.require.paths[key]) {
                sqlArgs.push(key);
            }
        }
        var B = this;
        var o = this.options; /** @type {!Array} */
        var sqlArgs = ["json", "validate", "form"];
        if (options) {
            $(options.fields).each(function () {
                initialize(this);
            });
            if (options.tab && options.tab.items) {
                $(options.tab.items).each(function () {
                    $(this.fields).each(function () {
                        initialize(this);
                    });
                });
            }
        }
        return sqlArgs;
    };
    /**
	 * @param {!Object} config
	 * @return {undefined}
	 */
    pbc.web.run = function (config) {
        /**
		 * @return {undefined}
		 */

        function init() {
            var opts = $.extend({
                onPageInit: config.service,
                dataset: options
            }, config.options);
            var name = config.type || "list";
            var vec__19764 = $(config.options.renderTo).attr("data-url");
            var _ = pbc.web.getViewDepends(opts, vec__19764);
            require(_, function () { /** @type {!Arguments} */
                var args = arguments;
                require(["views_" + name], function (Context) {
                    var ctx = new Context(opts); /** @type {number} */
                    var i = 0;
                    for (; args && i < args.length; i++) {
                        var a = args[i];
                        if (a && a.name && $.isFunction(a.run)) {
                            ctx.addins = ctx.addins || {};
                            ctx.addins[a.name] = a.run;
                        }
                    }
                    ctx.render();
                    opts.renderTo.page = ctx;
                    if (config.onRendered) {
                        config.onRendered();
                    }
                });
            });
        } /** @type {null} */
        var options = null;
        if (config.dataset) {
            pbc.ajax({
                url: pbc.toUrl(config.dataset),
                success: function (data) {
                    if (data.loginOut) { /** @type {string} */
                        location.href = "/login.html";
                        return;
                    }
                    options = data.data;
                    init();
                }
            });
        } else {
            options = {
                actions: [],
                user: {
                    rights: {
                        fun: {
                            enabledAdd: 1,
                            enabledDel: 1,
                            enabledEdit: 1,
                            enabledVisit: 1
                        }
                    }
                },
                workflow: {
                    enabled: false
                }
            };
            init();
        }
    };
    /**
	 * @param {string} newUrl
	 * @return {?}
	 */
    pbc.getNewUrl = function (newUrl) {
        var data = urlToObject(newUrl);
        var name = data["model"];
        var picKey = data["viewname"] || data["viewtype"]; /** @type {!Array} */
        var responseGroup = [];
        var a;
        for (a in data) {
            if (typeof a != "string") {
                continue;
            } /** @type {string} */
            var method = a.toLowerCase();
            if (method == "model" || method == "viewtype" || method == "viewname") {
                continue;
            }
            responseGroup.push(a + "=" + data[a]);
        } /** @type {string} */
        newUrl = "/pages/" + name + "/" + picKey + ".w";
        if (responseGroup.length) { /** @type {string} */
            newUrl = newUrl + ("?" + responseGroup.join("&"));
        }
        return newUrl;
    };
    pbc.openpage_options = pbc.openpage_options || {}; /** @type {function(string, string, !Function): ?} */
    pbc.web.openPage = pbc.openPage = function (url, type, callback) {
        /**
		 * @param {!Object} el
		 * @return {undefined}
		 */

        function init(el) {
            if (el.length) {
                var id = el.attr("id");
                if (!id) { /** @type {string} */
                    id = "p" + (new Date).getTime();
                    el.attr("id", id);
                }
                el.attr("data-url", file);
                el.get(0).openerData = options.openerData || {};
                if (callback) { /** @type {!Function} */
                    el.get(0).openerData.callback = callback;
                }
                if (op.tabid) {
                    el.get(0).openerData.tabid = op.tabid;
                }
                if (op.openerPage) {
                    el.get(0).openerData.openerPage = op.openerPage;
                }
            }
            if (console && console.log) {
                console.log("openpage:" + file);
            } /** @type {boolean} */
            var reverseValue = pbc.web.designer && pbc.web.designer.init ? true : false; /** @type {null} */
            var name = null;
            if (reverseIsSingle && reverseValue && !/application/.test(file) && !/\desingerApplication/.test(file)) {
                name = file.replace("/pages/", "").replace("pages/", "").replace(".w", "").replace(/\?(.*?)+/, "");
                name = "/designer/getjs?model=" + name.split("/")[0] + "&viewname=" + name.split("/")[1] + "&appid=" + pbc.getAppId();
            } else {
                file = file.replace(/\?[\s\S]*/, "");
                name = file.replace(/\.w$/, ".js");
                if (comment && name.indexOf("ver=") == -1) { /** @type {string} */
                    name = name + (name.indexOf("?") == -1 ? "?" : "&"); /** @type {string} */
                    name = name + ("ver=" + comment);
                }
            }
            try {
                require([name], function (val) {
                    pbc.runPage({
                        page: val,
                        jtarget: el,
                        options: options.options
                    });
                });
            } catch ($) {
                el.html("页面找不到：" + name);
            }
        }
        if (typeof url === "string") {
            url = {
                url: url
            };
        }
        var op;
        var options = op = url || {};
        if (type == undefined && options.renderTo) {
            type = options.renderTo;
            delete options.renderTo;
        } else {
            if (type === undefined) { /** @type {string} */
                type = "tab";
            }
        } /** @type {string} */
        var comment = "";
        if (options.url && options.url.indexOf("/web/main") != -1) {
            options.url = pbc.getNewUrl(options.url);
            pbc.openPage(options, type, callback);
            return;
        }
        var reverseIsSingle = options.url && (/\.w$/.test(options.url) || /\.w\?*(.*?)$/.test(options.url));
        var file = options.url;
        if (file && options.urlBind) {
            if (options.urlBind.filterData && !options.urlBind.filterData.rules && !options.urlBind.filterData.groups) {
                options.urlBind.filterData = pbc.createFilter(options.urlBind.filterData);
            }
            file = file + (file.indexOf("?") == -1 ? "?" : "&");
            file = file + ("bind=" + (new pbc.base64).encode(JSON.stringify(options.urlBind)));
        }
        if ((type === "tab" || type === "t") && pbc.tab) {
            var el = pbc.tab;
            op.text = op.text || op.title;
            if (el.isTabItemExist(op.tabid)) {
                item = $(".l-tab-content-item[tabid=" + op.tabid + "] .freedesignpage:first", el.tab.content);
                var currentScale = el.getTabItemTitle(op.tabid);
                var type = item.attr("data-url");
                el.selectTabItem(op.tabid);
                if (currentScale != op.text) {
                    el.setTabItemTitle(op.tabid, op.text);
                }
                if (type != file) {
                    if (reverseIsSingle) {
                        item.html("");
                        init(item);
                    } else {
                        el.setTabItemSrc(tabid, file);
                    }
                }
                return;
            }
            if (reverseIsSingle) { /** @type {null} */
                var D = null;
                item = $("<div class='ne-view freedesignpage'></div>");
                if (!op.tabid) { /** @type {number} */
                    op.tabid = (new Date).getTime();
                } /** @type {string} */
                op.url = "";
                op.target = item.get(0);
                op.target.tabOpener = el;
                el.addTabItem(op);
                init(item);
                /**
				 * @return {undefined}
				 */
                item.get(0).tabReload = function () {
                    item.html(""); /** @type {number} */
                    comment = (new Date).getTime();
                    file = item.attr("data-url");
                    init(item);
                };
            } else {
                el.addTabItem(options);
            }
        } else {
            if (type == "dialog" || type === "d" || (type === "tab" || type === "t") && !pbc.tab) {
                if (reverseIsSingle) {
                    var item = $("<div class='ne-view'></div>");
                    item.attr("data-url", file);
                    options.target = item; /** @type {null} */
                    options.url = null;
                    /**
					 * @return {undefined}
					 */
                    options.onLoaded = function () {
                        setTimeout(function () {
                            init(item);
                        }, 10);
                    };
                }
                var dialog = $.ligerDialog.open($.extend({
                    width: 800,
                    height: 600,
                    top: 100
                }, options));
                if (reverseIsSingle) {
                    item.get(0).dialog = dialog;
                }
                return dialog;
            } else {
                if (typeof type === "string") {
                    item = $(type);
                    item.attr("data-url", file);
                    init(item);
                } else {
                    if (type) {
                        item = type instanceof jQuery ? type : $(type);
                        item.attr("data-url", file);
                        init(item);
                    }
                }
            }
        }
    };
    /**
	 * @param {!Object} options
	 * @return {undefined}
	 */
    pbc.web.init = function (options) {
        this.options = options || {};
    };
    $.extend(pbc.web.init.prototype, {
        run: function () {
            var _ = this;
            var me = this.options || {};
            var options = me.pagedata;
            if (options) {
                options.view.model = options.model;
                options.view.renderTo = me.renderTo; /** @type {string} */
                var dataset = "/web/dataset?model=" + options.model.name + "&viewname=" + me.viewType;
                if (options.loadDataset === false) { /** @type {null} */
                    dataset = null;
                }
                pbc.web.run({
                    type: me.viewType,
                    onRendered: me.onRendered,
                    options: options.view,
                    dataset: dataset
                });
            }
        }
    });
    /**
	 * @param {!Object} params
	 * @return {undefined}
	 */
    pbc.runPage = function (params) {
        var config = params.page;
        var element = params.jtarget;
        var options = params.options;
        if (!(element instanceof jQuery)) {
            element = $(element);
        }
        if (config && config.cls) {
            element.addClass(config.cls);
        }
        if (config && config.options) {
            if (options) {
                $.extend(config.options, options);
            }
            config.options.renderTo = element.get(0);
            pbc.web.run(config);
            return;
        }
        element.parent().css("overflow", "auto");
        if (config && config.vue) {
            element.html(config.html);
            if ($.isFunction(config.vue)) {
                config.vue = config.vue();
            }
            var Head = $.extend({
                el: element.get(0)
            }, config.vue);
            new Vue(Head);
        } else {
            if (config && $.isFunction(config.run)) {
                config.run({
                    renderTo: element.get(0)
                });
            } else {
                if (config && $.isFunction(config)) {
                    config({
                        renderTo: element.get(0)
                    });
                }
            }
        }
    };
    /**
	 * @param {string} modules
	 * @param {?} parent
	 * @return {?}
	 */
    pbc.web.loader = function (modules, funCallBack) {
        if (typeof modules == "string") { /** @type {!Array<string>} */
            modules = modules.split(",");
        }
        return require(modules, funCallBack);
    }; /** @type {!Array} */
    pbc.web.sysFields = [{
        name: "CreateDate",
        title: " - 创建时间 - "
    }, {
        name: "CreateUser",
        title: " - 创建人 - "
    }, {
        name: "ModifyDate",
        title: " - 修改时间 - "
    }, {
        name: "ModifyUser",
        title: " - 修改人 - "
    }, {
        name: "Status",
        title: " - 状态 - "
    }];
    /**
	 * @param {?} options
	 * @return {undefined}
	 */
    pbc.guideCreator = function (options) {
        var webhook = this;
        webhook.options = $.extend({
            items: null,
            renderTo: null,
            current: null
        }, options);
    };
    $.extend(pbc.guideCreator.prototype, {
        render: function (lagOffset) {
            var bsm = this;
            var o = this.options;
            if (!o.items || !o.items.length) {
                return;
            }
            $(o.renderTo).find(".guidebar").remove();
            bsm.jguid = $('<div class="guidebar"></div>').appendTo($(o.renderTo)); /** @type {number} */
            var i = 0;
            for (; i < o.items.length; i++) {
                var data = o.items[i];
                var element = $('<div class="guide-item"></div>').appendTo(bsm.jguid);
                element.attr("data-id", data.id);
                if (o.current == data.id) {
                    element.addClass("guide-item-cur");
                }
                element.html(data.text);
                if (i != o.items.length - 1) {
                    $('<div class="guide-s"></div>').appendTo(bsm.jguid);
                }
            }
        }
    });
    /**
	 * @param {string} context
	 * @param {?} check
	 * @return {undefined}
	 */
    pbc.getFilterFields = function (context, check) {
        /**
		 * @param {!Object} ctx
		 * @return {undefined}
		 */

        function render(ctx) {
            /**
			 * @param {string} type
			 * @return {?}
			 */

            function type(type) {
                if (type == "many2many") {
                    return "ref_popupselect_mul";
                } else {
                    if (type == "many2one") {
                        return "ref_popupselect";
                    } else {
                        if (type == "one2many") {
                            return "ref_grid_edit";
                        } else {
                            if (type == "boolean") {
                                return "checkbox";
                            } else {
                                if (type == "datetime") {
                                    return "datepicker";
                                } else {
                                    if (type == "float") {
                                        return "number";
                                    } else {
                                        if (type == "integer") {
                                            return "int";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return "string";
            }
            /**
			 * @param {?} value
			 * @param {?} client
			 * @return {?}
			 */

            function push(value, client) {
                var p = play(client); /** @type {number} */
                var i = 0;
                for (; i < p.length; i++) {
                    if (p[i].name == value) {
                        return p[i];
                    }
                }
                return null;
            }
            /**
			 * @param {?} action
			 * @return {?}
			 */

            function play(action) {
                if (!action) {
                    return ctx.fields;
                } /** @type {number} */
                var index = 0;
                for (; index < ctx.refModels.length; index++) {
                    if (ctx.refModels[index].name == action) {
                        return ctx.refModels[index].fields;
                    }
                }
                return ctx.fields;
            }
            /**
			 * @param {?} paramName
			 * @return {?}
			 */

            function equal(paramName) {
                if (!paramName) {
                    return null;
                } /** @type {number} */
                var s = 0;
                for (; s < ctx.refModels.length; s++) {
                    if (ctx.refModels[s].name == paramName) {
                        return ctx.refModels[s];
                    }
                }
                return null;
            }
            /**
			 * @param {?} _
			 * @param {string} view
			 * @return {?}
			 */

            function render(_, view) {
                var options = {};
                var obj = push(_);
                if (obj == null) {
                    return options;
                }
                var object_t = obj.type;
                var data = equal(obj.relationModel);
                var val = data ? data.name : "";
                var label = data ? data.title : "";
                if (view.indexOf("grid") > -1) {
                    options = {
                        grid: {
                            columns: [],
                            sortName: "ID"
                        },
                        detailUrl: "/web/main/?model=" + val + "&viewtype=form",
                        titleEdit: "修改： " + label,
                        titleAdd: "新增：" + label
                    };
                    if (view.indexOf("select") > -1) { /** @type {string} */
                        options.grid.url = "/web/pageddata/";
                        options.grid.parms = {
                            model: val
                        }; /** @type {string} */
                        options.modeType = "select"; /** @type {string} */
                        options.selectorUrl = "/web/main?model=" + val + "&viewtype=list"; /** @type {string} */
                        options.titleSelect = "选择： " + label;
                    } else {
                        if (view.indexOf("edit") > 0) { /** @type {string} */
                            options.modeType = "editgrid";
                            $.extend(options.grid, {
                                defaultRow: {},
                                height: 230,
                                defaultRowCount: 4
                            });
                        }
                    }
                } else {
                    if (view.indexOf("ref") == 0) {
                        if (view.indexOf("_tree") == -1) {
                            options = {
                                url: "/web/namedata",
                                parms: {
                                    model: val
                                },
                                detailEnabled: false,
                                detailUrl: "/web/detaildata",
                                detailParms: {
                                    model: val
                                },
                                valueField: "ID",
                                sourceFilter: obj.sourceFilter,
                                textField: data ? data.textField : null
                            };
                            if (options.sourceFilter) {
                                options.sourceFilter.model = val;
                            }
                            if (view.indexOf("ref_popupselect") == 0) {
                                $.extend(options, {
                                    css: "combobox-selector",
                                    popupselect_ismul: view == "ref_popupselect_mul",
                                    popupselect_type: "popupselect",
                                    popupselect_url: "/web/main/?model=" + val + "&viewtype=list",
                                    popupselect_width: "1000",
                                    popupselect_height: "700",
                                    popupselect_title: "选择： " + (data ? data.title : "")
                                });
                            } else {
                                if (view.indexOf("select_mul") > 0) {
                                    $.extend(options, {
                                        isMultiSelect: true,
                                        isShowCheckBox: true
                                    });
                                }
                            }
                        } else {
                            options = {
                                url: "/web/namedata",
                                parms: {
                                    model: val
                                },
                                detailEnabled: false,
                                detailUrl: "/web/detaildata",
                                detailParms: {
                                    model: val
                                },
                                textField: "text",
                                valueField: "id",
                                tree: {
                                    checkbox: false,
                                    nodeWidth: 200,
                                    url: "/web/treedata",
                                    parms: {
                                        enabled: 1,
                                        sourceModel: val,
                                        parentField: "ParentID",
                                        textField: data.textField,
                                        sourceModel2: "",
                                        parentField2: "",
                                        refSourceField: "",
                                        textField2: ""
                                    }
                                }
                            };
                        }
                    } else {
                        if ($.inArray(view, ["select", "select_mul", "listbox", "htmlSelect", "listbox_mul", "radiolist", "checkboxlist"]) > -1) {
                            options = {
                                data: []
                            };
                        }
                    }
                }
                if (view.indexOf("ref_popupselect") == -1) {
                    if (options.css) {
                        delete options.css;
                    }
                    if (options.popupselect_type) {
                        delete options.popupselect_type;
                        delete options.popupselect_url;
                        delete options.popupselect_width;
                        delete options.popupselect_height;
                        delete options.popupselect_title;
                    }
                    if (view.indexOf("grid_select") > -1) {
                        if (options.url) {
                            delete options.url;
                            delete options.parms;
                            delete options.valueField;
                            delete options.textField;
                            delete options.isMultiSelect;
                            delete options.isShowCheckBox;
                        }
                    }
                } else {
                    if (options.grid) {
                        delete options.grid;
                    }
                }
                if (object_t == "many2many") { /** @type {boolean} */
                    options.many2many = true;
                } else {
                    if (object_t == "many2one") { /** @type {boolean} */
                        options.many2one = true;
                    } else {
                        if (object_t == "one2many") { /** @type {boolean} */
                            options.one2many = true;
                        }
                    }
                }
                return options;
            } /** @type {!Array} */
            var profilerRecords = []; /** @type {!Array} */
            var files = [];
            files.push({
                display: ctx.model.title,
                name: "ID",
                type: "ref_popupselect_mul",
                editor: {
                    type: "ref_popupselect_mul",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    textField: ctx.model.textField,
                    valueField: "ID",
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=" + ctx.model.name + "&viewtype=list",
                    popupselect_width: "800",
                    popupselect_height: "600",
                    popupselect_title: "选择： " + ctx.model.title,
                    many2many: true
                }
            }); /** @type {number} */
            var idx = 0;
            for (; idx < ctx.fields.length; idx++) {
                var data = ctx.fields[idx];
                var options = {
                    display: data.title,
                    name: data.name
                };
                if (data.type == "one2many") {
                    continue;
                }
                if (data.type == "many2many") {
                    continue;
                }
                var value = type(data.type);
                if (value.indexOf("ref_") > -1) { /** @type {string} */
                    value = "ref_popupselect_mul";
                }
                var result = render(data.name, value);
                if (value.indexOf("ref_") > -1) { /** @type {boolean} */
                    result.one2many = false; /** @type {boolean} */
                    result.many2one = false; /** @type {boolean} */
                    result.many2many = true;
                }
                result["type"] = value;
                options["editor"] = result;
                options["type"] = value;
                if (value.indexOf("ref_") > -1) {
                    files.push(options);
                } else {
                    profilerRecords.push(options);
                }
            } /** @type {number} */
            idx = 0;
            for (; idx < ctx.fields.length; idx++) {
                data = ctx.fields[idx];
                if (data.type == "many2one") {
                    options = {
                        display: data.dbName,
                        name: data.dbName
                    }; /** @type {string} */
                    value = "text";
                    result = {}; /** @type {string} */
                    result["type"] = value;
                    options["editor"] = result; /** @type {string} */
                    options["type"] = value;
                    profilerRecords.push(options);
                }
            } /** @type {!Array} */
            var scenario = [];
            $(files).each(function () {
                scenario.push(this);
            });
            $(profilerRecords).each(function () {
                scenario.push(this);
            });
            if (check) {
                check(scenario);
            }
        }
        pbc.ajax({
            loading: null,
            url: pbc.toUrl("/web/ModelDataset/"),
            data: {
                modelName: context
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
                render(result.data);
            }
        });
    };
    pbc.web.views = {}; /** @type {function(!Object): undefined} */
    var page = pbc.web.view = function (options) {
        if (typeof options.model == "string") {
            options.model = {
                name: options.model,
                title: options.model
            };
        } /** @type {!Object} */
        this.options = options;
        var _difOpts = this;
        var data = this.options;
        _difOpts.events = {}; /** @type {string} */
        data.idField = "ID";
        if (data.model && data.model.PKName) {
            data.idField = data.model.PKName;
        } else {
            if (data.dataset && data.dataset.model && data.dataset.model.PKName) {
                data.idField = data.dataset.model.PKName;
            }
        }
        if (current.isPreviewMode) {
            window.preview_page = this;
        }
        window.freedesign_page = this;
        if (data.dataset && data.dataset.user) {
            data.userdata = data.dataset.user;
        }
        data.userdata = data.userdata || {};
        if (data.dataset && data.dataset.workflow) {
            data.workflow = data.dataset.workflow;
        }
    };
    $.extend(page.prototype, {
        render: function () {
            var item = this;
            var options = this.options;
            var prop;
            for (prop in options) {
                if (prop.indexOf("on") == 0 && ($.isFunction(options[prop]) || typeof options[prop] === "string")) {
                    item.bind(prop.substring(2), options[prop]);
                }
            }
            if (options.addins && options.addins.items) {
                $(options.addins.items).each(function (canCreateDiscussions, op) {
                    if (item.addins && $.isFunction(item.addins[op.name])) {
                        item.addins[op.name]({
                            page: item,
                            options: op.value
                        });
                    } else {
                        require(["addin_" + op.name], function (map) {
                            map.run({
                                page: item,
                                options: op.value
                            });
                        });
                    }
                });
            }
            item.trigger("pageInit", item);
            item.trigger("pageLoad", item);
            if (options.renderTo && options.renderTo instanceof jQuery) {
                options.renderTo = options.renderTo.get(0);
            }
            if (options.renderTo && options.renderTo.dialog) {
                item.dialogOpener = options.renderTo.dialog; /** @type {boolean} */
                options.showInDialog = true;
            }
            if (options.renderTo && options.renderTo.tabOpener) {
                item.tabOpener = options.renderTo.tabOpener; /** @type {boolean} */
                options.showInTab = true;
            }
            pbc.preOptions(options, function () {
                item.options = $.extend({
                    viewType: "list",
                    bind: item.getBind(),
                    actions: {}
                }, options);
            });
        },
        trigger: function (callback, args) {
            if (!callback) {
                return;
            }
            var name = callback.toLowerCase();
            var callbacks = this.events[name];
            if (!callbacks) {
                return;
            }
            args = args || [];
            if (args instanceof Array == false) { /** @type {!Array} */
                args = [args];
            } /** @type {number} */
            var i = 0;
            for (; i < callbacks.length; i++) {
                var func = callbacks[i];
                if (func.handler.apply(func.context, args) == false) {
                    return false;
                }
            }
        },
        rebind: function (key, method) {
            this.unbind(key);
            this.bind(key, method);
        },
        bind: function (arg, handler, context) {
            if (typeof arg == "object") {
                var p;
                for (p in arg) {
                    this.bind(p, arg[p]);
                }
                return;
            }
            if (typeof handler === "string" && handler.indexOf("function") != -1) {
                try {
                    eval("handler = " + handler);
                } catch (e) { }
            }
            if (typeof handler != "function") {
                return false;
            }
            var name = arg.toLowerCase();
            var event = this.events[name] || [];
            context = context || this;
            event.push({
                handler: handler,
                context: context
            });
            this.events[name] = event;
        },
        addEvent: function (func, target) {
            var getElmt = this;
            var options = this.options;
            getElmt.bind(func, target);
        },
        unbind: function (elem) {
            var self = this;
            var options = this.options;
            if (!elem) {
                self.events = {};
                return;
            }
            if ($.isArray(elem)) {
                $(elem).each(function () {
                    self.unbind(this);
                });
                return;
            }
            var level = elem.toLowerCase();
            var columnLevel = self.events[level];
            if (!columnLevel || !columnLevel.length) {
                return;
            }
            delete self.events[level];
        },
        hasBind: function (p_Interval) {
            var type = p_Interval.toLowerCase();
            var listeners = this.events[type];
            if (listeners && listeners.length) {
                return true;
            }
            return false;
        },
        set: function (grid, layer) {
            if (!grid) {
                return;
            } /** @type {number} */
            var i = grid;
            if (!this.options) {
                this.options = {};
            }
            this.options[i] = layer; /** @type {string} */
            var getNamedFlows = "_set" + i.substr(0, 1).toUpperCase() + i.substr(1);
            if (this[getNamedFlows]) {
                this[getNamedFlows].call(this, layer);
            }
        },
        get: function (type) {
            var getNamedFlows = "_get" + type.substr(0, 1).toUpperCase() + type.substr(1);
            if (this[getNamedFlows]) {
                return this[getNamedFlows].call(this, type);
            }
            return this.options[type];
        },
        getQuery: function (value) {
            var B = this;
            var o = this.options;
            var rel = $(o.renderTo).attr("data-url") || "";
            var expRecords = rel.match(new RegExp("[?&]" + value + "=([^&]+)", "i"));
            if (expRecords == null || expRecords.length < 1) {
                return "";
            }
            return expRecords[1];
        },
        getQueryStringByName: function (name) {
            return this.getQuery(name);
        },
        getQueryObj: function () {
            var D = this;
            var o = this.options;
            var selector = $(o.renderTo).attr("data-url") || ""; /** @type {!RegExp} */
            var combinatorPattern = /^[^\?]+\?([\w\W]+)$/; /** @type {!RegExp} */
            var exp = /([^&=]+)=([\w\W]*?)(&|$)/g; /** @type {(Array<string>|null)} */
            var matched = combinatorPattern.exec(selector);
            var ret = {};
            if (matched && matched[1]) { /** @type {string} */
                var num = matched[1];
                var m;
                for (;
				(m = exp.exec(num)) != null;) { /** @type {string} */
                    ret[m[1]] = m[2];
                }
            }
            return ret;
        },
        hasRights: function (url) {
            var _ = this;
            var options = this.options;
            var localSettingsDefinitions = options.userdata ? options.userdata.rights : null; /** @type {boolean} */
            var thisPageLinks = localSettingsDefinitions ? true : false;
            if (!thisPageLinks) {
                return true;
            }
            if (!localSettingsDefinitions.fun) {
                return false;
            }
            var values = localSettingsDefinitions.fun;
            if (values["enabled" + url.substring(0, 1).toUpperCase() + url.substring(1)]) {
                return true;
            }
            if (values["extends"]) { /** @type {number} */
                var i = 0;
                for (; i < values["extends"].length; i++) {
                    if (values["extends"][i] && values["extends"][i].id == url) {
                        return true;
                    }
                }
            }
            return false;
        },
        enabledFlow: function () {
            var _ = this;
            var options = this.options;
            return options.workflow && options.workflow.enabled ? true : false;
        },
        showFormView: function (object) {
            var me = this;
            var options = this.options;
            var action = object.action;
            var readonly = object.readonly;
            var type = object.viewName;
            var id = object.parm;
            var url = object.url;
            if (!url) {
                if (options.actions.viewForm) {
                    url = options.actions.viewForm;
                } else {
                    if (options.formUrl) {
                        url = options.formUrl;
                    } else {
                        type = type || "form"; /** @type {string} */
                        url = "pages/" + options.model.name + "/" + type + ".w";
                    }
                }
            }
            var self = options.common || {}; /** @type {(null|string)} */
            var item = typeof id == "string" ? id : null;
            if (action != "add" && me.grid && !options.isEditList) {
                if (item) {
                    item = me.grid.getRow(item)[options.idField];
                }
                var data = me.grid.getSelected();
                if (!item && data) {
                    item = data[options.idField];
                }
                if (!item) {
                    pbc.showError(pbc.res.pleaseSelect);
                    return;
                }
            }
            if (url) {
                if ($.isFunction(url)) {
                    url = url();
                }
                url = pbc.toUrl(url);
                if (action != "add" && !options.isEditList) { /** @type {string} */
                    url = url + (url.indexOf("?") > -1 ? "&" : "?"); /** @type {string} */
                    url = url + "id=" + item;
                }
                if (action == "view") { /** @type {string} */
                    url = url + (url.indexOf("?") > -1 ? "&" : "?"); /** @type {string} */
                    url = url + "&isview=Y";
                }
            }
            if (url && self.openParm) { /** @type {string} */
                url = url + (url.indexOf("?") > -1 ? "&" : "?"); /** @type {string} */
                url = url + ($.isFunction(self.openParm) ? self.openParm() : self.openParm);
            }
            if (current.isPreviewMode) {
                pbc.tips(2, "当前模式不支持此操作");
                return;
            }
            var trackTitle = options.titleAdd;
            if (action == "edit") {
                trackTitle = options.titleEdit;
            }
            if (me.selectorType) { /** @type {string} */
                self.formShowPosition = "top"; /** @type {string} */
                self.formShowType = "";
            } /** @type {null} */
            var pub = null;
            if (options.isEditList) {
                data = me.grid.getRow(item);
                pub = {
                    localType: true,
                    formData: data,
                    callback: function (hash) {
                        me.grid.update(data, hash);
                        this.form_close();
                    }
                };
            }
            if (self.formShowType == "tab") {
                if (!options.tabid && options.model) {
                    options.tabid = options.model.name;
                }
                pbc.openPage({
                    openerPage: me,
                    text: trackTitle,
                    url: url,
                    openerData: pub,
                    tabid: options.tabid + "_form"
                }, "tab", object.callback);
            } else {
                me.dialog = pbc.openPage({
                    openerPage: me,
                    title: trackTitle,
                    url: url,
                    width: self.dialogWidth,
                    height: self.dialogHeight,
                    openerData: pub
                }, "dialog", object.callback);
            }
        },
        add: function () {
            var layoutController = this;
            var opt = this.options;
            layoutController.showFormView({
                action: "add",
                viewName: opt.formViewName
            });
        },
        edit: function (p) {
            var layoutController = this;
            var opt = this.options;
            layoutController.showFormView({
                action: "edit",
                viewName: opt.formViewName,
                parm: p
            });
        },
        view: function (p) {
            var layoutController = this;
            var opt = this.options;
            layoutController.showFormView({
                action: "view",
                viewName: opt.formViewName,
                parm: p
            });
        },
        reload: function () {
            var enabledHandlers = this;
            var options = this.options;
            var qtype_ = options.type || options.viewType;
            if (qtype_) {
                enabledHandlers[qtype_ + "_reload"]();
            }
        },
        del: function (row) {
            var me = this;
            var opts = this.options;
            if (current.isPreviewMode) {
                pbc.tips(2, "当前模式不支持此操作");
                return;
            }
            if (row && me.grid) {
                row = me.grid.getRow(row)[opts.idField];
            } /** @type {(Array|null)} */
            var error = typeof row == "string" ? [row] : null;
            if (!error) {
                var titlefield = me.getSelecteds();
                if (titlefield && titlefield.length) { /** @type {!Array} */
                    var a2 = [];
                    $(titlefield).each(function () {
                        a2.push(this[opts.idField]);
                    }); /** @type {!Array} */
                    error = a2;
                }
            }
            if (!error) {
                pbc.tipsInTop(1, pbc.res.pleaseSelect);
                return;
            }
            $.ligerDialog.confirm(pbc.res.confirmDel, function (canCreateDiscussions) {
                var url = opts.actions.del || "/web/Delete/";
                if ($.isFunction(url)) {
                    url = url();
                }
                url = pbc.resolveUrl(url);
                if (!canCreateDiscussions) {
                    return;
                }
                pbc.ajax({
                    url: url,
                    data: {
                        arg: error,
                        model: opts.model.name
                    },
                    success: function (e) {
                        me.trigger("AfterDelete");
                        if (e.statusCode == "1") {
                            pbc.tipsInTop(1, pbc.res.delSuccess);
                            me.reload();
                            if (me.onDataChanged) {
                                me.onDataChanged();
                            }
                        } else {
                            if (e.statusCode == "2") {
                                pbc.tipsInTop(2, e.message);
                            } else {
                                if (e.statusCode == "3") {
                                    pbc.showError(e.message);
                                }
                            }
                        }
                    }
                });
            });
        },
        select: function () {
            var self = this;
            var options = this.options;
            var iframe_hash = self.singleMode ? self.grid.getSelecteds() : self.selectedFullData;
            if (self.callback) {
                self.callback(iframe_hash);
            }
            if (self.dialogOpener) {
                self.dialogOpener.close();
            }
        },
        cancel: function () {
            var Mixology = this;
            var options = this.options;
            if (options.cancel) {
                options.cancel();
            } else {
                if (Mixology.dialogOpener) {
                    Mixology.dialogOpener.close();
                }
                if (Mixology.tabOpener) {
                    Mixology.tabOpener.removeTabItem(options.tabIdIndex);
                }
            }
        },
        getBind: function () {
            var g = this;
            var p = this.options;
            var qs = g.getQueryStringByName("bind");
            debugger;
            if (!qs) {
                return null;
            }
            try {
                var json = (new pbc.base64).decode(qs); /** @type {null} */
                var bind = null;
                eval("bind = " + json);
                return bind;
            } catch (e) {
                return null;
            }
        }
    });
})(jQuery);