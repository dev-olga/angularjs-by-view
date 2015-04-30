(function (angular) {
    angular
        .module('angular-js-course-app.common.services')
        .service("teamsService", TeamsService);

    function TeamsService(){
        var teams = [];

        this.selectedTeam = undefined;

        this.selectTeam = function(team_id){
            if (team_id && team_id in teams){
                this.selectedTeam = teams[team_id];
            }
        }

        this.refreshMembers = function(array){
            for(var i=0; i<array.length; i++ ){
                var item = array[i];
                var index = this.selectedTeam.members.indexOf(item);
                if(index < 0 && item.isNew){
                    item.isNew = false;
                    this.selectedTeam.members.push(item);
                }
                else if (index > -1 && item.isRemoved){
                    this.selectedTeam.members.splice(index, 1);
                }
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
