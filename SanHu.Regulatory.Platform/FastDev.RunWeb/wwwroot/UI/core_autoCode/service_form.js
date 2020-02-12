function server(page)
{
    page.bind('beforeShowForm', function (e)
    {
        
        var page = e.page;
        var op = e.options;

        var field = pbc.web.helper.first(op.fields, function (a) { return a.name == "FieldName"; }); 
     

        if (field != null && field.editor)
        {
            field.editor.popupselect_url = function ()
            {
                var combobox = this;
                var modelName = $("[name=ModelName]").val();
                if (!modelName) return false;

                var url = "/web/main/?model=core_modelfield&viewtype=list";
                bindStr = new pbc.base64().encode(JSON.stringify({
                    filterData: {
                        groups: [],
                        op: 'and',
                        rules: [
                            { field: 'ModelName', value: modelName, op: 'equal' }
                        ]
                    }
                }));
                return url + "&bind=" + bindStr;
            }; 
        }
           
    });

}
