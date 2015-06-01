(function (angular) {

    angular.module('angular-js-course-app.search')
        .controller("SearchCtrl", ["$scope", "$filter", "teamsService", "dataService", SearchCtrl]);

    function SearchCtrl($scope, $filter, teamsService, dataService) {
        var membersListener = undefined;
        $scope.MEMBER_STATUS = {
            unchanged: 0,
            added: 1,
            removed: 2
        }
        $scope.team = undefined;

        $scope.$watch( function () { return teamsService.selectedTeam; }, function ( team ) {
            if(!team){
                return;
            }
            bindTeam(team);
            if(!membersListener &&team != null) {
                membersListener = $scope.$watchCollection(function () { return team.members; },
                    function (members) {
                        angular.forEach($scope.team.members, function(item){
                            var index = arrayHelper.indexOf(members, function (val) {
                                return val.id == item.id;
                            });
                            if (index < 0) {
                                item.status = $scope.MEMBER_STATUS.removed;
                            }
                        });
                    });
            }
        });

        $scope.selectMember = function(item, model, label){
            var existedItem = arrayHelper.first($scope.team.members, function(val){
                return val.status !=  $scope.MEMBER_STATUS.removed && val.id ==  item.id;
            });
            if(existedItem) {
                model.status = $scope.MEMBER_STATUS.unchanged;
            }
            else{
                model.status =$scope.MEMBER_STATUS.added;
                $scope.team.members.push(model);
            }
            $scope.selectedMember = undefined;
        }

        $scope.searchMembers = function (val) {
            var searchParam = val.toString().toLowerCase();
            return dataService.getMembers().then(function(data) {
                var res = $filter('filter')(data, searchParam);
                return $filter('orderBy')(res, 'name');
            });
        }

        $scope.removeMember = function(member){
            if (member.status == $scope.MEMBER_STATUS.added){
                var index =  $scope.team.members.indexOf(member);
                if (index > -1){
                    $scope.team.members.splice(index, 1);
                }
            }
            else {
                member.status = $scope.MEMBER_STATUS.removed;
            }
        }

        $scope.refresh = function(){
            angular.forEach($scope.team.members, function(item){
                var status = item.status;
                delete item.status;
                switch (status) {
                    case $scope.MEMBER_STATUS.added:
                    {
                        teamsService.addMember(item);
                        break;
                    }
                    case  $scope.MEMBER_STATUS.removed:{
                        teamsService.removeMember(item);
                        break;
                    }
                }
            });

            bindTeam(teamsService.selectedTeam);
        }

        var bindTeam = function(team){
            if(!team){
                return;
            }
            $scope.team = angular.copy(team);
            angular.forEach($scope.team.members, function(item){
                angular.extend(item, {status: $scope.MEMBER_STATUS.unchanged});
            });
        }

    }
}(window.angular));
