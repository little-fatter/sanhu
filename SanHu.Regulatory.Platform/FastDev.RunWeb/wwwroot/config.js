
window.FreeDesign = {
    config: {
        singlePage : false,
        root: '/',
        domain: '',
        traceTime: true,
        modules: {

        }
    },

    appId: '',

    traceTime: function (str)
    {
        if (FreeDesign.config.traceTime)
        {
            if (console && console.log)
            {
                var o = new Date();
                var timeStr = o.getHours() + ":" + o.getMinutes() + ":" + o.getSeconds() + "." + o.getMilliseconds();

                console.log((str || "") + " " + timeStr);
            }
        } 
    }
};