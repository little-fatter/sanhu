function view()
{
    return function run(renderTo, pagedata)
    {
        $(renderTo).css({
            margin: 10, 
            fontSize: '36px'
        });
        $(renderTo).append("hello word");
    };
}