'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.info.components.interval', [])
        .filter("interval",  function() { return function(items, start, limitTo) {
            var newArr = [];
            start = +start;
            for (var i=start; i<start + limitTo && i < items.length; i++){
                newArr.push(items[i]);
            }
            return newArr;
        };})

}(window.angular));