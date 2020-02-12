define(["jquery", "views_parts_buttons"], function ($, buttonInit)
{
    //tool初始化 部件，传入 page
    return function (page)
    { 
        var g = page, p = page.options;

        g.current = {
            dataset: null,
            filter: {
                rules: [],
                groups: [],
                op: 'and'
            },           //下拉搜索选项
            filterIds: [],          //自定义过滤器
            filterSearch: null,     //自定义搜索
            filterAdvanced: null,  //高级搜索
            filterTree: null,     //过滤树 
            existFilter: function ()
            {
                var exist = [];
                exist[0] = g.current.filter && (g.current.filter.rules && g.current.filter.rules.length || g.current.filter.groups && g.current.filter.groups.length) ? true : false;
                exist[1] = g.current.filterIds && g.current.filterIds.length ? true : false;
                exist[2] = g.current.filterSearch != null;
                exist[3] = g.current.filterAdvanced != null;
                for (var i = 0; i < exist.length; i++)
                {
                    if (exist[i]) return true;
                }
                return false;
            }
        };

        $.extend(g, {

            //初始化工具栏，包括按钮组和搜索区域
            initToolpanel: function ()
            {
                var g = this, p = this.options;

                g.jelement = $(p.renderTo);

                g.jtoolpanel = g.jelement.find(".toolpanelinner:first");

                var baseOp = p.common || {};

                if (baseOp.hideToolbar)
                {
                    $(".toolpanel", g.jelement).hide();
                    return;
                }

                g.jsearch = g.jtoolpanel.find(".searchbox");
                g.jtoolbar = g.jtoolpanel.find(".toolbar:first");
                g.jsearhBtn = g.jtoolpanel.find(".btnsearch:first").html(pbc.res.search).hide();

                buttonInit(g); 

                setTimeout(function ()
                {
                    g.initSearch();
                }, 10);

                if (!g.dialogOpener)
                {
                    g.initViewSwitch();
                }

                setTimeout(function ()
                {
                    g.jtoolpanel.append('<div class="clear"></div>');
                }, 20);
            },

            initViewSwitch: function ()
            {
                var g = this, p = this.options;

                if (p.viewType == "form" || p.hideViewSwitch || p.viewType == "form" && (p.showInTab || p.showInPanel))
                {
                    return;
                }
                if (p.viewType == "template")
                {
                    return;
                }
                var baseOp = p.common || {};
                if (baseOp && baseOp.hideViewSwitch)
                {
                    return;
                }
                var jswitch = $('<ul class="view-switch right"></ul>').insertBefore(g.jsearch);
                if (!baseOp || baseOp.showKanban != 0)
                {
                    var jitem = $('<li><a data-id="kanban" class="ne-icon ne-icon-kanban switch"></a></li>').appendTo(jswitch);
                    if (baseOp.viewNameKanban)
                    {
                        jitem.find("a").attr("data-viewname", baseOp.viewNameKanban);
                    }
                }
                if (!baseOp || baseOp.showList != 0)
                {
                    var jitem = $('<li><a data-id="list" class="ne-icon ne-icon-list switch"></a></li>').appendTo(jswitch);
                    if (baseOp.viewNameList)
                    {
                        jitem.find("a").attr("data-viewname", baseOp.viewNameList);
                    }
                }

                if (!baseOp || baseOp.showCalendar != 0)
                {
                    var jitem = $('<li><a data-id="calendar" class="ne-icon ne-icon-calendar switch"></a></li>').appendTo(jswitch);
                    if (baseOp.viewNameCalendar)
                    {
                        jitem.find("a").attr("data-viewname", baseOp.viewNameCalendar);
                    }
                }
                if (!baseOp || baseOp.showReport != 0)
                {
                    var jitem = $('<li><a data-id="report" class="ne-icon ne-icon-report switch"></a></li>').appendTo(jswitch);
                    if (baseOp.viewNameReport)
                    {
                        jitem.find("a").attr("data-viewname", baseOp.viewNameReport);
                    }
                }
                //jswitch.append('<li><a data-id="report" class="ne-icon ne-icon-report switch"></a></li>');

                jswitch.find("li:last").addClass("view-switch-last");
                jswitch.find("a[data-id=" + p.viewType + "]").parent().addClass("view-switch-selected");

                jswitch.find("li").bind("click", function ()
                {
                    var url = $(this).find("a").attr("data-url");
                    if (!url)
                    {
                    	url = "/pages/" + p.model.name + "/" + $(this).find("a").attr("data-viewname") + ".w";
                    }
                    $(p.renderTo).html("");
                    pbc.openPage({
                        url: url
                    }, p.renderTo);
                });
            },



            findFilter: function (id)
            {
                var g = this, p = this.options;
                if (p.filters)
                {
                    for (var i = 0; i < p.filters.length; i++)
                    {
                        var filter = p.filters[i];
                        if (filter.id == id) return filter;
                    }
                }
                return null;
            },

            createAdvancedSearchBtn: function (isLeft)
            {
                var g = this, p = this.options;
                if (g.jadvancedSearchPanel) return;
                var jbtn = $('<a class="ne-btn">高级搜索</a>');
                jbtn.addClass("ne-btn-group");
                jbtn.addClass("btn-advancedSearch");
                jbtn.append("<i class='ui-icon ui-icon-triangle-1-s'></i>");
                var jpanel = g.jadvancedSearchPanel = $('<div class="advanced-search-panel"></div>').appendTo('body');
                jbtn.click(function ()
                {
                    var offset = jbtn.offset();
                    g.jadvancedSearchPanel.css({
                        left: isLeft ? offset.left : offset.left - jpanel.width() + jbtn.width() + 4,
                        top: offset.top + jbtn.height() + 2
                    });
                    g.jadvancedSearchPanel.toggle();
                });
                $(document).bind('click.advancedSearch', function (e)
                {
                    var jthis = $((e.target || e.srcElement));
                    if (jthis.is(".advanced-search-panel,.btn-advancedSearch,.deletegroup,.deleterole")) return;
                    if (jthis.closest(".advanced-search-panel,.btn-advancedSearch").length == 0)
                    {
                        g.jadvancedSearchPanel.hide();
                    }
                });
                return jbtn;
            },

            //初始化 搜索区域
            initSearch: function ()
            {
                var g = this, p = this.options;
                if (p.viewType == "form" || p.viewType == "report")
                {
                    return;
                }
                var baseOp = p.common || {};
                var rulesHs = {}, currentKey = "", currentFields = null;

                function findFilterRule(group, field, value)
                {
                    for (var i = 0; group.rules && i < group.rules.length; i++)
                    {
                        var rule = group.rules[i];
                        if (value)
                        {
                            if (rule.field == field && rule.value == value) return rule;
                        } else
                        {
                            if (rule.field == field) return rule;
                        }
                    }
                    for (var j = 0; group.groups && j < group.groups.length; j++)
                    {
                        var subGroup = group.groups[j];
                        var o = findFilterRule(subGroup, field, value);
                        if (o) return o;
                    }
                    return null;
                }
                function findFilterGroup(group, rule)
                {
                    for (var i = 0; group.rules && i < group.rules.length; i++)
                    {
                        if (group.rules[i] == rule)
                        {
                            return group;
                        }
                    }
                    for (var j = 0; group.groups && j < group.groups.length; j++)
                    {
                        var subGroup = group.groups[j];
                        var o = findFilterGroup(subGroup, rule);
                        if (o) return o;
                    }
                    return null;
                }
                function delFilterRule(group, rule)
                {
                    for (var i = 0; group.rules && i < group.rules.length; i++)
                    {
                        if (group.rules[i] == rule)
                        {
                            group.rules.splice(i, 1);
                            return;
                        }
                    }
                    for (var i = 0; group.groups && i < group.groups.length; i++)
                    {
                        var subGroup = group.groups[i];
                        delFilterRule(subGroup, rule);
                    }
                }
                function delFilterGroup(group, gr)
                {
                    for (var i = 0; group.groups && i < group.groups.length; i++)
                    {
                        var subGroup = group.groups[i];
                        if (subGroup == gr)
                        {
                            group.groups.splice(i, 1);
                        }
                    }
                }
                function findModeField(name)
                {
                    if (!currentFields || !currentFields.length)
                    {
                        return null;
                    }
                    for (var i = 0; i < currentFields.length; i++)
                    {
                        var field = currentFields[i];
                        if (field.name == name) return field;
                    }
                    return null;
                }
                if (g.jsearch.find(".l-text-combobox").length) return;
                var jcombox = $('<input type="text" />').appendTo(g.jsearch);
                var combox = null;
                if (baseOp.searchInputShowType != "hide")
                {
                    combox = jcombox.ligerComboBox({
                        autocomplete: true,
                        width: 400,
                        selectBoxHeight: 200,
                        selectBoxPosYDiff: 0,
                        hideOnLoseFocus: false,
                        url: pbc.toUrl('web/searchDataset'),
                        parms: {
                            model: p.model.name
                        },
                        renderItem: function (e)
                        {
                            var d = e.data;
                            if (d.isGroupItem)
                            {
                                return '<span class="search-groupitem">' + d.text + '</span>';
                            } else
                            {
                                return '<span class="search-item">' + d.text + '</span>';
                            }
                        },
                        rowClsRender: function (d)
                        {
                            if (d.isGroupItem)
                            {
                                return "search-row-groupheader";
                            }
                            return "";
                        },
                        isRowReadOnly: function (d)
                        {
                            return d.isGroupItem ? true : false;
                        },
                        onTextBoxKeyEnter: function (e)
                        {
                            var jcell = $(e.element);
                            var index = parseInt(jcell.attr('index'));
                            var data = combox.data[index];
                            combox.trigger('beforeSelect', [null, null, data]);
                            setTimeout(function ()
                            {
                                combox._changeValue("", "");
                            }, 10);
                        },
                        onBeforeSelect: function (v, t, d)
                        {
                            var rule = {
                                field: d.field,
                                value: currentKey,
                                op: 'contains'
                            };
                            var field = findModeField(rule.field);
                            if (field == null) return false;
                            if (d.isRelationItem)
                            {
                                rule.fieldName = rule.field;
                                rule.field += "ID";
                                rule.value = d.id;
                                rule.text = d.text;
                                rule.isRelationItem = true;
                                rule.op = "equal";
                            }
                            var oldRule = findFilterRule(g.current.filter, rule.field, rule.value);
                            if (oldRule == null)
                            {
                                oldRule = findFilterRule(g.current.filter, rule.field);
                                if (oldRule != null)
                                {
                                    if (!d.isRelationItem)
                                    {
                                        //包括类型的条件,如果已经存在,并且值不同,需要增加 或 条件
                                        if ($.inArray(oldRule, g.current.filter.rules) != -1)
                                        {
                                            delFilterRule(g.current.filter, oldRule);
                                            var newGroup = {
                                                op: 'or',
                                                rules: [oldRule, rule]
                                            };
                                            g.current.filter.groups.push(newGroup);
                                            doSearch();
                                        }
                                            //已经存在于 group中,需要找到这个group
                                        else
                                        {
                                            var group = findFilterGroup(g.current.filter, oldRule);
                                            if (group != null)
                                            {
                                                group.rules.push(rule);
                                                doSearch();
                                            }
                                        }
                                    } else
                                    {
                                        $.extend(oldRule, rule);
                                        doSearch();
                                    }
                                } else
                                {
                                    g.current.filter.rules.push(rule);
                                    doSearch();
                                }
                            }

                            jinput.focus();
                            return false;
                        },
                        onButtonClick: function ()
                        {
                            if (jsearchview)
                            {
                                jsearchview.toggle();
                            }
                            return false;
                        },
                        dataGetter: function (result)
                        {
                            if (!result || !result.data) return null;
                            currentKey = result.key;
                            if (result.data.dataset)
                            {
                                currentFields = result.data.dataset.fields;
                            }
                            return result.data.result;
                        }
                    });
                }
                if (baseOp.searchInputShowType == "hide")
                {
                    g.jsearch.hide();
                }
                else if (baseOp.searchInputShowType == "left")
                {
                    g.jsearch.addClass("left");
                }
                else if (baseOp.searchInputShowType == "topLeft")
                {
                }
                else
                {
                    g.jsearch.addClass("right");
                }

                if (baseOp.searchInputShowType != "hide")
                {
                    jcombox = jcombox.parent().addClass("searchguide").css({
                        marginRight: 10
                    }).append("<div class='clear'></div>");
                    var jinput = jcombox.find("input:text").addClass("searchinput");
                    jcombox.bind('click', function (e)
                    {
                        var jthis = $((e.target || e.srcElement));
                        if (jthis.closest("input,.l-trigger,.l-trigger-hover,.searchview").length == 0)
                        {
                            jinput.focus();
                            combox.updateSelectBoxPosition();
                        }
                        if (jthis.is(".tagclose"))
                        {
                            var id = jthis.parent().attr("data-id");
                            var type = jthis.parent().attr("data-type");
                            if (type == "filter")
                            {
                                var o = rulesHs[id];
                                var filterIndex = $.inArray(o.id, g.current.filterIds);
                                if (filterIndex != -1)
                                {
                                    g.current.filterIds.splice(filterIndex, 1);
                                    jfilter.find(".filteritem[data-id=" + o.id + "]").removeClass("selected");
                                    doSearch();
                                }
                            }
                            else if (type == "filterSearch")
                            {
                                g.current.filterSearch = null;
                                doSearch();
                            }
                            else if (type == "filterAdvanced")
                            {
                                g.current.filterAdvanced = null;
                                doSearch();
                            }
                            else if (id)
                            {
                                var o = rulesHs[id];
                                if (o.rules)
                                {
                                    delFilterGroup(g.current.filter, o);
                                } else
                                {
                                    delFilterRule(g.current.filter, o);
                                }
                                doSearch();
                            }
                        }
                    });
                    jcombox.find(".l-text-l,.l-text-r").remove();
                }
                var jsearchview = $('<div class="searchview"></div>').appendTo(jcombox);
                var jsearchform = $('<div class="searchform"></div>');
                var jsearchbtns = $('<div class="searchbtns"></div>').appendTo(jsearchview);
                jsearchview.append('<div class="clear"></div>');
                var enabledFilters = p.filters && p.filters.length;
                var enabledSearch = p.search && p.search.fields && p.search.fields.length;
                if (baseOp.searchBoxShowType == "hide") enabledSearch = false;
                var jfilter = $('<div class="searchfilter"></div>').appendTo(jsearchview);
                var jfilter2 = $('<div class="searchfilter2"></div>').appendTo(jsearchview);
                if (p.search)
                {
                    p.search.fields = p.search.fields || p.search.conditons;
                }
                var search = $.extend({
                    labelWidth: 'auo'
                }, p.search);


                var searchformOutAppend = true;
                if (baseOp.searchBoxShowType == "left")
                {
                    jsearchform.insertAfter(g.jtoolbar);
                }
                else if (baseOp.searchBoxShowType == "right")
                {
                    jsearchform.insertAfter(g.jtoolbar);
                    jsearchform.addClass("right");
                }
                else
                {
                    searchformOutAppend = false;
                    jsearchform.prependTo(jsearchview);
                }

                g.trigger('beforeShowSearch', {
                    page: g,
                    options: search
                });
                search.freedesignpage = g;
                var searchFrom = jsearchform.ligerForm(search);

                g.trigger('afterShowSearch', {
                    page: g,
                    options: search,
                    form: searchFrom
                });


                var jsearchbtn = $('<a class="ne-btn searchbtn right" data-id="add">搜索</a>').appendTo(jsearchbtns);

                jsearchbtns.append('<div class="clear"></div>');
                if (!enabledSearch)
                {
                    jsearchbtns.hide();
                    jsearchform.hide();
                }
                else
                {
                    if (searchformOutAppend)
                    {
                        var jli = $('<li></li>').appendTo(jsearchform.find(".l-fieldcontainer:last ul"));
                        jsearchbtns.appendTo(jli);
                        jsearchbtns.find("a").removeClass("right");
                    }
                }
                jsearchbtn.click(function ()
                {
                    var conditions = searchFrom.toConditions();
                    g.current.filterSearch = {
                        rules: conditions,
                        op: 'and'
                    };
                    doSearch();
                    jcombox.find(".searchview").hide();
                });

                if (enabledFilters)
                {
                    jfilter.append("<div class='label fleft'>过滤器：</div> ");
                    var jfiltercontent = $('<div class="content fleft"></div>').appendTo(jfilter);
                    $(p.filters).each(function (i, filter)
                    {
                        var jitem = $('<span class="box filteritem"></span>');
                        jitem.attr("data-id", filter.id);
                        jitem.append('<i class="ne-icon ne-icon-right"></i>');
                        jitem.append('<span>' + filter.name + '</span>');
                        jitem.click(function ()
                        {
                            if (jitem.hasClass("selected"))
                            {
                                jitem.removeClass("selected");
                                var index = $.inArray(filter.id, g.current.filterIds);
                                if (index != -1)
                                {
                                    g.current.filterIds.splice(index, 1);
                                }
                            } else
                            {
                                jitem.addClass("selected");
                                if ($.inArray(filter.id, g.current.filterIds) == -1)
                                {
                                    g.current.filterIds.push(filter.id);
                                }
                            }
                            doSearch();
                        });
                        jitem.appendTo(jfiltercontent);
                    });
                    jfilter.append('<div class="clear"></div>');
                } else
                {
                    jfilter.hide();
                }

                var jfilter2_heaader = $('<div class="filterheader"><i class="ui-icon ui-icon-triangle-1-e"></i> <span>高级搜索</span></div>').appendTo(jfilter2);
                var jfilter2_content = $('<div class="filterpanel" style="display:none"><div class="filter"></div></div>');
                var jfilter2_button = $('<a class="ne-button searchbtn right btnok" data-id="add">确定</a>').appendTo(jfilter2_content);

                if (baseOp.searchAdShowType == "hide")
                {
                    jfilter2_heaader.hide();
                    jfilter2_content.hide();
                }
                if (searchformOutAppend && baseOp.searchBoxShowType == baseOp.searchAdShowType)
                {
                    var jli = $('<li></li>').appendTo(jsearchform.find(".l-fieldcontainer:last ul"));
                    var jbtn = g.createAdvancedSearchBtn(baseOp.searchBoxShowType == "left");
                    if (jbtn)
                    {
                        jbtn.addClass("searchbtn");
                        jbtn.appendTo(jli);
                    }
                }
                if ((!enabledSearch || (baseOp.searchBoxShowType == "left" || baseOp.searchBoxShowType == "right")) && !enabledFilters) //如果没有过滤器和搜索条件，那么高级搜索显示出来
                {
                    jfilter2_heaader.hide();
                    jfilter2_content.show();
                }
                if (g.jadvancedSearchPanel)
                {
                    jfilter2.hide();
                    jsearchbtns.css("border", "none");
                    jfilter2_content.show().appendTo(g.jadvancedSearchPanel);
                } else
                {
                    jfilter2_content.appendTo(jfilter2);
                }
                var filterFields = p.filterFields;

                pbc.preEditor(filterFields, "fields");

                var filter2 = jfilter2_content.find(".filter").ligerFilter({
                    fields: filterFields,
                    buttonCls: 'ne-button', addDefult: true
                });
                setTimeout(function ()
                {
                    if (filterFields.length && filterFields[0].type == "select")
                    {
                        jfilter2_content.find(".l-text-combobox").next(":text").hide();
                    }
                }, 200);
                filter2.addRule(jfilter2_content.find("table:first"));
                jfilter2_heaader.click(function ()
                {
                    if ($(this).hasClass("current"))
                    {
                        $(this).removeClass("current");
                        jfilter2_heaader.find("i").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
                        jfilter2_content.hide();
                    } else
                    {
                        $(this).addClass("current");
                        jfilter2_heaader.find("i").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
                        jfilter2_content.show();
                    }
                });
                jfilter2_button.click(function ()
                {
                    var filter = filter2.getData();
                    g.current.filterAdvanced = filter;
                    doSearch();
                    if (g.jadvancedSearchPanel)
                    {
                        g.jadvancedSearchPanel.hide();
                    } else
                    {
                        jsearchview.hide();
                    }
                });
                if (jinput)
                {
                    jinput.blur(function ()
                    {
                        combox.lastInputText = "";
                        $(this).val("");
                    }).width(100);
                }
                $(document).bind('click', function (e)
                {
                    var jthis = $((e.target || e.srcElement));
                    if (jthis.hasClass("deletegroup") || jthis.hasClass("deleterole"))
                    {
                        return;
                    }
                    if (jthis.closest(".l-text-combobox,.searchview,.l-box-select").length == 0)
                    {
                        jcombox.find(".searchview").hide();
                    }
                });

                if (g.current.existFilter())
                {
                    if (p.viewType == "list" || p.viewType == "kanban")
                    {
                        updateTag();
                    }
                }

                function doSearch()
                {
                    combox && combox.updateSelectBoxPosition();
                    updateTag();
                    g.reload();
                }

                function updateTag()
                {
                    if (baseOp.searchAdShowType == "hide") return;
                    jcombox.find(".tag").remove();
                    rulesHs = {};
                    var group = g.current.filter, i;
                    if (group)
                    {
                        for (i = 0; group.rules && i < group.rules.length; i++)
                        {
                            var rule = group.rules[i];
                            var field = findModeField(rule.fieldName || rule.field);
                            if (field == null) continue;
                            addTag({
                                field: field,
                                rule: rule
                            });
                        }
                        for (i = 0; group.groups && i < group.groups.length; i++)
                        {
                            var subGroup = group.groups[i];
                            if (subGroup.rules && subGroup.rules.length)
                            {
                                var field = findModeField(subGroup.rules[0].field);
                                if (field == null) continue;
                                addTag({
                                    field: field,
                                    group: subGroup
                                });
                            }
                        }
                    }
                    if (g.current.filterIds)
                    {
                        for (i = 0; i < g.current.filterIds.length; i++)
                        {
                            var filter = g.findFilter(g.current.filterIds[i]);
                            addTag({
                                filter: filter
                            });
                        }
                    }
                    if (g.current.filterAdvanced)
                    {
                        addTag({
                            filterAdvanced: g.current.filterAdvanced
                        });
                    }
                    if (g.current.filterSearch)
                    {
                        addTag({
                            filterSearch: g.current.filterSearch
                        });
                    }
                }
                var tagCount = 0;
                function addTag(e)
                {
                    var rule = e.rule,
                        field = e.field,
                        group = e.group,
                        filter = e.filter;
                    var filterAdvanced = e.filterAdvanced,
                        filterSearch = e.filterSearch;
                    var type = null;
                    var newId = new Date().getTime() + "_" + ++tagCount;
                    var info = {};
                    if (field)
                    {
                        info.field = (field.title || field.name);
                    }
                    if (rule)
                    {
                        type = "rule";
                        info.op = getOpText(rule.op);
                        if (rule.isRelationItem)
                        {
                            info.value = rule.text;
                        } else
                        {
                            info.value = rule.value;
                        }
                    } else if (group)
                    {
                        type = "group";
                        info.op = getOpText("contains");
                        info.value = "";
                        for (var i = 0; i < group.rules.length; i++)
                        {
                            if (i > 0) info.value += (i != (group.rules.length - 1)) ? "、" : "或";
                            info.value += group.rules[i].value;
                        }
                    }
                    else if (filter)
                    {
                        type = "filter";
                    }
                    else if (filterAdvanced)
                    {
                        type = "filterAdvanced";
                    }
                    else if (filterSearch)
                    {
                        type = "filterSearch";
                    }
                    var jtag = $('<span class="tag"></span>').insertBefore(jinput);
                    if (rule || group)
                    {
                        jtag.append('<span class="field">' + info.field + '</span>');
                        jtag.append('<span class="op">' + info.op + '</span>');
                        jtag.append('<span class="value">' + info.value + '</span>');
                    } else if (filter)
                    {
                        jtag.append('<span class="field">' + filter.name + '</span>');
                    }
                    else if (filterSearch)
                    {
                        jtag.append('<span class="field">自定义选项</span>');
                    }
                    else if (filterAdvanced)
                    {
                        jtag.append('<span class="field">高级选项</span>');
                    }
                    var jclose = $('<i class="close tagclose">×</i>').appendTo(jtag);
                    jtag.attr("data-id", newId);
                    jtag.attr("data-type", type);
                    if (rule)
                    {
                        rulesHs[newId] = rule;
                    }
                    else if (group)
                    {
                        rulesHs[newId] = group;
                    }
                    else if (filter)
                    {
                        rulesHs[newId] = filter;
                    }
                    else if (filterSearch)
                    {
                        rulesHs[newId] = filterSearch;
                    }
                    else if (filterAdvanced)
                    {
                        rulesHs[newId] = filterAdvanced;
                    }
                }
            },


            getCurrentTreeCondition: function ()
            {
                var g = this, p = this.options;
                if (g.current.filterTree && !g.current.filterTree.custom)
                {
                    return g.current.filterTree.data;
                }
            },

            getCurrentCondition: function ()
            {
                var g = this, p = this.options;
                var filter = $.extend(true, {}, g.current.filter);
                if (g.current.filterIds && g.current.filterIds.length)
                {
                    filter.groups = filter.groups || [];
                    $(g.current.filterIds).each(function (i, id)
                    {
                        var o = g.findFilter(id);
                        if (!o) return;
                        filter.groups.push($.extend(true, {}, o.value));
                    });
                }
                if (g.current.filterSearch)
                {
                    filter.groups = filter.groups || [];
                    filter.groups.push($.extend(true, {}, g.current.filterSearch));
                }
                if (g.current.filterAdvanced)
                {
                    filter.groups = filter.groups || [];
                    filter.groups.push($.extend(true, {}, g.current.filterAdvanced));
                }
                if (p.viewType == "list")
                {
                    if (g.current.filterTree && !g.current.filterTree.custom)
                    {
                        filter.groups = filter.groups || [];
                        filter.groups.push($.extend(true, {}, g.current.filterTree));
                    }
                }
                if (p.bind && p.bind.filterData)
                {
                    filter.groups = filter.groups || [];
                    filter.groups.push($.extend(true, {}, p.bind.filterData));
                }
                if (p.defaultFilters && p.defaultFilters.length)
                {
                    $(p.defaultFilters).each(function ()
                    {
                        if (this.value)
                        {
                            filter.groups = filter.groups || [];
                            filter.groups.push($.extend(true, {}, this.value));
                        }
                    });
                }
                if (p.bind && p.bind.showIncludeFilter && !includeFilter(filter))
                {
                    filter = {
                        rules: [
                            {
                                field: 'ID',
                                op: 'euqla',
                                value: '-1'
                            }
                        ]
                    };
                }
                pbc.prevFilter(filter);
                return filter;


                function includeFilter(filter)
                {
                    if (!filter) return false;
                    if (filter.rules)
                    {
                        for (var i = 0; i < filter.rules.length; i++)
                        {
                            if (filter.rules[i] && filter.rules[i].field) return true;
                        }
                    }
                    if (filter.groups)
                    {
                        for (var i = 0; i < filter.groups.length; i++)
                        {
                            if (includeFilter(filter.groups[i])) return true;
                        }
                    }
                    return false;
                }
            },

        });
    };

     

    function getOpText(op)
    {
        switch (op)
        {
            case "equal":
                return "等于";
            case "contains":
                return "包括";
        }
        return "";
    }

    return toolbar;
});