define([],
function() {

    var exports = {
        type: 'list',
        options: {
            "list": {
                "columns": [{
                    "name": "Company",
                    "display": "管理单位",
                    "type": "ref"
                },
                {
                    "name": "DeptName",
                    "display": "部门名称",
                    "type": "string"
                },
                {
                    "name": "Remarks",
                    "display": "备注",
                    "type": "string"
                },
                {
                    "name": "Parent",
                    "display": "上级部门",
                    "type": "ref"
                }]
            },
            "common": {
                "formShowType": "tab",
                "formShowPosition": "top",
                "dialogWidth": 700,
                "dialogHeight": 500
            },
            "type": "list",
            "filterFields": [{
                "display": "管理单位",
                "name": "Company",
                "editor": {
                    "url": "/web/namedata",
                    "parms": {
                        "model": "res_company"
                    },
                    "detailEnabled": true,
                    "detailUrl": "/web/detaildata",
                    "detailParms": {
                        "model": "res_company"
                    },
                    "valueField": "ID",
                    "sourceFilter": null,
                    "textField": "CompanyNo",
                    "css": "combobox-selector",
                    "popupselect_ismul": true,
                    "popupselect_type": "popupselect",
                    "popupselect_url": "/web/main/?model=res_company&viewtype=list",
                    "popupselect_width": "1000",
                    "popupselect_height": "700",
                    "popupselect_title": "选择： 管理单位",
                    "many2one": false,
                    "one2many": false,
                    "many2many": true,
                    "type": "ref_popupselect_mul"
                },
                "type": "ref_popupselect_mul"
            },
            {
                "display": "上级部门",
                "name": "Parent"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ,
                "editor": {
                    "url": "/web/namedata",
                    "parms": {
                        "model": "res_department"
                    },
                    "detailEnabled": true,
                    "detailUrl": "/web/detaildata",
                    "detailParms": {
                        "model": "res_department"
                    },
                    "valueField": "ID",
                    "sourceFilter": null,
                    "textField": "DeptName",
                    "css": "combobox-selector",
                    "popupselect_ismul": true,
                    "popupselect_type": "popupselect",
                    "popupselect_url": "/web/main/?model=res_department&viewtype=list",
                    "popupselect_width": "1000",
                    "popupselect_height": "700",
                    "popupselect_title": "选择： 部门",
                    "many2one": false,
                    "one2many": false,
                    "many2many": true,
                    "type": "ref_popupselect_mul"
                },
                "type": "ref_popupselect_mul"
            },
            {
                "display": "部门名称",
                "name": "DeptName",
                "editor": {
                    "type": "string"
                },
                "type": "string"
            },
            {
                "display": "备注",
                "name": "Remarks",
                "editor": {
                    "type": "string"
                },
                "type": "string"
            },
            {
                "display": "CompanyID",
                "name": "CompanyID",
                "editor": {
                    "type": "text"
                },
                "type": "text"
            },
            {
                "display": "ParentID",
                "name": "ParentID",
                "editor": {
                    "type": "text"
                },
                "type": "text"
            }],
            "link": {},
            "addins": {
                "items": [{
                    "name": "表格扩展",
                    "title": "表格扩展(支持表格树配置)",
                    "value": {
                        "title": "配置表格树",
                        "value": {
                            "tree": {
                                "idField": "ID",
                                "parentIDField": "ParentID",
                                "columnName": "CompanyName"
                            }
                        }
                    }
                }]
            },
            "options": {
                "list": {
                    "columns": [{
                        "name": "DeptName",
                        "display": "部门名称",
                        "type": "string",
                        "name_text": "部门名称",
                        "width": "160",
                        "align": "left",
                        "align_textfield": "左对齐",
                        "type_text": "文本型",
                        "exp": ""
                    },
                    {
                        "name": "Company",
                        "display": "公司",
                        "type": "ref",
                        "name_text": "公司",
                        "width": "150",
                        "align": "left",
                        "align_textfield": "左对齐",
                        "type_text": "引用类型"
                    },
                    {
                        "name": "Remarks",
                        "display": "备注",
                        "type": "string",
                        "name_text": "备注",
                        "width": "300",
                        "align": "left",
                        "align_textfield": "左对齐",
                        "type_text": "文本型"
                    }],
                    "title": "部门"
                },
                "common": {
                    "showCalendar": 0,
                    "showList": 0,
                    "showReport": 0,
                    "showKanban": 0,
                    "hideToolbar": 0,
                    "hideViewSwitch": 0,
                    "viewNameList": "",
                    "viewNameCalendar": "",
                    "viewNameReport": "",
                    "viewNameKanban": "",
                    "searchInputShowType": "hide",
                    "buttonsShowType": "left",
                    "searchBoxShowType": "left",
                    "searchAdShowType": "hide",
                    "formViewName": "",
                    "formShowType": "dialog",
                    "formShowPosition": "",
                    "dialogWidth": "800",
                    "dialogHeight": "600",
                    "openParm": ""
                },
                "link": {},
                "kanban": {},
                "calendar": {
                    "titleField": "Remarks",
                    "startField": "CreateDate",
                    "endField": "CreateDate"
                },
                "report": {},
                "treeFilter": {
                    "enabled": 0,
                    "rootText": "全部",
                    "filterField": "Company",
                    "sourceMode": "res_company",
                    "parentField":                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             "ParentID",
                    "textField": "CompanyName",
                    "sourceMode2": "",
                    "parentField2": "",
                    "refSourceField": "",
                    "textField2": "",
                    "filterField_textfield": "公司",
                    "showInLeft": 1,
                    "custom": 0,
                    "url": "",
                    "sourceModel": "res_company",
                    "sourceModel2": "",
                    "sourceModel_textfield": "res_company",
                    "header": ""
                },
                "filterFields": [{
                    "display": "公司",
                    "name": "Company",
                    "editor": {
                        "url": "/web/namedata",
                        "parms": {
                            "model": "res_company"
                        },
                        "detailEnabled": true,
                        "detailUrl": "/web/detaildata",
                        "detailParms": {
                            "model": "res_company"
                        },
                        "valueField": "ID",
                        "sourceFilter": null,
                        "textField": "CompanyName",
                        "css": "combobox-selector",
                        "popupselect_ismul": true,
                        "popupselect_type": "popupselect",
                        "popupselect_url": "/web/main/?model=res_company&viewtype=list",
                        "popupselect_width": "1000",
                        "popupselect_height": "700",
                        "popupselect_title": "选择： 公司",
                        "many2one": false,
                        "one2many": false,
                        "many2many": true,
                        "type": "ref_popupselect_mul"
                    },
                    "type": "ref_popupselect_mul"
                },
                {
                    "display": "上级部门",
                    "name": "Parent",
                    "editor": {
                        "url": "/web/namedata",
                        "parms": {
                            "model": "res_department"
                        },
                        "detailEnabled": true,
                        "detailUrl": "/web/detaildata",
                        "detailParms": {
                            "model": "res_department"
                        },
                        "valueField": "ID",
                        "sourceFilter": null,
                        "textField": "DeptName",
                        "css": "combobox-selector",
                        "popupselect_ismul": true,
                        "popupselect_type": "popupselect",
                        "popupselect_url": "/web/main/?model=res_department&viewtype=list",
                        "popupselect_width": "1000",
                        "popupselect_height": "700",
                        "popupselect_title": "选择： 部门",
                        "many2one": false,
                        "one2many": false,
                        "many2many": true,
                        "type": "ref_popupselect_mul"
                    },
                    "type": "ref_popupselect_mul"
                },
                {
                    "display": "备注",
                    "name": "Remarks",
                    "editor": {
                        "type": "string"
                    },
                    "type": "string"
                },
                {
                    "display": "部门名称",
                    "name": "DeptName",
                    "editor": {
                        "type": "string"
                    },
                    "type": "string"
                },
                {
                    "display": "CompanyID",
                    "name": "CompanyID",
                    "editor": {
                        "type": "text"
                    },
                    "type": "text"
                },
                {
                    "display": "ParentID",
                    "name": "ParentID",
                    "editor": {
                        "type": "text"
                    },
                    "type": "text"
                }],
                "type": "list",
                "addins": {
                    "items": [{
                        "name": "表格扩展",
                        "title": "表格扩展(支持表格树配置)",
                        "value": {
                            "title": "配置表格树",
                            "value": {
                                "tree": {
                                    "idField": "ID",
                                    "parentIDField": "ParentID",
                                    "columnName": "DeptName"
                                }
                            }
                        }
                    }]
                }
            },
            "dataset": "web/dataset?model=res_department&viewname=list"
        },
        dataset: 'web/dataset?model=res_department&viewname=list'
    };
    exports.options.model = {
        name: 'res_department',
        title: '部门'
    };

    exports.service = function service(page) {

};

    return exports;
});