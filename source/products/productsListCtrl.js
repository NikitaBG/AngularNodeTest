angular.module("app").controller('productsListCtrl', ['$scope','$resource','$location','$route','productsService','$filter', function($scope, $resource, $location, $route, productsService, $filter) {
    
    $scope.newProducts = $resource("/api/products").get({},function(response){
    	if(response.content.length){
    		$scope.products = response.content;
    		$scope.originalProducts = response.content;
    		$scope.filterPagination($scope.originalProducts);
    	}
    }, function(status, data){
    	console.log(status);
    });

    $scope.showDeleteAllButton = false;
    $scope.checkedUuids = [];
    $scope.pagination = 1;
    $scope.recordsToShow = 10;
	$scope.predicate = '';
	$scope.reverse = true;
	$scope.order = function(predicate) {
		$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
		$scope.predicate = predicate;
	};
	$scope.setPagination = function(page){
		$scope.pagination = page;
	}
	$scope.filterPagination = function(recordsToShow){
		var pages = Math.ceil($scope.originalProducts.length / $scope.recordsToShow);
		if(pages > 1){
			$scope.pages = [];
    		for(var page = 1; page <= pages; page++){
    			$scope.pages.push(page);
    		}
    		$scope.pagination = 1;
		}
	}

	$scope.indexValue = function(){
		if($scope.originalProducts.length - (($scope.pagination-1) * $scope.recordsToShow) < 0){
  			return 1;
  		} else {
  			return ($scope.pagination-1)*$scope.recordsToShow + 1;
  		}
	}

	$scope.delete = function(uuid){
		if(uuid){
			productsService.deleteAll([uuid]).then(function(){
				$route.reload();
			}, function() {

			});
		}
	};

	$scope.createProduct = function(){
		$location.path("/products/new");
	};

	$scope.deleteAll = function(){
		if($scope.checkedUuids.length){
			productsService.deleteAll($scope.checkedUuids).then(function(){
				$route.reload();
			}, function() {

			});
		}
	};

	$scope.checkRow = function(elem){
		elem.target.checked ? $scope.checkedUuids.push(elem.target.value) :  $scope.checkedUuids.splice($.inArray(elem.target.value,  $scope.checkedUuids));
	}
}]);