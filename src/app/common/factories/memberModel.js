(function (angular) {
    angular
        .module('angular-js-course-app.common.factories')
        .factory("MemberModel", function(){
            var Member = function (){
                this.id = 0;
                this.name = "";
                this.age = 0;
                this.grade = "";
                this.job = "";
            }
            return Member;
        });
}(window.angular));
