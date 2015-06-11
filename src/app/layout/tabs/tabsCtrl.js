'use strict';
(function (angular) {

    angular.module('angular-js-course-app.tabs')
        .controller("TabsCtrl", ["$scope", "$state", TabsCtrl]);

    function TabsCtrl($scope, $state) {
        $scope.tabs = [
            { heading: "Search", route: "app.search", active: false },
            { heading: "Information", route: "app.info", active: false }
        ];

        $scope.go = function (route) {
            $state.go(route);
        };

        $scope.active = function (route) {
            return $state.is(route);
        };

        $scope.$on('$stateChangeSuccess', function () {
            $scope.tabs.forEach(function (tab) {
                tab.active = $scope.active(tab.route);
            });
        });
    }

}(window.angular));