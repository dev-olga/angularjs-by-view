(function (angular) {
    angular
        .module('angular-js-course-app.common.services')
        .service("teamsService",["TeamModel", TeamsService] );

    function TeamsService(TeamModel){
        var teams = [];

        this.selectedTeam = undefined;

        this.addTeam = function(name){
            var team = new TeamModel();
            team.name = name;
            teams.push(team);
            return team;
        }

        this.getTeams = function(){
            return teams;
        }

        this.createTeam = function(){
            return new TeamModel();
        }
    }
}(window.angular));
