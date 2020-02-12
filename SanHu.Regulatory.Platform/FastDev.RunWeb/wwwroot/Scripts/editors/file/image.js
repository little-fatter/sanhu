(function ()
{ 
    $.ligerDefaults.Form.editors['image'] = {
        create: function (container, editParm)
        {
            var juploader = $('<div class="imguploader"><img border="1" name="image_medium" src="/contents/img/placeholder.png"></div>').appendTo(container);
            var juploadable = $('<a class="uploadable">编辑</div>').appendTo(juploader);
            var jhide = $('<input type="hidden" class="filevalue"  />  ').appendTo(juploader);
            var jform = $('<form  action="" method="POST" enctype="multipart/form-data"></form>').appendTo(juploader);
            var jfile = $('<input type="file"  style="display:none" />').appendTo(jform);
            jfile.attr("name", "fileData");
            jform.attr("action", pbc.url('/file/upload/?appid=' + pbc.getAppId()));
            jfile.bind("change", function ()
            {
                upload();
            });

            juploader.find("img").css({
                width: 70,
                height: 'auto'
            });
            juploadable.click(function ()
            {
                jfile.click();
            });

            function upload()
            {
                jform.ajaxSubmit({
                    dataType: 'json',
                    success: function (data, status)
                    {
                        var status = data.statusCode;
                        if (status == "2")
                        {
                            top.pbc.tips(2, data.Message);
                        }
                        else if (status == "3")
                        {
                            top.pbc.tips(3, data.Message);
                        }
                        else
                        {
                            jhide.val(data.Data);
                            juploader.find("img").attr("src", pbc.url(data.Data));
                        }
                    }
                });
            }

            return juploader;
        },
        getValue: function (o, editParm)
        {
            return o.find(".filevalue").val();
        },
        setValue: function (o, value, editParm)
        {
            if (value)
            {
                o.find(".filevalue").val(value);
                o.find("img").attr("src", pbc.url(value));
            }
        },
        resize: function (o, width, height, editParm)
        {
        }
    };
})();