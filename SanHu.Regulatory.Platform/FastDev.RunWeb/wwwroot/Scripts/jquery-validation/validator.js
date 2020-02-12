setTimeout(function ()
{
    var $ = jQuery;
    $.validator.addMethod("regexRule",
        function (value, element, params)
        {
            var exp = new RegExp(params);
            return this.optional(element) || exp.test(value);
        },
        "格式错误");

    $.validator.addMethod(
            "notnull",
            function (value, element)
            {
                if (!value) return true;
                return !$(element).hasClass("l-text-field-null");
            },
            "不能为空"
    );

    jQuery.validator.addMethod("standardname",
    function (value, element, params)
    {
        var exp = new RegExp("^[a-zA-Z][a-zA-Z0-9_]+$");
        return this.optional(element) || exp.test(value);
    },
    "格式错误");

}, 1000);