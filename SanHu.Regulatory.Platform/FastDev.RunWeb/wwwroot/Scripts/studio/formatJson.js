/*
    预处理json
    1,key首字母小写    -- lowerCaseString(name)
    2,key不需要引号    -- quote2
    3,get code result  -- isEventKey
    4,url              -- isUrlKey
*/
function formatJson(json)
{
    var o = null;
    eval("o =  " + json);
    return stringify(o);

    function stringify(o)
    {
        var f = function (n)
        {
            return n < 10 ? '0' + n : n;
        },
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        },
        quote = function (value)
        {
            escapable.lastIndex = 0;
            return escapable.test(value) ?
                '"' + value.replace(escapable, function (a)
                {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                '"' + value + '"';
        },
        quote2 = function (value)
        {
            escapable.lastIndex = 0;
            return escapable.test(value) ?
                value.replace(escapable, function (a)
                {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                        '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) :
                value;
        }, 
        isEventKey = function (key)
        {
            if (typeof (key) != "string") return false;
            return key.indexOf('on') == 0;
        },
        isUrlKey = function (key)
        {
            if (typeof (key) != "string") return false;
            if (key == "url") return true;
            if (endWith(key, "Url")) return true; 
            return false; 
        };
        if (o === null) return 'null';
        var type = typeof o;
        if (type === 'undefined') return undefined;
        if (type === 'string') return quote(o);
        if (type === 'number' || type === 'boolean') return '' + o;
        if (type === 'object')
        {
            if (typeof o.toJSON === 'function')
            {
                return stringify(o.toJSON());
            }
            if (o.constructor === Date)
            {
                return isFinite(this.valueOf()) ?
                    this.getUTCFullYear() + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate()) + 'T' +
                    f(this.getUTCHours()) + ':' +
                    f(this.getUTCMinutes()) + ':' +
                    f(this.getUTCSeconds()) + 'Z' : null;
            }
            var pairs = [];
            if (o.constructor === Array)
            {
                for (var i = 0, l = o.length; i < l; i++)
                {
                    pairs.push(stringify(o[i]) || 'null');
                }
                return '[' + pairs.join(',') + ']';
            }
            var name, val;
            for (var k in o)
            {
                type = typeof k;
                if (type === 'number')
                {
                    name = '"' + k + '"';
                } else if (type === 'string')
                {
                    name = quote2(k);
                } else
                {
                    continue;
                }
                type = typeof o[k];
                if (type === 'function' || type === 'undefined')
                {
                    continue;
                }
                if (isEventKey(k))
                {
                    val = o[k];
                } else
                {
                    val = stringify(o[k]);
                }
                pairs.push(lowerCaseString(name) + ':' + val);
            }
            return '{' + pairs.join(',') + '}';
        }
    }
    function lowerCaseString(str)
    {
        if (!str || !str.length) return str;
        if (str.length == 1) return str.toLowerCase();
        return str.substring(0, 1).toLowerCase() + str.substr(1);
    }
    function endWith(thisStr, str)
    { 
        if (str == null || str == "" || thisStr.length == 0 || str.length > thisStr.length)
            return false;
        if (thisStr.substring(thisStr.length - str.length) == str)
            return true;
        else
            return false;
        return true;
    }

}
