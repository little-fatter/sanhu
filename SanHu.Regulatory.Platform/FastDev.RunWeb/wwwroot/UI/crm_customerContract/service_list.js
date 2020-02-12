function service(page)
{
 
    
    page.bind('beforeShowList', function (e)
    {
        var page = e.page, gridOptions = e.options;
        var p = page.options;  
        p.common.openParm = function ()
        {
             
            var mainData = p.bind.mainData;
            var bind = new pbc.base64().encode(JSON.stringify({
                formData: { 
                    Contactname: mainData.CustomerName,
                    phone: mainData.Telephone
                },
                formPostData: {
                    CustomerID: mainData.ID,

                    DD: pbc.getFormatDate(new Date(),'yyyy-MM-dd hh:mm')
                }
            }));
            var dd = pbc.getFormatDate(new Date(), 'yyyy-MM-dd hh:mm');
             
            return "bind=" + bind;


        };
    });

    
    
}
