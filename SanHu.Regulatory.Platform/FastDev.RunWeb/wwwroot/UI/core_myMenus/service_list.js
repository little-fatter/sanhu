function server(page)
{ 
    var events = function ()
    {
       
    };
     
    $.extend(events,
    {
        getHandler: function (name)
        {
            if (name == "pageLoad")
            {
                return this.pageLoad;
            }
        },

        pageLoad: function ()
        {
            var g = this, p = this.options;

            p.bind = {
                filterData: {
                    rules: [{ field: 'UserID', value: '{CurrentUserID}', op: 'equal' }]
                }
            };
        }


    });

    for (var name in events)
    {
        var fn = events[name];
        if ($.isFunction(fn))
        {
            page.bind(name, fn);
        }
    }

};