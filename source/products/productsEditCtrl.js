angular.module("app").controller('productsEditCtrl', ['$scope','$location','$resource','$route','productsService', function($scope,$location,$resource,$route,productsService) {

	var productsId = $route.current.params.productsId;
	var isCreate = productsId === "new";

	$scope.header = isCreate ? "Product Create" : "Product Edit";

	if(isCreate) {
		$scope.entity = {};
	} else {
		productsService.get(productsId).then(function(response){
			$scope.entity = response.product;
		}, function(status,data){
			console.log(status);
		});
	}

	$scope.save = function(){
		productsService.save(isCreate ? "" : $scope.entity.uuid, $scope.entity, isCreate ? "" : $scope.entity.uuid).then(function(response){
			$location.path("/products")
		}, function(status, data){
			console.log(status);
		});
	};

	$scope.cancel = function() {
		$location.path("/products")
	};
}]);