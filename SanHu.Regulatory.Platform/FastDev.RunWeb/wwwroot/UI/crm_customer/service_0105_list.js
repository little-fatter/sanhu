function service(page)
{
    
    page.bind('beforeShowList', function (e)
    {
        var page = e.page, gridOptions = e.options;
        var column = pbc.web.helper.first(gridOptions.columns, function (a) { return a.name == "CustomerName"; });
        if (column == null) return;
 
        column.render = function (r)
        { 
            var CustomerID = r.ID
            var link = "/web/main?model=crm_customerContract&viewname=list";
         
            var bind = new pbc.base64().encode(JSON.stringify({
                filterData: pbc.createFilter({
                    CustomerID: CustomerID
                }),
                mainData : r
            }));
            link += "&bind=" + bind;
            return '<a href="javascript:void()" data-link="' + link + '" class="todolink">' + r.CustomerName + '</a>';
        };
 
        gridOptions.onAfterShowData = function ()
        {
            $("a.todolink", this.element).click(function ()
            {
                  
                var link = $(this).attr("data-link");
                var name = $(this).html();
                top.openTab({
                    text: name + "的联系人",
                    url: link,
                    tabid: 'crm_customerAddress_list',
                    data: { 
                    }
                });
 
            });
        };  
    } );
 
    
}
