function view()
{
    return function run(renderTo, pagedata)
    {

        $(renderTo).css("margin", "10px");

        /*
        pbc.ajax({
            loading: null, 
            url: pbc.toUrl('/web/listdata'),
            data: {
                model: 'crm_customer',
                filter: {
                    rules : [
                        { field: 'id in (select CustomerID from crm_customerContract where CreateDate < DATEADD(month, -3, getDate()) )', type: 'sql' }
                    ]
                }
            },
            success: function (r)
            {
                if (!r) return;

                if (r.StatusCode == "2") //应用级错误
                {
                    return;
                } else if (r.StatusCode == "3") //系统级错误
                {
                    return;
                }

                if (r.length) //包括跟进记录 
                {
                    var w = $(window).width(), h = $(window).height();

                    openDialog({
                        cls : 'dialog-red',
                        height: h * 0.7,
                        width: w * 0.7,
                        title: '三个月之内没有跟进的客户',
                        url: 'web/main?model=crm_customer&viewname=list_filterdata'
                    });
                }

            }
        });
        */
        pbc.ajax({
            loading: null,
            data: {
                model: 'core_portal'
            },
            url: pbc.toUrl('/web/listdata'),
            success: function (r)
            {
                if (r.StatusCode == "2") //应用级错误
                {
                    pbc.tips({ type: 2, content: r.message });
                    return;
                } else if (r.StatusCode == "3") //系统级错误
                {
                    pbc.showError(r.message);
                    return;
                } 
                var rows = getRows(r);

                pbc.web.loader('chart', function ()
                {
                    init(rows);
                });
              
            }
        });
         

        function getRows(items)
        {

            var rownumbers = [];
            $(items).each(function ()
            {
                if ($.inArray(this.RowNumber, rownumbers) == -1)
                {
                    rownumbers.push(this.RowNumber);
                }
            });
            rownumbers = rownumbers.sort();
            var rows = [];
            $(rownumbers).each(function (i, rownumber)
            {
                var row = {
                    columns: []
                };
                var currentItems = [];
                $(items).each(function ()
                {
                    if (this.RowNumber == rownumber) currentItems.push(this);
                });
                rows.push({
                    columns: getColumns(currentItems)
                });
            });
            return rows;
        }

        function getColumns(items)
        {
            var columnNumbers = [];

            $(items).each(function ()
            {
                if ($.inArray(this.ColumnNumber, columnNumbers) == -1)
                {
                    columnNumbers.push(this.ColumnNumber);
                }
            });
            columnNumbers = columnNumbers.sort();

            var columns = [];
            $(columnNumbers).each(function (i, columnNumber)
            {
                var currentItems = [];
                $(items).each(function ()
                {
                    if (this.ColumnNumber == columnNumber) currentItems.push(this);
                });
                columns.push({
                    panels: getPanels(currentItems)
                });
            });
            return columns;
        }


        function getPanels(items)
        {
            var panelNumbers = [];
            $(items).each(function ()
            {
                if ($.inArray(this.PanelNumber, panelNumbers) == -1)
                {
                    panelNumbers.push(this.PanelNumber);
                }
            });
            panelNumbers = panelNumbers.sort();

            var currentItems = [];
            $(panelNumbers).each(function (i, panelNumber)
            {

                $(items).each(function ()
                {
                    if (this.PanelNumber == panelNumber) currentItems.push(this);
                });
            });
            var panels = [];
            $(currentItems).each(function (i, item)
            {
                panels.push(convertPanel(item));
            });
            return panels;
        }

        function convertPanel(item)
        {
            var panel = {
                title: item.Title,
                width: item.Width,
                showClose: true,
                showRefresh: true,
                height: 'auto',
                url: pbc.toUrl(item.Link)
            };

            if (item.LinkBind)
            {
                panel.url += "&bind=" + item.LinkBind;
            }
             
            if (panel.url.indexOf('web/main') >  -1)
            {
                var jtarget = $("<div class='ne-view'></div>");
                panel.target = jtarget;
                jtarget.height(item.Height -30); 
                var url = panel.url;

                panel.onLoaded = function ()
                {
                    jtarget.attr("data-url", url);
                    var model = pbc.getUrlParm(url, "model");
                    var viewtype = pbc.getUrlParm(url, "viewtype");
                    var viewname = pbc.getUrlParm(url, "viewname");
                    var runner = new pbc.web.init({
                        model: model,
                        viewType: viewtype,
                        isView: false,
                        showInDialog: false,
                        viewName: viewname,
                        renderTo: jtarget
                    });
                    runner.run();
                };
                jtarget.get(0).panelReload = function ()
                {
                    jtarget.html("");
                    var url = jtarget.attr("data-url");
                    var model = pbc.getUrlParm(url, "model");
                    var viewtype = pbc.getUrlParm(url, "viewtype");
                    var viewname = pbc.getUrlParm(url, "viewname");
                    var runner = new pbc.web.init({
                        model: model,
                        viewType: viewtype,
                        isView: false,
                        showInDialog: false,
                        viewName: viewname,
                        renderTo: jtarget
                    });
                    runner.run();
                };
                panel.url = "";
            }

            return panel;
        }

        function init(rows)
        { 
            var jportal = $('<div class="portal"></div>').appendTo(renderTo);
            jportal.ligerPortal({
                draggable: false,
                rows: rows
            });
        }
    };
}