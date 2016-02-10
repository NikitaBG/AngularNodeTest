angular.module("app").controller('headerCtrl', ['$scope','$location','$resource','userService', function($scope,$location,$resource,userService) {

	(function(){
		userService.getCurrentData().then(function(response){
			$scope.user = response.user;
		},function(status, data){
			console.log(status);
		});
	})();

	$scope.logOut = function(){
		userService.logOut();
	};

	$scope.getSettingsUrl = function(){
		"/users/" + $scope.user.uuid;
	};
}]);