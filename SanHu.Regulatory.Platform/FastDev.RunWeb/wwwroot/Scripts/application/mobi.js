'use strict';
(function ($) {
    /**
     * @param {!Object} data
     * @param {!Function} callback
     * @return {undefined}
     */
    function __dealCssEvent(data, callback) {
        /**
         * @param {!Event} e
         * @return {undefined}
         */
        function fireCallBack(e) {
            if (e.target !== this) {
                return;
            }
            callback.call(this, e);
            /** @type {number} */
            i = 0;
            for (; i < events.length; i++) {
                el.off(events[i], fireCallBack);
            }
        }
        /** @type {!Object} */
        var events = data;
        var i;
        var el = this;
        if (callback) {
            /** @type {number} */
            i = 0;
            for (; i < events.length; i++) {
                el.on(events[i], fireCallBack);
            }
        }
    }
    $(document).on("click", ".open-panel", function (jEvent) {
        var panel = $(jEvent.target).data("panel");
        $.openPanel(panel);
    });
    /** @type {string} */
    $.smVersion = "0.6.2";
    +function ($) {
        var defaults = {
            autoInit: false,
            showPageLoadingIndicator: true,
            router: true,
            swipePanel: "left",
            swipePanelOnlyClose: true
        };
        $.smConfig = $.extend(defaults, $.config);
    }(Zepto);
    $.support = function () {
        var info = {
            touch: !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch)
        };
        return info;
    }();
    $.touchEvents = {
        start: $.support.touch ? "touchstart" : "mousedown",
        move: $.support.touch ? "touchmove" : "mousemove",
        end: $.support.touch ? "touchend" : "mouseup"
    };
    /**
     * @param {?} callback
     * @return {?}
     */
    $.fn.animationEnd = function (callback) {
        __dealCssEvent.call(this, ["webkitAnimationEnd", "animationend"], callback);
        return this;
    };
    /**
     * @param {!Function} callback
     * @return {?}
     */
    $.fn.transitionEnd = function (callback) {
        __dealCssEvent.call(this, ["webkitTransitionEnd", "transitionend"], callback);
        return this;
    };
    +function ($) {
        /**
         * @param {string} b
         * @param {string} a
         * @return {?}
         */
        $.compareVersion = function (b, a) {
            var enmlHash = b.split(".");
            var actualVersionPieces = a.split(".");
            if (b === a) {
                return 0;
            }
            /** @type {number} */
            var i = 0;
            for (; i < enmlHash.length; i++) {
                /** @type {number} */
                var stop = parseInt(enmlHash[i]);
                if (!actualVersionPieces[i]) {
                    return 1;
                }
                /** @type {number} */
                var start = parseInt(actualVersionPieces[i]);
                if (stop < start) {
                    return -1;
                }
                if (stop > start) {
                    return 1;
                }
            }
            return -1;
        };
        /**
         * @return {?}
         */
        $.getCurrentPage = function () {
            return $(".page-current")[0] || $(".page")[0] || document.body;
        };
    }(Zepto);
    +function ($) {
        /** @type {boolean} */
        $.allowPanelOpen = true;
        /**
         * @param {!Object} panel
         * @return {?}
         */
        $.openPanel = function (panel) {
            /**
             * @return {undefined}
             */
            function panelTransitionEnd() {
                target.transitionEnd(function (md) {
                    if (md.target === target[0]) {
                        if (panel.hasClass("active")) {
                            panel.trigger("opened");
                        } else {
                            panel.trigger("closed");
                        }
                        /** @type {boolean} */
                        $.allowPanelOpen = true;
                    } else {
                        panelTransitionEnd();
                    }
                });
            }
            if (!$.allowPanelOpen) {
                return false;
            }
            if (panel === "left" || panel === "right") {
                /** @type {string} */
                panel = ".panel-" + panel;
            }
            panel = panel ? $(panel) : $(".panel").eq(0);
            /** @type {string} */
            var direction = panel.hasClass("panel-right") ? "right" : "left";
            if (panel.length === 0 || panel.hasClass("active")) {
                return false;
            }
            $.closePanel();
            /** @type {boolean} */
            $.allowPanelOpen = false;
            /** @type {string} */
            var effect = panel.hasClass("panel-reveal") ? "reveal" : "cover";
            panel.css({
                display: "block"
            }).addClass("active");
            panel.trigger("open");
            var clientLeft = panel[0].clientLeft;
            var target = effect === "reveal" ? $($.getCurrentPage()) : panel;
            /** @type {boolean} */
            var E = false;
            panelTransitionEnd();
            $(document.body).addClass("with-panel-" + direction + "-" + effect);
            return true;
        };
        /**
         * @return {?}
         */
        $.closePanel = function () {
            var activePanel = $(".panel.active");
            if (activePanel.length === 0) {
                return false;
            }
            /** @type {string} */
            var effect = activePanel.hasClass("panel-reveal") ? "reveal" : "cover";
            /** @type {string} */
            var panelPosition = activePanel.hasClass("panel-left") ? "left" : "right";
            activePanel.removeClass("active");
            var transitionEndTarget = effect === "reveal" ? $(".page") : activePanel;
            activePanel.trigger("close");
            /** @type {boolean} */
            $.allowPanelOpen = false;
            transitionEndTarget.transitionEnd(function () {
                if (activePanel.hasClass("active")) {
                    return;
                }
                activePanel.css({
                    display: ""
                });
                activePanel.trigger("closed");
                $("body").removeClass("panel-closing");
                /** @type {boolean} */
                $.allowPanelOpen = true;
            });
            $("body").addClass("panel-closing").removeClass("with-panel-" + panelPosition + "-" + effect);
        };
        $(document).on("click", ".open-panel", function (jEvent) {
            var panel = $(jEvent.target).data("panel");
            $.openPanel(panel);
        });
        $(document).on("click", ".close-panel, .panel-overlay", function (canCreateDiscussions) {
            $.closePanel();
        });
        /**
         * @return {undefined}
         */
        $.initSwipePanels = function () {
            /**
             * @param {!Event} e
             * @return {undefined}
             */
            function handleTouchStart(e) {
                if (!$.allowPanelOpen || !swipePanel && !swipePanelOnlyClose || ddarea) {
                    return;
                }
                if ($(".modal-in, .photo-browser-in").length > 0) {
                    return;
                }
                if (!(swipePanelCloseOpposite || swipePanelOnlyClose)) {
                    if ($(".panel.active").length > 0 && !panel.hasClass("active")) {
                        return;
                    }
                }
                touchesStart.x = e.type === "touchstart" ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;
                if (swipePanelCloseOpposite || swipePanelOnlyClose) {
                    if ($(".panel.active").length > 0) {
                        /** @type {string} */
                        side = $(".panel.active").hasClass("panel-left") ? "left" : "right";
                    } else {
                        if (swipePanelOnlyClose) {
                            return;
                        }
                        side = swipePanel;
                    }
                    if (!side) {
                        return;
                    }
                }
                panel = $(".panel.panel-" + side);
                if (!panel[0]) {
                    return;
                }
                opened = panel.hasClass("active");
                if (swipePanelActiveArea && !opened) {
                    if (side === "left") {
                        if (touchesStart.x > swipePanelActiveArea) {
                            return;
                        }
                    }
                    if (side === "right") {
                        if (touchesStart.x < window.innerWidth - swipePanelActiveArea) {
                            return;
                        }
                    }
                }
                /** @type {boolean} */
                ddform = false;
                /** @type {boolean} */
                ddarea = true;
                domNodeText = undefined;
                /** @type {number} */
                x1 = (new Date).getTime();
                direction = undefined;
            }
            /**
             * @param {!Event} e
             * @return {undefined}
             */
            function handleTouchMove(e) {
                if (!ddarea) {
                    return;
                }
                if (!panel[0]) {
                    return;
                }
                if (e.f7PreventPanelSwipe) {
                    return;
                }
                var pageX = e.type === "touchmove" ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
                if (typeof domNodeText === "undefined") {
                    /** @type {boolean} */
                    domNodeText = !!(domNodeText || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (domNodeText) {
                    /** @type {boolean} */
                    ddarea = false;
                    return;
                }
                if (!direction) {
                    if (pageX > touchesStart.x) {
                        /** @type {string} */
                        direction = "to-right";
                    } else {
                        /** @type {string} */
                        direction = "to-left";
                    }
                    if (side === "left" && (direction === "to-left" && !panel.hasClass("active")) || side === "right" && (direction === "to-right" && !panel.hasClass("active"))) {
                        /** @type {boolean} */
                        ddarea = false;
                        return;
                    }
                }
                if (W) {
                    /** @type {number} */
                    var c1x = (new Date).getTime() - x1;
                    if (c1x < 300) {
                        if (direction === "to-left") {
                            if (side === "right") {
                                $.openPanel(side);
                            }
                            if (side === "left" && panel.hasClass("active")) {
                                $.closePanel();
                            }
                        }
                        if (direction === "to-right") {
                            if (side === "left") {
                                $.openPanel(side);
                            }
                            if (side === "right" && panel.hasClass("active")) {
                                $.closePanel();
                            }
                        }
                    }
                    /** @type {boolean} */
                    ddarea = false;
                    console.log(3);
                    /** @type {boolean} */
                    ddform = false;
                    return;
                }
                if (!ddform) {
                    /** @type {string} */
                    effect = panel.hasClass("panel-cover") ? "cover" : "reveal";
                    if (!opened) {
                        panel.show();
                        panelOverlay.show();
                    }
                    panelWidth = panel[0].offsetWidth;
                    panel.transition(0);
                }
                /** @type {boolean} */
                ddform = true;
                e.preventDefault();
                /** @type {number} */
                var threshold = opened ? 0 : -swipePanelThreshold;
                if (side === "right") {
                    /** @type {number} */
                    threshold = -threshold;
                }
                /** @type {number} */
                touchesDiff = pageX - touchesStart.x + threshold;
                if (side === "right") {
                    /** @type {number} */
                    translate = touchesDiff - (opened ? panelWidth : 0);
                    if (translate > 0) {
                        /** @type {number} */
                        translate = 0;
                    }
                    if (translate < -panelWidth) {
                        /** @type {number} */
                        translate = -panelWidth;
                    }
                } else {
                    translate = touchesDiff + (opened ? panelWidth : 0);
                    if (translate < 0) {
                        /** @type {number} */
                        translate = 0;
                    }
                    if (translate > panelWidth) {
                        translate = panelWidth;
                    }
                }
                if (effect === "reveal") {
                    views.transform("translate3d(" + translate + "px,0,0)").transition(0);
                    panelOverlay.transform("translate3d(" + translate + "px,0,0)");
                } else {
                    panel.transform("translate3d(" + translate + "px,0,0)").transition(0);
                }
            }
            /**
             * @param {?} event
             * @return {undefined}
             */
            function handleTouchEnd(event) {
                if (!ddarea || !ddform) {
                    /** @type {boolean} */
                    ddarea = false;
                    /** @type {boolean} */
                    ddform = false;
                    return;
                }
                /** @type {boolean} */
                ddarea = false;
                /** @type {boolean} */
                ddform = false;
                /** @type {number} */
                var c1x = (new Date).getTime() - x1;
                var action;
                /** @type {boolean} */
                var _ = translate === 0 || Math.abs(translate) === panelWidth;
                if (!opened) {
                    if (translate === 0) {
                        /** @type {string} */
                        action = "reset";
                    } else {
                        if (c1x < 300 && Math.abs(translate) > 0 || c1x >= 300 && Math.abs(translate) >= panelWidth / 2) {
                            /** @type {string} */
                            action = "swap";
                        } else {
                            /** @type {string} */
                            action = "reset";
                        }
                    }
                } else {
                    if (translate === -panelWidth) {
                        /** @type {string} */
                        action = "reset";
                    } else {
                        if (c1x < 300 && Math.abs(translate) >= 0 || c1x >= 300 && Math.abs(translate) <= panelWidth / 2) {
                            if (side === "left" && translate === panelWidth) {
                                /** @type {string} */
                                action = "reset";
                            } else {
                                /** @type {string} */
                                action = "swap";
                            }
                        } else {
                            /** @type {string} */
                            action = "reset";
                        }
                    }
                }
                if (action === "swap") {
                    /** @type {boolean} */
                    $.allowPanelOpen = true;
                    if (opened) {
                        $.closePanel();
                        if (_) {
                            panel.css({
                                display: ""
                            });
                            $("body").removeClass("panel-closing");
                        }
                    } else {
                        $.openPanel(side);
                    }
                    if (_) {
                        /** @type {boolean} */
                        $.allowPanelOpen = true;
                    }
                }
                if (action === "reset") {
                    if (opened) {
                        /** @type {boolean} */
                        $.allowPanelOpen = true;
                        $.openPanel(side);
                    } else {
                        $.closePanel();
                        if (_) {
                            /** @type {boolean} */
                            $.allowPanelOpen = true;
                            panel.css({
                                display: ""
                            });
                        } else {
                            var target = effect === "reveal" ? views : panel;
                            $("body").addClass("panel-closing");
                            target.transitionEnd(function () {
                                /** @type {boolean} */
                                $.allowPanelOpen = true;
                                panel.css({
                                    display: ""
                                });
                                $("body").removeClass("panel-closing");
                            });
                        }
                    }
                }
                if (effect === "reveal") {
                    views.transition("");
                    views.transform("");
                }
                panel.transition("").transform("");
                panelOverlay.css({
                    display: ""
                }).transform("");
            }
            var panel;
            var side;
            var swipePanel = $.smConfig.swipePanel;
            var swipePanelOnlyClose = $.smConfig.swipePanelOnlyClose;
            /** @type {boolean} */
            var swipePanelCloseOpposite = true;
            /** @type {boolean} */
            var swipePanelActiveArea = false;
            /** @type {number} */
            var swipePanelThreshold = 2;
            /** @type {boolean} */
            var W = false;
            if (!(swipePanel || swipePanelOnlyClose)) {
                return;
            }
            var panelOverlay = $(".panel-overlay");
            var ddarea;
            var ddform;
            var domNodeText;
            var touchesStart = {};
            var x1;
            var touchesDiff;
            var translate;
            var opened;
            var panelWidth;
            var effect;
            var direction;
            var views = $(".page");
            $(document).on($.touchEvents.start, handleTouchStart);
            $(document).on($.touchEvents.move, handleTouchMove);
            $(document).on($.touchEvents.end, handleTouchEnd);
        };
        $.initSwipePanels();
    }(Zepto);
})(Zepto);
