function service(page)
{
  page.bind('treeSelected',function(e){
    
     var data = e.data;
      
        var p = page.options;  
        p.common.openParm = function ()
        {
          if(data){
            var bind = new pbc.base64().encode(JSON.stringify({
                formData: { 
                    Clientarea: [data.id,data.text]
                }
            })); 
             
            return "bind=" + bind;

          }
        };
    
  });
    
    page.bind('beforeShowTree', function (e)
    {

        var page = e.page;
        var op = e.options;

        op.url = "/web/treedata";
        op.parms = {
            enabled: 1,
            sourceModel: "base_area",
            parentField: "",
            textField: "Title",
            filter : {
                rules : [
                    { field: 'ParentID', op: 'isnull' } 
                ]
            },
            fields: "Type",
            sourceModel2: "",
            parentField2: "",
            refSourceField: "",
            textField2: ""
        };
        op.isLeaf = function (data)
        {
            if (!data) return false;
            return data.Type == "district";
        };
        op.delay = function (e)
        {
            var data = e.data;
            if (!data) return false;
            if (data.Type != "district")
            {
                return {
                    url: '/web/treedata',
                    parms: {
                        enabled: 1,
                        sourceModel: "base_area",
                        parentField: "",
                        textField: "Title",
                        filter: pbc.createFilter({
                            ParentID: data.id
                        }),
                        fields: "Type",
                        sourceModel2: "",
                        parentField2: "",
                        refSourceField: "",
                        textField2: ""
                    }
                }
            }
            return false;
        };


    });
    
    
}
