define([
   "jquery",
   "home",
], function ($, html, common)
{

    function main()
    {
    	var page = pbc.getQueryStringByName("page") ;
      
    	if (page)
    	{
    		pbc.openPage({
    			url: page
    		}, $('body'));
    	}
    	else if(pbc.getQueryStringByName("model"))
    	{
    		page = pbc.getNewUrl(location.href);
    		pbc.openPage({
    			url: page
    		}, $('body'));
    	}
    }

    return {
        run: main

    };
    function showPageLoading()
    {
        if (!pageloading || !pageloading.length)
        {
            pageloading = $("#toppageloading");
            if (!pageloading.length)
            {
                pageloading = $('<div id="toppageloading"></div>').appendTo('body').show();
            } else
            {
                pageloading.show();
            }
        }
    }
    function removePageLoading()
    {
        if (pageloading)
        {
            if (pageloading.remove)
            {
                pageloading.remove();
            }
            pageloading = null;
        }
    }
});