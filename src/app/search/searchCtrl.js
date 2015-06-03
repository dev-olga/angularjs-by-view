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
            $scope.team = new TeamItem(team);
            bindMembersWatcher();
        });

        $scope.selectMember = function(item, model, label){
            var existedItem = arrayHelper.first($scope.team.members, function(val){
                return val.status !=  $scope.MEMBER_STATUS.added && val.member.id == model.id;
            });
            if(existedItem) {
                existedItem.status = $scope.MEMBER_STATUS.unchanged;
            }
            else{
                var newItem = new MemberItem(model);
                newItem.status =$scope.MEMBER_STATUS.added;
                $scope.team.members.push(newItem);
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
            membersListener();
            angular.forEach($scope.team.members, function(item){
                switch (item.status) {
                    case $scope.MEMBER_STATUS.added:
                    {
                        teamsService.selectedTeam.addMember(item.member);
                        break;
                    }
                    case  $scope.MEMBER_STATUS.removed:{
                        teamsService.selectedTeam.removeMember(item.member);
                        break;
                    }
                }
                item.status = $scope.MEMBER_STATUS.unchanged;
            });
            bindMembersWatcher();
        }

        var bindMembersWatcher = function(){
            if(membersListener){
                membersListener();
            }
            membersListener = $scope.$watchCollection(function () { return teamsService.selectedTeam.members; },
                function (watchedMembers) {
                    angular.forEach($scope.team.members, function(item){
                        var index = watchedMembers.indexOf(item.member);
                        if(index < 0){
                            $scope.team.members.splice($scope.team.members.indexOf(item), 1);
                        }
                    });
                });
        }

        var MemberItem = function(member){
            this.member = member;
            this.status =  $scope.MEMBER_STATUS.unchanged;
        }

        var TeamItem = function(team){
            this.is = team.id;
            this.name = team.name;
            this.members = [];
            for(var i=0; i<team.members.length; i++){
                this.members.push(new MemberItem(team.members[i]));
            }
        }

    }
}(window.angular));
