angular.module("app").controller('productsEditCtrl', ['$scope','$location','$resource','$route','productsService','$rootScope', function($scope,$location,$resource,$route,productsService,$rootScope) {

	var productsId = $route.current.params.productsId;
	var isCreate = productsId === "new";

	$scope.header = isCreate ? "Product Create" : "Product Edit";

	if(isCreate) {
		$scope.entity = {};
		$rootScope.title = "Product Create";
	} else {
		$rootScope.title = "Product Edit";
		productsService.get(productsId).then(function(response){
			$scope.entity = response.product;
		}, function(status,data){
			console.log(status);
		});
	}

	$scope.save = function(){
		$scope.entity.price = parseFloat($scope.entity.price.toString().replace(",","."));
		productsService.save($scope.entity, isCreate ? "" : $scope.entity.uuid).then(function(response){
			$location.path("/products")
		}, function(status, data){
			console.log(status);
		});
	};

	$scope.cancel = function() {
		$location.path("/products")
	};
}]);