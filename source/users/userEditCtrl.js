angular.module("app").controller('userEditCtrl', ['$scope','$location','$resource','$route','userService', function($scope,$location,$resource,$route,userService) {

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
}]);