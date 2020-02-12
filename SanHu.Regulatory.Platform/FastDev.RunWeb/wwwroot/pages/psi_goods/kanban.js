define([],
function() {

    var exports = {
        type: 'kanban',
        options: {
            type: "kanban",
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 1,
                hideToolbar: 0,
                hideViewSwitch: 0,
                viewNameList: "list",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "",
                buttonsShowType: "",
                searchBoxShowType: "",
                searchAdShowType: "",
                formViewName: "",
                openParm: ""
            },
            kanban: {
                template: "<div class=\"kanban-item\"><input class=\"configcode\" type=\"hidden\" data-config=\"eyJpbWFnZUZpZWxkIjoiSW1hZ2VQYXRoIiwidGl0bGVGaWVsZCI6IlByb2R1Y3ROYW1lIiwidGV4dEZpZWxkcyI6IkNhdGVnb3J5TmFtZTtCcmFuZE5hbWUiLCJlbWFpbEZpZWxkcyI6IiIsImxpbmtGaWVsZHMiOiIifQ==\"/><div class=\"kanaban-imagepanel\"><a class=\"kanaban-action\" data-id=\"{ID}\"><img class=\"kanaban-image\" src=\"{ImagePath}\"/></a></div><div class=\"kanban-details\"><h4><a data-id=\"{ID}\">{ProductName}</a><a></a></h4><div style=\"{CategoryName:visual}\">CategoryName：{CategoryName}</div><div style=\"{BrandName:visual}\">BrandName：{BrandName}</div></div></div>"
            },
            filterFields: [{
                display: "ID",
                name: "ID",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CategoryId",
                name: "CategoryId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductName",
                name: "ProductName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ProductCode",
                name: "ProductCode",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "BrandId",
                name: "BrandId",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ShortDescription",
                name: "ShortDescription",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "CategoryName",
                name: "CategoryName",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "SaleStatus",
                name: "SaleStatus",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "AuditStatus",
                name: "AuditStatus",
                editor: {
                    type: "int"
                },
                type: "int"
            },
            {
                display: "AddedDate",
                name: "AddedDate",
                editor: {
                    type: "datepicker"
                },
                type: "datepicker"
            },
            {
                display: "DisplaySequence",
                name: "DisplaySequence",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "ImagePath",
                name: "ImagePath",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "MarketPrice",
                name: "MarketPrice",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "MinSalePrice",
                name: "MinSalePrice",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "HasSKU",
                name: "HasSKU",
                editor: {
                    type: "checkbox"
                },
                type: "checkbox"
            },
            {
                display: "VistiCounts",
                name: "VistiCounts",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "BrandName",
                name: "BrandName",
                editor: {
                    type: "string"
                },
                type: "string"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=psi_goods&viewname=kanban'
    };
    exports.options.model = {
        name: 'psi_goods',
        title: '产品信息'
    };

    exports.service = function service(page) {

};

    return exports;
});