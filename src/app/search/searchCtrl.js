(function (angular) {

    angular.module('angular-js-course-app.search')
        .controller("SearchCtrl", ["$scope", "$filter", "teamsService", "searchService", SearchCtrl]);

    function SearchCtrl($scope, $filter, teamsService, searchService) {
        var teamMembersListener = null;

        $scope.teamMembers = [];
        $scope.team = teamsService.selectedTeam;
        $scope.refreshDisabled = true;

        if ($scope.team){
            $scope.teamMembers = $scope.team.members;
        }

        $scope.$watch( function () { return teamsService.selectedTeam; }, function ( team ) {
            if ($scope.team == team){
                return;
            }
            $scope.team = team;
            $scope.teamMembers = [];
            if (teamsService.selectedTeam){
                angular.copy(teamsService.selectedTeam.members, $scope.teamMembers);

                if(teamMembersListener){
                    teamMembersListener();
                }

                teamMembersListener = $scope.$watchCollection(
                    function () { return teamsService.selectedTeam.members; }, function ( members ) {
                        for (var i=0; i< $scope.teamMembers.length; i++){
                            if ($scope.teamMembers[i].isNew){
                                continue;
                            }
                            var index = arrayHelper.indexOf(members, function(val){
                                return val.id == $scope.teamMembers[i].id;
                            });
                            if (index < 0){
                                $scope.teamMembers.splice(i, 1);
                                i--;
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

    }
}(window.angular));
