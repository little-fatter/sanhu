define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "ProductName",
                    display: "产品名",
                    type: "string",
                    name_text: "ProductName",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: "",
                    editor: {
                        type: ""
                    },
                    editorType_textfield: "(不可编辑)"
                },
                {
                    name: "ProductCode",
                    display: "产品编码",
                    type: "string",
                    name_text: "ProductCode",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: "",
                    editor: {
                        type: ""
                    },
                    editorType_textfield: "(不可编辑)"
                },
                {
                    name: "CategoryName",
                    display: "类型",
                    type: "string",
                    name_text: "CategoryName",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "文本型",
                    editorType: "",
                    editor: {
                        type: ""
                    },
                    editorType_textfield: "(不可编辑)"
                }],
                title: "",
                url: "",
                usePager: 1,
                checkbox: 1,
                height: "100%",
                width: "",
                sortName: "",
                sortOrder: "",
                downViewEnabled: 0,
                downViewHeight: "",
                downViewReadonly: 0,
                hideOpColumn: 1,
                hideOpEditColumn: 0,
                hideOpDeleteColumn: 0,
                downViewName: "",
                downPageUrl: "",
                allowAdjustColWidth: true
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: "700",
                dialogHeight: "500",
                showList: 1,
                showCalendar: 0,
                showReport: 0,
                showKanban: 0,
                hideToolbar: 0,
                hideViewSwitch: 1,
                viewNameList: "",
                viewNameCalendar: "",
                viewNameReport: "",
                viewNameKanban: "",
                searchInputShowType: "hide",
                buttonsShowType: "left",
                searchBoxShowType: "right",
                searchAdShowType: "hide",
                formViewName: "",
                openParm: ""
            },
            treeFilter: {
                enabled: 1,
                header: "",
                showInLeft: 1,
                rootText: "",
                filterField: "CategoryId",
                filterField_textfield: "CategoryId",
                custom: 0,
                url: "",
                sourceModel: "psi_category",
                parentField: "ParentCategoryID",
                textField: "Name",
                sourceModel2: "psi_category",
                parentField2: "ParentCategoryID",
                refSourceField: "ID",
                textField2: "Name",
                sourceModel_textfield: "psi_category",
                filter: {
                    rules: [{
                        field: "ParentCategoryId",
                        op: "equal",
                        value: "0",
                        type: "select"
                    }],
                    op: "and"
                },
                sourceModel2_textfield: "psi_category"
            },
            type: "list",
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
            addins: {},
            search: {
                fields: [{
                    label: "产品名",
                    type: "text",
                    editor: {},
                    name: "ProductName",
                    name_text: "ProductName",
                    operator: "like",
                    operator_textfield: "包含",
                    type_text: "单行",
                    width: "100"
                }],
                inputWidth: "",
                labelWidth: "70",
                space: "",
                labelAlign: "left"
            }
        },
        dataset: 'web/dataset?model=psi_goods&viewname=list-select'
    };
    exports.options.model = {
        name: 'psi_goods',
        title: '产品信息'
    };

    exports.service = function service(page) {
        page.options.list.onLoaded = function() {
            $(".toolbar").find("a[data-id=add]").remove();
            $(".toolbar").find("a[data-id=del]").remove();
            this.toggleLoading(false);
        };

    };

    return exports;
});