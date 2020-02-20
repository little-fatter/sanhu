define([],
function() {

    var exports = {
        type: 'list',
        options: {
            list: {
                columns: [{
                    name: "NewField1",
                    display: "字段1",
                    type: "string"
                },
                {
                    name: "NewField2",
                    display: "字段2",
                    type: "string"
                },
                {
                    name: "NewField3",
                    display: "字段3",
                    type: "string"
                },
                {
                    name: "Enclosure",
                    display: "附件",
                    type: "ref",
                    editor: {
                        type: ""
                    },
                    name_text: "附件",
                    width: "100",
                    align: "left",
                    align_textfield: "左对齐",
                    type_text: "引用类型",
                    editorType: "",
                    editorType_textfield: "(不可编辑)"
                },
                {
                    width: "150",
                    display: "附件多字段",
                    name: "AttachmentMultiple",
                    name_text: "附件多字段",
                    align: "left",
                    align_textfield: "左对齐",
                    type: "string",
                    type_text: "文本型",
                    editorType: ""
                }]
            },
            common: {
                formShowType: "tab",
                formShowPosition: "top",
                dialogWidth: 700,
                dialogHeight: 500
            },
            type: "list",
            filterFields: [{
                display: "附件",
                name: "Enclosure",
                editor: {
                    url: "/web/namedata",
                    parms: {
                        model: "attachment"
                    },
                    detailEnabled: true,
                    detailUrl: "/web/detaildata",
                    detailParms: {
                        model: "attachment"
                    },
                    valueField: "ID",
                    sourceFilter: null,
                    textField: "url",
                    css: "combobox-selector",
                    popupselect_ismul: true,
                    popupselect_type: "popupselect",
                    popupselect_url: "/web/main/?model=attachment&viewtype=list",
                    popupselect_width: "1000",
                    popupselect_height: "700",
                    popupselect_title: "选择： 附件",
                    many2one: false,
                    one2many: false,
                    many2many: true,
                    type: "ref_popupselect_mul"
                },
                type: "ref_popupselect_mul"
            },
            {
                display: "字段1",
                name: "NewField1",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "字段2",
                name: "NewField2",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "字段3",
                name: "NewField3",
                editor: {
                    type: "string"
                },
                type: "string"
            },
            {
                display: "EnclosureID",
                name: "EnclosureID",
                editor: {
                    type: "text"
                },
                type: "text"
            }],
            link: {},
            addins: {}
        },
        dataset: 'web/dataset?model=hasAttach&viewname=list'
    };
    exports.options.model = {
        name: 'hasAttach',
        title: '表测试有附件'
    };

    exports.service = function service(page) {

};

    return exports;
});