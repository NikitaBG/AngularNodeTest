appServices.factory('productsService',['$resource','$window','$location', function($resource, $window, $location) {
    return {
        get: function(productId) {
            return $resource("/api/products/:productId").get({productId: productId}).$promise;
        },
        save: function(entity, productId){
            return $resource("/api/products/:productId").save({productId: productId},entity).$promise;
        },
        deleteAll: function(entity){
        	return $resource("/api/deleteProducts").save({uuids:entity}).$promise;
        }
    }
}]);