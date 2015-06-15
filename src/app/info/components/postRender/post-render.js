'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.info.components.post-render', [])
        .directive('postRender', ['$timeout', function($timeout) {
            return{
                restrict: 'E',
                scope: {
                    callback: '&onCallback'
                },
                link: function (scope, element, attrs) {
                    $timeout(
                        function(){
                            scope.callback();
                        }, 0);
                }
            };
        }]);

}(window.angular));