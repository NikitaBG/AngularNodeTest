angular.module("app").controller('productsListCtrl', ['$scope','$resource','$location','$route', function($scope, $resource, $location, $route) {
    
    $scope.newProducts = $resource("/api/products").get({

    },function(response){
    	if(response.content.length){
    		$scope.products = response.content;
    	}
    }, function(status, data){

    });

	$scope.delete = function(uuid){
		if(uuid){
			$resource("/api/products/:productUuid").delete({productUuid: uuid}, function(){
				$route.reload();
			}, function() {

			});
		}
	};

	$scope.createProduct = function(){
		$location.path("/products/new");
	}

	$scope.deleteAll = function(){
		if($scope.products){
			$resource("/api/products/:productUuid").delete({productUuid: "DELETEALL"}, function(){
				$route.reload();
			}, function() {

			});
		}
	}
}]);