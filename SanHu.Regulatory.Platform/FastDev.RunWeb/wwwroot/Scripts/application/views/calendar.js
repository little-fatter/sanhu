'use strict';
define(["jquery", "views_parts_toolbar", "/Scripts/fullcalendar-3.0.1/locale/zh-cn.js"], function ($, boneTmpl) {
    /**
	 * @return {?}
	 */

    function _emptyTable() { /** @type {!Array} */
        var outChance = [];
        outChance.push('<div class="toolpanel"> ');
        outChance.push('<div class="toolpanelinner"> ');
        outChance.push('     <div class="toolpaneltop"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="clear"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="searchbox"> ');
        outChance.push("     </div> ");
        outChance.push('     <div class="toolbar"></div>');
        outChance.push("     </div> ");
        outChance.push("</div> ");
        outChance.push('<div class="mainpanel" style="margin:4px;"></div>');
        return outChance.join("");
    }
    /**
	 * @param {?} callback
	 * @return {undefined}
	 */
    pbc.web.views.calendar = function (callback) {
        pbc.web.views.calendar.base.constructor.call(this, callback);
    };
    pbc.web.views.calendar.freedesignExtend(pbc.web.view, {
        render: function () {
            var that = this;
            var options = this.options;
            boneTmpl(that);
            that.calendar_init();
            pbc.web.views.calendar.base.render.call(this);
            that.calendar_render();
            that.trigger("pageLoaded");
        },
        calendar_init: function () {
            var C = this;
            var opts = this.options;
            var group = opts.dataset || {};
            var map = group.rights;
            var topicTitle = opts.model.title;
            var name = opts.model.name;
            var branchesReferences = {
                items: []
            };
            if (map && map.fun) {
                if (map.fun.enabledAdd) {
                    branchesReferences.items.push({
                        text: "创建",
                        id: "add",
                        cls: "ne-btn-blue"
                    });
                }
            }
            this.options = opts = $.extend({
                viewType: "calendar",
                actions: {
                    viewForm: "pages/" + name + "/form.w",
                    getList: "/web/listdata",
                    del: "/web/delete/"
                },
                formViewName: opts.common.formViewName,
                tabId: name + "-" + opts.viewName,
                titleAdd: "新增 " + topicTitle,
                titleEdit: "编辑 " + topicTitle,
                toolbar: branchesReferences
            }, opts);
        },
        calendar_reload: function () {
            var scope = this;
            var options = this.options;
            if (!scope.jcalendar) {
                return;
            }
            scope.jcalendar.fullCalendar("removeEvents");
            scope.jcalendar.fullCalendar("refetchEvents");
        },
        calendar_render: function () {
            var self = this;
            var options = this.options;
            self.jelement = $(options.renderTo);
            self.jelement.html(_emptyTable());
            self.initToolpanel();
            self.jcalendar = self.jelement.find(".mainpanel:first").addClass("calendarpanel");
            self.bind("add", function () {
                self.add();
            });
            var key = options.calendar.startField || "CreateDate";
            var i = options.calendar.endField || "CreateDate";
            var j = options.calendar.titleField; /** @type {!Array} */
            var F = [];
            var defaults = {
                header: {
                    left: "prev,next today",
                    center: "title",
                    right: "month,agendaWeek,agendaDay"
                },
                defaultDate: new Date,
                lang: "zh-cn",
                buttonIcons: true,
                weekNumbers: false,
                editable: true,
                eventLimit: true,
                selectable: true,
                selectHelper: true,
                select: function (context, fields) {
                    var id = options.actions.viewForm;
                    var args = {};
                    args[key] = moment.fn.format.call(context, "YYYY-MM-DD HH:mm");
                    args[i] = moment.fn.format.call(fields, "YYYY-MM-DD HH:mm");
                    var inc = (new pbc.base64).encode(JSON.stringify({
                        formData: args
                    }));
                    if (id.indexOf("?") != -1) { /** @type {string} */
                        id = id + ("&bind=" + inc);
                    } else { /** @type {string} */
                        id = id + ("?bind=" + inc);
                    }
                    self.showFormView({
                        action: "add",
                        url: id
                    });
                },
                eventClick: function (data, event, view, e, date) {
                    if ($(event.target).hasClass("btnclose")) {
                        return;
                    }
                    var form = options.actions.viewForm;
                    if (form.indexOf("?") != -1) { /** @type {string} */
                        form = form + ("&bind=" + data.id);
                    } else { /** @type {string} */
                        form = form + ("?id=" + data.id);
                    }
                    self.showFormView({
                        action: "edit",
                        url: form
                    });
                },
                eventMouseover: function (row, $event, lampTemplate) {
                    if ($event.currentTarget && !$($event.currentTarget).find(".btnclose").length) {
                        $('<a class="btnclose" href="javascript:void(0)">x</a>').appendTo($($event.currentTarget).find(".fc-content")).click(function () {
                            self.del(row.id);
                        });
                    }
                },
                eventMouseout: function (event, view, ev) {
                    if (view.currentTarget && $(view.currentTarget).find(".btnclose").length) {
                        $(view.currentTarget).find(".btnclose").remove();
                    }
                },
                events: function (id, e, fn, type) {
                    var check = self.jcalendar.fullCalendar("getDate");
                    var d = moment.fn.format.call(id, "YYYY-MM-DD");
                    var rule = {
                        field: key,
                        op: "greaterthanorequal",
                        value: moment.fn.format.call(id, "YYYY-MM-DD")
                    };
                    var filter = {
                        field: i,
                        op: "lessthanorequal",
                        value: moment.fn.format.call(e, "YYYY-MM-DD")
                    };
                    pbc.ajax({
                        url: options.actions.getList,
                        data: {
                            model: options.model.name,
                            filter: {
                                op: "and",
                                rules: [rule, filter]
                            }
                        },
                        success: function (columns) {
                            if (!columns) {
                                return;
                            } /** @type {!Array} */
                            var self = []; /** @type {number} */
                            var index = 0;
                            for (; index < columns.length; index++) {
                                var c = columns[index];
                                self.push({
                                    id: c.ID,
                                    title: $.isArray(c[j]) && c[j].length == 2 ? c[j][1] : c[j],
                                    start: pbc.getFormatDate(c[key], "yyyy-MM-dd hh:mm"),
                                    end: pbc.getFormatDate(c[i], "yyyy-MM-dd hh:mm")
                                });
                            }
                            if ($.isFunction(type)) {
                                type(self);
                            }
                        }
                    });
                }
            };
            self.jcalendar.fullCalendar($.extend({}, defaults, options.calendar));
        }
    });
    return pbc.web.views.calendar;
});