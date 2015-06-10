'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.common.directives')
        .directive('tag', function(){
            return{
                restrict: 'E',
                templateUrl: 'app/common/directives/tag/tag.tpl.html',
                replace: true,
                scope: {
                    model: '=model',
                    remove: '&onRemove'
                }
            }
        });

}(window.angular));