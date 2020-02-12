define([], function ()
{
	var exports = {
		name : '表单默认值',
        run : run
    };
    function run(e)
    {
    	var page = e.page, p = e.page.options;
        var v = e.options.value;
		  
        page.bind('afterShowForm', function (e)
        {
            var page = e.page;
            var form = page.form;
            if (!v.data) return;

            if (!page.options.id && v.isNew)
            {
                loadData();
            }
            if (page.options.id && v.isEdit)
            {
                loadData();
            }

            function loadData()
            {
            	var data = $.extend(true, {}, v.data);
                for (var name in data)
                {
                    var value = data[name];
                    if (value && value.indexOf('#user.') != -1)
                    {
                        data[name] = getValue(value.replace(/#/g, ''));
                    }
                    if (value && $.isArray(value))
                    {
                        $(value).each(function (i, sub)
                        {
                            if (sub && sub.indexOf('#user.') != -1)
                            {
                                data[name][i] = getValue(sub.replace(/#/g, ''));
                            }
                        });
                    }
                }
                form.setData(data);
            }
            function getValue(exp)
            {
                try{
                    var fn = null;
                    eval("fn = function(user){ return " + exp + "}");
                    if (fn != null) return fn(page.options.userdata);
                } catch (e)
                {
                    return ''
                }
            }
        });
    }

    return exports;

});