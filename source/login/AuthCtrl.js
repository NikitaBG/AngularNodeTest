appControllers.controller('authCtrl', ['$scope', '$location', '$window', 'userService', 'authService',
    function authCtrl($scope, $location, $window, userService, authService) {
 
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
 
                userService.logIn(username, password).success(function(data) {
                    authService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/products");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }
 
        $scope.logout = function logout() {
            if (authService.isLogged) {
                authService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
    }
]);