
define([
    "text!pages/application/login/login.html",
    "css!styles/application/login.css"
], function (html)
{
    var alert = function (msg)
    {
        //toastr.error(msg);
        // $.ligerDialog.error(msg);
         
        pbc.showAlert('提示', msg);
         
    };


    function destroy()
    {
        $(".login-text").unbind();
        $(document).unbind();
        $("#btnLogin").unbind();

    }

    function dologin()
    {

        var username = $("#txtUsername").val();
        var password = $("#txtPassword").val();
        if (username == "")
        {
            alert('账号不能为空!');
            $("#txtUsername").focus();
            return;
        }
        if (password == "")
        {
            alert('密码不能为空!');
            $("#txtPassword").focus();
            return;
        }

        pbc.showLoading("正在登录中...");
        $.ajax({
            type: 'post', cache: false, dataType: 'json',
            url: pbc.actions.login,
            data : {
                username: username,
                password: password
            }, 
            success: function (result)
            { 
                pbc.hideLoading();
                if (!result || !result.data)
                {
                    alert('登陆失败,账号或密码有误!');
                    $("#txtUsername").focus();
                    return;
                } else
                {
                    
                    pbc.currentUser = result.data;
                    
                    require(["fakeloader"], function ()
                    {
                        
                        var jloader = $('<div class="fakeloader"></div>').appendTo('body');

                       
                        jloader.fakeLoader({
                            timeToHide: 99000,
                            bgColor: "#4a8bc2",
                            spinner: "spinner3"
                        });

                        require(["home1"], function (home)
                        { 
                            destroy();
                            home.run(result.data);
                            jloader.fadeOut();
                            jloader.remove();
                        });
                    
                    });

                    

                }
            },
            error: function ()
            {
                alert('发送系统错误,请与系统管理员联系!');
            },
            beforeSend: function ()
            {
                $("#btnLogin").attr("disabled", true);
            },
            complete: function ()
            {
                pbc.hideLoading();
                $("#btnLogin").attr("disabled", false);
            }
        });
    }

    $("#txtUsername").focus();

    return {
        run: function ()
        { 
            $('body').html(html);
            $(".login-text").bind('focus',function ()
            {
                $(this).addClass("login-text-focus");
            }).blur(function ()
            {
                $(this).removeClass("login-text-focus");
            });
            $(document).bind('keydown',function (e)
            {
                if (e.keyCode == 13)
                {
                    dologin();
                }
            });
            $("#btnLogin").bind('click',function ()
            {
                dologin();
            });
        }
    };

});