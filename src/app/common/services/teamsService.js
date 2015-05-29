(function (angular) {
    angular
        .module('angular-js-course-app.common.services')
        .service("teamsService", TeamsService);

    function TeamsService(){
        var teams = [];

        this.selectedTeam = undefined;

//        this.selectTeam = function(team){
//            var index = arrayHelper.indexOf(teams, function(item){
//                return item.id == team.id;
//            });
//            if (index > -1){
//                this.selectedTeam = team;
//            }
//        }

        this.removeMember = function(member) {
            var index = arrayHelper.indexOf(this.selectedTeam.members, function(val){
                return val.id == member.id;
            });
            if (index > -1){
                this.selectedTeam.members.splice(index, 1);
            }
        }

        this.addMember = function(member){
            if (!this.selectedTeam){
                return;
            }
            var item = arrayHelper.first(this.selectedTeam.members, function(val){
               return val.id == member.id;
            });
            if(!item){
                this.selectedTeam.members.push(member);
            }
        }

        this.addTeam = function(name){
            var team = new Team();
            team.id = teams.length + 1;
            team.name = name;
            teams.push(team);
        }

        this.getTeams = function(){
            return teams;
        }

        this.createTeam = function(){
            return new Team();
        }

        function Team(){
            this.id = 0;
            this.name = "";
            this.members = [];
        };
    }
}(window.angular));
