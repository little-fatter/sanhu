(function () {
    var jsonCN={ // Default regional settings
        ampm: false,
        amNames: ['AM', 'A'],
        pmNames: ['PM', 'P'],
        timeFormat: 'hh:mm tt',
        timeSuffix: '',
        timeOnlyTitle: '选择时间',
        timeText: '时间',
        hourText: '时',
        minuteText: '分',
        secondText: '秒',
        millisecText: '毫秒',
        timezoneText: 'Time Zone',
        clearText: '清除',
        clearStatus: '清除已选日期',
        closeText: '关闭',
        closeStatus: '不改变当前选择',
        prevText: '<上月',
        prevStatus: '显示上月',
        prevBigText: '<<',
        prevBigStatus: '显示上一年',
        nextText: '下月>',
        nextStatus: '显示下月',
        nextBigText: '>>',
        nextBigStatus: '显示下一年',
        currentStatus: '显示本月',
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthStatus: '选择月份',
        yearStatus: '选择年份',
        weekHeader: '周',
        weekStatus: '年内周次',
        dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
        dayStatus: '设置 DD 为一周起始',
        dateStatus: '选择 m月 d日, DD',
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        initStatus: '请选择日期',
        currentText: '现在',
        isRTL: false
    };
    var $ = jQuery;

    $.ligerDefaults.Form.editors.datepicker =
      {
          create: function (container, editParm, p) {

              var div = $('<div class="l-text l-text-date"><input type="text" class="l-text-field" style="z-index:' +
                  (container.parents(".l-dialog").length ? '9300' : '1000')
                  + ';"><div class="l-text-l"></div><div class="l-text-r"></div><div class="l-trigger"><div class="l-trigger-icon"></div></div></div>');


              var input = div.find("input:first");

              div.find(".l-trigger-icon").click(function () {
                  input.focus();
              });
              var field = editParm.field, editor = field.editor || {};
              var isReadonly = p.readonly || field.readonly || (field.editor && field.editor.readonly);

              if (isReadonly) {
                  div.addClass("l-text-readonly");
                  div.find("input").attr("readonly", true);
                  div.find(".l-trigger").remove();
              }
              if (field.name) {
                  input.attr("name", field.name);
              }
              container.append(div);
              if (!isReadonly) {
                  var op = {};
                  if (editor.value) {
                      input.val(editor.value);
                  }
                  if (editor.zindex) div.find(":text").attr("style", "z-index:" + editor.zindex);
                  else div.find(":text").attr("style", "z-index:" + (container.parents(".l-dialog").length ? '9300' : '8200'));


                  if (editor.dateFormat) op.dateFormat = editor.dateFormat;
                  else op.dateFormat = 'yy-mm-dd';
                  $.extend(op, jsonCN);
                  if (editor.showHour || editor.showMinute || editor.showSecond) {
                      var timeFormat = 'hh:mm:ss';
                      if (!editor.showSecond) {
                          timeFormat = 'hh:mm';
                      }
                      if (!editor.showMinute) timeFormat = '';
                      $.extend(op, {
                          showHour: editor.showHour ? true : false,
                          showMinute: editor.showMinute ? true : false,
                          showSecond: editor.showSecond ? true : false,
                          timeFormat: timeFormat
                      });
                      input.datetimepicker(op);
                  } else {
                      input.datepicker(op);
                  }
              }
              return input;
          },
          getValue: function (control, editParm) {
              var value = control.val();
              if (!value) return null;
              value = value.replace(/-/g, "/");
              if (value.length <= 7) {
                  value += "/1";
              }
              var date = new Date(value);
              //var str = '/Date(' + date.getTime() + ')/';
              var format = "yyyy-MM-dd hh:mm:ss";
              var str = pbc.getFormatDate(date, format);

              return str;
          },
          setValue: function (control, value, editParm) {
              var field = editParm.field, editor = field.editor || {};

              if (value && typeof (value) === "string" && value.indexOf('(') != -1 && value.indexOf(')') != -1) {

                  value = value.replace("now()", pbc.getFormatDate(new Date()));
                  value = value.replace("today()", today());

                  function today() {
                      var now = new Date();
                      now.setHours(0);
                      now.setMinutes(0);
                      now.setSeconds(0);
                      now.setMilliseconds(0);
                      return pbc.getFormatDate(now);
                  }

              }
              if (typeof value == "string" && /^\/Date/.test(value)) {
                  value = value.replace(/^\//, "new ").replace(/\/$/, "");
                  eval("value = " + value);
                  if (editor.showHour || editor.showMinute) {
                      var format = "yyyy-MM-dd hh:mm";
                      if (editor.showSecond) format += ":ss";
                      value = pbc.getFormatDate(value, format);
                  }
                  else {
                      value = pbc.getFormatDate(value);
                  }
              }
              control.val(value);
          },
          resize: function (control, width, height, editParm) {
              control.parent().width(width - 2);
              control.width(width - 24);
          }
      };


    $.ligerDefaults.Grid.editors.datepicker =
    {
        create: function (container, editParm, p) {
            var div = $('<div class="l-text l-text-date"><input type="text" class="l-text-field"><div class="l-text-l"></div><div class="l-text-r"></div><div class="l-trigger"><div class="l-trigger-icon"></div></div></div>');
            var input = div.find("input:first");
            div.find(".l-trigger-icon").click(function () {
                input.focus();
            });
            var field = editParm.column, editor = field.editor || {};
            if (field.name) {
                input.attr("name", field.name);
            }
            container.append(div);
            input.datepicker();
            return input;
        },
        getValue: function (control, editParm) {
            var value = control.val();
            if (!value) return null;
            value = value.replace(/-/g, "/");

            var date = new Date(value);
            //var str = '/Date(' + date.getTime() + ')/';
            var format = "yyyy-MM-dd hh:mm:ss";
            var str = pbc.getFormatDate(date, format);

            return str;
        },
        setValue: function (editor, value, editParm) {
            if (typeof value == "string" && /^\/Date/.test(value)) {
                value = value.replace(/^\//, "new ").replace(/\/$/, "");
                eval("value = " + value);
                value = pbc.getFormatDate(value);
            }
            editor.val(value);
        },
        resize: function (editor, width, height, editParm) {
            editor.parent().width(width).height(height + 2);
            editor.width(width - 6);

        }
    };


    $.ligerDefaults.Filter.editors.datepicker =
  {
      create: function (container, editParm, p) {
          var div = $('<div class="l-text l-text-date"><input type="text" class="l-text-field"><div class="l-text-l"></div><div class="l-text-r"></div><div class="l-trigger"><div class="l-trigger-icon"></div></div></div>');
          var input = div.find("input:first");
          div.find(".l-trigger-icon").click(function () {
              input.focus();
          });
          var field = editParm.field, editor = field.editor || {};
          if (field.name) {
              input.attr("name", field.name);
          }

          container.append(div);
          input.datepicker();

          if (field.readonly || editor.readonly) {
              input.datepicker("disable").attr("readonly", "readonly");
              div.find(".l-trigger").remove();
          }
          if (editor.value) {
              input.val(editor.value);
          }

          return input;
      },
      getValue: function (control, editParm) {
          var value = control.val();
          if (!value) return null;
          value = value.replace(/-/g, "/");

          var date = new Date(value);
          //var str = '/Date(' + date.getTime() + ')/';
          var format = "yyyy-MM-dd hh:mm:ss";
          var str = pbc.getFormatDate(date, format);

          return str;
      },
      setValue: function (editor, value, editParm) {
          if (typeof value == "string" && /^\/Date/.test(value)) {
              value = value.replace(/^\//, "new ").replace(/\/$/, "");
              eval("value = " + value);
              value = pbc.getFormatDate(value);
          }
          editor.val(value);
      },
      resize: function (editor, width, height, editParm) {
          editor.parent().width(width - 2);
          editor.width(width - 6);
      }
  };
})();