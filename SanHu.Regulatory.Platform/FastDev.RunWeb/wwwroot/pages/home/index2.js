﻿define([],
function() {
    function view() {
        return function run(renderTo, pagedata) {

            $(renderTo).css("margin", "10px");

            $(renderTo).load('/contents/todolist.html',
            function() {

});
        };
    }

    var exports = {
        run: view()
    };

    return exports;
});