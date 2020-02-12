function service(page)
{
    
  page.bind('afterShowForm', function (e)
  {
    var p = page.options;
    p.bind = p.bind || {};
    p.bind.formPostData = {
      CompanyID : p.userdata.CurrentCompanyID
    }; 
  });

    
  var interval = setInterval(function ()
  {
       
      var jpage = page.options.renderTo;
      var views = $(".ne-view");

      if (exist())
      {
          
      } else //已经关闭了
      {
          
          //这个地方写你需要的脚本 

          clearInterval(interval);
      }

      function exist()
      {
          for (var i = 0; i < views.length; i++)
          {
              if (views[i] == jpage) return true;

          }
      }

  }, 1000);
}
