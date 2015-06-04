(function (angular) {

    angular
        .module('angular-js-course-app.common.directives')
        .directive('memberTitle', function(){
            return{
                restrict: 'E',
                templateUrl: 'app/common/directives/memberTitle/member-title.tpl.html',
                scope: {
                    model: '=model'
                }
            }
        });


}(window.angular));