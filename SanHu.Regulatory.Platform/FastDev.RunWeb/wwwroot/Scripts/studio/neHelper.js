function getPropertyJson(json,name)
{
    try{
        var o = null;
        eval("o =  " + json);
        var value;
        eval("value = o." + name);
        if (!value) return "null";
        return JSON.stringify(value);  
    }
    catch (e)
    {
        return "null";
    }
}
function prevFilter(group)
{
    for (var i = 0; group.rules && i < group.rules.length; i++)
    {
        var rule = group.rules[i];
        var op = rule.op;
        if (rule.value && $.isArray(rule.value) && rule.value.length)
        {
            rule.field += "ID";
            var vs = [];
            for (var i = 0; i < rule.value.length; i++)
            {
                vs.push(rule.value[i][0]);
            }
            rule.value = op == "equal" ? vs[0] : vs.join(';');
        }
    }
    for (var i = 0; group.groups && i < group.groups.length; i++)
    {
        var subGroup = group.groups[i];
        prevFilter(subGroup);
    }

};