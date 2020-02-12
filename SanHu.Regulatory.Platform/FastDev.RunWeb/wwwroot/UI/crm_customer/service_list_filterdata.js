function service(page)
{

    page.bind('beforeShowList', function (e)
    {

        var page = e.page;
        var p = page.options;

        p.bind = {
            filterData: {
                rules: [
                        { field: 'id in (select CustomerID from crm_customerContract where CreateDate < DATEADD(month, -3, getDate()) )', type: 'sql' }
                ]
            }
        };


    });
    
    
}
