'use strict';
(function (angular) {
    angular.module('angular-js-course-app.search', ['ui.router'])
        .config(config);

    function config($stateProvider) {
        $stateProvider
            .state("app.search", {
                parent: "app",
                views:{
                    "container@layout":{
                        controller:"SearchCtrl",
                        templateUrl: "search/search.tpl.html"
                    }
                },
                url: "/app"
            });
    }
}(window.angular));
