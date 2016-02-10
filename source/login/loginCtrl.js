appControllers.controller('loginCtrl', ['$scope', 'loginFormService','userService','authService','$window','$location','$rootScope', function($scope, loginFormService, userService,authService,$window,$location,$rootScope) {
    
    $rootScope.title = "Login";

    loginFormService();

    $scope.isError = true;
    $scope.errorMessage = "sSda";
    $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {
			userService.logIn(username, password).then(function(response){
                proccesToken(response)
            }, function(status,data){
                $scope.isError = false;
                $scope.errorMessage = status.data.errorMessage;
                console.log(status);
            });
        }
    }

    $scope.signIn = function(){
        userService.signIn($scope.entity).then(function(response){
            proccesToken(response);
        }, function(status,data){
            console.log(status);
        })
    };

    var proccesToken = function(response){
        if(response && response.token){
            authService.isLogged = true;
            $window.sessionStorage.token = response.token;
            $location.path("/products");
        }
    }

}]);