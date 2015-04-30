'use strict';
(function (angular) {
    angular
        .module("angular-js-course-app", [
            'ui.router',
            'ui.bootstrap',
            'angular-js-course-app.common',
            'angular-js-course-app.search',
            'angular-js-course-app.info'
        ])
        .config(config)
     //   .run(run)

    function config($urlRouterProvider, $locationProvider, $stateProvider){
        $locationProvider.html5Mode(false);
        $urlRouterProvider.otherwise("/app");

        $stateProvider
            .state("layout", {
                abstract: true,
                url:"",
                templateUrl: 'app/app.tpl.html'
            })
            .state("app", {
                abstract: true,
                parent: "layout",
                url: "",
                views:{
                    "top-navigation": {
                        templateUrl: 'app/common/components/tabs/tabs.tpl.html',
                        controller:"TabsCtrl"
                    },
                    "teams-list": {
                        templateUrl: 'app/common/components/teams/teams.tpl.html',
                        controller:"TeamsCtrl"
                    }
                }
            })
            .state("app.search", {
                parent: "app",
                views:{
                    "container@layout":{
                        controller:"SearchCtrl",
                        templateUrl: "app/search/search.tpl.html"
                    }
                },
                url: "/app"
            })
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

    };

//    function run($rootScope, $state, $stateParams) {
//            $rootScope.$state = $state;
//            $rootScope.$stateParams = $stateParams;
//        };
}(window.angular));

