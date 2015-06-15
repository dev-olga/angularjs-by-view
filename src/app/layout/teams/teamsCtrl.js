'use strict';
(function (angular) {

    angular.module('angular-js-course-app.teams')
        .controller("TeamsCtrl", ["$scope", "teamsService", TeamsCtrl]);

    function TeamsCtrl($scope, teamsService) {
        $scope.teams = teamsService.getTeams();
        $scope.newTeam = teamsService.createTeam();
        $scope.currentTeam = teamsService.selectedTeam;

        $scope.addTeam = function() {
            var team = teamsService.addTeam($scope.newTeam.name);
            $scope.selectTeam(team);
            $scope.teams = teamsService.getTeams();
            $scope.newTeam = teamsService.createTeam();
        };

        $scope.isSelected = function(team){
            return $scope.currentTeam && $scope.currentTeam.id === team.id;
        };

        $scope.selectTeam = function(team){
            teamsService.selectedTeam = team;
        };

        $scope.removeMember = function(member){
            var index = $scope.currentTeam.members.indexOf(member);
            if (index> -1){
                $scope.currentTeam.members.splice(index, 1);
            }
        };

        $scope.$watch( function () { return teamsService.selectedTeam; }, function ( selectedTeam ) {
            $scope.currentTeam = selectedTeam;
        });
    }

}(window.angular));
