define([],
function() {
    function view() {
        var options = {
            list: {
                columns: [{
                    name: "Productname",
                    display: "产品名",
                    type: "string"
                },
                {
                    name: "Specifications",
                    display: "规格",
                    type: "string"
                },
                {
                    name: "UnitPrice",
                    display: "单价",
                    type: "number"
                },
                {
                    name: "Model",
                    display: "型号",
                    type: "string"
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            }
        };
        return options;
    }

    var exports = {
        type: 'list',
        options: view(),
        dataset: 'web/dataset?model=dev_product&viewname=list_add_button'
    };
    exports.options.model = {
        name: 'dev_product',
        title: 'dev_product'
    };

    exports.service = function server(page) {
        var fns = {};

        $.extend(fns, {
            toolbarInit: function(e) {
                var page = e.page,
                viewType = e.viewType,
                toolbar = e.toolbar;
                var self = this;

                //toolbar.items = [];

                toolbar.items.push({
                    text: '自定义按钮',
                    id: 'mybutton'
                });

                if (toolbar && toolbar.items && toolbar.items.length) {
                    toolbar.items[0].cls = "ne-btn-blue";
                }

                page.addEvent("mybutton",
                function() {
                    var selectedId = page.grid.getSelected();
                    selectedId = selectedId ? selectedId.ID: '';
                    alert('自定义按钮事件' + selectedId);
                });

            },

            beforeShowSearch: function(e) {
                var page = e.page;
                var op = e.options;
                var fieldProduct = pbc.web.helper.first(op.fields,
                function(a) {
                    return a.name == "Product";
                });
                if (fieldProduct != null) {
                    fieldProduct.type = "select";

                }
            },

            afterShowSearch: function(e) {
                var page = e.page;
                var form = e.form;

            },

            beforeShowList: function(e) {
                var page = e.page;
                var op = e.options;

                //op.checkbox = false;
                //op.sortName = "Time";
                //op.sortOrder = "desc";
                var columnProduct = pbc.web.helper.first(op.columns,
                function(a) {
                    return a.name == "Productname";
                });

                if (columnProduct) {
                    columnProduct.display = "产品名<a href='javascript:void()' style='color:#333;'>（自定义)</a>";
                }
            }

        });

        for (var name in fns) {
            var fn = fns[name];
            if ($.isFunction(fn)) {
                page.bind(name, fn);
            }
        }

    };

    return exports;
});