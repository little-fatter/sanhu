define(["text!./template.html" ,"baiduTemplate"],
function (template)
{ 
    var exports = {

        format: function (e)
        {
        	if (e.data.openUrl)
        	{
        		e.data.openUrl = e.data.openUrl.replace("#data.id#", "{{ data.ID }}");
        	}
            var fh = baidu.template(template, e.data);

            return fh;
        },


        run: function (e)
        {
            $(e.renderTo).css("height", "100%");

            if (e.data.backgroundColor)
            {
                $(e.renderTo).css("backgroundColor", "#" + e.data.backgroundColor);
            }
            if (e.data)
            {
            	$(e.renderTo).html(e.template);

            	var op = {
            		el: $(e.renderTo).get(0),
            		data: e.data
            	};

            	new Vue(op);
            }
        }
    }; 

    return exports;


});