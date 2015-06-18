'use strict';
(function (angular) {
    angular.module('angular-js-course-app.common.features.arrayHelper', [])
        .service("arrayHelper",[ArrayHelper] );

    function ArrayHelper(){
        this.first = function(array, func){
            for(var i = 0; i< array.length; i++){
                if(func(array[i])){
                    return array[i];
                }
            }
            return undefined;
        }

        this.indexOf = function(array, func){
            for(var i = 0; i< array.length; i++){
                if(func(array[i])){
                    return i;
                }
            }
            return -1;
        }
    }
}(window.angular));
