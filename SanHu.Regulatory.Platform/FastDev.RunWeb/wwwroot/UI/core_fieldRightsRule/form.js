function view()
{ 
    return {
        "form": {
            "fields": [{
                "newline": 1,
                "name": "Title",
                "label": "标题",
                "editor": {
                    "type": "text"
                },
                "type": "text",
                "type_text": "单行",
                "name_text": "标题",
                "group": "",
                "width": "255",
                "labelAlign": "",
                "labelWidth": "",
                "labelInAfter": 0,
                "rightToken": "",
                "fieldExtend": "",
                "readonly": 0,
                "hideLabel": 0,
                "hideSpace": 0,
                "hideInAdd": 0
            },
            {
                "newline": false,
                "name": "RuleEnabled",
                "label": "启用",
                "editor": {
                    "type": "checkbox"
                },
                "type": "checkbox",
                "type_text": "复选框"
            },
            {
                "label": "模型名",
                "type": "ref_popupselect",
                "editor": {
                    "isTextBoxMode": true,
                    "url": "/web/namedata",
                    "parms": {
                        "model": "crm_customer"
                    },
                    "valueField": "ID",
                    "sourceFilter": null,
                    "textField": "ModelName",
                    "css": "combobox-selector",
                    "popupselect_ismul": false,
                    "popupselect_type": "popupselect",
                    "popupselect_url": "/web/main/?model=core_model&viewtype=list",
                    "popupselect_width": "900",
                    "popupselect_height": "600",
                    "popupselect_title": "选择： 模型"
                },
                "name": "ModelName",
                "width": "255"
            }],
            "tab": {
                "items": [{
                    "title": "选择禁用的字段",
                    "fields": [{
                        "newline": false,
                        "name": "RuleContent",
                        "label": "规则",
                        "editor": {
                            "type": "text"
                        },
                        "type": "fieldRightsRule",
                        "group": "",
                        "width": "800",
                        "labelAlign": "",
                        "labelWidth": "",
                        "labelInAfter": 0,
                        "rightToken": "",
                        "fieldExtend": "",
                        "readonly": 0,
                        "hideLabel": 1,
                        "hideSpace": 0,
                        "hideInAdd": 0
                    }]
                }]
            }
        }
    };
}