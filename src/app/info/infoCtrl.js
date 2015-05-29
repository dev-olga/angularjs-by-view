(function (angular) {

    angular.module('angular-js-course-app.info')
        .controller("InfoCtrl", ["$scope", "$sce", "teamsService", "dataService", InfoCtrl]);

    function InfoCtrl($scope, $sce, teamsService, dataService) {
        $scope.members = [];
        $scope.membersLoading = true;
        $scope.itemsPerPage = 20;
        $scope.currentPage = 1;

        $scope.select = function(member){
            teamsService.addMember(member);
        }

        $scope.expand = function(member){
            if (member.expanded){
                member.expanded = false;
            }
            else {
                member.expanded = true;
                member.commentsLoading = true;
                dataService.getComments().then(function (data) {
                    member.commentsLoading = false;
                    member.comments = $sce.trustAsHtml(data);
                }, function(data){
                    member.commentsLoading = false;
                    member.expanded = false;
                });
            }
        }

        var MemberItem = function(member){
            this.member = member;
            this.comments = "";
            this.expanded = false;
            this.loading = false;
        }

        $scope.loadMembers = function(){
            dataService.getMembers().then(function (data) {
                    var members = [];
                    angular.forEach(data, function (member) {
                        members.push(new MemberItem(member));
                    })
                    $scope.members = members;
                    $scope.membersLoading = false;
                }
            );
        }
    }

}(window.angular));