'use strict';
(function (angular) {
    angular
        .module('angular-js-course-app.common.components')
        .directive('unique', ["arrayHelper", function(arrayHelper){
            var isValid = function(value) {
                return !value
                    || !list
                    || arrayHelper.indexOf(list, function(item){
                    return item.name.toLowerCase() == value.toLowerCase();
                }) < 0;
            };
            var list;

            return{
                require: 'ngModel',
                link: function(scope, elm, attrs, ctrl) {
                    list = scope.list;
                    ctrl.$parsers.unshift(function (viewValue) {
                        if(isValid(viewValue)) {
                            ctrl.$setValidity('unique', true);
                            return viewValue;
                        }
                        else{
                            ctrl.$setValidity('unique', false);
                            return undefined;
                        }
                    });
                },
                scope: {
                    list: "=unique"
                }
            }
        }]);
}(window.angular));