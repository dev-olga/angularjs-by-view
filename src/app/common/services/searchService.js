(function (angular) {
    angular
        .module("angular-js-course-app.common.services")
        .service("searchService", ["$http", "$q", SearchService]);

    function SearchService($http, $q){

        this.search = function() {
            var deferred = $q.defer();

            $http({
                url: "../src/common/data.json",
                dataType: "json",
                method: "GET"
            }).then(function (response) {
                var members = [];
                angular.forEach(response.data, function (value, index) {
                    var member = new Member();
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

        function Member(){
            this.id = 0;
            this.name = "";
            this.age = 0;
            this.grade = "";
            this.job = "";

            this.isRemoved = false;
            this.isNew = true;
        };
    }

}(window.angular));
