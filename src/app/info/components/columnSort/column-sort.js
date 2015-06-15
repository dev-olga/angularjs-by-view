'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.info.components.column-sort', [])
        .directive('columnSort', function(){
            return{
                restrict: 'A',
                templateUrl: 'app/info/components/columnSort/column-sort.tpl.html',
                transclude: true,
                scope: {
                    order: '=',
                    by: '=',
                    reverse : '='
                },
                link: function(scope, element, attrs) {
                    scope.onClick = function () {
                        if( scope.order === scope.by ) {
                            scope.reverse = !scope.reverse;
                        } else {
                            scope.by = scope.order ;
                            scope.reverse = false;
                        }
                    }
                }
            }
        });

}(window.angular));