﻿function view()
{
    return function run(renderTo, pagedata)
    {

        var url = $(renderTo).attr("data-url");

        var parentId = pbc.getUrlParm(url, "parentid");

        var h = [];
        h.push('<div class="linkpanel">');
        h.push('   <div class="body">');
        h.push('   <div style="width: 100%; ">');
        h.push('        <ul>         ');

        h.push('   </ul>');
        h.push('   </div>');
        h.push('  </div>');
        h.push(' </div>');

        $( renderTo ).html( h.join( '' ) ).css( "overflowY", "scroll" );

        var jul = $(renderTo).find("ul");

        $(renderTo).height(200);

        function getBind()
        {
            var g = this, p = this.options;
            var qs = pbc.getUrlParm(url, "bind"); 
            if (!qs) return null;
            try
            {
                var json = new pbc.base64().decode(qs);
                var bind = {};
                eval("bind = " + json);
                return bind;
            }
            catch (e)
            {
                return null;
            }
        }
         
        var tabidcounter = 0;
        var bind = getBind();

        var filter = {};

        if (bind && bind.filterData)
        {
            filter = bind.filterData;

            pbc.prevFilter(filter);
        }
        else if (parentId)
        {
            filter = {
                rules: [
                    { field: 'ParentID', value: parentId }
                ]
            };
        }
        pbc.ajax({
            loading: null,
            url: pbc.toUrl('/web/listdata'),
            data: {
                model: 'core_menu',
                filter: filter
            },
            success: function (data)
            {
                if (!data || !data.length) return;

                var getRandomColor = function ()
                {

                    return '#' +
                      (function (color)
                      {
                          return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                            && (color.length == 6) ? color : arguments.callee(color);
                      })('');
                };
                 
                for (var i = 0; i < data.length; i++)
                {
                    var item = data[i];

                    item.BackgroundColor = item.BackgroundColor || getRandomColor();
                    item.Url = item.Url || item.MenuUrl;
                    item.Title = item.Title || item.MenuName;
                    item.Icon = item.Icon || item.MenuIcon;

                    var jitem = $('<li><a href="javascript:void();"> <span class="icon"></span>' + item.Title + '<i></i></a></li>');

                    if (item.Value)
                    {
                        jitem.find("i").html(item.Value);
                    } else
                    {
                        jitem.find("i").remove();
                    }

      
                    if (item.BackgroundColor)
                    {
                        jitem.find("span").css("backgroundColor", item.BackgroundColor);
                    }

                    if (item.Icon)
                    {
                        jitem.find("span").css("backgroundImage", "url(" + item.Icon + ")");
                        jitem.find("span").css("backgroundRepeat", "no-repeat");
                        jitem.find("span").css("backgroundPosition", "center center"); 
                    }
                    if (item.Url)
                    {
                        var url = pbc.toUrl(item.Url);
                        if (item.LinkBind && url.indexOf("&bind=") == -1)
                        {
                            url += "&bind=" + item.LinkBind;
                        }
                        jitem.find("a").attr("url", url);
                    }
                    if (item.OpenType)
                    {
                        jitem.find("a").attr("data-opentype", item.OpenType)
                    }
                    if (item.LinkID)
                    {
                        jitem.find("a").attr("tabid", item.LinkID);
                    }
                    if (item.Title)
                    {
                        jitem.find("a").attr("text", item.Title);
                    }
                    jul.append(jitem);

                    $("a", jitem).click(function ()
                    {
                        var jlink = $(this);
                        var tabid = jlink.attr("tabid");
                        var url = jlink.attr("url");
                        if (!url) return;
                        var openType = jlink.attr("data-opentype");

                        if (openType == "dialog")
                        {
                            top.openDialog({ 
                                title: jlink.attr("text"),
                                url: url
                            });
                            return;
                        }
                        if (!tabid)
                        {
                            tabidcounter++;
                            tabid = "link_" + tabidcounter;
                            jlink.attr("tabid", tabid);
                            if (url.indexOf('?') > -1) url += "&";
                            else url += "?";

                            jlink.attr("url", url);
                        }
                        top.openTab({
                            tabid: tabid,
                            text: jlink.attr("text"),
                            url: url
                        });
                    });
                }


            }
        });


    };

    
}