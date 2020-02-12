function service(page)
{

    page.bind('beforeShowList', function (e)
    {
        var page = e.page, gridOptions = e.options;
        var column1 = pbc.web.helper.first(gridOptions.columns, function (a) { return a.name == "HZQK"; });
        if (column1 != null)
        {

            column1.render = function (r)
            {
                var CustomerID = r.ID;
                var link = "/web/main?model=GJMX&viewname=list";
                var tabId = "crm_customerAddress_list1";
                var bind = new pbc.base64().encode(JSON.stringify({
                    filterData: pbc.createFilter({
                        ZBID: CustomerID
                    }),
                    mainData: r
                }));
                link += "&bind=" + bind;
                return '<a href="javascript:void()" data-link="' + link + '" data-tabid="' + tabId + '" class="todolink">邀约详情</a>';
            };
        }

        var column2 = pbc.web.helper.first(gridOptions.columns, function (a) { return a.name == "GJQK"; });

        if (column2 != null)
        {
            column2.render = function (r)
            {
                var CustomerID = r.ID;
                var link = "/web/main?model=YYMX&viewname=list";
                var tabId = "crm_customerAddress_list2";
                var bind = new pbc.base64().encode(JSON.stringify({
                    filterData: pbc.createFilter({
                        ZBID: CustomerID
                    }),
                    mainData: r
                }));
                link += "&bind=" + bind;
                return '<a href="javascript:void()" data-link="' + link + '" data-tabid="' + tabId + '"  class="todolink">跟进详情</a>';
            };
        }

        gridOptions.onAfterShowData = function ()
        {
            $("a.todolink", this.element).click(function ()
            {

                var link = $(this).attr("data-link");
                var name = $(this).html();
                var tabId = $(this).attr("data-tabid");
                top.openTab({
                    text: name,
                    url: link,
                    tabid: tabId,
                    data: {

                    }
                });

            });
        };
    });



}