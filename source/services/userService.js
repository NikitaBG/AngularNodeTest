appServices.factory('userService',['$resource','$window','$location', function($resource, $window, $location) {
    return {
        logIn: function(email, password, succesFunc, errorFunc) {
            return $resource("api/login").save({email:email, password:password}, function(data){ succesFunc(data);}, function(status,data){ errorFunc(status,data);});
        },
        logOut: function() {
 			delete $window.sessionStorage.token;
 			$location.path("/");
 			console.log($route);
        },
        getCurrentData: function() {
        	return $resource("/api/currentUser").get({}).$promise;
        }
    }
}]);