appControllers.controller('loginCtrl', ['$scope', 'loginFormService','userService','authService','$window','$location', function($scope, loginFormService, userService,authService,$window,$location) {
    loginFormService();
    $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {
			userService.logIn(username, password, successAction, errorAction);
        }
    }

    var successAction = function(data){
    	if(data && data.token){
    		authService.isLogged = true;
	        $window.sessionStorage.token = data.token;
	        $location.path("/products");
    	}
    }

    var errorAction = function(status, data){
    	console.log(status);
        console.log(data);
    }
}]);