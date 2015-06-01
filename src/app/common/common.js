'use strict';
(function (angular) {
    angular.module('angular-js-course-app.common.directives', []);

    angular.module('angular-js-course-app.common', [
        'angular-js-course-app.common.components',
        'angular-js-course-app.common.directives',
        'angular-js-course-app.common.services',
        'angular-js-course-app.common.factories'
    ]);

}(window.angular));