function view()
{
    return function run(renderTo, pagedata)
    { 
        $(renderTo).css({
            margin: 10 
        });

        var jbtn = $("<div class='ne-btn'>弹出框</div>").appendTo(renderTo);

        jbtn.click(show);

        function show()
        {
            var options = {
                url: 'web/main?model=core_user&viewname=hello',
                top: 50,
                width: 700,
                height: 500,
                title:'弹出选择框',
                data: {
                    selectorType: true,
                    singleMode: true,   
                    valueField: "ID",
                    textField: "RealName",
                    callback: function (selecteds)
                    { 
                        for (var i = 0; i < selecteds.length; i++)
                        {  
                            alert('选择的是:' + selecteds[i].RealName);
                            break;
                        }
                        d.close();
                        
                    }
                }
            };
            var d = $.ligerDialog.open(options);
        }
    };
}