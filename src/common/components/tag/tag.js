'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.common.components')
        .directive('tag', function(){
            return{
                restrict: 'E',
                templateUrl: 'common/components/tag/tag.tpl.html',
                replace: true,
                scope: {
                    model: '=model',
                    remove: '&onRemove'
                }
            }
        });

}(window.angular));