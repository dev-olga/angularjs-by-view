'use strict';
(function (angular) {

    angular
        .module('angular-js-course-app.common.components')
        .directive('memberTitle', function(){
            return{
                restrict: 'E',
                templateUrl: '../common/components/memberTitle/member-title.tpl.html',
                scope: {
                    model: '=model'
                }
            }
        });


}(window.angular));