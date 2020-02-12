function server(page)
{
    page.bind('beforeShowForm', function (e)
    {
        
        var page = e.page;
        var op = e.options;

        var field = pbc.web.helper.first(op.fields, function (a) { return a.name == "Details"; });
        if (field == null || !field.editor || !field.editor.grid || !field.editor.grid.columns) return;
        var column = pbc.web.helper.first(field.editor.grid.columns, function (a) { return a.name == "FieldName"; });
     

        if (column != null && column.editor)
        {
            column.editor.popupselect_url = function ()
            {
                var combobox = this;
                var modelName = page.form.getEditor("ModelName").getValue();
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
