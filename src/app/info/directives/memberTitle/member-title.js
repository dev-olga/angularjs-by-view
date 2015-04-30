(function (angular) {

    angular
        .module('angular-js-course-app.info.directives')
        .directive('memberTitle', function(){
            return{
                restrict: 'E',
                templateUrl: 'app/info/directives/memberTitle/member-title.tpl.html',
                scope: {
                    item: '=item'
                }
            }
        });


}(window.angular));