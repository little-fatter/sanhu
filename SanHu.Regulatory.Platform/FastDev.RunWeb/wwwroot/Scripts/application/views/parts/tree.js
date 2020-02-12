define(["jquery"], function ($)
{
    //tree初始化 部件，传入 page
    return  function (g)
    {
        var p = g.options;
        var isTreePage = g.treePage_init ? true : false;
        if (!p.treeFilter) return;
		 
        if (isTreePage)
        {
        	if (!p.treeFilter.sourceModel) return;
        } else
        {
        	if (!p.treeFilter.enabled || !p.treeFilter.sourceModel || !p.treeFilter.filterField) return; 
        } 
        var treeWidth = 200;
        var jmainpanel = g.jelement.find(".mainpanel:first");
        var jfiltertree = $('<div class="filtertree"><h3>查询</h3><div class="treepanel"><ul class="tree"></ul></div></div>').insertAfter(jmainpanel);
        if (p.treeFilter.header)
        {
            jfiltertree.find("h3").html(p.treeFilter.header);
        }
        jfiltertree.width(treeWidth);

        //jfiltertree.addClass("left");
        //jmainpanel.addClass("left");

        if (p.treeFilter.showInLeft)
        {
            jfiltertree.css({
                position: "absolute",
                left: 10,
                top: jmainpanel.offset().top - jfiltertree.parent().offset().top,
                margin: 0
            });
            jmainpanel.css("marginLeft", treeWidth + 20);
            jmainpanel.width($(window).width() - treeWidth - (g.current.isPreviewMode ? 80 : 50) - jfiltertree.offset().left);

        } else
        {
            jfiltertree.css({
                position: "absolute",
                right: 10,
                top: jmainpanel.offset().top - jfiltertree.parent().offset().top,
                margin: 0
            });
            jmainpanel.width($(window).width() - jmainpanel.offset().left - treeWidth - 20);

            if (g.current.isPreviewMode)
            {
                jmainpanel.width(jmainpanel.width() - 40);
            }
        }


        var jtreepanel = jfiltertree.find(".treepanel");
        jtreepanel.height($(window).height() - jfiltertree.offset().top - 45);
        var jtree = jtreepanel.find("ul");
        var parms =$.extend(true,{}, p.treeFilter);
        delete parms.url;
        delete parms.header;
        delete parms.pageUrl;
        var treeOptions = {
            url: pbc.toUrl(p.treeFilter.url || 'web/treedata/'),
            checkbox: false,
            nodeWidth: 200,
            parms: parms,
            onSuccess: function ()
            {
            	if (p.treeFilter.filterByTreeData)
            	{
            		onValueChange();
            	}
                g.reload();
            },
            onSelect: onValueChange,
            onCancelselect: onValueChange
        };
        g.trigger('beforeShowTree', {
            page: g,
            options: treeOptions
        });
        g.treeFilter = g.tree = jtree.ligerTree(treeOptions);
        var levelMode = p.treeFilter.sourceModel2 || p.treeFilter.sourceModel;
        function onValueChange()
        {
            var selected = g.treeFilter.getSelected();
			 
            if (!selected || !selected.data)
            {  
            	setTreeFilter(); 
            }
            else
            {
                var data = selected.data;
                if (data.rootNode)
                { 
                    setTreeFilter();
                }
                else if (p.treeFilter.custom) //自定义过滤 
                {
                    g.current.filterTree = {
                        custom: true,
                        data: data
                    };
                }
                else if (data.filter)  //返回data自定义了条件
                {
                    g.current.filterTree = data.filter;
                }
                else
                {
                    setTreeFilter(data);
                }
            }
            function setTreeFilter(data)
            {
            	if (!data && !p.treeFilter.filterByTreeData)
            	{
            		g.current.filterTree = null;
            		return;
            	}
            	data = data || {};


                var children = pbc.web.helper.getTreeChildren(data.id, g.treeFilter.data);
                var levelChildren = pbc.web.helper.filterArray(children, function (item)
                {
                    return item.model == levelMode;
                });
                if (data.model == levelMode)//如果当前节点也需要搜索
                {
                    levelChildren = levelChildren || [];
                    levelChildren.push(data);
                }
                if (levelChildren && levelChildren.length)
                {
                    g.current.filterTree = {
                        rules: [],
                        groups: [],
                        op: 'or'
                    };
                    var treeRule = {
                        field: p.treeFilter.filterField,
                        value: [],
                        op: 'in'
                    };
                    for (var i = 0; i < levelChildren.length; i++)
                    {
                        treeRule.value.push([levelChildren[i].id, levelChildren[i].text]);
                    }
                    g.current.filterTree.rules.push(treeRule);
                } else
                {
                    g.current.filterTree = null;
                }
            }
            g.trigger('treeSelected', {
                page: g,
                data: selected ? selected.data : null
            });
             if (g.loadPage)
            {
                g.loadPage(selected ? selected.data : null);
             }
             else if (g.list_reload)
             {
                 g.list_reload();
             } 
        }
    };

});