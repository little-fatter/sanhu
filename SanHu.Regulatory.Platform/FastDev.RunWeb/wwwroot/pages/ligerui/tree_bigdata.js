define([],
function() {
    function view() {
        return function run(renderTo, pagedata) {
            var tree;
            $(renderTo).css({
                "margin": 10,
                overflow: 'auto'
            }).load(pbc.toUrl('ui/others/ligerui/tree_bigdata.htm'),
            function() {
                tree = $(".mytree", renderTo).ligerTree({
                    nodeWidth: 200,
                    checkbox: false,
                    idFieldName: 'id',
                    delay: [1, 2],
                    //1级和2级都延迟
                    slide: false,
                    onAfterAppend: function() {},
                    onBeforeAppend: function() {}
                });

                $(".nodescount", renderTo).live('change',
                function() {
                    showNodesCountMessage();
                });

                $(".btnok", renderTo).click(function() {
                    f_load();
                });

                showNodesCountMessage();

                f_load();

            });

            function f_load() {
                var data = createData();
                var op = {
                    isExpand: parseInt($("#expandLevel").val()),
                    delay: []
                };
                $(".delayChk", renderTo).each(function() {
                    if (this.checked) {
                        op.delay.push(parseInt(this.value));
                    }
                });
                if (!op.delay.length) op.delay = false;
                tree.set(op);
                var time1 = new Date();
                tree.set('data', data);
                var time2 = new Date();
                var showed = $(".mytree li", renderTo).length;
                var h = "节点总数:" + getNodesCount() + ",已渲染节点总数:" + showed + ",耗时:" + (time2 - time1) + "毫秒";
                $("#message", renderTo).append("<p>" + h + "</p>");
                pbc.tips(h);
            }
            function createData(e) {
                e = e || {};
                var level = e.level || 1,
                prev = e.prev || "",
                count = $("#nodescount" + level).val(),
                data = [],
                nextLevelNodesCount = $("#nodescount" + (level + 1)).val();
                var hasChildren = false;
                if (nextLevelNodesCount && nextLevelNodesCount != "0") {
                    hasChildren = true;
                }
                for (var i = 0,
                l = parseInt(count); i < l; i++) {
                    var num = i + 1,
                    id = prev + num;
                    var o = {
                        text: "node" + id
                    };
                    if (hasChildren) {
                        o.children = createData({
                            level: level + 1,
                            prev: id + "-"
                        });
                    }
                    data.push(o);
                }
                return data;
            }

            function getNodesCount(level) {
                if (level == null) level = getMaxLevel();
                if (level == 0) return 0;
                var sum = 1;
                for (var i = 1; i <= level; i++) {
                    var value = $("#nodescount" + i).val();
                    if (value == "0" || !value) continue;
                    sum = sum * parseInt(value);
                }
                return sum + getNodesCount(level - 1);
            }
            function getMaxLevel() {
                for (var i = 4; i >= 1; i--) {
                    var value = $("#nodescount" + i).val();
                    if (value == "0" || !value) continue;
                    return i;
                }
            }
            function showNodesCountMessage() {
                $("#nodesCountMessage", renderTo).html("总节点数:" + getNodesCount());
            }

        };
    }

    var exports = {
        run: view()
    };

    return exports;
});