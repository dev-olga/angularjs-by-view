'use strict';
(function (angular) {
    angular
        .module('angular-js-course-app.common.features.team')
        .factory("TeamModel", ["MemberModel",function(MemberModel){
            var Team = function (){
                this.name = "";
                this.members = [];

                this.removeMember = function(member) {
                    if(!member instanceof MemberModel){
                        return;
                    }
                    var index = arrayHelper.indexOf(this.members, function(val){
                        return val.id == member.id;
                    });
                    if (index > -1){
                        this.members.splice(index, 1);
                    }
                }

                this.addMember = function(member){
                    if(!member instanceof MemberModel){
                        return;
                    }

                    var index = arrayHelper.indexOf(this.members, function(val){
                        return val.id == member.id;
                    });
                    if(index < 0){
                        this.members.push(member);
                    }
                }
            }
            return Team;
        }]);
}(window.angular));
