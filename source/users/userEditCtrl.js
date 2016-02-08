angular.module("app").controller('userEditCtrl', ['$scope','$location','$resource','$route', function($scope,$location,$resource,$route) {

	$scope.save = function(){
		return $resource("/api/products").save($scope.entity, function(data){ $location.path("/products");}, function(status,data){ console.log(status); console.log(data)});
	};

	$scope.cancel = function() {
		$location.path("/products");
	};
}]);