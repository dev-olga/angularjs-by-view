(function (angular) {
    angular
        .module("angular-js-course-app.common.services")
        .service("dataService", ["$http", "$q", "MemberModel", DataService]);

    function DataService($http, $q, MemberModel){

        this.getMembers = function() {
            var deferred = $q.defer();

            $http({
                url: "../src/assets/data.json",
                dataType: "json",
                method: "GET"
            }).then(function (response) {
                var members = [];
                angular.forEach(response.data, function (value, index) {
                    var member = new MemberModel();
                    angular.extend(member, value);
                    members.push(member);
                });

                deferred.resolve(members);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        };

        this.getComments = function(){
            var deferred = $q.defer();
            $http({
                url: "https://jsonp.nodejitsu.com/?url=http://www.randomtext.me/api/lorem/p-3/5-15",
                method: "GET"
            }).then(function (response) {
                deferred.resolve(response.data.text_out);
            }, function (response) {
                deferred.reject(response);
            });

            return deferred.promise;
        }
    }

}(window.angular));
