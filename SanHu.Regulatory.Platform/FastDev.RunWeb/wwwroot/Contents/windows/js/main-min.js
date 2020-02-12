
//jquery-powerFloat-min

(function(a) {
    a.fn.powerFloat = function(d) {
        return a(this).each(function() {
            var e = a.extend({},
            b, d || {});
            var f = function(h, g) {
                if (c.target && c.target.css("display") !== "none") {
                    c.targetHide()
                }
                c.s = h;
                c.trigger = g
            };
            switch (e.eventType) {
            case "hover":
                a(this).hover(function() {
                    f(e, a(this));
                    var h = parseInt(e.showDelay, 10),
                    g;
                    if (h) {
                        if (g) {
                            clearTimeout(g)
                        }
                        g = setTimeout(function() {
                            c.targetGet()
                        },
                        h)
                    } else {
                        c.targetGet()
                    }
                },
                function() {
                    c.flagDisplay = false;
                    c.targetHold();
                    if (e.hoverHold) {
                        setTimeout(function() {
                            c.displayDetect()
                        },
                        200)
                    } else {
                        c.displayDetect()
                    }
                });
                if (e.hoverFollow) {
                    a(this).mousemove(function(g) {
                        c.cacheData.left = g.pageX;
                        c.cacheData.top = g.pageY;
                        c.targetGet();
                        return false
                    })
                }
                break;
            case "click":
                a(this).click(function(g) {
                    if (c.flagDisplay && g.target === c.trigger.get(0)) {
                        c.flagDisplay = false;
                        c.displayDetect()
                    } else {
                        f(e, a(this));
                        c.targetGet();
                        if (!a(document).data("mouseupBind")) {
                            a(document).bind("mouseup", 
                            function(i) {
                                var h = false;
                                a(i.target).parents().each(function() {
                                    if (c.target && a(this).attr("id") == c.target.attr("id")) {
                                        h = true
                                    }
                                });
                                if (e.eventType === "click" && c.flagDisplay && i.target != c.trigger.get(0) && !h) {
                                    c.flagDisplay = false;
                                    c.displayDetect()
                                }
                                return false
                            }).data("mouseupBind", true)
                        }
                    }
                });
                break;
            case "focus":
                a(this).focus(function() {
                    var g = a(this);
                    setTimeout(function() {
                        f(e, g);
                        c.targetGet()
                    },
                    200)
                }).blur(function() {
                    c.flagDisplay = false;
                    setTimeout(function() {
                        c.displayDetect()
                    },
                    190)
                });
                break;
            default:
                f(e, a(this));
                c.targetGet();
                a(document).unbind("mouseup")
            }
        })
    };
    var c = {
        targetGet: function() {
            if (!this.trigger) {
                return this
            }
            var h = this.trigger.attr(this.s.targetAttr),
            g = this.s.target;
            switch (this.s.targetMode) {
            case "common":
                if (g) {
                    var i = typeof(g);
                    if (i === "object") {
                        if (g.size()) {
                            c.target = g.eq(0)
                        }
                    } else {
                        if (i === "string") {
                            if (a(g).size()) {
                                c.target = a(g).eq(0)
                            }
                        }
                    }
                } else {
                    if (h && a("#" + h).size()) {
                        c.target = a("#" + h)
                    }
                }
                if (c.target) {
                    c.targetShow()
                } else {
                    return this
                }
                break;
            case "ajax":
                var d = g || h;
                this.targetProtect = false;
                if (/(\.jpg|\.png|\.gif|\.bmp|\.jpeg)$/i.test(d)) {
                    if (c.cacheData[d]) {
                        c.target = a(c.cacheData[d]);
                        c.targetShow()
                    } else {
                        var f = new Image();
                        c.loading();
                        f.onload = function() {
                            var m = f.width,
                            q = f.height;
                            var p = a(window).width(),
                            s = a(window).height();
                            var r = m / q,
                            o = p / s;
                            if (r > o) {
                                if (m > p / 2) {
                                    m = p / 2;
                                    q = m / r
                                }
                            } else {
                                if (q > s / 2) {
                                    q = s / 2;
                                    m = q * r
                                }
                            }
                            var n = '<img class="float_ajax_image" src="' + d + '" width="' + m + '" height = "' + q + '" />';
                            c.cacheData[d] = n;
                            c.target = a(n);
                            c.targetShow()
                        };
                        f.onerror = function() {
                            c.target = a('<div class="float_ajax_error">图片加载失败。</div>');
                            c.targetShow()
                        };
                        f.src = d
                    }
                } else {
                    if (d) {
                        if (c.cacheData[d]) {
                            c.target = a('<div class="float_ajax_data">' + c.cacheData[d] + "</div>");
                            c.targetShow()
                        } else {
                            c.loading();
                            a.ajax({
                                url: d,
                                success: function(m) {
                                    if (typeof(m) === "string") {
                                        c.target = a('<div class="float_ajax_data">' + m + "</div>");
                                        c.targetShow();
                                        c.cacheData[d] = m
                                    }
                                },
                                error: function() {
                                    c.target = a('<div class="float_ajax_error">数据没有加载成功。</div>');
                                    c.targetShow()
                                }
                            })
                        }
                    }
                }
                break;
            case "list":
                var k = '<ul class="float_list_ul">',
                j;
                if (a.isArray(g) && (j = g.length)) {
                    a.each(g, 
                    function(n, p) {
                        var o = "",
                        r = "",
                        q,
                        m;
                        if (n === 0) {
                            r = ' class="float_list_li_first"'
                        }
                        if (n === j - 1) {
                            r = ' class="float_list_li_last"'
                        }
                        if (typeof(p) === "object" && (q = p.text.toString())) {
                            if (m = (p.href || "javascript:")) {
                                o = '<a href="' + m + '" class="float_list_a">' + q + "</a>"
                            } else {
                                o = q
                            }
                        } else {
                            if (typeof(p) === "string" && p) {
                                o = p
                            }
                        }
                        if (o) {
                            k += "<li" + r + ">" + o + "</li>"
                        }
                    })
                } else {
                    k += '<li class="float_list_null">列表无数据。</li>'
                }
                k += "</ul>";
                c.target = a(k);
                this.targetProtect = false;
                c.targetShow();
                break;
            case "remind":
                var l = g || h;
                this.targetProtect = false;
                if (typeof(l) === "string") {
                    c.target = a("<span>" + l + "</span>");
                    c.targetShow()
                }
                break;
            default:
                var e = g || h,
                i = typeof(e);
                if (e) {
                    if (i === "string") {
                        if (/<.*>/.test(e)) {
                            c.target = a("<div>" + e + "</div>");
                            this.targetProtect = false
                        } else {
                            if (a(e).size()) {
                                c.target = a(e).eq(0);
                                this.targetProtect = true
                            } else {
                                if (a("#" + e).size()) {
                                    c.target = a("#" + e).eq(0);
                                    this.targetProtect = true
                                } else {
                                    c.target = a("<div>" + e + "</div>");
                                    this.targetProtect = false
                                }
                            }
                        }
                        c.targetShow()
                    } else {
                        if (i === "object") {
                            if (!a.isArray(e) && e.size()) {
                                c.target = e.eq(0);
                                this.targetProtect = true;
                                c.targetShow()
                            }
                        }
                    }
                }
            }
            return this
        },
        container: function() {
            var d = this.s.container,
            e = this.s.targetMode || "mode";
            if (e === "ajax" || e === "remind") {
                this.s.sharpAngle = true
            } else {
                this.s.sharpAngle = false
            }
            if (this.s.reverseSharp) {
                this.s.sharpAngle = !this.s.sharpAngle
            }
            if (e !== "common") {
                if (d === null) {
                    d = "plugin"
                }
                if (d === "plugin") {
                    if (!a("#floatBox_" + e).size()) {
                        a('<div id="floatBox_' + e + '" class="float_' + e + '_box"></div>').appendTo(a("body")).hide()
                    }
                    d = a("#floatBox_" + e)
                }
                if (d && typeof(d) !== "string" && d.size()) {
                    if (this.targetProtect) {
                        c.target.show().css("position", "static")
                    }
                    c.target = d.empty().append(c.target)
                }
            }
            return this
        },
        setWidth: function() {
            var d = this.s.width;
            if (d === "auto") {
                if (this.target.get(0).style.width) {
                    this.target.css("width", "auto")
                }
            } else {
                if (d === "inherit") {
                    this.target.width(this.trigger.width())
                } else {
                    this.target.css("width", d)
                }
            }
            return this
        },
        position: function() {
            var h,
            x = 0,
            k = 0,
            m = 0,
            y = 0,
            s,
            o,
            e,
            E,
            u,
            q,
            f = this.target.data("height"),
            C = this.target.data("width"),
            r = a(window).scrollTop(),
            B = parseInt(this.s.offsets.x, 10) || 0,
            A = parseInt(this.s.offsets.y, 10) || 0,
            w = this.cacheData;
            if (!f) {
                f = this.target.outerHeight();
                if (this.s.hoverFollow) {
                    this.target.data("height", f)
                }
            }
            if (!C) {
                C = this.target.outerWidth();
                if (this.s.hoverFollow) {
                    this.target.data("width", C)
                }
            }
            h = this.trigger.offset();
            x = this.trigger.outerHeight();
            k = this.trigger.outerWidth();
            s = h.left;
            o = h.top;
            var l = function() {
                if (s < 0) {
                    s = 0
                } else {
                    if (s + x > a(window).width()) {
                        s = a(window).width() = x
                    }
                }
            },
            i = function() {
                if (o < 0) {
                    o = 0
                } else {
                    if (o + x > a(document).height()) {
                        o = a(document).height() - x
                    }
                }
            };
            if (this.s.hoverFollow && w.left && w.top) {
                if (this.s.hoverFollow === "x") {
                    s = w.left;
                    l()
                } else {
                    if (this.s.hoverFollow === "y") {
                        o = w.top;
                        i()
                    } else {
                        s = w.left;
                        o = w.top;
                        l();
                        i()
                    }
                }
            }
            var g = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
            v = this.s.position,
            d = false,
            j;
            a.each(g, 
            function(F, G) {
                if (G === v) {
                    d = true;
                    return
                }
            });
            if (!d) {
                v = "4-1"
            }
            var D = function(F) {
                var G = "bottom";
                switch (F) {
                case "1-4":
                case "5-7":
                case "2-3":
                    G = "top";
                    break;
                case "2-1":
                case "6-8":
                case "3-4":
                    G = "right";
                    break;
                case "1-2":
                case "8-6":
                case "4-3":
                    G = "left";
                    break;
                case "4-1":
                case "7-5":
                case "3-2":
                    G = "bottom";
                    break
                }
                return G
            };
            var n = function(F) {
                if (F === "5-7" || F === "6-8" || F === "8-6" || F === "7-5") {
                    return true
                }
                return false
            };
            var t = function(H) {
                var I = 0,
                F = 0,
                G = (c.s.sharpAngle && c.corner) ? true: false;
                if (H === "right") {
                    F = s + k + C + B;
                    if (G) {
                        F += c.corner.width()
                    }
                    if (F > a(window).width()) {
                        return false
                    }
                } else {
                    if (H === "bottom") {
                        I = o + x + f + A;
                        if (G) {
                            I += c.corner.height()
                        }
                        if (I > r + a(window).height()) {
                            return false
                        }
                    } else {
                        if (H === "top") {
                            I = f + A;
                            if (G) {
                                I += c.corner.height()
                            }
                            if (I > o - r) {
                                return false
                            }
                        } else {
                            if (H === "left") {
                                F = C + B;
                                if (G) {
                                    F += c.corner.width()
                                }
                                if (F > s) {
                                    return false
                                }
                            }
                        }
                    }
                }
                return true
            };
            j = D(v);
            if (this.s.sharpAngle) {
                this.createSharp(j)
            }
            if (this.s.edgeAdjust) {
                if (t(j)) { (function() {
                        if (n(v)) {
                            return
                        }
                        var G = {
                            top: {
                                right: "2-3",
                                left: "1-4"
                            },
                            right: {
                                top: "2-1",
                                bottom: "3-4"
                            },
                            bottom: {
                                right: "3-2",
                                left: "4-1"
                            },
                            left: {
                                top: "1-2",
                                bottom: "4-3"
                            }
                        };
                        var H = G[j],
                        F;
                        if (H) {
                            for (F in H) {
                                if (!t(F)) {
                                    v = H[F]
                                }
                            }
                        }
                    })()
                } else { (function() {
                        if (n(v)) {
                            var G = {
                                "5-7": "7-5",
                                "7-5": "5-7",
                                "6-8": "8-6",
                                "8-6": "6-8"
                            };
                            v = G[v]
                        } else {
                            var H = {
                                top: {
                                    left: "3-2",
                                    right: "4-1"
                                },
                                right: {
                                    bottom: "1-2",
                                    top: "4-3"
                                },
                                bottom: {
                                    left: "2-3",
                                    right: "1-4"
                                },
                                left: {
                                    bottom: "2-1",
                                    top: "3-4"
                                }
                            };
                            var I = H[j],
                            F = [];
                            for (name in I) {
                                F.push(name)
                            }
                            if (t(F[0]) || !t(F[1])) {
                                v = I[F[0]]
                            } else {
                                v = I[F[1]]
                            }
                        }
                    })()
                }
            }
            var z = D(v),
            p = v.split("-")[0];
            if (this.s.sharpAngle) {
                this.createSharp(z);
                m = this.corner.width(),
                y = this.corner.height()
            }
            if (this.s.hoverFollow) {
                if (this.s.hoverFollow === "x") {
                    e = s + B;
                    if (p === "1" || p === "8" || p === "4") {
                        e = s - (C - k) / 2 + B
                    } else {
                        e = s - (C - k) + B
                    }
                    if (p === "1" || p === "5" || p === "2") {
                        E = o - A - f - y;
                        q = o - y - A - 1
                    } else {
                        E = o + x + A + y;
                        q = o + x + A + 1
                    }
                    u = h.left - (m - k) / 2
                } else {
                    if (this.s.hoverFollow === "y") {
                        if (p === "1" || p === "5" || p === "2") {
                            E = o - (f - x) / 2 + A
                        } else {
                            E = o - (f - x) + A
                        }
                        if (p === "1" || p === "8" || p === "4") {
                            e = s - C - B - m;
                            u = s - m - B - 1
                        } else {
                            e = s + k - B + m;
                            u = s + k + B + 1
                        }
                        q = h.top - (y - x) / 2
                    } else {
                        e = s + B;
                        E = o + A
                    }
                }
            } else {
                switch (z) {
                case "top":
                    E = o - A - f - y;
                    if (p == "1") {
                        e = s - B
                    } else {
                        if (p === "5") {
                            e = s - (C - k) / 2 - B
                        } else {
                            e = s - (C - k) - B
                        }
                    }
                    q = o - y - A - 1;
                    u = s - (m - k) / 2;
                    break;
                case "right":
                    e = s + k + B + m;
                    if (p == "2") {
                        E = o + A
                    } else {
                        if (p === "6") {
                            E = o - (f - x) / 2 + A
                        } else {
                            E = o - (f - x) + A
                        }
                    }
                    u = s + k + B + 1;
                    q = o - (y - x) / 2;
                    break;
                case "bottom":
                    E = o + x + A + y;
                    if (p == "4") {
                        e = s + B
                    } else {
                        if (p === "7") {
                            e = s - (C - k) / 2 + B
                        } else {
                            e = s - (C - k) + B
                        }
                    }
                    q = o + x + A + 1;
                    u = s - (m - k) / 2;
                    break;
                case "left":
                    e = s - C - B - m;
                    if (p == "2") {
                        E = o - A
                    } else {
                        if (p === "6") {
                            E = o - (C - k) / 2 - A
                        } else {
                            E = o - (f - x) - A
                        }
                    }
                    u = e + m;
                    q = o - (C - m) / 2;
                    break
                }
            }
            if (y && m && this.corner) {
                this.corner.css({
                    left: u,
                    top: q,
                    zIndex: this.s.zIndex + 1
                })
            }
            this.target.css({
                position: "absolute",
                left: e,
                top: E,
                zIndex: this.s.zIndex
            });
            return this
        },
        createSharp: function(g) {
            var j,
            k,
            f = "",
            d = "";
            var i = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            },
            e = i[g] || "top";
            if (this.target) {
                j = this.target.css("background-color");
                if (parseInt(this.target.css("border-" + e + "-width")) > 0) {
                    k = this.target.css("border-" + e + "-color")
                }
                if (k && k !== "transparent") {
                    f = 'style="color:' + k + ';"'
                } else {
                    f = 'style="display:none;"'
                }
                if (j && j !== "transparent") {
                    d = 'style="color:' + j + ';"'
                } else {
                    d = 'style="display:none;"'
                }
            }
            var h = '<div id="floatCorner_' + g + '" class="float_corner float_corner_' + g + '"><span class="corner corner_1" ' + f + '>◆</span><span class="corner corner_2" ' + d + ">◆</span></div>";
            if (!a("#floatCorner_" + g).size()) {
                a("body").append(a(h))
            }
            this.corner = a("#floatCorner_" + g);
            return this
        },
        targetHold: function() {
            if (this.s.hoverHold) {
                var d = parseInt(this.s.hideDelay, 10) || 200;
                this.target.hover(function() {
                    c.flagDisplay = true
                },
                function() {
                    c.flagDisplay = false;
                    setTimeout(function() {
                        c.displayDetect()
                    },
                    d)
                })
            }
            return this
        },
        loading: function() {
            this.target = a('<div class="float_loading"></div>');
            this.targetShow();
            this.target.removeData("width").removeData("height");
            return this
        },
        displayDetect: function() {
            if (!this.flagDisplay) {
                this.targetHide()
            }
            return this
        },
        targetShow: function() {
            c.cornerClear();
            this.flagDisplay = true;
            this.container().setWidth().position();
            this.target.show();
            if (a.isFunction(this.s.showCall)) {
                this.s.showCall.call(this.trigger, this.target)
            }
            return this
        },
        targetHide: function() {
            this.flagDisplay = false;
            this.targetClear();
            this.cornerClear();
            if (a.isFunction(this.s.hideCall)) {
                this.s.hideCall.call(this.trigger)
            }
            this.target = null;
            this.trigger = null;
            this.s = {};
            this.targetProtect = false;
            return this
        },
        targetClear: function() {
            if (this.target) {
                if (this.target.data("width")) {
                    this.target.removeData("width").removeData("height")
                }
                if (this.targetProtect) {
                    this.target.children().hide().appendTo(a("body"))
                }
                this.target.unbind().hide()
            }
        },
        cornerClear: function() {
            if (this.corner) {
                this.corner.remove()
            }
        },
        target: null,
        trigger: null,
        s: {},
        cacheData: {},
        targetProtect: false
    };
    a.powerFloat = {};
    a.powerFloat.hide = function() {
        c.targetHide()
    };
    var b = {
        width: "auto",
        offsets: {
            x: 0,
            y: 0
        },
        zIndex: 999,
        eventType: "hover",
        showDelay: 0,
        hideDelay: 0,
        hoverHold: true,
        hoverFollow: false,
        targetMode: "common",
        target: null,
        targetAttr: "rel",
        container: null,
        reverseSharp: false,
        position: "4-1",
        edgeAdjust: true,
        showCall: a.noop,
        hideCall: a.noop
    }
})(jQuery);

//jquery-smartMenu-min

(function(a) {
    var b = a(document).data("func", {});
    a.smartMenu = a.noop;
    a.fn.smartMenu = function(f, c) {
        var i = a("body"),
        g = {
            name: "",
            offsetX: 2,
            offsetY: 2,
            textLimit: 6,
            beforeShow: a.noop,
            afterShow: a.noop
        };
        var h = a.extend(g, c || {});
        var e = function(k) {
            var m = k || f,
            j = k ? Math.random().toString() : h.name,
            o = "",
            n = "",
            l = "smart_menu_";
            if (a.isArray(m) && m.length) {
                o = '<div id="smartMenu_' + j + '" class="' + l + 'box"><div class="' + l + 'body"><ul class="' + l + 'ul">';
                a.each(m,
                function(q, p) {
                    if (q) {
                        o = o + '<li class="' + l + 'li_separate">&nbsp;</li>'
                    }
                    if (a.isArray(p)) {
                        a.each(p,
                        function(s, v) {
                            var w = v.text,
                            u = "",
                            r = "",
                            t = Math.random().toString().replace(".", "");
                            if (w) {
                                if (w.length > h.textLimit) {
                                    w = w.slice(0, h.textLimit) + "…";
                                    r = ' title="' + v.text + '"'
                                }
                                if (a.isArray(v.data) && v.data.length) {
                                    u = '<li class="' + l + 'li" data-hover="true">' + e(v.data) + '<a href="javascript:" class="' + l + 'a"' + r + ' data-key="' + t + '"><i class="' + l + 'triangle"></i>' + w + "</a></li>"
                                } else {
                                    u = '<li class="' + l + 'li"><a href="javascript:" class="' + l + 'a"' + r + ' data-key="' + t + '">' + w + "</a></li>"
                                }
                                o += u;
                                var x = b.data("func");
                                x[t] = v.func;
                                b.data("func", x)
                            }
                        })
                    }
                });
                o = o + "</ul></div></div>"
            }
            return o
        },
        d = function() {
            var j = "#smartMenu_",
            l = "smart_menu_",
            k = a(j + h.name);
            if (!k.size()) {
                a("body").append(e());
                a(j + h.name + " a").bind("click",
                function() {
                    var m = a(this).attr("data-key"),
                    n = b.data("func")[m];
                    if (a.isFunction(n)) {
                        n.call(b.data("trigger"))
                    }
                    a.smartMenu.hide();
                    return false
                });
                a(j + h.name + " li").each(function() {
                    var m = a(this).attr("data-hover"),
                    n = l + "li_hover";
                    a(this).hover(function() {
                        var o = a(this).siblings("." + n);
                        o.removeClass(n).children("." + l + "box").hide();
                        o.children("." + l + "a").removeClass(l + "a_hover");
                        if (m) {
                            a(this).addClass(n).children("." + l + "box").show();
                            a(this).children("." + l + "a").addClass(l + "a_hover")
                        }
                    })
                });
                return a(j + h.name)
            }
            return k
        };
        a(this).each(function() {
            this.oncontextmenu = function(l) {
                if (a.isFunction(h.beforeShow)) {
                    h.beforeShow.call(this)
                }
                l = l || window.event;
                l.cancelBubble = true;
                if (l.stopPropagation) {
                    l.stopPropagation()
                }
                a.smartMenu.hide();
                var k = b.scrollTop();
                var j = d();
                if (j) {
                    j.css({
                        display: "block",
                        left: l.clientX + h.offsetX,
                        top: l.clientY + k + h.offsetY
                    });
                    b.data("target", j);
                    b.data("trigger", this);
                    if (a.isFunction(h.afterShow)) {
                        h.afterShow.call(this)
                    }
                    return false
                }
            }
        });
        if (!i.data("bind")) {
            i.bind("click", a.smartMenu.hide).data("bind", true)
        }
    };
    a.extend(a.smartMenu, {
        hide: function() {
            var c = b.data("target");
            if (c && c.css("display") === "block") {
                c.hide()
            }
        },
        remove: function() {
            var c = b.data("target");
            if (c) {
                c.remove()
            }
        }
    })
})(jQuery);


//jquery-class


(function ($){

 _Class=function(){
	var initializing=0,fnTest=/\b_super\b/,
		Class=function(){};
	Class.prototype={
		ops:function(o1,o2){
			o2=o2||{};
			for(var key in o1){
				this['_'+key]=key in o2?o2[key]:o1[key];
			}
		}
	};
	Class.extend=function(prop){
		var _super = this.prototype;
		initializing=1;//锁定初始化,阻止超类执行初始化
		var _prototype=new this();//只是通过此来继承，而非创建类
		initializing=0;//解锁初始化
		function fn(name, fn) {
			return function() {
				this._super = _super[name];//保存超类方法，此this后面通过apply改变成本体类引用
				var ret = fn.apply(this, arguments);//创建方法，并且改变this指向
				return ret;//返回刚才创建的方法
			};
		}
		var _mtd;//临时变量，存方法
		for (var name in prop){//遍历传进来的所有方法
			_mtd=prop[name];
			_prototype[name] =(typeof _mtd=='function'&&
			typeof _super[name]=='function'&&
			fnTest.test(_mtd))?fn(name,_mtd):_mtd;//假如传进来的是函数，进行是否调用超类的检测来决定是否保存超类
		}
		function F(arg1) {//构造函数，假如没有被初始化，并且有初始化函数，执行初始化
			if(this.constructor!=Object){
				return new F({
					FID:'JClassArguments',
					val:arguments
				});
			}
			if (!initializing&&this.init){
				if(arg1&&arg1.FID&&arg1.FID=='JClassArguments'){
					this.init.apply(this, arg1.val);
				}else{
					this.init.apply(this, arguments);
				}
				this.init=null;
			
			};
		}
		F.prototype=_prototype;//创建。。。
		F.constructor=F;//修正用
		F.extend=arguments.callee;
		return F;
	};
	return Class;
 }();
	$.Class=function(ops){
		return _Class.extend(typeof ops=='function'?ops():ops);
	};

})(jQuery);

// 