'use strict';
(function (angular) {
    angular
        .module("angular-js-course-app", [
            'ui.router',
            'ui.bootstrap',
            'templates-app',
            'angular-js-course-app.common',
            'angular-js-course-app.teams',
            'angular-js-course-app.tabs',
            'angular-js-course-app.search',
            'angular-js-course-app.info'
        ])
        .config(config);

    function config($urlRouterProvider, $locationProvider, $stateProvider){
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise("/app");

        $stateProvider
            .state("layout", {
                abstract: true,
                url:"",
                templateUrl: 'app.tpl.html'
            })
            .state("app", {
                abstract: true,
                parent: "layout",
                url: "",
                views:{
                    "top-navigation": {
                        templateUrl: 'layout/tabs/tabs.tpl.html',
                        controller:"TabsCtrl"
                    },
                    "teams-list": {
                        templateUrl: 'layout/teams/teams.tpl.html',
                        controller:"TeamsCtrl"
                    }
                }
            });
    }
}(window.angular));

