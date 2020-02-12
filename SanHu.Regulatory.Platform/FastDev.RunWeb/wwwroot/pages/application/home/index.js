define([''],
function ()
{
    function view()
    {

        return function run(e)
        {
            var renderTo = e.renderTo;

            $(renderTo).css("margin", "10px");  

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
                        pbc.tips({
                            type: 2,
                            content: r.message
                        });
                        return;
                    } else if (r.StatusCode == "3") //系统级错误
                    {
                        pbc.showError(r.message);
                        return;
                    }
                    var rows = getRows(r);

                    pbc.web.loader('chart',
                    function ()
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
                    var panel = convertPanel(item);
                    if (panel)
                    {
                        panels.push(panel);
                    }
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
                if (!panel.url) return;
                if (item.LinkBind)
                {
                	panel.url += panel.url.indexOf('?') != -1 ? '&' : '?';
                    panel.url += "bind=" + item.LinkBind;
                }

                if (panel.url.indexOf('web/main') > -1 || panel.url.indexOf('pages/') > -1)
                {
                    var jtarget = $("<div class='ne-view'></div>");
                    panel.target = jtarget;
                    jtarget.height(item.Height - 30);
                    var url = panel.url;
                    panel.url = "";
                    panel.onLoaded = function ()
                    {
                        jtarget.attr("data-url", url);
                        
                        pbc.openPage({
                            url: url
                        }, jtarget);
                    };
                    jtarget.get(0).panelReload = function ()
                    {
                        jtarget.html("");
                        var url = jtarget.attr("data-url");
                        pbc.openPage({
                            url: url
                        }, jtarget);
                    };
                    
                }

                return panel;
            }

            function init(rows)
            {  
                var jportal = $('<div class="portal"></div>');
                jportal.appendTo(renderTo);
                jportal.ligerPortal({
                    draggable: false,
                    rows: rows
                });
            }
        };
    }

    var exports = {
        run: view()
    };

    return exports;
});