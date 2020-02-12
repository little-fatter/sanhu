define(["jquery" ], function ($ )
{
    //tool buttons 部件，传入 page
    return function (page)
    {  
        var g = page, p = page.options;

        var toolbar = p.toolbar;
        toolbar = toolbar || {};
        toolbar.items = toolbar.items || [];
        var baseOp = p.common || {};
        if (baseOp.buttonsShowType == "hide" || p.hideButtons)
        {
            $(".toolpanel", g.jelement).hide();
            return;
        }
         
        g.trigger('toolbarInit', {
            page: g,
            viewType: p.viewType,
            toolbar: toolbar
        });
        g.jtoolbar.html('');
        g.jtoolbar.after('<div class="clear"></div>');

        if (baseOp.buttonsShowType == "left")
        {
            g.jtoolbar.addClass("left").removeClass("right");
        }
        else if (baseOp.buttonsShowType == "right")
        {
            g.jtoolbar.addClass("right").removeClass("left");
        }
        var existExcelBtn = false;
        g.addButton = function (item)
        {
        	addItem(item);
        };

        $(toolbar.items).each(function (i, item)
        {
        	addItem(item);
        });
		
        g.trigger('afterShowToolbar', {
        	page: g
        });
        function addItem(item)
        {
        	var jbtn = $('<a class="ne-btn"></a>').appendTo(g.jtoolbar);
        	jbtn.attr("data-id", item.id);
        	if (item.id == "import" || item.id == "export")
        	{
        		existExcelBtn = true;
        	}
        	if (item.href)
        	{
        		jbtn.attr("href", item.href).attr("target", "_blank");
        	}
        	if (item.cls)
        	{
        		jbtn.addClass(item.cls);
        	}
        	jbtn.html(item.text);
        	if (item.children)
        	{
        		jbtn.addClass("ne-btn-group");
        		jbtn.append("<i class='ui-icon ui-icon-triangle-1-s'></i>");

        		var jmenu = $('<ul class="dropdown-menu"></ul>').appendTo(jbtn);

        		$(item.children).each(function (j, subItem)
        		{
        			var jsub = $('<li><a data-id="' + subItem.id + '">' + subItem.text + '</a></li>').appendTo(jmenu);
        			if (subItem.href)
        			{
        				jsub.find("a").attr("href", subItem.href).attr("target", "_blank");
        			}
        			if (subItem.cls)
        			{
        				jsub.find("a").addClass(subItem.cls);
        			}
        		});
        		jmenu.find("a").bind('click', function (e)
        		{ 
        			if (item.onClick)
        			{
        				item.onClick.call(g);
        				return;
        			}
        			var itemId = $(this).attr("data-id");
        			if (!itemId) return;
        			g.trigger(itemId);
        		});
        		jmenu.menu();
        	}
        	else
        	{
        		jbtn.bind('click', function (e)
        		{
        			if (item.onClick)
        			{
        				item.onClick.call(g);
        				return;
        			}
        			var itemId = $(this).attr("data-id");
        			if (!itemId) return;
        			g.trigger(itemId);
        		});
        	}
        }
        if (existExcelBtn)
        {
            require(["views_parts_excel"], function (init)
            {
                init(g);
            });
        }
        if ((baseOp.buttonsShowType == "left" || baseOp.buttonsShowType == "right") && baseOp.buttonsShowType == baseOp.searchAdShowType)
        {
            var jbtn = g.createAdvancedSearchBtn(baseOp.buttonsShowType == "left");
            if (jbtn)
            {
                jbtn.appendTo(g.jtoolbar);
            }
        }
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