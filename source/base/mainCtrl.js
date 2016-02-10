appControllers.controller('mainCtrl', ['$scope','$route', function($scope,$route) {
	$scope.route = $route;
	$scope.show = function(){
		return $route.current && $route.current.access.requiredLogin;
	}
}]);