angular.module("app").controller('productsEditCtrl', ['$scope','$location','$resource', function($scope,$location,$resource) {


	$scope.save = function(){
		return $resource("/api/products").save($scope.entity, function(data){ $location.path("/products");}, function(status,data){ console.log(status); console.log(data)});
	};

	$scope.cancel = function() {
		$location.path("/products")
	};
}]);