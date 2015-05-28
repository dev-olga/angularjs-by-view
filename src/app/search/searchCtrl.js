(function (angular) {

    angular.module('angular-js-course-app.search')
        .controller("SearchCtrl", ["$scope", "$filter", "teamsService", "searchService", SearchCtrl]);

    function SearchCtrl($scope, $filter, teamsService, searchService) {
        var membersListener = undefined;
        $scope.refreshDisabled = true;
        $scope.teamMembers = [];
        $scope.team = undefined;

        $scope.$watch( function () { return teamsService.selectedTeam; }, function ( team ) {
            bindTeam(team);

            if(!membersListener && teamsService.selectedTeam != null) {
                membersListener = $scope.$watchCollection(function () { return teamsService.selectedTeam.members; },
                    function (members) {
                        for (var i = 0; i < $scope.teamMembers.length; i++) {
                            var item = $scope.teamMembers[i];
                            if (item.isNew) {
                                continue;
                            }
                            var index = arrayHelper.indexOf(members, function (val) {
                                return val.id == item.id;
                            });
                            if (index < 0) {
                                item.isRemoved = true;
                            }
                        }
                    });
            }
        });

        $scope.$watchCollection( function () { return $scope.teamMembers; }, function ( members ) {
            $scope.refreshDisabled = members.length == 0;
        });

        $scope.selectMember = function(item, model, label){
            var existedItem = arrayHelper.first($scope.teamMembers, function(val){
                return !val.isRemoved && val.id ==  item.id;
            });
            if(existedItem) {
                existedItem.isRemoved = false;
            }
            else{
                $scope.teamMembers.push(model);
            }
            $scope.selectedMember = undefined;
        }

        $scope.searchMembers = function (val) {
            var searchParam = val.toString().toLowerCase();
            return searchService.search().then(function(data) {
                var res = $filter('filter')(data, searchParam);
                return $filter('orderBy')(res, 'name');
            });
        }

        $scope.removeMember = function(member){
            if (member.isNew){
                var index =  $scope.teamMembers.indexOf(member);
                if (index > -1){
                    $scope.teamMembers.splice(index, 1);
                }
            }
            else {
                member.isRemoved = true;
            }
        }

        $scope.refresh = function(){
            teamsService.refreshMembers($scope.teamMembers);
            $scope.teamMembers =  angular.copy(teamsService.selectedTeam.members, $scope.teamMembers);
        }

        var bindTeam = function(team){
            if($scope.team == team){
                return;
            }
            $scope.team = team;
            if ($scope.team){
                $scope.teamMembers = angular.copy(team.members, $scope.teamMembers);
            }
            else{
                $scope.teamMembers = [];
            }
        }

    }
}(window.angular));
