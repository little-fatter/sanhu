define([''],
function() {
    function view() {
        return function run(e) {
            var renderTo = e.renderTo;
            var h = [];
            h.push('<div class="linkpanel">');
            h.push('   <div class="body">');
            h.push('   <div style="width: 100%; overflow-y: auto">');
            h.push('        <ul>         ');

            h.push('   </ul>');
            h.push('   </div>');
            h.push('  </div>');
            h.push(' </div>');

            $(renderTo).html(h.join('')).css("overflow","auto");

            var jul = $(renderTo).find("ul");

            var tabidcounter = 0;

            pbc.ajax({
                loading: null,
                url: pbc.toUrl('/web/listdata'),
                data: {
                    model: 'core_links'
                },
                success: function(data) {
                    if (!data || !data.length) return;

                    for (var i = 0; i < data.length; i++) {
                        var item = data[i];

                        var jitem = $('<li><a href="javascript:void(0);" class="link"> <span class="icon"></span>' + item.Title + '<i></i></a></li>');

                        if (item.Value) {
                            jitem.find("i").html(item.Value);
                        } else {
                            jitem.find("i").remove();
                        }
                        if (item.BackgroundColor) {
                            jitem.find("span").css("backgroundColor", item.BackgroundColor);
                        }

                        if (item.Icon) {
                            jitem.find("span").css("backgroundImage", "url(" + item.Icon + ")");
                        }
                        if (item.Url) {
                            var url = pbc.toUrl(item.Url);
                            if (item.LinkBind && url.indexOf("&bind=") == -1) {
                                url += "&bind=" + item.LinkBind;
                            }
                            jitem.find("a").attr("data-url", url);
                        }
                        if (item.LinkID) {
                            jitem.find("a").attr("data-tabid", item.LinkID);
                        }
                        if (item.Title) {
                            jitem.find("a").attr("data-title", item.Title);
                        }
                        jul.append(jitem); 
                    }

                }
            });

        };
    }

    var exports = {
        run: view()
    };

    return exports;
});