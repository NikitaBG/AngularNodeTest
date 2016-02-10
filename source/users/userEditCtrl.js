angular.module("app").controller('userEditCtrl', ['$scope','$location','$resource','$route','userService','$rootScope', function($scope,$location,$resource,$route,userService,$rootScope) {

	$rootScope.title = "Settings Edit";

	$scope.showChangePassword = true;

	userService.get($route.current.params.userId).then(function(response){
		$scope.entity = response.user;
		$scope.index = 0;
	}, function(status,data){
		console.log(status);
	});

	$scope.save = function(){
		return userService.update($scope.entity).then(function(data){ 
			$location.path("/products");
		}, function(status,data){
		 console.log(status); 
		});
	};

	$scope.cancel = function() {
		$location.path("/products");
	};

	$scope.showChangePasswordForm = function(){
		$scope.showChangePassword = !$scope.showChangePassword;
	}

	$scope.savePassword = function(){
		$scope.passwordEntity.uuid = $scope.entity.uuid;
		userService.savePassword($scope.passwordEntity).then(function(response){
			$location.path("/products");
		}, function(status, data){
			console.log(status);
		});
	}
}]);