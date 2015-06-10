'use strict';
(function (angular) {
    angular.module('angular-js-course-app.info.directives', []);
    angular.module('angular-js-course-app.info.filters', []);

    angular.module('angular-js-course-app.info', [
        'ui.router',
        'angular-js-course-app.info.directives',
        'angular-js-course-app.info.filters'
    ])
    .config(config);

    function config($stateProvider) {
        $stateProvider
            .state("app.info", {
                parent: "app",
                views:{
                    "container@layout":{
                        controller:"InfoCtrl",
                        templateUrl: "app/info/info.tpl.html"
                    }
                },
                url: "/app/info"
            });
    }
}(window.angular));
