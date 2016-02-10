appServices.factory('tokenService', function ($q, $window, authService, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers["Auth-token"] = $window.sessionStorage.token;
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !authService.isAuthenticated) {
                authService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },
 
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || authService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                authService.isAuthenticated = false;
                $location.path("/admin/login");
            }
 
            return $q.reject(rejection);
        }
    };
});